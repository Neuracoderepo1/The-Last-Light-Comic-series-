# The Last Light

A premium serialized original story universe delivered as a lightweight static digital comic. No build step, no framework, no server required.

> When the last light goes out, the story begins.

## Overview

The Last Light is a season-based digital comic built as a lightweight static site.

Eighty-three years since the last natural nightfall, a Lumen signal technician hears something the network insists is not there.

## Story

Season One, Episode 01 — *The Night That Remembered*: District Nine signal technician Mara Vale keeps flagging an anomaly Lumen keeps denying. Then, for the first time in eighty-three years, the lights go out.

## Technology

- HTML, CSS, vanilla JavaScript, inline SVG
- Single reusable reader engine (`app.js`) — every episode is data, not code
- No build tooling
- No dependencies
- Static hosting compatible

## Project Structure

```text
index.html                          Landing page
app.js                              Reader engine + episode data
styles.css                          Site-wide design system
manifest.webmanifest                PWA manifest
favicon.svg                         Site favicon

episodes/season-1/episode-XX/       One folder per episode
  index.html                        Reader page
  README.md                         Production tracking document

assets/                             Artwork and production assets
  art/season-1/episode-01/         Episode artwork
  characters/                       Character assets
  locations/                        Location assets
  icons/                            Interface icons
  logos/                            Branding assets
  social/                           Social/media assets
  textures/                         Texture assets

docs/                               Production and universe documentation
  art-direction.md                 Palette, tone, panel-art pipeline, naming rules
  characters.md                    Character reference
  midjourney-prompts.md            Episode artwork prompt set
  production.md                    Production notes
  season-01.md                     Season roadmap and publication status
  universe.md                      Universe reference

universe/                           Locked story canon
  story-bible.md                    Characters, world chain, canon, open threads

robots.txt                           Search-engine crawler directives
sitemap.xml                          Search-engine sitemap