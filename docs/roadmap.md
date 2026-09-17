# The Last Light — Roadmap

## v0.1 (current)
- [x] Landing page, nav, hero, characters, world, season roadmap sections
- [x] Data-driven episode model (`EPISODES` array in `app.js`)
- [x] Episode 01 published with 9 panels, abstract SVG placeholder art
- [x] Accessible reader: skip link, `aria-live`, keyboard nav, reduced-motion support
- [x] `manifest.webmanifest` + `favicon.svg`

## v0.2 (next)
- [ ] Episode 02 — "The Girl Beneath District Nine": outline → panels → publish
- [ ] Episode 03 — "A Map Made of Static": outline → panels → publish
- [ ] Replace abstract SVG panel art with real illustrated/AI-assisted assets per `/docs/art-direction.md`
- [ ] Set real production `<link rel="canonical">` domain across all pages
- [ ] Wire real analytics behind the existing `LAST_LIGHT_TRACK` hook (currently inert by design)

## v0.3+
- [ ] Split `EPISODES` into per-episode data files if the array grows unwieldy or art assets get embedded
- [ ] Sanitize any user-facing or CMS-editable panel content before it reaches `innerHTML` (currently safe — all panel content is author-authored)
- [ ] Episodes 04–10: outline, script, produce in order as canon locks in from earlier episodes

## Non-goals (for now)
- No build step / framework migration until content volume genuinely requires it
- No CMS until there's a second content contributor
