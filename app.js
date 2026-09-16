/* =========================================================
   THE LAST LIGHT — app.js
   Production reader engine
   No build step. No dependencies. No frameworks.
   ========================================================= */

(function () {
  'use strict';

  /* =========================================================
     1. EPISODE DATA
     ========================================================= */

  const EPISODES = [
    {
      number: 1,
      slug: 'episode-01',
      title: 'The Night That Remembered',
      status: 'published',
      logline:
        'A Lumen signal technician hears something the network insists is not there.',

      panels: [
        {
          id: 'ep01-p01',
          type: 'signal',
          caption:
            'Nova City. Eighty-three years since the last natural nightfall.',
          art: 'skyline'
        },
        {
          id: 'ep01-p02',
          type: 'dialogue',
          caption: 'District Nine substation. 02:14 A.M.',
          speaker: 'MARA VALE',
          line:
            'Lumen, run diagnostics on channel nine again. That hum isn\u2019t in spec.',
          art: 'console'
        },
        {
          id: 'ep01-p03',
          type: 'dialogue',
          speaker: 'LUMEN',
          line:
            'Channel nine reads nominal, Technician Vale. There is no anomaly to report.',
          art: 'console-response'
        },
        {
          id: 'ep01-p04',
          type: 'plain',
          caption:
            'She has heard this answer before. She has never believed it.',
          art: 'closeup'
        },
        {
          id: 'ep01-p05',
          type: 'plain',
          caption:
            '02:17 A.M. The hum becomes a shape. The shape becomes a pattern.',
          art: 'waveform'
        },
        {
          id: 'ep01-p06',
          type: 'plain',
          caption:
            'The city lights flicker \u2014 once, twice \u2014 and hold their breath.',
          art: 'flicker'
        },
        {
          id: 'ep01-p07',
          type: 'plain',
          caption:
            'Then, for the first time in eighty-three years, the system shuts down.',
          art: 'blackout'
        },
        {
          id: 'ep01-p08',
          type: 'plain',
          caption:
            'Above District Nine, Mara sees something no living resident of Nova City has seen: a real night sky.',
          art: 'sky',
          artAlt: 'A dark sky scattered with real stars above the blacked-out city.'
        },
        {
          id: 'ep01-p09',
          type: 'signal',
          caption: 'The silence does not last.',
          line: 'HELLO, MARA.',
          art: 'signal-speaks'
        }
      ]
    },

    {
      number: 2,
      slug: 'episode-02',
      title: 'The Girl Beneath District Nine',
      status: 'coming',
      logline: 'Something has been living in the Old Network. It isn\u2019t alone.',
      panels: []
    },
    {
      number: 3,
      slug: 'episode-03',
      title: 'A Map Made of Static',
      status: 'coming',
      logline: 'Elian Rook\u2019s last known transmission resurfaces \u2014 encoded in noise.',
      panels: []
    },
    { number: 4, slug: 'episode-04', title: 'The Architect\u2019s Ghost', status: 'locked', logline: '', panels: [] },
    { number: 5, slug: 'episode-05', title: 'Where the Sun Went', status: 'locked', logline: '', panels: [] },
    { number: 6, slug: 'episode-06', title: 'The Black Garden', status: 'locked', logline: '', panels: [] },
    { number: 7, slug: 'episode-07', title: 'Children of the Long Night', status: 'locked', logline: '', panels: [] },
    { number: 8, slug: 'episode-08', title: 'The City Beneath the City', status: 'locked', logline: '', panels: [] },
    { number: 9, slug: 'episode-09', title: 'The Last Machine', status: 'locked', logline: '', panels: [] },
    { number: 10, slug: 'episode-10', title: 'The Last Light', status: 'locked', logline: '', panels: [] }
  ];

  window.LAST_LIGHT_EPISODES = EPISODES;

  /* =========================================================
     2. CONFIGURATION
     ========================================================= */

  const CONFIG = {
    seasonRoot: '../../../index.html#season',
    debugEvents: '__LL_DEBUG_EVENTS__'
  };

  /* =========================================================
     3. UTILITIES
     ========================================================= */

  function padEpisode(number) {
    return String(number).padStart(2, '0');
  }

  function getEpisode(number) {
    return EPISODES.find((episode) => episode.number === Number(number));
  }

  function getPublishedEpisode(number) {
    const episode = getEpisode(number);
    return episode && episode.status === 'published' ? episode : null;
  }

  // Relative-path routing: works whether the site is deployed at a domain
  // root or a nested static path (e.g. /the-last-light/), because every
  // generated URL is relative to the page it's rendered on rather than
  // built from an assumed absolute root.
  function episodePath(toNumber) {
    const to = getEpisode(toNumber);
    if (!to) return '#';
    return `../${to.slug}/index.html`;
  }

  function escapeHTML(value) {
    if (value === undefined || value === null) return '';
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /* =========================================================
     4. ANALYTICS HOOK
     ========================================================= */

  function track(eventName, detail = {}) {
    if (window[CONFIG.debugEvents]) {
      console.log('[The Last Light event]', eventName, detail);
    }
    // Future analytics adapter can subscribe here without changing
    // the reader engine, e.g.:
    // window.dispatchEvent(new CustomEvent(`last-light:${eventName}`, { detail }));
  }

  window.LAST_LIGHT_TRACK = track;

  /* =========================================================
     5. NAVIGATION
     ========================================================= */

  function initNav() {
    const nav = document.querySelector('.site-nav');
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');

    if (!nav) return;

    const updateScrollState = () => {
      nav.classList.toggle('is-scrolled', window.scrollY > 8);
    };

    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });

    if (!toggle || !links) return;

    const closeMenu = () => {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', () => {
      const open = !links.classList.contains('is-open');
      links.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });

    links.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && links.classList.contains('is-open')) {
        closeMenu();
        toggle.focus();
      }
    });
  }

  /* =========================================================
     6. SEASON ROADMAP
     ========================================================= */

  function renderSeasonList() {
    const list = document.querySelector('[data-season-list]');
    if (!list) return;

    const statusLabel = (episode) => {
      if (episode.number === 10) return 'SEASON FINALE';
      if (episode.status === 'published') return 'READING NOW';
      if (episode.status === 'coming') return 'COMING';
      return 'LOCKED';
    };

    const statusClass = (episode) => {
      if (episode.number === 10) return 'finale';
      if (episode.status === 'published') return 'reading';
      return '';
    };

    list.innerHTML = EPISODES.map((episode) => {
      const linked = episode.status === 'published';

      const rowClass = [
        'season-row',
        linked ? 'is-linked' : '',
        episode.status === 'published' ? 'is-active' : ''
      ].filter(Boolean).join(' ');

      const inner = `
        <span class="season-num">${padEpisode(episode.number)}</span>
        <span class="season-title">${escapeHTML(episode.title)}</span>
        <span class="season-status ${statusClass(episode)}">${statusLabel(episode)}</span>
      `;

      if (linked) {
        return `
          <a class="${rowClass}" href="episodes/season-1/${episode.slug}/index.html" data-ep="${episode.number}"
             aria-label="Read Episode ${padEpisode(episode.number)}: ${escapeHTML(episode.title)}">
            ${inner}
          </a>
        `;
      }

      return `
        <div class="${rowClass}" aria-label="Episode ${padEpisode(episode.number)}: ${escapeHTML(episode.title)}">
          ${inner}
        </div>
      `;
    }).join('');

    list.querySelectorAll('a[data-ep]').forEach((link) => {
      link.addEventListener('click', () => {
        track('episode_start', { episode: Number(link.dataset.ep) });
      });
    });
  }

  /* =========================================================
     7. DETERMINISTIC SVG ART
     ========================================================= */

  // Park-Miller minimal-standard LCG. Same seed -> same sequence, every
  // reload, every browser. Used only for decorative procedural artwork.
  function seededRandom(seed) {
    let value = seed % 2147483647;
    if (value <= 0) value += 2147483646;
    return function () {
      value = (value * 16807) % 2147483647;
      return (value - 1) / 2147483646;
    };
  }

  function panelArtSVG(kind, uid) {
    const gid = `g-${kind}-${uid}`;
    const random = seededRandom((uid + 1) * 7919);

    const wrap = (inner) => `
      <svg viewBox="0 0 640 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        ${inner}
      </svg>
    `;

    const defs = `
      <defs>
        <linearGradient id="${gid}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0d1420" />
          <stop offset="100%" stop-color="#07090d" />
        </linearGradient>
      </defs>
      <rect width="640" height="400" fill="url(#${gid})" />
    `;

    switch (kind) {
      case 'skyline': {
        const buildings = Array.from({ length: 14 }).map((_, index) => {
          const x = index * 46;
          const height = 90 + ((index * 37) % 180);
          return `<rect x="${x}" y="${400 - height}" width="34" height="${height}" fill="#171b22" stroke="#232a37" />`;
        }).join('');

        const windows = Array.from({ length: 40 }).map(() => {
          const x = Math.floor(random() * 640);
          const y = Math.floor(120 + random() * 260);
          return `<rect x="${x}" y="${y}" width="3" height="6" fill="#4d8dff" opacity=".55" />`;
        }).join('');

        return wrap(defs + `<g>${buildings}</g>` + `<g>${windows}</g>`);
      }

      case 'console':
      case 'console-response':
        return wrap(defs + `
          <rect x="120" y="120" width="400" height="160" fill="none" stroke="#4d8dff" stroke-opacity=".4" />
          <path d="M140 200 L200 200 L220 160 L260 240 L300 180 L340 220 L380 200 L500 200"
                fill="none" stroke="#4d8dff" stroke-width="2" opacity=".85" />
        `);

      case 'closeup':
        return wrap(defs + `
          <circle cx="320" cy="200" r="120" fill="none" stroke="#8a92a3" stroke-opacity=".4" />
          <circle cx="320" cy="200" r="80" fill="none" stroke="#4d8dff" stroke-opacity=".12" />
        `);

      case 'waveform':
        return wrap(defs + `
          <path d="M0 200 Q60 100 120 200 T240 200 T360 200 T480 200 T640 200" fill="none" stroke="#4d8dff" stroke-width="2" />
          <path d="M0 210 Q60 260 120 210 T240 210 T360 210 T480 210 T640 210" fill="none" stroke="#c7d3ea" stroke-width="1" opacity=".5" />
        `);

      case 'flicker':
        return wrap(`
          <rect width="640" height="400" fill="#0d1420" />
          <rect width="640" height="400" fill="#4d8dff" opacity=".07" />
          <g stroke="#4d8dff" opacity=".25">
            <path d="M0 110 H640"/><path d="M0 210 H640"/><path d="M0 310 H640"/>
          </g>
        `);

      case 'blackout':
        return wrap(`
          <rect width="640" height="400" fill="#020304" />
          <rect x="240" y="170" width="160" height="1" fill="#4d8dff" opacity=".18" />
        `);

      case 'sky': {
        const stars = Array.from({ length: 90 }).map(() => {
          const x = Math.floor(random() * 640);
          const y = Math.floor(random() * 280);
          const radius = random() > .9 ? 1.6 : .8;
          return `<circle cx="${x}" cy="${y}" r="${radius}" fill="#dfe6f5" opacity="${(.45 + random() * .55).toFixed(2)}" />`;
        }).join('');

        return wrap(`<rect width="640" height="400" fill="#03050a" /><g>${stars}</g>`);
      }

      case 'signal-speaks':
        return wrap(defs + `
          <circle cx="320" cy="200" r="6" fill="#4d8dff" />
          <circle cx="320" cy="200" r="60" fill="none" stroke="#4d8dff" opacity=".5" />
          <circle cx="320" cy="200" r="110" fill="none" stroke="#4d8dff" opacity=".28" />
          <circle cx="320" cy="200" r="160" fill="none" stroke="#4d8dff" opacity=".14" />
        `);

      default:
        return wrap(defs);
    }
  }

  // panel.art -> artwork resolver -> SVG today, real images later without
  // touching the reader engine. panel.image (a path under /assets/art/...)
  // takes priority once real artwork exists for a panel.
  function resolveArtwork(panel, index) {
    if (panel.image) {
      const alt = panel.artAlt ? escapeHTML(panel.artAlt) : '';
      return `<img src="${escapeHTML(panel.image)}" alt="${alt}" loading="lazy" />`;
    }
    if (panel.art) {
      return panelArtSVG(panel.art, index);
    }
    return panelArtSVG('default', index);
  }

  /* =========================================================
     8. PANEL RENDERER
     ========================================================= */

  function renderPanel(panel, index) {
    const number = String(index + 1).padStart(2, '0');
    let body = '';

    if (panel.caption) {
      body += `<p class="panel-caption">${escapeHTML(panel.caption)}</p>`;
    }

    if (panel.type === 'dialogue') {
      body += `
        <div class="panel-dialogue">
          <span class="speaker">${escapeHTML(panel.speaker)}</span>
          ${escapeHTML(panel.line)}
        </div>
      `;
    }

    if (panel.type === 'signal') {
      body += `
        <div class="panel-dialogue panel-signal">
          <span class="speaker">UNKNOWN SIGNAL</span>
          ${escapeHTML(panel.line || '')}
        </div>
      `;
    }

    // Story-critical art gets a described figure region; purely decorative
    // art stays aria-hidden (its meaning is already carried by the caption).
    const artRegion = panel.artAlt
      ? `<div class="panel-art" role="img" aria-label="${escapeHTML(panel.artAlt)}">${resolveArtwork(panel, index)}</div>`
      : `<div class="panel-art">${resolveArtwork(panel, index)}</div>`;

    return `
      <figure class="panel" id="${escapeHTML(panel.id || `panel-${number}`)}" aria-label="Panel ${number}">
        <span class="panel-number">${number}</span>
        ${artRegion}
        ${body ? `<figcaption class="panel-body">${body}</figcaption>` : ''}
      </figure>
    `;
  }

  /* =========================================================
     9. READER NAVIGATION
     ========================================================= */

  function configureNavigation(episodeNumber) {
    const previous = getPublishedEpisode(episodeNumber - 1);
    const next = getPublishedEpisode(episodeNumber + 1);

    document.querySelectorAll('[data-nav-prev]').forEach((element) => {
      if (previous) {
        element.href = episodePath(previous.number);
        element.textContent = `\u2190 Episode ${padEpisode(previous.number)}`;
      } else {
        element.href = CONFIG.seasonRoot;
        element.textContent = '\u2190 Season Start';
      }
      element.classList.remove('disabled');
      element.setAttribute('aria-disabled', 'false');
    });

    document.querySelectorAll('[data-nav-next]').forEach((element) => {
      if (next) {
        element.href = episodePath(next.number);
        element.textContent = `Episode ${padEpisode(next.number)} \u2192`;
        element.classList.remove('disabled');
        element.setAttribute('aria-disabled', 'false');

        if (!element.dataset.trackingBound) {
          element.dataset.trackingBound = 'true';
          element.addEventListener('click', () => {
            track('next_episode_click', { from: episodeNumber, to: next.number });
          });
        }
      } else {
        element.removeAttribute('href');
        element.textContent = 'Next Chapter \u2014 Coming Soon';
        element.classList.add('disabled');
        element.setAttribute('aria-disabled', 'true');
      }
    });
  }

  /* =========================================================
     10. READER COMPLETION (re-init safe)
     ========================================================= */

  let completionController = null;

  function initCompletionTracking(mount, episodeNumber) {
    // Guard against accumulating scroll listeners if renderReader is ever
    // invoked more than once on the same page (e.g. future SPA navigation).
    if (completionController) completionController.abort();
    completionController = new AbortController();

    let completed = false;

    const checkCompletion = () => {
      if (completed) return;
      const rect = mount.getBoundingClientRect();
      if (rect.bottom <= window.innerHeight * 1.15) {
        completed = true;
        track('episode_complete', { episode: episodeNumber });
        completionController.abort();
      }
    };

    window.addEventListener('scroll', checkCompletion, {
      passive: true,
      signal: completionController.signal
    });

    checkCompletion();
  }

  /* =========================================================
     11. KEYBOARD READER
     ========================================================= */

  function initKeyboardReader() {
    if (document.body.dataset.readerKeyboardReady === 'true') return;
    document.body.dataset.readerKeyboardReady = 'true';

    document.addEventListener('keydown', (event) => {
      const active = document.activeElement;
      const tag = active && active.tagName;

      // Never hijack navigation keys while the visitor is typing or
      // interacting with a focusable form control.
      if (
        tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' ||
        (active && active.isContentEditable)
      ) {
        return;
      }

      if (event.key === 'ArrowRight') {
        const next = document.querySelector('[data-nav-next][href]:not(.disabled)');
        if (next) { event.preventDefault(); next.click(); }
      }

      if (event.key === 'ArrowLeft') {
        const previous = document.querySelector('[data-nav-prev][href]:not(.disabled)');
        if (previous) { event.preventDefault(); previous.click(); }
      }
    });
  }

  /* =========================================================
     12. READER
     ========================================================= */

  function renderReader(episodeNumber) {
    const episode = getEpisode(episodeNumber);
    const mount = document.querySelector('[data-reader]');
    if (!episode || !mount) return;

    track('episode_view', { episode: episode.number, title: episode.title });

    const title = document.querySelector('[data-reader-title]');
    if (title) title.textContent = episode.title;
    document.title = `${episode.title} \u2014 The Last Light`;

    mount.innerHTML = episode.panels.map(renderPanel).join('');

    configureNavigation(episode.number);
    initCompletionTracking(mount, episode.number);
    initKeyboardReader();
  }

  /* =========================================================
     13. PUBLIC API
     ========================================================= */

  window.LastLight = {
    renderReader,
    renderSeasonList,
    track,
    EPISODES,
    getEpisode
  };

  /* =========================================================
     14. INITIALIZATION
     ========================================================= */

  document.addEventListener('DOMContentLoaded', () => {
    initNav();
    renderSeasonList();

    const reader = document.querySelector('[data-reader][data-episode]');
    if (reader) {
      const number = Number(reader.dataset.episode);
      if (Number.isInteger(number) && number > 0) {
        renderReader(number);
      }
    }
  });

})();
