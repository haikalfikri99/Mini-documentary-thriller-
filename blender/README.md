# blender/: the 3D world of the channel (Blender EEVEE)

- Blender 5.3 runs as a Python module (`pip install bpy==5.3.0`, Python 3.13). There is no GPU, so EEVEE runs on Mesa software OpenGL:
  `EGL_PLATFORM=surfaceless LIBGL_ALWAYS_SOFTWARE=1 MESA_GL_VERSION_OVERRIDE=4.6 MESA_GLSL_VERSION_OVERRIDE=460`.
  This needs the apt packages `libegl1 libegl-mesa0 libgl1-mesa-dri`.
- Look: cel shading (Shader to RGB, then a constant ramp), ink outlines (an inverted hull made with Solidify), distance haze in the shader, depth of field, and a grain/vignette pass in ffmpeg.
- Characters: Cast Kit cards (`toon/`), rendered to transparent PNG sequences with `toon/core/render/frames.mjs` and placed in the scene as camera-facing planes.
- Textures: CC0 from Poly Haven (`assets/tex`).
- Speed in this container: about 14 s/frame at half resolution. Final renders go to parallel GitHub Actions.

Render a test: `python s07/scene.py -- still 0.5`, or `-- anim 0.5`.
