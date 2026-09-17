# The Last Light — Art Direction

This is the visual bible for the series. Any artwork generated for this series — by a human artist, an image model, or a future contributor — should be checked against this document before it is added to `assets/art/`. Consistency across panels matters more than any single panel being individually impressive.

## Palette (locked)

Do not deviate from these palette tokens without updating `styles.css` and this document.

* Near-black `#07090d`
* Midnight `#0d1420`
* Graphite `#171b22`
* Muted silver `#8a92a3`
* Cold white `#f4f6fb`
* Pale blue `#c7d3ea`
* Moonlight `#dfe6f5`
* Accent: electric blue `#4d8dff` — used sparingly

## Tone

Cinematic, restrained, premium.

No neon-cyberpunk cliché. Cold blues and near-black dominate; warmth and organic tones are rare and meaningful.

Episode 01, Panel 08 — the first real night sky in 83 years — is a deliberate visual exception and should feel emotionally significant.

## Base Prompt

Prepend this visual language to every panel-specific image-generation prompt:

```text
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

Append panel-specific direction after this base block.

Never allow a single panel prompt to drift from the base visual language. Consistency is what makes the series feel like one continuous world rather than a collection of unrelated illustrations.

## World: Nova City

* Enormous, vertical, and dense — the city fills the frame; humans do not.
* Advanced but not shiny-new.
* Eighty-three years of uninterrupted operation should be visible through weathering, patched infrastructure, and layered retrofits.
* Permanently illuminated.
* No visible stars and no true black sky until Panel 08.
* Beautiful and sterile at once.
* Controlled and slightly oppressive through order, not grime or decay.
* Cold blue-white light sources should dominate against near-black structures.
* Warm light is rare and should read as a deliberate exception.

## Lumen — The Network

Lumen is never represented as a chatbot avatar, face, generic glowing orb, or conventional AI character.

Represent Lumen through the environment responding:

* Light behavior
* Signal patterns
* Subtle geometric interference
* Environmental changes
* Precise waveform behavior

Lumen feels omnipresent, precise, calm, and unsettling specifically because it never hesitates and never seems capable of being wrong.

### Lumen visual motif

Use soft concentric rings and clean waveform geometry in the electric-blue `#4d8dff` family.

This should remain visually compatible with the procedural SVG signal motif in `app.js`.

## Mara Vale

Mara is a District Nine signal technician with approximately 12 years on the job.

Her visual and emotional key is **competent and tired**, not frightened.

Recognition, not panic, should be her default emotional state.

### Silhouette

* Practical work clothing
* Layered and utilitarian
* Technician's uniform adapted to a permanently illuminated city
* No unnecessary fashion styling
* Hair pulled back / functional
* Naturalistic human proportions

### Workstation

Mara's workstation should feel analog and industrial:

* Older infrastructure
* Physical controls
* Layered retrofit hardware
* Practical instrumentation

It should not look like a sleek futuristic dashboard.

Channel Nine's hardware should visibly look older than Lumen itself.

### Continuity

Keep Mara's:

* Silhouette
* Coloring
* Clothing
* Hair
* Workstation
* General physical appearance

consistent across every panel in which she appears.

Episode 01 reference panels: P02–P05 and P08–P09.

## District Nine

District Nine's substation architecture is industrial, load-bearing, and functional over decorative.

### Materials

* Worn metal
* Concrete
* Exposed conduit
* Layered retrofit wiring
* Older technical infrastructure

### Lighting

Lighting should be:

* Controlled
* Directional
* Institutional
* Functional

Avoid atmospheric bar lighting or stylized nightclub lighting.

### Signage

Use utilitarian stenciled type where signage is required.

Do not use holographic signage.

## The Old Network

The Old Network must look visually distinct from Lumen's clean geometry.

Its visual language is:

* Older
* Asymmetric
* Deliberately buried
* Hidden rather than simply abandoned
* Purposefully concealed rather than merely rusty

The key visual idea is **"hidden on purpose," not "forgotten and decayed."**

Reserve this visual language for Episode 02 onward.

District Nine's substation in Episode 01 is Lumen-era infrastructure; the Old Network should not visually appear there.

## Panel Art Pipeline

### 1. Procedural placeholder

The current reader uses procedural abstract SVG artwork generated by `panelArtSVG()` in `app.js`.

The artwork is keyed by each panel's `art` value, such as:

* `skyline`
* `console`
* `blackout`
* `signal`

Procedural artwork is a functional production placeholder, not the final visual standard.

### 2. Final artwork

Final panel assets should be produced or commissioned at:

```text
/assets/art/season-1/episode-01/
```

Use a consistent naming convention such as:

```text
S01E01-P03.webp
```

Future seasons should follow the same structure:

```text
/assets/art/season-{season}/episode-{episode}/
```

### 3. Integration

When final artwork becomes available, replace the procedural panel-art output with an image element:

```html
<img src="/assets/art/season-1/episode-01/S01E01-P03.webp" alt="Descriptive panel artwork">
```

Keep the existing `.panel-art` container and preserve meaningful accessibility text.

The production reader's `resolveArtwork()` path should be preferred for integrating final artwork rather than duplicating rendering logic.

## Typography

Do not add additional fonts without updating the visual system.

* **Cinzel** — titles, universe-level moments, chapter markers
* **Inter** — interface, captions, dialogue, metadata

No text should ever be baked into panel artwork.

All narrative text belongs in HTML/CSS so that it remains accessible, editable, responsive, and localizable.

## Prompt Continuity Rules

Every panel prompt should specify only what changes from the established visual world.

Do not repeatedly reinvent:

* Architecture
* Lighting language
* Character appearance
* Clothing
* Color palette
* Camera language
* Material language

Instead, establish those through this document and use the panel prompt to describe the specific scene.

The objective is **visual continuity**, not maximum novelty from one image to the next.

## What to Avoid

Explicitly avoid:

* Generic AI-art sheen
* Excessive neon
* Cyberpunk clichés
* Random glowing interfaces
* Holograms without narrative reason
* Cartoonish proportions
* Videogame-UI screenshots
* Visual clutter
* Futuristic architecture that looks newly manufactured
* Unmotivated warm lighting
* Text embedded into artwork
* Inconsistent character designs
* Panels that visually belong to another science-fiction universe

Most importantly:

**No panel should be visually interchangeable with a different science-fiction story.**

Every finished image should feel unmistakably like **The Last Light**.
