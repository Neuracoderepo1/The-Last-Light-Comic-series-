# Production Notes

- Reader engine: /app.js — data-driven, one EPISODES array, reusable across every episode.
- Artwork: procedural SVG today (deterministic, seeded per panel). Real artwork can replace
  any panel by adding `image: "assets/art/season-1/episode-XX/panel-NN.webp"` to that panel's
  data — no engine changes required.
- Adding an episode: append an object to EPISODES in app.js, create
  episodes/season-1/episode-XX/index.html (copy episode-01's page and change data-episode),
  set status to "published" when ready.
