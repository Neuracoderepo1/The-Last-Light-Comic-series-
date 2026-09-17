# QA Checklist — Episode Publication

Run before flipping an episode's `status` to `published` in `/app.js`.

- [ ] All panels render in reading order with correct panel numbers
- [ ] Dialogue/signal panels show correct speaker labels
- [ ] `data-reader-title` and `document.title` update to the episode title
- [ ] Prev-episode link resolves correctly (to the previous published episode, or to `#season` on the landing page if this is Episode 01)
- [ ] Next-episode link resolves correctly to the next published episode, or shows "Coming Soon" and is disabled if not yet published — check **all** `[data-nav-next]` elements on the page, not just one
- [ ] Keyboard arrow-key navigation (←/→) moves between episodes as expected, and does nothing on disabled links
- [ ] `episode_view`, `episode_complete`, and `next_episode_click` tracking events fire (check via `window.__LL_DEBUG_EVENTS__ = true` in console)
- [ ] Landing page season list shows correct status label (READING NOW / COMING / LOCKED / SEASON FINALE for episode 10)
- [ ] No duplicate SVG gradient IDs on the page (panel art gradients are scoped per-panel by index — confirm if panel count or art-kind reuse changes)
- [ ] Continuity facts match `/universe/story-bible.md` — update the bible first if this episode changes canon
- [ ] Mobile nav toggle opens/closes correctly; Escape key closes it
- [ ] `prefers-reduced-motion` respected (no motion-dependent content is load-bearing)

## Episode 01 — Passed
All items above verified against the v0.1 static build.
