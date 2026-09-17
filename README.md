# The Last Light

A serialized original story universe — no build step, no framework, no dependencies. Vanilla HTML/CSS/JS.

> When the last light goes out, the story begins.

## Structure
```
index.html                          Landing page
app.js                              Episode data model + reader/nav logic
styles.css                          Site-wide stylesheet
manifest.webmanifest                PWA manifest
favicon.svg                         Site favicon
episodes/season-1/episode-XX/       One folder per episode
  index.html                        Reader page (published episodes only)
  README.md                         Production tracking doc for that episode
universe/story-bible.md             Locked canon, characters, world chain, open threads
docs/roadmap.md                     Version roadmap
docs/art-direction.md               Palette, tone, panel-art pipeline, naming rules
docs/qa-checklist.md                Pre-publish checklist per episode
```

## Adding a new episode
1. Write the episode's `README.md` in `episodes/season-1/episode-XX/` (outline → full production doc).
2. Add the episode's panel content to the `EPISODES` array in `app.js`.
3. Set `status: "published"`.
4. Create `episodes/season-1/episode-XX/index.html` — copy `episode-01/index.html` and change the episode number passed to `LastLight.renderReader(N)` and the page `<title>`/meta description.
5. Update `/universe/story-bible.md` with any new canon.
6. Run through `/docs/qa-checklist.md` before publishing.

No other files need to change — the landing page's season list and the reader's prev/next navigation are both derived from the `EPISODES` array automatically.

## Local preview
No build step required. Serve the folder with any static server, e.g.:
```
npx serve .
```
or open `index.html` directly in a browser (note: `fetch`-based features, if added later, will require a server due to CORS on `file://`).
