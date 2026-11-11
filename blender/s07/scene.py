# S07 in Blender (EEVEE): comic-style cel shading, ink outlines (inverted hull), distance haze, DOF,
# a curling molasses wave (rebuilt every frame), flying debris, Cast Kit characters as camera-facing cards.
# Run: EGL_PLATFORM=surfaceless LIBGL_ALWAYS_SOFTWARE=1 MESA_GL_VERSION_OVERRIDE=4.6 python scene.py -- still|anim [res_scale]
import bpy, bmesh, math, os, sys, random
from mathutils import Vector

HERE = os.path.dirname(os.path.abspath(__file__)); TEX = os.path.join(HERE, '..', 'assets', 'tex')
MODE = sys.argv[-2] if len(sys.argv) > 2 and sys.argv[-2] in ('still', 'anim') else 'still'
RES = float(sys.argv[-1]) if MODE in sys.argv[-2:] and sys.argv[-1] not in ('still', 'anim') else .5
FPS, N = 12, 24                                  # drawings per second (on twos at 24 fps), frames in the clip
bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
rnd = random.Random(7)

# ———————————————————————————————— materials
FOG = (0.36, 0.385, 0.42)
def link(nt, a, b): nt.links.new(a, b)
def toon(name, color=(.5, .5, .5), image=None, scale=1.0, fogk=.011, flat=.45, gloss=True, spec=None, rim=None, streak=False, bands=(.42, .72, 1.0)):
    m = bpy.data.materials.new(name); m.use_nodes = True; nt = m.node_tree; N_ = nt.nodes; N_.clear()
    out = N_.new('ShaderNodeOutputMaterial'); em = N_.new('ShaderNodeEmission'); link(nt, em.outputs[0], out.inputs[0])
    # base colour
    if image:
        tc = N_.new('ShaderNodeTexCoord'); mp = N_.new('ShaderNodeMapping'); mp.inputs['Scale'].default_value = (scale, scale, scale)
        it = N_.new('ShaderNodeTexImage'); it.image = bpy.data.images.load(os.path.join(TEX, image), check_existing=True); it.projection = 'BOX'; it.projection_blend = .25
        link(nt, tc.outputs['Object'], mp.inputs[0]); link(nt, mp.outputs[0], it.inputs[0])
        tint = N_.new('ShaderNodeVectorMath'); tint.operation = 'MULTIPLY'; tint.inputs[1].default_value = color
        link(nt, it.outputs[0], tint.inputs[0])
        fl = N_.new('ShaderNodeVectorMath'); fl.operation = 'SCALE'; fl.inputs['Scale'].default_value = 1 - flat; link(nt, tint.outputs[0], fl.inputs[0])
        fa = N_.new('ShaderNodeVectorMath'); fa.operation = 'ADD'; fa.inputs[1].default_value = tuple(c * flat * .75 for c in color); link(nt, fl.outputs[0], fa.inputs[0]); base = fa.outputs[0]
    else:
        rgb = N_.new('ShaderNodeRGB'); rgb.outputs[0].default_value = (*color, 1); base = rgb.outputs[0]
    # cel bands from the real lighting (shadows included)
    df = N_.new('ShaderNodeBsdfDiffuse'); s2r = N_.new('ShaderNodeShaderToRGB'); link(nt, df.outputs[0], s2r.inputs[0])
    bw = N_.new('ShaderNodeRGBToBW'); link(nt, s2r.outputs[0], bw.inputs[0])
    cr = N_.new('ShaderNodeValToRGB'); cr.color_ramp.interpolation = 'CONSTANT'; el = cr.color_ramp.elements
    el[0].position = 0; el[0].color = (bands[0],) * 3 + (1,); el[1].position = .22; el[1].color = (bands[1],) * 3 + (1,)
    e3 = el.new(.55); e3.color = (bands[2],) * 3 + (1,)
    link(nt, bw.outputs[0], cr.inputs[0])
    mul = N_.new('ShaderNodeVectorMath'); mul.operation = 'MULTIPLY'; link(nt, base, mul.inputs[0]); link(nt, cr.outputs[0], mul.inputs[1]); col = mul.outputs[0]
    def add(sock):
        a = N_.new('ShaderNodeVectorMath'); a.operation = 'ADD'; link(nt, col, a.inputs[0]); link(nt, sock, a.inputs[1]); return a.outputs[0]
    if spec:   # hard glossy highlights (molasses): two bands, amber then cream
        gl = N_.new('ShaderNodeBsdfGlossy'); gl.inputs['Roughness'].default_value = .22; s2 = N_.new('ShaderNodeShaderToRGB'); link(nt, gl.outputs[0], s2.inputs[0])
        b2 = N_.new('ShaderNodeRGBToBW'); link(nt, s2.outputs[0], b2.inputs[0])
        r2 = N_.new('ShaderNodeValToRGB'); r2.color_ramp.interpolation = 'CONSTANT'; e = r2.color_ramp.elements
        e[0].position = 0; e[0].color = (0, 0, 0, 1); e[1].position = spec[0]; e[1].color = (*spec[1], 1); x = e.new(spec[2]); x.color = (*spec[3], 1)
        link(nt, b2.outputs[0], r2.inputs[0]); col = add(r2.outputs[0])
    if spec and gloss:   # sky-facing gloss: surfaces turned up catch hard amber → cream highlights (reads as wet syrup)
        gm = N_.new('ShaderNodeNewGeometry'); sz = N_.new('ShaderNodeSeparateXYZ'); link(nt, gm.outputs['Normal'], sz.inputs[0])
        r5 = N_.new('ShaderNodeValToRGB'); r5.color_ramp.interpolation = 'CONSTANT'; e = r5.color_ramp.elements
        e[0].position = 0; e[0].color = (0, 0, 0, 1); e[1].position = .72; e[1].color = (.55, .25, .04, 1); x = e.new(.9); x.color = (1.0, .78, .42, 1)
        link(nt, sz.outputs['Z'], r5.inputs[0]); col = add(r5.outputs[0])
    if rim:    # fresnel rim in the threat colour
        lw = N_.new('ShaderNodeLayerWeight'); lw.inputs[0].default_value = .35
        r3 = N_.new('ShaderNodeValToRGB'); r3.color_ramp.interpolation = 'CONSTANT'; e = r3.color_ramp.elements
        e[0].position = 0; e[0].color = (0, 0, 0, 1); e[1].position = .62; e[1].color = (*rim, 1)
        link(nt, lw.outputs['Facing'], r3.inputs[0]); col = add(r3.outputs[0])
    if streak:  # flowing highlight streaks along the wave
        tc2 = N_.new('ShaderNodeUVMap'); wv = N_.new('ShaderNodeTexWave'); wv.wave_type = 'BANDS'; wv.bands_direction = 'X'
        wv.inputs['Scale'].default_value = 2.4; wv.inputs['Distortion'].default_value = 10; wv.inputs['Detail'].default_value = 0; wv.inputs['Detail Scale'].default_value = 1.4
        link(nt, tc2.outputs['UV'], wv.inputs['Vector'])
        r4 = N_.new('ShaderNodeValToRGB'); r4.color_ramp.interpolation = 'CONSTANT'; e = r4.color_ramp.elements
        e[0].position = 0; e[0].color = (0, 0, 0, 1); e[1].position = .975; e[1].color = (1.0, .82, .55, 1)
        link(nt, wv.outputs['Fac'], r4.inputs[0])
        nz = N_.new('ShaderNodeTexNoise'); nz.inputs['Scale'].default_value = 7; link(nt, tc2.outputs['UV'], nz.inputs['Vector'])
        r6 = N_.new('ShaderNodeValToRGB'); r6.color_ramp.interpolation = 'CONSTANT'; e = r6.color_ramp.elements; e[0].position = 0; e[0].color = (0, 0, 0, 1); e[1].position = .52; e[1].color = (1, 1, 1, 1)
        link(nt, nz.outputs['Fac'], r6.inputs[0]); dm = N_.new('ShaderNodeVectorMath'); dm.operation = 'MULTIPLY'; link(nt, r4.outputs[0], dm.inputs[0]); link(nt, r6.outputs[0], dm.inputs[1])
        col = add(dm.outputs[0]); m['streak'] = wv.name
        sv = N_.new('ShaderNodeSeparateXYZ'); link(nt, tc2.outputs['UV'], sv.inputs[0])
        r7 = N_.new('ShaderNodeValToRGB'); e = r7.color_ramp.elements; e[0].position = .5; e[0].color = (1, 1, 1, 1); e[1].position = .62; e[1].color = (.5, .42, .38, 1); x = e.new(.8); x.color = (.5, .42, .38, 1); x2 = e.new(.9); x2.color = (1, 1, 1, 1)
        link(nt, sv.outputs['Y'], r7.inputs[0]); cv = N_.new('ShaderNodeVectorMath'); cv.operation = 'MULTIPLY'; link(nt, col, cv.inputs[0]); link(nt, r7.outputs[0], cv.inputs[1]); col = cv.outputs[0]
    if name == 'cobble':
        tc3 = N_.new('ShaderNodeTexCoord'); sy = N_.new('ShaderNodeSeparateXYZ'); link(nt, tc3.outputs['Object'], sy.inputs[0])
        wvv = N_.new('ShaderNodeValue'); wvv.name = 'wavey'; sub = N_.new('ShaderNodeMath'); sub.operation = 'SUBTRACT'; link(nt, sy.outputs['Y'], sub.inputs[0]); link(nt, wvv.outputs[0], sub.inputs[1])
        r8 = N_.new('ShaderNodeValToRGB'); e = r8.color_ramp.elements; e[0].position = 0; e[0].color = (.75, .36, .07, 1); e[1].position = 1; e[1].color = (0, 0, 0, 1); x = e.new(.35); x.color = (.32, .14, .03, 1)
        mr = N_.new('ShaderNodeMapRange'); mr.inputs['From Min'].default_value = 0; mr.inputs['From Max'].default_value = 24; link(nt, sub.outputs[0], mr.inputs['Value']); link(nt, mr.outputs[0], r8.inputs[0])
        gm2 = N_.new('ShaderNodeVectorMath'); gm2.operation = 'MULTIPLY'; link(nt, r8.outputs[0], gm2.inputs[0]); link(nt, s2r.outputs[0], gm2.inputs[1]); col = add(gm2.outputs[0])
    # distance haze: c + (fog − c)·(1 − e^(−d·k))
    cd = N_.new('ShaderNodeCameraData'); m1 = N_.new('ShaderNodeMath'); m1.operation = 'MULTIPLY'; m1.inputs[1].default_value = -fogk
    link(nt, cd.outputs['View Distance'], m1.inputs[0]); ex = N_.new('ShaderNodeMath'); ex.operation = 'EXPONENT'; link(nt, m1.outputs[0], ex.inputs[0])
    f = N_.new('ShaderNodeMath'); f.operation = 'SUBTRACT'; f.inputs[0].default_value = 1; link(nt, ex.outputs[0], f.inputs[1])
    d = N_.new('ShaderNodeVectorMath'); d.operation = 'SUBTRACT'; d.inputs[0].default_value = FOG; link(nt, col, d.inputs[1])
    s = N_.new('ShaderNodeVectorMath'); s.operation = 'SCALE'; link(nt, d.outputs[0], s.inputs[0]); link(nt, f.outputs[0], s.inputs['Scale'])
    fin = N_.new('ShaderNodeVectorMath'); fin.operation = 'ADD'; link(nt, col, fin.inputs[0]); link(nt, s.outputs[0], fin.inputs[1])
    link(nt, fin.outputs[0], em.inputs['Color'])
    return m

INKM = bpy.data.materials.new('ink'); INKM.use_nodes = True
_n = INKM.node_tree.nodes; _n.clear(); _o = _n.new('ShaderNodeOutputMaterial'); _e = _n.new('ShaderNodeEmission'); _e.inputs['Color'].default_value = (.035, .03, .03, 1)
INKM.node_tree.links.new(_e.outputs[0], _o.inputs[0]); INKM.use_backface_culling = True

def obj_from(name, bm_or_data, mat, ink=.045, smooth=False):
    me = bpy.data.meshes.new(name)
    if isinstance(bm_or_data, bmesh.types.BMesh): bm_or_data.to_mesh(me); bm_or_data.free()
    else: me.from_pydata(*bm_or_data)
    o = bpy.data.objects.new(name, me); sc.collection.objects.link(o)
    o.data.materials.append(mat)
    if smooth:
        for p in me.polygons: p.use_smooth = True
    if ink:
        o.data.materials.append(INKM); md = o.modifiers.new('ink', 'SOLIDIFY'); md.thickness = ink; md.offset = 1; md.use_flip_normals = True; md.use_rim = False; md.material_offset = 1
    return o

class Boxes:   # many boxes merged into one mesh
    def __init__(s): s.bm = bmesh.new()
    def add(s, c, size, rz=0, rx=0):
        r = bmesh.ops.create_cube(s.bm, size=1)['verts']
        for v in r:
            v.co = Vector((v.co.x * size[0], v.co.y * size[1], v.co.z * size[2]))
            if rx: v.co.rotate(__import__('mathutils').Euler((rx, 0, 0)))
            if rz: v.co.rotate(__import__('mathutils').Euler((0, 0, rz)))
            v.co += Vector(c)
        return s
    def obj(s, name, mat, ink=.045): return obj_from(name, s.bm, mat, ink)

# ———————————————————————————————— world: Commercial Street, bare wet cobbles, el railway on the right
M_COB = toon('cobble', (.42, .43, .47), 'cobblestone_floor_04.jpg', .32, flat=.55, bands=(.5, .78, 1.0))
M_WIN = toon('win', (.06, .07, .09)); M_TRIM = toon('trim', (.3, .3, .32)); M_SIDE = toon('side', (.38, .38, .4))
M_STEEL = toon('steel', (.2, .21, .24), 'rusty_metal_02.jpg', .5, flat=.6, bands=(.35, .62, .95))
M_MOL = toon('molasses', (.46, .2, .05), fogk=.003, spec=(.55, (1.0, .5, .08), .8, (1.0, .84, .5)), rim=(.9, .42, .06), streak=True, bands=(.42, .72, 1.05))
M_POOL = toon('pool', (.16, .06, .015), fogk=.004, gloss=False, spec=(.85, (.9, .45, .08), .95, (1.0, .84, .5)), bands=(.4, .7, 1.0))
M_WOOD = toon('wood', (.3, .2, .13)); M_DARKWOOD = toon('dwood', (.17, .12, .09))

g = bmesh.new(); bmesh.ops.create_grid(g, x_segments=1, y_segments=1, size=1)
for v in g.verts: v.co = Vector((v.co.x * 8, v.co.y * 90 - 50, 0))
obj_from('street', g, M_COB, ink=0)
B = Boxes()
for sx in (-1, 1): B.add((sx * 8, -50, .1), (2.2, 180, .2))
B.obj('sidewalks', M_SIDE, ink=.02)
# building rows: varied facades (brick, stone, painted), stone lintels and sills, shopfronts with signs and awnings, chimneys
PAL = [(.46, .3, .26), (.38, .33, .33), (.5, .44, .36), (.34, .3, .28), (.44, .4, .38)]
M_BRICK = [toon('brick%d' % i, c, 'brick_wall_10.jpg', .22) for i, c in enumerate(PAL)]
M_STONE = toon('stone', (.52, .5, .47)); M_SIGN = [toon('sign0', (.16, .22, .2)), toon('sign1', (.3, .13, .11)), toon('sign2', (.2, .18, .26))]
M_AWN = toon('awn', (.3, .26, .22)); M_CHIM = toon('chim', (.3, .25, .23))
W = Boxes(); T = Boxes(); BR = [Boxes() for _ in PAL]; SG = [Boxes() for _ in M_SIGN]; AW = Boxes(); CH = Boxes()
for sx in (-1, 1):
    y = 14.0; i = 0
    while y > -140:
        w = rnd.uniform(9, 14); h = rnd.uniform(11, 19); x0 = sx * 9.2; d = 9; fh = rnd.choice((3.0, 3.3, 3.6))
        BR[i % len(PAL)].add((x0 + sx * d / 2, y - w / 2, h / 2), (d, w - .25, h))
        T.add((x0 + sx * .2, y - w / 2, h + .35), (.9, w + .2, .7)); T.add((x0 + sx * .1, y - w / 2, h - .3), (.5, w, .25))   # cornice
        T.add((x0 + sx * .05, y - .2, h / 2), (.3, .4, h)); T.add((x0 + sx * .05, y - w + .3, h / 2), (.3, .4, h))           # pilasters
        # shopfront
        SG[i % 3].add((x0 - sx * .12, y - w / 2, 3.35), (.25, w * .82, .8))
        W.add((x0 - sx * .05, y - w / 2, 1.5), (.15, w * .7, 2.2)); AW.add((x0 - sx * .9, y - w / 2, 2.85), (1.7, w * .74, .12))
        floors = int((h - 4.2) / fh); cols = max(2, int(w / 2.5))
        for f in range(floors):
            for c in range(cols):
                wy = y - 1.4 - c * ((w - 2.8) / max(1, cols - 1)); wz = 5.6 + f * fh
                W.add((x0 - sx * .06, wy, wz), (.14, 1.05, 1.75))
                T.add((x0 - sx * .1, wy, wz - .98), (.32, 1.35, .16)); T.add((x0 - sx * .08, wy, wz + 1.0), (.28, 1.4, .22))   # sill, lintel
        for c in range(rnd.randint(1, 3)): CH.add((x0 + sx * rnd.uniform(2, 7), y - rnd.uniform(1, w - 1), h + 1.1), (.8, .9, 2.2))
        y -= w; i += 1
for i, b in enumerate(BR): b.obj('bldg%d' % i, M_BRICK[i])
for i, b in enumerate(SG): b.obj('sign%d' % i, M_SIGN[i], ink=.025)
W.obj('windows', M_WIN, ink=.02); T.obj('trim', M_STONE, ink=.025); AW.obj('awn', M_AWN, ink=.03); CH.obj('chim', M_CHIM, ink=.03)
# far skyline layers in the haze (depth): North End roofs, a steeple, gas holder
SK = Boxes()
for k in range(26): SK.add((rnd.uniform(-60, 60), -170 - rnd.uniform(0, 30), 0), (rnd.uniform(6, 14), 6, rnd.uniform(14, 34)))
SK.add((-22, -185, 0), (3, 3, 58)); SK.add((-22, -185, 30), (1.4, 1.4, 14))
SK.obj('skyline', toon('sky_bld', (.3, .32, .36), fogk=.005), ink=.0)
# street lamps; one close to camera on the left for foreground parallax
LP = Boxes()
for z in (14, -2, -18, -34, -50, -66): LP.add((6.6, z, 2.3), (.14, .14, 4.6)); LP.add((6.6, z, 4.75), (.5, .5, .55))
LP.add((3.9, 12.4, 2.6), (.2, .2, 5.2)); LP.add((3.9, 12.4, 5.3), (.6, .6, .7))
LP.obj('lamps', toon('lamp', (.16, .16, .18)), ink=.025)
# elevated railway (Atlantic Ave El): deck, side girders with stiffeners, lattice columns with cross bracing
E = Boxes()
E.add((4.6, -50, 6.6), (5.4, 200, .5)); EL_X = -1
for k in range(150): E.add((4.6, 14 - k * 1.3, 6.2), (5.3, .2, .32))
for gx in (2.0, 7.2):
    E.add((gx, -50, 5.9), (.35, 200, 1.4))
    for k in range(140): E.add((gx - .2 * (1 if gx < 4 else -1), 12 - k * 1.5, 5.9), (.08, .12, 1.4))
for k in range(16):
    cy = 10 - k * 9
    for px in (2.4, 6.8): E.add((px, cy, 2.6), (.45, .45, 5.2))
    E.add((4.6, cy, 5.05), (5.0, .5, .5))
    for z0 in (.9, 2.9):
        L = math.hypot(4.4, 1.9); a = math.atan2(1.9, 4.4)
        Bm = Boxes()
    for z in (1.0, 3.0):
        for sgn in (-1, 1):
            E.add((4.6, cy, z + .9), (math.hypot(4.4, 1.9), .12, .14), rz=0, rx=0)
E.obj('el', M_STEEL, ink=.03).scale.x = -1
# cross braces as rotated thin boxes (separate builder for rotation about Y)
X = bmesh.new()
from mathutils import Euler
for k in range(16):
    cy = 10 - k * 9
    for zc in (1.4, 3.6):
        for sgn in (-1, 1):
            r = bmesh.ops.create_cube(X, size=1)['verts']
            for v in r:
                v.co = Vector((v.co.x * 4.9, v.co.y * .12, v.co.z * .14)); v.co.rotate(Euler((0, sgn * math.atan2(2.0, 4.4), 0))); v.co += Vector((4.6, cy, zc))
obj_from('braces', X, M_STEEL, ink=.02).scale.x = -1
for e in [o for o in sc.objects if o.name == 'el']: pass

# ———————————————————————————————— the wave (profile swept across the street, rebuilt per frame)
PROF = [(-7, 0), (-5.5, 1.6), (-3.8, 3.8), (-2, 6.0), (0, 7.8), (2, 8.8), (4, 8.9), (5.8, 8.2), (7, 6.8), (7.3, 5.3), (6.8, 4.2), (5.9, 3.8), (5.1, 4.2), (4.8, 5.0), (4.1, 4.6), (3.4, 3.6), (3.1, 2.4), (3.3, 1.2), (3.9, .4), (4.8, 0)]
def catmull(pts, n=6):
    out = []; m = len(pts)
    for i in range(m - 1):
        p0, p1, p2, p3 = pts[max(0, i - 1)], pts[i], pts[i + 1], pts[min(m - 1, i + 2)]
        for j in range(n):
            t = j / n; t2, t3 = t * t, t * t * t
            out.append(tuple(.5 * (2 * p1[d] + (-p0[d] + p2[d]) * t + (2 * p0[d] - 5 * p1[d] + 4 * p2[d] - p3[d]) * t2 + (-p0[d] + 3 * p1[d] - 3 * p2[d] + p3[d]) * t3) for d in (0, 1)))
    out.append(pts[-1]); return out
PR = catmull(PROF); NX = 70; XS = [-13 + 26 * i / (NX - 1) for i in range(NX)]
def wave_verts(t):
    V = []
    for x in XS:
        h = 1.42 * (1 - .28 * (x / 13) ** 2) * (1 - .55 * max(0, (-x - 2) / 11) ** 1.5) * (1 + .07 * math.sin(x * .8 + t * 2.3)) * (.92 + .1 * min(1, t / 2))
        fwd = .9 * math.sin(x * .33 + .6) + .35 * math.sin(x * 1.1 + t * 3)
        for (y, z) in PR:
            curl = max(0, z - 4.5) / 3.5
            V.append((x, y * (1 + .1 * curl) + fwd * (z / 8), z * h + .15 * math.sin(y * 2 + x * .7 + t * 4) * (z / 8)))
    return V
F = []; P_ = len(PR)
for i in range(NX - 1):
    for j in range(P_):
        a = i * P_ + j; b = i * P_ + (j + 1) % P_; F.append((a, (i + 1) * P_ + j, (i + 1) * P_ + (j + 1) % P_, b))
WAVE = obj_from('wave', (wave_verts(0), [], F), M_MOL, ink=.06, smooth=True)
_uv = WAVE.data.uv_layers.new()
for poly in WAVE.data.polygons:
    for li in poly.loop_indices:
        vi = WAVE.data.loops[li].vertex_index; i, j = divmod(vi, P_)
        _uv.data[li].uv = (i / (NX - 1) * 3, j / P_)
# molasses spreading on the street ahead of the wave
SP = bmesh.new(); ring = []
for i in range(60):
    u = i / 59; x = -13 + 26 * u; fr = 3.2 + .9 * math.sin(x * .9) + .6 * math.sin(x * 2.3 + 1)
    ring.append(SP.verts.new((x, fr, .05)))
for i in range(59, -1, -1):
    u = i / 59; ring.append(SP.verts.new((-13 + 26 * u, -.5, .05)))
SP.faces.new(ring); SPREAD = obj_from('spread', SP, M_POOL, ink=.03, smooth=True)

# ———————————————————————————————— debris: a wagon going under, planks, barrels, molasses spray
def wheel_bm(bm, c, r=.55, rx=0):
    pass
WAG = Boxes(); WAG.add((0, 0, .9), (1.6, 3.0, .7)); WAG.add((0, 1.5, 1.5), (1.6, .12, .9)); WAG.add((0, -1.5, 1.5), (1.6, .12, .9))
for sx in (-1, 1): WAG.add((sx * .8, 0, 1.5), (.12, 3.0, .9))
WAGON = WAG.obj('wagon', M_WOOD, ink=.04)
WHEELS = []
for sx in (-1, 1):
    for sy in (-1, 1):
        bm = bmesh.new(); bmesh.ops.create_cone(bm, cap_ends=True, segments=20, radius1=.55, radius2=.55, depth=.1)
        for v in bm.verts: v.co.rotate(Euler((0, math.pi / 2, 0)))
        w = obj_from('wheel', bm, M_DARKWOOD, ink=.03); w.parent = WAGON; w.location = (sx * .92, sy * 1.0, .55); WHEELS.append(w)
PL = []
for i in range(7):
    b = Boxes(); b.add((0, 0, 0), (rnd.uniform(1.6, 2.6), .28, .07)); PL.append(b.obj('plank', M_WOOD, ink=.025))
BARRELS = []
for i in range(2):
    bm = bmesh.new(); bmesh.ops.create_cone(bm, cap_ends=True, segments=16, radius1=.42, radius2=.42, depth=1.1); BARRELS.append(obj_from('barrel', bm, M_WOOD, ink=.03))
DROPS = []
for i in range(36):
    bm = bmesh.new(); bmesh.ops.create_uvsphere(bm, u_segments=10, v_segments=8, radius=1); d = obj_from('drop', bm, M_MOL, ink=0, smooth=True); DROPS.append((d, rnd.random(), rnd.uniform(-9, 9), rnd.uniform(.08, .28)))

# ———————————————————————————————— characters: Cast Kit cards (PNG sequences with alpha)
def card(name, folder, height_m, frac_feet=870 / 900, px=(600, 900), person_px=806):
    hm = height_m * px[1] / person_px; wm = hm * px[0] / px[1]
    me = bpy.data.meshes.new(name); z0 = -hm * (1 - frac_feet)
    me.from_pydata([(-wm / 2, 0, z0), (wm / 2, 0, z0), (wm / 2, 0, z0 + hm), (-wm / 2, 0, z0 + hm)], [], [(0, 1, 2, 3)])
    uv = me.uv_layers.new();
    for li, co in zip(range(4), [(0, 0), (1, 0), (1, 1), (0, 1)]): uv.data[li].uv = co
    o = bpy.data.objects.new(name, me); sc.collection.objects.link(o)
    m = bpy.data.materials.new(name); m.use_nodes = True; nt = m.node_tree; N_ = nt.nodes; N_.clear()
    out = N_.new('ShaderNodeOutputMaterial'); it = N_.new('ShaderNodeTexImage'); em = N_.new('ShaderNodeEmission'); tr = N_.new('ShaderNodeBsdfTransparent'); mx = N_.new('ShaderNodeMixShader')
    link(nt, it.outputs['Color'], em.inputs['Color']); link(nt, it.outputs['Alpha'], mx.inputs[0]); link(nt, tr.outputs[0], mx.inputs[1]); link(nt, em.outputs[0], mx.inputs[2]); link(nt, mx.outputs[0], out.inputs[0])
    imgs = [bpy.data.images.load(os.path.join(HERE, 'cards', folder, f)) for f in sorted(os.listdir(os.path.join(HERE, 'cards', folder)))]
    o.data.materials.append(m); o['imgnode'] = it.name
    # contact shadow on the ground
    bm = bmesh.new(); bmesh.ops.create_circle(bm, cap_ends=True, segments=24, radius=1)
    for v in bm.verts: v.co = Vector((v.co.x * .45, v.co.y * .22, .02))
    sh = obj_from(name + '_sh', bm, toon('sh', (.12, .12, .14), fogk=.02), ink=0)
    return o, it, imgs, sh
MAN = card('worker', 'worker', 1.78); WOM = card('woman', 'woman', 1.66); HORSE = card('horse', 'horse', 2.6, person_px=520)
LIP = []
for i in range(30):
    bm = bmesh.new(); bmesh.ops.create_uvsphere(bm, u_segments=10, v_segments=10, radius=1)
    for v in bm.verts:   # teardrop hanging down from its top
        z = v.co.z; v.co.x *= .5 + .5 * (1 - (z + 1) / 2) ** .5; v.co.y *= .5 + .5 * (1 - (z + 1) / 2) ** .5; v.co.z = -(1 - z) * 1.0
    LIP.append((obj_from('lipdrop', bm, M_MOL, ink=.02, smooth=True), rnd.random(), rnd.uniform(.5, 1.6)))
CROWN = []
for i in range(14):
    bm = bmesh.new(); bmesh.ops.create_cone(bm, cap_ends=True, segments=8, radius1=.35, radius2=.05, depth=1)
    CROWN.append((obj_from('crown', bm, M_MOL, ink=.02, smooth=True), rnd.uniform(-11, 11), rnd.random()))

# ———————————————————————————————— camera, lights, render settings
cam_d = bpy.data.cameras.new('cam'); cam_d.lens = 19; cam_d.sensor_width = 36
cam_d.dof.use_dof = True; cam_d.dof.aperture_fstop = 2.2
CAM = bpy.data.objects.new('cam', cam_d); sc.collection.objects.link(CAM); sc.camera = CAM
sun_d = bpy.data.lights.new('sun', 'SUN'); sun_d.energy = 2.6; sun_d.angle = 0; sun_d.shadow_filter_radius = 0; sun_d.shadow_maximum_resolution = .02; sun_d.specular_factor = 4
sun = bpy.data.objects.new('sun', sun_d); sc.collection.objects.link(sun); sun.rotation_euler = (math.radians(52), 0, math.radians(-38))
amb = bpy.data.lights.new('amber', 'AREA'); amb.energy = 900; amb.color = (1, .55, .15); amb.size = 14
AMB = bpy.data.objects.new('amber', amb); sc.collection.objects.link(AMB)
w = bpy.data.worlds.new('w'); sc.world = w; w.use_nodes = True
_wn = w.node_tree.nodes; _tc = _wn.new('ShaderNodeTexCoord'); _sep = _wn.new('ShaderNodeSeparateXYZ'); _cr = _wn.new('ShaderNodeValToRGB')
w.node_tree.links.new(_tc.outputs['Window'], _sep.inputs[0]); w.node_tree.links.new(_sep.outputs['Y'], _cr.inputs[0])
_cr.color_ramp.elements[0].position = .45; _cr.color_ramp.elements[0].color = (*FOG, 1); _cr.color_ramp.elements[1].position = 1; _cr.color_ramp.elements[1].color = (.16, .17, .2, 1)
_nz = _wn.new('ShaderNodeTexNoise'); _nz.inputs['Scale'].default_value = 2.2; _nz.inputs['Detail'].default_value = 4; _nz.inputs['Roughness'].default_value = .55
w.node_tree.links.new(_tc.outputs['Generated'], _nz.inputs['Vector'])
_cc = _wn.new('ShaderNodeValToRGB'); _cc.color_ramp.interpolation = 'CONSTANT'; _e = _cc.color_ramp.elements; _e[0].position = 0; _e[0].color = (.8, .8, .82, 1); _e[1].position = .5; _e[1].color = (1, 1, 1, 1); _x = _e.new(.62); _x.color = (1.18, 1.16, 1.12, 1)
w.node_tree.links.new(_nz.outputs['Fac'], _cc.inputs[0]); _mm = _wn.new('ShaderNodeVectorMath'); _mm.operation = 'MULTIPLY'
w.node_tree.links.new(_cr.outputs[0], _mm.inputs[0]); w.node_tree.links.new(_cc.outputs[0], _mm.inputs[1]); w.node_tree.links.new(_mm.outputs[0], _wn['Background'].inputs[0]); w.node_tree.nodes['Background'].inputs[1].default_value = .75
sc.render.engine = 'BLENDER_EEVEE'; sc.eevee.taa_render_samples = 12; sc.eevee.use_raytracing = False; sc.eevee.use_fast_gi = False; sc.eevee.shadow_ray_count = 1; sc.eevee.shadow_step_count = 1
sc.view_settings.view_transform = 'Standard'; sc.view_settings.look = 'None'
sc.render.resolution_x, sc.render.resolution_y = int(1080 * RES), int(1920 * RES)
sc.render.fps = FPS; sc.frame_start, sc.frame_end = 1, N

def update(scene, *a):
    t = (scene.frame_current - 1) / FPS; k = t / (N / FPS)
    wy = -13 + 4.8 * t                                     # the wave gains on them
    me = WAVE.data; vs = wave_verts(t)
    for v, co in zip(me.vertices, vs): v.co = (co[0] - .5, co[1] + wy, co[2])
    WAVE.rotation_euler = (0, 0, .62); WAVE.location = (0, (wy) * (1 - math.cos(.32)) * 0, 0)
    me.update()
    wv = M_MOL.node_tree.nodes[M_MOL['streak']]; wv.inputs['Phase Offset'].default_value = -t * 5
    SPREAD.location = (-.5, wy + 3.6, 0); SPREAD.scale = (1, 1 + .5 * k, 1)
    AMB.location = (0, wy + 6, 3); AMB.rotation_euler = (math.radians(-80), 0, 0)
    # wagon lifted and tipped into the face of the wave
    WAGON.location = (-4.8, wy + 3.4 + .4 * t, .2 + 2.2 * k * k); WAGON.rotation_euler = (-.5 * k, .25, .5 + .9 * k)
    for i, p in enumerate(PL):
        a = (t * .7 + i * .143) % 1; x0 = -7 + i * 2.2
        p.location = (x0 + a * 1.5, wy + 3.5 + a * 9, 6.5 + a * 4 - 11 * a * a); p.rotation_euler = (t * 3 + i, i * 1.3 + t * 2, t * 2.4 + i * 2)
    for i, b in enumerate(BARRELS):
        a = (t * .55 + i * .5) % 1; b.location = (-2 + i * 5, wy + 4 + a * 7, 4 + a * 3 - 8 * a * a); b.rotation_euler = (t * 2 + i, t * 1.5, 0)
    for d, ph, x0, r in DROPS:
        a = (t * .9 + ph) % 1; d.location = (x0 + (x0 * .05) * a, wy + 3.8 + a * 7.5, 7.6 + a * 4.5 - 13 * a * a)
        sp = max(.0, 1 - a); d.scale = (r, r * (1 + 1.6 * a), r)
        d.rotation_euler = (math.atan2(4.5 - 26 * a, 7.5), 0, 0)
    # people + camera: the camera backs away slower than they run, so they grow; the wave grows faster
    cy = 8.2 + 2.6 * t
    MAN[0].location = (-.55 + .12 * math.sin(t * 5), cy - 2.9 + .9 * t, 0); WOM[0].location = (1.15, cy - 8.4 + 1.9 * t, 0)
    M_COB.node_tree.nodes['wavey'].outputs[0].default_value = wy + 3.6
    # drips hanging from the lip (lip tip ≈ local (y 6.0, z 5.6·h)), stretching and swinging
    import math as _m
    rz = WAVE.rotation_euler.z
    for n, (d, ph, ln) in enumerate(LIP):
        x = -11 + 22 * n / (len(LIP) - 1); h = 1.42 * (1 - .28 * (x / 13) ** 2) * (1 - .55 * max(0, (-x - 2) / 11) ** 1.5) * (.92 + .1 * min(1, t / 2))
        ly = 7.1 + .9 * _m.sin(x * .33 + .6) * .7; lz = 5.0 * h
        px, py = x - .5, ly + wy; cx = px * _m.cos(rz) - py * _m.sin(rz); cy2 = px * _m.sin(rz) + py * _m.cos(rz)
        a = (t * .8 + ph) % 1; L = ln * (.4 + 1.2 * a)
        d.location = (cx, cy2, lz); d.scale = (.22, .22, L); d.rotation_euler = (.15 * _m.sin(t * 6 + n), 0, 0)
    for d, x0, ph in CROWN:
        a = (t * 1.3 + ph) % 1; px, py = x0, wy + 4.4 + a * .8; cx = px * _m.cos(rz) - py * _m.sin(rz); cy2 = px * _m.sin(rz) + py * _m.cos(rz)
        d.location = (cx, cy2, .2); d.scale = (.5 + .4 * a, .5 + .4 * a, (1.6 + 1.4 * ph) * _m.sin(a * _m.pi)); d.rotation_euler = (.3 * (ph - .5), .3 * (x0 / 11), 0)
    HORSE[0].location = (WAGON.location.x + 1.2, WAGON.location.y + 2.6, WAGON.location.z - .1)
    for (o, it, imgs, sh) in (MAN, WOM, HORSE):
        it.image = imgs[min(len(imgs) - 1, scene.frame_current - 1)]
        sh.location = (o.location.x, o.location.y, .02)
    sh_x = .05 * math.sin(t * 2.7) + .03 * math.sin(t * 7.1); sh_z = .04 * math.sin(t * 3.3 + 1)
    CAM.location = (-.4 + sh_x, cy, 1.05 + sh_z)
    look = Vector((-.4, cy - 20, 6.6)); d = look - CAM.location
    CAM.rotation_euler = d.to_track_quat('-Z', 'Y').to_euler(); CAM.rotation_euler.rotate_axis('Z', -.075 + .015 * math.sin(t * 2))
    for (o, *_ ) in (MAN, WOM, HORSE):
        v = CAM.location - o.location; o.rotation_euler = (0, 0, math.atan2(v.x, v.y) * -1 + 0)
        o.rotation_euler = (0, 0, -math.atan2(v.x, v.y))
    cam_d.dof.focus_object = MAN[0]

bpy.app.handlers.frame_change_pre.append(update)
OUT = os.path.join(HERE, 'out'); os.makedirs(OUT, exist_ok=True)
if MODE == 'still':
    sc.frame_set(14); sc.render.filepath = os.path.join(OUT, 'still.png'); bpy.ops.render.render(write_still=True)
else:
    sc.render.filepath = os.path.join(OUT, 'f_'); bpy.ops.render.render(animation=True)
print('DONE')
