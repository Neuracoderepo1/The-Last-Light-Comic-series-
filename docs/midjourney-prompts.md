# Episode 01 — Midjourney Prompts

Built directly from `docs/art-direction.md` and the storyboard in `docs/season-01.md`.
Use Midjourney v6.1 (or v7 if available) for prompt adherence.

## Workflow for consistency

1. **Generate Mara and Nova City reference sheets first**, before any story panel:
   - Mara reference: base prompt + "character reference sheet, front and three-quarter
     view, neutral pose, technician uniform, plain background" — pick your single best
     result as the `--cref` source for every panel she appears in (P02–P05, P08–P09).
   - Nova City reference: base prompt + "wide establishing shot of the skyline, no
     characters" — use as `--sref` (or a second `--cref` for the environment) on P01, P06, P07.
2. Once you have those two reference images uploaded to Midjourney, grab their image
   URLs and drop them into the `--cref` slots below (replace `<MARA_REF>` / `<CITY_REF>`).
3. Generate in story order (P01 → P09) — each panel's prompt already carries the base
   visual-language block, so drift should stay minimal even without `--cref`, but the
   reference images will tighten Mara's face/outfit and the skyline's geometry a lot.
4. `--cw 100` keeps face + outfit + pose all matched to the reference; drop to `--cw 50`
   if you want pose freedom but consistent face/outfit only.
5. Export at `--ar 16:9` for landscape panels (P01, P06, P07, P08) and `--ar 4:3` for the
   more intimate ones (P02–P05, P09) — matches the "scale tightens then expands" rhythm
   from the storyboard. Adjust to taste; the reader engine doesn't enforce a fixed ratio.

## Base block (every prompt starts with this)

```
premium cinematic science-fiction graphic novel illustration, restrained futuristic
architecture, not cyberpunk, cold nocturnal palette, deep blacks, moonlit blue-grey,
controlled artificial light, subtle filmic contrast, naturalistic human proportions,
editorial composition, strong environmental storytelling, no neon clichés, no
holograms, no embedded text, high-end animated-film concept-art rendering ::
```

---

### Panel 01 — Nova City establishing shot
```
[BASE BLOCK] extreme wide establishing shot of an enormous vertical futuristic city at
night, permanently illuminated, no visible stars, sky almost entirely obscured by
ambient light bleed, 83 years of continuous operation showing as weathered layered
retrofit infrastructure, beautiful but sterile and unnatural, cold blue-white
infrastructure light against near-black structure, no warm light --ar 16:9 --cref <CITY_REF> --cw 50
```

### Panel 02 — District Nine substation
```
[BASE BLOCK] medium-wide interior shot, industrial signal substation, worn metal and
concrete, exposed conduit, layered retrofit wiring, a solo technician at an analog-
feeling console lit by controlled directional institutional light, depth into the
substation behind her, utilitarian stenciled signage, 02:14 AM mood, quiet late-shift
routine --ar 4:3 --cref <MARA_REF> --cw 100
```

### Panel 03 — Mara at the console, Lumen responds
```
[BASE BLOCK] close medium shot over the shoulder of a signal technician at a console,
she is the visual subject, restrained cold-blue concentric ring / waveform motif
accompanying an unseen network's response, no dashboard, no face for the network, calm
and certain atmosphere contrasted with her skepticism --ar 4:3 --cref <MARA_REF> --cw 100
```

### Panel 04 — Mara, close-up
```
[BASE BLOCK] tight close-up on a tired, experienced technician's face, minimal
background, focus entirely on a expression of weary recognition rather than fear,
slightly higher contrast lighting isolating her from the room --ar 4:3 --cref <MARA_REF> --cw 100
```

### Panel 05 — The signal becomes a pattern
```
[BASE BLOCK] abstract macro composition, waveform and interference geometry, repeated
intentional-looking patterns emerging from ambient noise, cold blue signal motif
intensifying and becoming irregular, sense that randomness has become deliberate, no
characters required --ar 4:3 --cref <CITY_REF> --cw 30
```

### Panel 06 — The city flickers
```
[BASE BLOCK] extreme wide shot of the same vertical futuristic skyline as the opening
panel, now with irregular lighting failure across the cityscape, some towers dark, some
still lit, sense of an impossible event happening at massive scale, tense held-breath
atmosphere --ar 16:9 --cref <CITY_REF> --cw 60
```

### Panel 07 — Blackout
```
[BASE BLOCK] extremely minimal wide composition, the same city skyline now almost
entirely dark, near-total black negative space dominating the frame, only the faintest
residual structural silhouette visible, enormity conveyed through absence rather than
detail --ar 16:9 --cref <CITY_REF> --cw 30
```

### Panel 08 — The real night sky
```
[BASE BLOCK] wide shot looking up and out from a rooftop above an industrial
substation, a lone small technician silhouette anchoring the bottom of frame, a true
dense physically-vast starfield dominating the sky above her for the first time,
emotional climax, awe, dark sky with real depth and density of stars, not a generic
sparkle effect --ar 16:9 --cref <MARA_REF> --cw 50
```

### Panel 09 — Hello, Mara
```
[BASE BLOCK] tight intimate composition, contrast to the previous vast sky, a
concentric ring / signal motif similar to the network's language but colder and more
concentrated, closing in on frame, a technician present but the addressing presence
rendered only through abstraction and light, no monster, no explicit figure, mystery
and quiet intrusion --ar 4:3 --cref <MARA_REF> --cw 60
```

---

## After generating

1. Export each chosen result as WebP (or convert with the `pdf`/image tooling on hand).
2. Drop files into `assets/art/season-1/episode-01/panel-0N.webp`.
3. In `app.js`, add `image: "assets/art/season-1/episode-01/panel-0N.webp"` (and keep/
   update `artAlt` for the story-critical panels) to the matching panel object — the
   `resolveArtwork()` resolver already prefers `panel.image` over the procedural SVG,
   no other engine changes needed.
4. Send me the files (or their URLs) and I'll handle the crop/resize/optimization pass
   and commit them.
