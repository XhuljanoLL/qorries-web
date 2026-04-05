Grain background (post-hero sections)
=====================================

Place a looping film-grain (or similar) video at:

  public/grain-bg.mp4

The app loads `/grain-bg.mp4` without hard-coding paths in component logic beyond that filename.
If the file is missing, a dark fallback color shows and the video element is hidden on error.

Optional: add `public/grain-bg.webm` and switch the `<video>` `src` in `App.jsx` if you prefer WebM (single place to edit).
