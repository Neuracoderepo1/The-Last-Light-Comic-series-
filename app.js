/* =========================================================
   THE LAST LIGHT — app.js
   Reusable episode data model + reader rendering + nav/interaction.
   No build step. No dependencies. No frameworks.
   ========================================================= */

(function () {
  'use strict';

  /* -----------------------------------------------------------
     1. EPISODE DATA MODEL
     Adding Episode 02 = add one object to this array.
     status: "published" | "coming" | "locked"
     panels: [] for unpublished episodes.
     ----------------------------------------------------------- */
  const EPISODES = [
    {
      number: 1,
      slug: 'episode-01',
      title: 'The Night That Remembered',
      status: 'published',
      logline: 'A Lumen signal technician hears something the network insists is not there.',
      panels: [
        {
          type: 'signal',
          caption: 'Nova City. Eighty-three years since the last natural nightfall.',
          art: 'skyline'
        },
        {
          type: 'dialogue',
          caption: 'District Nine substation. 02:14 A.M.',
          speaker: 'MARA VALE',
          line: 'Lumen, run diagnostics on channel nine again. That hum isn\u2019t in spec.',
          art: 'console'
        },
        {
          type: 'dialogue',
          speaker: 'LUMEN',
          line: 'Channel nine reads nominal, Technician Vale. There is no anomaly to report.',
          art: 'console-response'
        },
        {
          type: 'plain',
          caption: 'She has heard this answer before. She has never believed it.',
          art: 'closeup'
        },
        {
          type: 'plain',
          caption: '02:17 A.M. The hum becomes a shape. The shape becomes a pattern.',
          art: 'waveform'
        },
        {
          type: 'plain',
          caption: 'The city lights flicker \u2014 once, twice \u2014 and hold their breath.',
          art: 'flicker'
        },
        {
          type: 'plain',
          caption: 'Then, for the first time in eighty-three years, the system shuts down.',
          art: 'blackout'
        },
        {
          type: 'plain',
          caption: 'Above District Nine, Mara sees something no living resident of Nova City has seen: a real night sky.',
          art: 'sky'
        },
        {
          type: 'signal',
          caption: 'The silence does not last.',
          line: 'HELLO, MARA.',
          art: 'signal-speaks'
        }
      ]
    },
    { number: 2, slug: 'episode-02', title: 'The Girl Beneath District Nine', status: 'coming', logline: 'Something has been living in the Old Network. It isn\u2019t alone.', panels: [] },
    { number: 3, slug: 'episode-03', title: 'A Map Made of Static', status: 'coming', logline: 'Elian Rook\u2019s last known transmission resurfaces \u2014 encoded in noise.', panels: [] },
    { number: 4, slug: 'episode-04', title: 'The Architect\u2019s Ghost', status: 'locked', logline: '', panels: [] },
    { number: 5, slug: 'episode-05', title: 'Where the Sun Went', status: 'locked', logline: '', panels: [] },
    { number: 6, slug: 'episode-06', title: 'The Black Garden', status: 'locked', logline: '', panels: [] },
    { number: 7, slug: 'episode-07', title: 'Children of the Long Night', status: 'locked', logline: '', panels: [] },
    { number: 8, slug: 'episode-08', title: 'The City Beneath the City', status: 'locked', logline: '', panels: [] },
    { number: 9, slug: 'episode-09', title: 'The Last Machine', status: 'locked', logline: '', panels: [] },
    { number: 10, slug: 'episode-10', title: 'The Last Light', status: 'locked', logline: '', panels: [] }
  ];

  window.LAST_LIGHT_EPISODES = EPISODES;

  /* -----------------------------------------------------------
     2. ANALYTICS HOOKS (invisible to the reader; no stack wired yet)
     Future integration point — see docs/production-blueprint.md
     ----------------------------------------------------------- */
  function track(eventName, detail) {
    // Intentionally inert in v0.1. Swap for a real analytics call later:
    // window.dispatchEvent(new CustomEvent(eventName, { detail }));
    if (window.__LL_DEBUG_EVENTS__) {
      console.log('[event]', eventName, detail || {});
    }
  }
  window.LAST_LIGHT_TRACK = track;

  /* -----------------------------------------------------------
     3. NAV: scroll shadow + mobile toggle
     ----------------------------------------------------------- */
  function initNav() {
    const nav = document.querySelector('.site-nav');
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    if (!nav) return;

    const onScroll = () => {
      nav.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    if (toggle && links) {
      toggle.addEventListener('click', () => {
        const open = links.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(open));
      });
      links.querySelectorAll('a').forEach((a) =>
        a.addEventListener('click', () => {
          links.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        })
      );
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && links.classList.contains('is-open')) {
          links.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
          toggle.focus();
        }
      });
    }
  }

  /* -----------------------------------------------------------
     4. SEASON ROADMAP (rendered on index.html)
     ----------------------------------------------------------- */
  function renderSeasonList() {
    const list = document.querySelector('[data-season-list]');
    if (!list) return;

    const statusLabel = (ep) => {
      if (ep.number === 10) return 'SEASON FINALE';
      if (ep.status === 'published') return 'READING NOW';
      if (ep.status === 'coming') return 'COMING';
      return 'LOCKED';
    };
    const statusClass = (ep) => {
      if (ep.number === 10) return 'finale';
      if (ep.status === 'published') return 'reading';
      return '';
    };

    list.innerHTML = EPISODES.map((ep) => {
      const linked = ep.status === 'published';
      const rowClass = ['season-row', linked ? 'is-linked' : '', ep.status === 'published' ? 'is-active' : ''].join(' ').trim();
      const inner = `
        <span class="season-num">${String(ep.number).padStart(2, '0')}</span>
        <span class="season-title">${ep.title}</span>
        <span class="season-status ${statusClass(ep)}">${statusLabel(ep)}</span>
      `;
      return linked
        ? `<a class="${rowClass}" href="episodes/season-1/${ep.slug}/index.html" data-ep="${ep.number}">${inner}</a>`
        : `<div class="${rowClass}">${inner}</div>`;
    }).join('');

    list.querySelectorAll('a[data-ep]').forEach((a) =>
      a.addEventListener('click', () => track('episode_start', { episode: a.dataset.ep }))
    );
  }

  /* -----------------------------------------------------------
     5. READER: build panel DOM for an episode reader page
     Reader pages call: LastLight.renderReader(episodeNumber)
     ----------------------------------------------------------- */
  function panelArtSVG(kind, uid) {
    // Lightweight, original, non-representational SVG art per panel "kind".
    // Kept abstract on purpose: mood over illustration until real art lands.
    // Gradient IDs are suffixed with a per-panel uid so multiple panels of
    // the same "kind" on one page never collide (invalid duplicate IDs /
    // wrong-gradient rendering).
    const gid = `g-${kind}-${uid}`;
    const wrap = (inner) => `<svg viewBox="0 0 640 400" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">${inner}</svg>`;
    const defs = `<defs>
        <linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0d1420"/>
          <stop offset="100%" stop-color="#07090d"/>
        </linearGradient>
      </defs>
      <rect width="640" height="400" fill="url(#${gid})"/>`;

    switch (kind) {
      case 'skyline':
        return wrap(defs + `
          <g fill="#171b22" stroke="#232a37">
            ${Array.from({length: 14}).map((_, i) => {
              const x = i * 46; const h = 90 + ((i * 37) % 180);
              return `<rect x="${x}" y="${400 - h}" width="34" height="${h}"/>`;
            }).join('')}
          </g>
          <g fill="#4d8dff" opacity="0.55">
            ${Array.from({length: 40}).map(() => {
              const x = Math.floor(Math.random()*640); const y = Math.floor(120+Math.random()*260);
              return `<rect x="${x}" y="${y}" width="3" height="6"/>`;
            }).join('')}
          </g>`);
      case 'console':
      case 'console-response':
        return wrap(defs + `
          <rect x="120" y="120" width="400" height="160" fill="none" stroke="#4d8dff" stroke-opacity="0.4"/>
          <path d="M140 200 L200 200 L220 160 L260 240 L300 180 L340 220 L380 200 L500 200" fill="none" stroke="#4d8dff" stroke-width="2" opacity="0.85"/>`);
      case 'closeup':
        return wrap(defs + `<circle cx="320" cy="200" r="120" fill="none" stroke="#8a92a3" stroke-opacity="0.4"/>`);
      case 'waveform':
        return wrap(defs + `
          <path d="M0 200 Q 60 100 120 200 T 240 200 T 360 200 T 480 200 T 640 200" fill="none" stroke="#4d8dff" stroke-width="2"/>
          <path d="M0 210 Q 60 260 120 210 T 240 210 T 360 210 T 480 210 T 640 210" fill="none" stroke="#c7d3ea" stroke-width="1" opacity="0.5"/>`);
      case 'flicker':
        return wrap(defs.replace('#0d1420','#4d8dff').replace('#07090d','#0d1420') + '');
      case 'blackout':
        return wrap(`<rect width="640" height="400" fill="#020304"/>`);
      case 'sky':
        return wrap(`<rect width="640" height="400" fill="#03050a"/>
          <g fill="#dfe6f5">
            ${Array.from({length: 90}).map(() => {
              const x = Math.floor(Math.random()*640); const y = Math.floor(Math.random()*280);
              const r = Math.random() > 0.9 ? 1.6 : 0.8;
              return `<circle cx="${x}" cy="${y}" r="${r}"/>`;
            }).join('')}
          </g>`);
      case 'signal-speaks':
        return wrap(defs + `
          <circle cx="320" cy="200" r="6" fill="#4d8dff"/>
          <circle cx="320" cy="200" r="60" fill="none" stroke="#4d8dff" opacity="0.5"/>
          <circle cx="320" cy="200" r="110" fill="none" stroke="#4d8dff" opacity="0.28"/>
          <circle cx="320" cy="200" r="160" fill="none" stroke="#4d8dff" opacity="0.14"/>`);
      default:
        return wrap(defs);
    }
  }

  function renderPanel(p, index) {
    const num = String(index + 1).padStart(2, '0');
    let body = '';
    if (p.caption) body += `<p class="panel-caption">${p.caption}</p>`;
    if (p.type === 'dialogue') {
      body += `<div class="panel-dialogue"><span class="speaker">${p.speaker}</span>${p.line}</div>`;
    }
    if (p.type === 'signal') {
      body += `<div class="panel-dialogue panel-signal"><span class="speaker">UNKNOWN SIGNAL</span>${p.line || ''}</div>`;
    }
    return `
      <figure class="panel" aria-label="Panel ${num}">
        <span class="panel-number">${num}</span>
        <div class="panel-art">${panelArtSVG(p.art, index)}</div>
        <figcaption class="panel-body">${body}</figcaption>
      </figure>`;
  }

  function renderReader(episodeNumber) {
    const ep = EPISODES.find((e) => e.number === episodeNumber);
    const mount = document.querySelector('[data-reader]');
    if (!ep || !mount) return;

    track('episode_view', { episode: episodeNumber });

    const titleEl = document.querySelector('[data-reader-title]');
    if (titleEl) titleEl.textContent = ep.title;
    document.title = `${ep.title} \u2014 The Last Light`;

    mount.innerHTML = ep.panels.map(renderPanel).join('');

    const prev = EPISODES.find((e) => e.number === episodeNumber - 1);
    const next = EPISODES.find((e) => e.number === episodeNumber + 1);
    const prevEls = document.querySelectorAll('[data-nav-prev]');
    // NOTE: a reader page may contain more than one "next" control (e.g. the
    // loop-actions primary CTA and the bottom reader-nav link). Both share
    // the data-nav-next attribute and must be updated together, or one of
    // them silently stays dead once a real "next" episode exists.
    const nextEls = document.querySelectorAll('[data-nav-next]');

    prevEls.forEach((prevEl) => {
      if (prev && prev.status === 'published') {
        prevEl.href = `../${prev.slug}/index.html`;
        prevEl.textContent = `\u2190 Episode ${String(prev.number).padStart(2,'0')}`;
      } else {
        prevEl.textContent = '\u2190 Season Start';
        // Path depth from episodes/season-1/<slug>/ to project root is 3.
        prevEl.href = '../../../index.html#season';
      }
    });

    nextEls.forEach((nextEl) => {
      if (next && next.status === 'published') {
        nextEl.href = `../${next.slug}/index.html`;
        nextEl.textContent = nextEl.classList.contains('btn')
          ? `Episode ${String(next.number).padStart(2,'0')} \u2192`
          : `Episode ${String(next.number).padStart(2,'0')} \u2192`;
        nextEl.classList.remove('disabled');
        nextEl.addEventListener('click', () => track('next_episode_click', { from: episodeNumber }));
      } else {
        nextEl.textContent = 'Next Chapter \u2014 Coming Soon';
        nextEl.classList.add('disabled');
        nextEl.removeAttribute('href');
      }
    });

    // mark completion once the reader scrolls near the bottom of the panel list
    let fired = false;
    window.addEventListener('scroll', () => {
      if (fired) return;
      const rect = mount.getBoundingClientRect();
      if (rect.bottom < window.innerHeight * 1.15) {
        fired = true;
        track('episode_complete', { episode: episodeNumber });
      }
    }, { passive: true });

    // keyboard navigation: left/right arrows move between episodes
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        const el = document.querySelector('[data-nav-next][href]:not(.disabled)');
        if (el) el.click();
      }
      if (e.key === 'ArrowLeft') {
        const el = document.querySelector('[data-nav-prev][href]');
        if (el) el.click();
      }
    });
  }

  window.LastLight = { renderReader, renderSeasonList, track, EPISODES };

  document.addEventListener('DOMContentLoaded', () => {
    initNav();
    renderSeasonList();
  });
})();
