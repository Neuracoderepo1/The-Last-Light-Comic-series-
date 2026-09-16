# The Last Light — Art Direction

This is the visual bible. Any artwork generated for this series — by a human artist,
an image model, or a future contributor — should be checked against this document
before it's added to `assets/art/`. Consistency across panels matters more than any
single panel being individually impressive.

## Base prompt (prepend to every panel-specific prompt)

```
THE LAST LIGHT — VISUAL LANGUAGE
Premium cinematic science-fiction graphic novel illustration.
Restrained futuristic architecture, not cyberpunk.
Cold nocturnal palette: deep blacks, moonlit blue-grey, controlled artificial light.
Subtle filmic contrast, naturalistic human proportions, editorial composition.
Strong environmental storytelling over decoration.
No cyberpunk clichés. No excessive neon. No holograms unless specified.
No embedded text or typography in the image. No UI/dashboard overlays unless specified.
High-end animated-film concept-art rendering, not photobash, not generic AI-art sheen.
```

Append panel-specific direction (below) after this base block. Never let a single
panel prompt drift from the base — that's what causes "unrelated illustrations"
instead of one continuous world.

## World: Nova City

- Enormous, vertical, dense — the city fills the frame, humans do not.
- Advanced but not shiny-new: 83 years of uninterrupted operation should show
  as weathering, patched infrastructure, layered retrofits.
- Permanently illuminated. No visible stars, no true black sky, ever — until Panel 08.
- Mood: beautiful and sterile at once. Controlled. Slightly oppressive through
  *order*, not through grime or decay.
- Palette: cold blue-white light sources against near-black structure. Warm light
  is rare and should read as a deliberate exception when it appears.

## Lumen (the network)

- Never a chatbot avatar, never a face, never a generic glowing orb-AI cliché.
- Represented through the *environment responding* — light behavior, signal
  patterns, subtle geometric interference — rather than a character design.
- Feels omnipresent, precise, calm. Unsettling specifically because it never
  hesitates and never seems capable of being wrong.
- Visual motif: soft concentric rings / clean waveform geometry in cold blue
  (`#4d8dff` family — matches the existing procedural SVG signal motif).

## Mara Vale

- Signal technician, District Nine, ~12 years on the job. Reads as competent
  and tired, not frightened — recognition, not panic, is her default emotional key.
- Silhouette: practical work clothing, layered, utilitarian — a technician's
  uniform adapted for a permanently-lit city (no need for warm outerwear).
- Hair pulled back / functional, not styled for camera.
- Workstation: analog-feeling controls layered over old infrastructure, not a
  sleek dashboard — channel nine's hardware should look older than Lumen itself.
- Keep her silhouette, coloring, and workstation identical across every panel
  she appears in (P02–P05, P08–P09).

## District Nine

- Substation architecture: industrial, load-bearing, functional over decorative.
- Materials: worn metal, concrete, exposed conduit, layered retrofit wiring.
- Lighting: controlled, directional, institutional — not moody bar lighting.
- Signage: utilitarian stenciled type, not holographic.

## The Old Network

- Distinct from Lumen's clean geometry: older, asymmetric, *deliberately
  buried* rather than merely decayed. The visual cue is "hidden on purpose,"
  not "forgotten and rusty."
- Reserve this language for Episode 02 onward (District Nine's substation is
  Lumen-era; the Old Network hasn't visually appeared yet in Episode 01).

## Typography (unchanged — do not add fonts)

- **Cinzel** — titles, universe-level moments, chapter markers.
- **Inter** — interface, captions, dialogue, metadata.
- No text is ever baked into panel artwork; all narrative text is HTML/CSS.

## What to avoid, explicitly

Generic AI-art sheen, excessive neon, cyberpunk clichés, random glowing
interfaces, holograms without narrative reason, cartoonish proportions,
videogame-UI screenshots, visual clutter, and — most importantly — any panel
that could be dropped into a different sci-fi story without looking out of place.
