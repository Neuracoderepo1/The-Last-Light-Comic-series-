# The Last Light

A premium static digital comic. Eighty-three years since the last natural
nightfall, a Lumen signal technician hears something the network insists is
not there.

## Overview

The Last Light is a season-based digital comic delivered as a lightweight
static site — no build step, no framework, no server required.

## Story

Season One, Episode 01 — *The Night That Remembered*: District Nine signal
technician Mara Vale keeps flagging an anomaly Lumen keeps denying. Then, for
the first time in eighty-three years, the lights go out.

## Technology

- HTML, CSS, vanilla JavaScript, inline SVG
- Single reusable reader engine (`app.js`) — every episode is data, not code
- No build tooling, no dependencies

## Project structure

```
index.html                                landing page
app.js                                     reader engine + episode data
styles.css                                 design system
episodes/season-1/episode-01/index.html    Episode 01 reader page
assets/                                    art, characters, locations, social
docs/                                      universe, characters, season roadmap, production notes
```

## Local development

No build step. Serve the directory with any static file server, e.g.:

```
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Adding an episode

1. Add an entry to the `EPISODES` array in `app.js` with a unique `slug`,
   `title`, `logline`, and `panels` (each panel needs a stable `id`).
2. Copy `episodes/season-1/episode-01/index.html` to the new episode's folder
   and change `data-episode="N"` to match.
3. Set `status: "published"` when the episode is ready to go live — the
   landing page season list and prev/next navigation update automatically.

## Adding artwork

Panels render procedural SVG by default. To use real artwork, add an `image`
path to a panel object (e.g. `assets/art/season-1/episode-01/panel-01.webp`)
— the reader engine prefers `image` over procedural art with no other
changes needed. Add an `artAlt` description for any panel that carries
plot-critical visual information.

## Deployment

Static hosting only — GitHub Pages, Netlify, Vercel, Cloudflare Pages, or any
ordinary web server. All internal links are relative, so the site works
whether it's deployed at a domain root or a nested path (e.g.
`example.com/the-last-light/`).

## Accessibility

Skip link, semantic landmarks, keyboard navigation (arrow keys move between
episodes, Escape closes the mobile menu), visible focus states, and
`prefers-reduced-motion` support are built in. Decorative panel art is
`aria-hidden`; plot-critical art can carry an `artAlt` description.

## Analytics hooks

`window.LAST_LIGHT_TRACK(eventName, detail)` is the single public hook fired
for `episode_view`, `episode_start`, `next_episode_click`, and
`episode_complete`. No analytics provider is wired in — attach one by
listening for these calls. Set `window.__LL_DEBUG_EVENTS__ = true` in a
console to see them logged during development.

## Roadmap

See `docs/season-01.md` for the full ten-episode roadmap and current
publication status.
