/* ============================================
   KEEL — script
   Control room, gauge, map, telemetry, toasts
   ============================================ */

(function () {
  'use strict';

  // ---- helpers ----
  function $(id) { return document.getElementById(id); }
  function all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function getColors() {
    var s = getComputedStyle(document.documentElement);
    function v(name) { return s.getPropertyValue(name).trim(); }
    return {
      canvas: v('--bg-canvas'),
      cell: v('--bg-cell'),
      cellAlt: v('--bg-cell-alt'),
      text: v('--text-primary'),
      textSec: v('--text-secondary'),
      textMuted: v('--text-muted'),
      border: v('--border-cell'),
      accent: v('--accent'),
      steady: v('--steady'),
      warn: v('--warn'),
      alert: v('--alert')
    };
  }

  // fixed palette for always-dark immersive canvases (hero room)
  var INK = {
    line: '#FBBF24',
    fill: 'rgba(251, 191, 36, 0.10)',
    grid: 'rgba(233, 237, 244, 0.08)',
    text: 'rgba(233, 237, 244, 0.55)',
    steady: '#34D399',
    muted: 'rgba(233, 237, 244, 0.25)'
  };

  // ---- toasts (press feedback, Plan §26) ----
  var toastStack = $('toastStack');

  function toast(type, msg) {
    if (!toastStack) return;
    var el = document.createElement('div');
    el.className = 'toast toast--' + type;
    var icon = type === 'success' ? '✓' : type === 'alert' ? '!' : '·';
    var label = type === 'success' ? 'ok' : type === 'alert' ? 'alert' : 'info';
    el.innerHTML = '<span class="toast__icon" aria-hidden="true">' + icon + '</span>' +
                   '<span class="toast__msg">' + msg + '</span>' +
                   '<span class="visually-hidden">' + label + '</span>';
    toastStack.appendChild(el);
    setTimeout(function () {
      el.classList.add('toast--out');
      setTimeout(function () {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 300);
    }, 3200);
  }

  // ---- theme toggle ----
  var redrawers = [];

  var themeToggle = $('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var root = document.documentElement;
      var dark = root.getAttribute('data-theme') === 'dark';
      root.setAttribute('data-theme', dark ? '' : 'dark');
      themeToggle.textContent = dark ? '◐' : '◑';
      redrawers.forEach(function (fn) { fn(); });
    });
  }

  // ---- CTAs → toast (Phase 6 wiring; real flow later) ----
  all('[data-start]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      toast('success', 'Crew tier activated — no card needed.');
    });
  });

  // ---------------------------------------------------------------
  // HERO CONTROL ROOM — sparkline + mono timestamps
  // ---------------------------------------------------------------
  /* DPR-aware canvas fit — bitmap = CSS size × devicePixelRatio so all four
     canvases render crisp on retina. Draw fns work in CSS-px space; the
     aspect-preserving scale means rect.height converges (no feedback loop). */
  function fitCanvas(cv) {
    var rect = cv.getBoundingClientRect();
    var dpr = Math.min(2, Math.max(1, window.devicePixelRatio || 1)); /* §63 — capped: >2× bitmaps cost memory/CPU with no visible gain */
    var w = Math.max(1, Math.round(rect.width));
    var h = Math.max(1, Math.round(rect.height));
    var bw = Math.round(w * dpr), bh = Math.round(h * dpr);
    if (cv.width !== bw || cv.height !== bh) { cv.width = bw; cv.height = bh; }
    return { w: w, h: h, dpr: dpr };
  }

  var sparkCanvas = $('roomSpark');
  var sparkData = [];
  var SPARK_N = 60;

  (function seedSpark() {
    var v = 16800;
    for (var i = 0; i < SPARK_N; i++) {
      v += (Math.random() - 0.48) * 900;
      v = Math.max(14000, Math.min(21000, v));
      sparkData.push(v);
    }
  })();

  function drawSpark() {
    if (!sparkCanvas) return;
    var ctx = sparkCanvas.getContext('2d');
    var fit = fitCanvas(sparkCanvas);
    var w = fit.w, h = fit.h;
    ctx.setTransform(fit.dpr, 0, 0, fit.dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    var min = 13500, max = 21500;
    var pad = 6;
    function xy(i, v) {
      var x = pad + (i / (SPARK_N - 1)) * (w - pad * 2);
      var y = h - pad - ((v - min) / (max - min)) * (h - pad * 2);
      return [x, y];
    }
    // hairline grid
    ctx.strokeStyle = INK.grid;
    ctx.lineWidth = 1;
    [0.25, 0.5, 0.75].forEach(function (f) {
      var y = pad + f * (h - pad * 2);
      ctx.beginPath(); ctx.moveTo(pad, y); ctx.lineTo(w - pad, y); ctx.stroke();
    });
    // area
    ctx.beginPath();
    sparkData.forEach(function (v, i) { var p = xy(i, v); if (i === 0) ctx.moveTo(p[0], p[1]); else ctx.lineTo(p[0], p[1]); });
    var last = xy(SPARK_N - 1, sparkData[SPARK_N - 1]);
    ctx.lineTo(last[0], h - pad); ctx.lineTo(pad, h - pad); ctx.closePath();
    ctx.fillStyle = INK.fill;
    ctx.fill();
    // line
    ctx.beginPath();
    sparkData.forEach(function (v, i) { var p = xy(i, v); if (i === 0) ctx.moveTo(p[0], p[1]); else ctx.lineTo(p[0], p[1]); });
    ctx.strokeStyle = INK.line;
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.stroke();
    // head dot
    ctx.beginPath();
    ctx.arc(last[0], last[1], 3.5, 0, Math.PI * 2);
    ctx.fillStyle = INK.line;
    ctx.fill();
  }

  function tickSpark() {
    var v = sparkData[sparkData.length - 1];
    v += (Math.random() - 0.48) * 900;
    v = Math.max(14000, Math.min(21000, v));
    sparkData.push(v);
    sparkData.shift();
    drawSpark();
  }

  var elapsed = 42;
  function tickClock() {
    var clock = $('roomClock');
    var el = $('roomElapsed');
    if (clock) {
      clock.textContent = new Date().toLocaleTimeString('en-GB', { hour12: false }) + ' UTC';
    }
    if (el) {
      elapsed += 1;
      el.textContent = 'T+' + elapsed + 's';
    }
  }

  if (sparkCanvas) {
    drawSpark();
    if (!reduced && 'IntersectionObserver' in window) {
      /* §64 — the live room only ticks while on screen: no canvas churn
         or timer work for a hero the user has scrolled past. */
      var sparkTimer = null, clockTimer = null;
      new IntersectionObserver(function (entries) {
        var on = entries[0].isIntersecting;
        if (on && !sparkTimer) {
          sparkTimer = setInterval(tickSpark, 600);
          clockTimer = setInterval(tickClock, 1000);
        } else if (!on && sparkTimer) {
          clearInterval(sparkTimer); clearInterval(clockTimer);
          sparkTimer = null; clockTimer = null;
        }
      }, { threshold: 0 }).observe(sparkCanvas);
    } else if (!reduced) {
      setInterval(tickSpark, 600);
      setInterval(tickClock, 1000);
    }
  }

  // ---------------------------------------------------------------
  // SLO GAUGE — error budget 87%
  // ---------------------------------------------------------------
  var gaugeCanvas = $('gaugeCanvas');
  var BUDGET = 87;

  function drawGauge() {
    if (!gaugeCanvas) return;
    var ctx = gaugeCanvas.getContext('2d');
    var c = getColors();
    var fit = fitCanvas(gaugeCanvas);
    var w = fit.w, h = fit.h;
    ctx.setTransform(fit.dpr, 0, 0, fit.dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    var cx = w / 2, cy = h - 14;
    var r = Math.min(cx, cy) - 10;
    var a0 = Math.PI, a1 = 2 * Math.PI;
    var av = a0 + (BUDGET / 100) * Math.PI;
    ctx.lineCap = 'round';
    // track
    ctx.beginPath(); ctx.arc(cx, cy, r, a0, a1);
    ctx.lineWidth = 12; ctx.strokeStyle = c.cellAlt; ctx.stroke();
    // value
    ctx.beginPath(); ctx.arc(cx, cy, r, a0, av);
    ctx.lineWidth = 12; ctx.strokeStyle = c.steady; ctx.stroke();
    // burn tick (0.4x → small amber notch near the end)
    ctx.beginPath();
    var tb = a0 + (1 - 0.4 / 10) * Math.PI; // burn-rate marker position
    ctx.arc(cx, cy, r, tb - 0.02, tb + 0.02);
    ctx.lineWidth = 12; ctx.strokeStyle = c.accent; ctx.stroke();
  }

  if (gaugeCanvas) { drawGauge(); redrawers.push(drawGauge); }

  // ---------------------------------------------------------------
  // SERVICE MAP — 6 nodes, traffic edges, health pulses
  // ---------------------------------------------------------------
  var mapCanvas = $('mapCanvas');
  var MAP_NODES = [
    { name: 'edge',    x: 0.10, y: 0.50 },
    { name: 'web-api', x: 0.38, y: 0.28 },
    { name: 'auth',    x: 0.38, y: 0.74 },
    { name: 'billing', x: 0.66, y: 0.62 },
    { name: 'workers', x: 0.66, y: 0.20 },
    { name: 'db',      x: 0.90, y: 0.42 }
  ];
  var MAP_EDGES = [
    { from: 0, to: 1, load: 1.0 },
    { from: 0, to: 2, load: 0.5 },
    { from: 1, to: 4, load: 0.6 },
    { from: 1, to: 3, load: 0.7 },
    { from: 2, to: 3, load: 0.4 },
    { from: 3, to: 5, load: 0.8 },
    { from: 4, to: 5, load: 0.5 }
  ];
  var mapT = 0;
  var mapRAF = null;

  function drawMap() {
    if (!mapCanvas) return;
    var ctx = mapCanvas.getContext('2d');
    var c = getColors();
    var fit = fitCanvas(mapCanvas);
    var w = fit.w, h = fit.h;
    ctx.setTransform(fit.dpr, 0, 0, fit.dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    var pts = MAP_NODES.map(function (n) { return [n.x * w, n.y * h]; });

    // edges — width is traffic
    MAP_EDGES.forEach(function (e) {
      var a = pts[e.from], b = pts[e.to];
      ctx.beginPath();
      ctx.moveTo(a[0], a[1]);
      var mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2 - 14;
      ctx.quadraticCurveTo(mx, my, b[0], b[1]);
      ctx.lineWidth = 1 + e.load * 2.5;
      ctx.strokeStyle = c.border;
      ctx.stroke();
    });

    // health pulses — dots travelling along edges
    if (!reduced) {
      MAP_EDGES.forEach(function (e, i) {
        var a = pts[e.from], b = pts[e.to];
        var t = (mapT * (0.12 + e.load * 0.1) + i * 0.19) % 1;
        var mt = 1 - t;
        var mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2 - 14;
        var x = mt * mt * a[0] + 2 * mt * t * mx + t * t * b[0];
        var y = mt * mt * a[1] + 2 * mt * t * my + t * t * b[1];
        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = c.steady;
        ctx.fill();
      });
    }

    // nodes
    MAP_NODES.forEach(function (n, i) {
      var p = pts[i];
      ctx.beginPath();
      ctx.arc(p[0], p[1], n.name === 'web-api' ? 7 : 5.5, 0, Math.PI * 2);
      ctx.fillStyle = i === 0 ? c.accent : c.cell;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = i === 0 ? c.accent : c.textMuted;
      ctx.stroke();
      ctx.font = '600 9px "JetBrains Mono", monospace';
      ctx.fillStyle = c.textMuted;
      ctx.textAlign = 'center';
      var ly = p[1] + (n.y > 0.6 ? 18 : -12);
      ctx.fillText(n.name, p[0], ly);
    });
  }

  function mapLoop() {
    mapT += 0.016;
    drawMap();
    mapRAF = requestAnimationFrame(mapLoop);
  }

  if (mapCanvas) {
    drawMap();
    redrawers.push(drawMap);
    if (!reduced) {
      /* §64 — the 60fps loop runs only while the map is on screen AND the
         tab is visible; otherwise its rAF is cancelled. */
      var mapOnScreen = true, tabVisible = !document.hidden;
      var mapSync = function () {
        if (mapOnScreen && tabVisible && !mapRAF) mapLoop();
        else if ((!mapOnScreen || !tabVisible) && mapRAF) {
          cancelAnimationFrame(mapRAF); mapRAF = null;
        }
      };
      if ('IntersectionObserver' in window) {
        mapOnScreen = false;
        new IntersectionObserver(function (entries) {
          mapOnScreen = entries[0].isIntersecting;
          mapSync();
        }, { threshold: 0 }).observe(mapCanvas);
      }
      document.addEventListener('visibilitychange', function () {
        tabVisible = !document.hidden;
        mapSync();
      });
      mapSync();
    }
  }
  // ---------------------------------------------------------------
  // UPTIME BARS — 90 days, deterministic, one warn day (dogfood)
  // ---------------------------------------------------------------
  function seeded(seed) {
    return function () {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
  }

  var uptimeBars = $('uptimeBars');
  if (uptimeBars) {
    var rnd = seeded(90);
    var frag = document.createDocumentFragment();
    for (var i = 0; i < 45; i++) {
      var b = document.createElement('span');
      var v = 96 + rnd() * 4;
      if (i === 23) v = 99.1;          /* the one warn day */
      else if (i === 24) v = 97.2;
      b.className = 'uptime__bar' + (v < 98 ? ' uptime__bar--warn' : '');
      b.style.setProperty('--h', Math.min(100, Math.round((v - 94) * 25)) + '%');
      b.style.setProperty('--i', String(i));   /* grow-in stagger (Phase 9) */
      /* per-bar hover/tap tooltip (Plan §24 content reveal) */
      b.setAttribute('data-tip', v.toFixed(1) + '% · ' + (90 - i * 2) + 'd ago');
      frag.appendChild(b);
    }
    uptimeBars.appendChild(frag);
  }

  // ---------------------------------------------------------------
  // TELEMETRY CHART — p95 series, range tabs, hover tooltip
  // ---------------------------------------------------------------
  var chartCanvas = $('chartCanvas');
  var chartTip = $('chartTip');
  var chartTipVal = $('chartTipVal');
  var chartTipTime = $('chartTipTime');

  var chartRange = '1h';
  var chartMode = 'live';      /* live | batch | stream */
  var chartSampling = 72;

  /* labels counted back from "now" = Thu 14:02 */
  function timeLabels(n, stepMin) {
    var days = ['Thu', 'Wed', 'Tue', 'Mon', 'Sun', 'Sat', 'Fri'];
    var out = [];
    for (var i = 0; i < n; i++) {
      var ago = (n - 1 - i) * stepMin;
      var abs = 14 * 60 + 2 - ago;
      var mm = ((abs % 1440) + 1440) % 1440;
      var h = Math.floor(mm / 60), m = mm % 60;
      var clock = (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
      out.push(ago < 1440 ? clock : days[Math.min(6, Math.ceil(ago / 1440))] + ' ' + clock);
    }
    return out;
  }

  var CHART_DATA = {
    '1h':  { step: 1,   base: 148, amp: 22, seed: 11 },
    '24h': { step: 15,  base: 152, amp: 34, seed: 22 },
    '7d':  { step: 120, base: 156, amp: 44, seed: 33 }
  };

  function buildSeries(spec) {
    var rnd = seeded(spec.seed);
    var pts = [];
    var v = spec.base;
    for (var i = 0; i < 84; i++) {
      v += (rnd() - 0.5) * spec.amp * 0.6;
      v = spec.base - spec.amp + Math.min(spec.amp * 2.2,
            Math.max(0, v - spec.base + spec.amp));
      pts.push(Math.round(v));
    }
    /* story beats: canary spike (1h), nightly dip (24h), incident day (7d) */
    if (spec.seed === 11) { pts[47] = 205; pts[48] = 198; }
    if (spec.seed === 22) { for (var d = 30; d < 40; d++) pts[d] -= 22; }
    if (spec.seed === 33) { pts[52] = 228; pts[53] = 214; pts[54] = 196; }
    return pts;
  }

  function drawChart() {
    if (!chartCanvas) return;
    var ctx = chartCanvas.getContext('2d');
    var c = getColors();
    var fit = fitCanvas(chartCanvas);
    var w = fit.w, h = fit.h;
    chartW = w;
    ctx.setTransform(fit.dpr, 0, 0, fit.dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    var spec = CHART_DATA[chartRange];
    var raw = buildSeries(spec);
    /* sampling downsample — control-room slider retunes density */
    var keep = Math.max(24, Math.round(84 * chartSampling / 100));
    var stepN = Math.max(1, Math.round(84 / keep));
    var pts = [];
    var labels = timeLabels(84, spec.step);
    for (var i = 0; i < 84; i += stepN) pts.push({ v: raw[i], t: labels[i] });
    if (chartMode === 'batch') {
      pts = pts.map(function (p, j, arr) {
        var a = arr[Math.max(0, j - 1)], b = arr[Math.min(arr.length - 1, j + 1)];
        return { v: Math.round((a.v + p.v * 2 + b.v) / 4), t: p.t };
      });
    }
    chartPts = pts;
    var n = pts.length;
    var lo = 110, hi = 240;
    function x(j) { return 34 + (j / (n - 1)) * (w - 44); }
    function y(v) { return h - 18 - ((v - lo) / (hi - lo)) * (h - 30); }

    ctx.clearRect(0, 0, w, h);

    /* grid + mono y labels */
    ctx.font = '500 9px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    for (var g = 120; g <= 240; g += 40) {
      ctx.beginPath();
      ctx.moveTo(34, y(g));
      ctx.lineTo(w - 10, y(g));
      ctx.strokeStyle = c.border;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = c.textMuted;
      ctx.fillText(g + 'ms', 2, y(g) + 3);
    }
    /* SLO threshold at 180ms */
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(34, y(180));
    ctx.lineTo(w - 10, y(180));
    ctx.strokeStyle = c.warn;
    ctx.globalAlpha = 0.55;
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;
    /* series: soft fill, then the line */
    ctx.beginPath();
    ctx.moveTo(x(0), y(pts[0].v));
    for (var j = 1; j < n; j++) ctx.lineTo(x(j), y(pts[j].v));
    ctx.lineTo(x(n - 1), h - 18);
    ctx.lineTo(x(0), h - 18);
    ctx.closePath();
    ctx.fillStyle = c.accent;
    ctx.globalAlpha = 0.09;
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.beginPath();
    ctx.moveTo(x(0), y(pts[0].v));
    for (j = 1; j < n; j++) ctx.lineTo(x(j), y(pts[j].v));
    ctx.strokeStyle = c.accent;
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.stroke();

    /* breach dot on the worst point above SLO */
    var worst = -1, worstV = 180;
    for (j = 0; j < n; j++) {
      if (pts[j].v > worstV) { worstV = pts[j].v; worst = j; }
    }
    if (worst > -1) {
      ctx.beginPath();
      ctx.arc(x(worst), y(pts[worst].v), 3.5, 0, Math.PI * 2);
      ctx.fillStyle = c.alert;
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = c.cell;
      ctx.stroke();
    }

    /* mono x labels */
    ctx.font = '500 9px "JetBrains Mono", monospace';
    ctx.fillStyle = c.textMuted;
    ctx.textAlign = 'center';
    [0, Math.floor((n - 1) / 3), Math.floor((n - 1) * 2 / 3), n - 1].forEach(function (j) {
      ctx.fillText(pts[j].t, Math.max(34, Math.min(w - 24, x(j))), h - 4);
    });
  }

  /* hover tooltip — nearest downsampled point (event-driven, not per-frame).
     Geometry is CSS-px (DPR-space), so offsetX maps 1:1 against chartW. */
  var chartPts = [];
  var chartW = 0;
  if (chartCanvas && chartTip) {
    /* §64 — rect cached on entry: no getBoundingClientRect per mousemove
       (avoids a read right after the previous move's tooltip style write). */
    var chartRect = null;
    chartCanvas.addEventListener('mouseenter', function () {
      chartRect = chartCanvas.getBoundingClientRect();
    });
    chartCanvas.addEventListener('mousemove', function (e) {
      if (!chartPts.length || !chartW || !chartRect) return;
      var w = chartW;
      var mx = e.clientX - chartRect.left;
      var n = chartPts.length;
      var j = Math.round((mx - 34) / (w - 44) * (n - 1));
      j = Math.max(0, Math.min(n - 1, j));
      chartTipVal.textContent = chartPts[j].v + 'ms';
      chartTipTime.textContent = chartPts[j].t;
      var leftPct = Math.max(12, Math.min(88, (34 + (j / (n - 1)) * (w - 44)) / w * 100));
      chartTip.style.left = leftPct + '%';
      chartTip.classList.add('chart-tip--visible');
    });
    chartCanvas.addEventListener('mouseleave', function () {
      chartTip.classList.remove('chart-tip--visible');
    });
  }

  /* range tabs — switch series, keep spatial continuity */
  all('.chart-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      if (tab.getAttribute('aria-selected') === 'true') return;
      all('.chart-tab').forEach(function (t) {
        t.classList.toggle('chart-tab--active', t === tab);
        t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
      });
      chartRange = tab.getAttribute('data-range') || '1h';
      drawChart();
    });
  });
  /* ---- control tile — modes / sampling / routes (live retune) ---- */
  all('.mode-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      all('.mode-btn').forEach(function (b) {
        b.classList.toggle('mode-btn--active', b === btn);
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      chartMode = btn.getAttribute('data-mode') || 'live';
      drawChart();
      toast('info', 'Telemetry re-tuned — ' + chartMode + ' mode.');
    });
  });

  var sampling = $('sampling');
  var samplingVal = $('samplingVal');
  var sampleTimer;
  if (sampling) {
    sampling.addEventListener('input', function () {
      chartSampling = parseInt(sampling.value, 10) || 72;
      if (samplingVal) samplingVal.textContent = chartSampling + '%';
      clearTimeout(sampleTimer);
      sampleTimer = setTimeout(drawChart, 120);
    });
  }

  all('.route-toggle').forEach(function (tg) {
    tg.addEventListener('click', function () {
      var on = tg.getAttribute('aria-pressed') === 'true';
      tg.setAttribute('aria-pressed', on ? 'false' : 'true');
    });
  });

  /* ---- quick actions + rollback strip (press feedback, Plan §26) ---- */
  var ACTION_MSG = {
    'deploy': ['success', 'Deploy queued — run #4813 started.'],
    'promote': ['success', 'Canary promoted — fleet rollout underway.'],
    'snapshot': ['info', 'Snapshot captured — sha 9f3c2e1 saved.'],
    'contact': ['info', 'Noted — the fleet team will reach out.']
  };
  all('[data-action]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var m = ACTION_MSG[btn.getAttribute('data-action')];
      if (m) toast(m[0], m[1]);
    });
  });

  /* ---- PHASE 8 — signature rollback sequence (spec §3.4, Plan §22/§23/§71) ---- */
  var RM = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var SEQ_TICK = RM ? 110 : 450;
  var rollbackSection = document.getElementById('rollback');
  var rollbackBtn = document.getElementById('rollbackBtn');
  var rollbackVerb = document.getElementById('rollbackVerb');
  var rollbackCount = document.getElementById('rollbackCount');
  var rollbackSeq = document.getElementById('rollbackSeq');
  var rollbackBar = document.getElementById('rollbackBar');
  var rollbackHint = document.getElementById('rollbackHint');
  var rollbackStatus = document.getElementById('rollbackStatus');
  var seqStages = rollbackSeq ? rollbackSeq.querySelectorAll('.rollback__stage') : [];
  var seqTimer = null, seqFinishTimer = null, seqTick = 0, seqRunning = false;

  function seqClearTimers() {
    if (seqTimer) { clearTimeout(seqTimer); seqTimer = null; }
    if (seqFinishTimer) { clearTimeout(seqFinishTimer); seqFinishTimer = null; }
  }

  function seqReset() {
    seqRunning = false;
    seqClearTimers();
    if (rollbackSection) rollbackSection.classList.remove('rollback--running', 'rollback--steady');
    document.body.classList.remove('seq-on');
    if (rollbackVerb) rollbackVerb.textContent = 'rollback';
    if (rollbackCount) rollbackCount.textContent = '8s';
    if (rollbackBtn) rollbackBtn.disabled = false;
    if (rollbackHint) rollbackHint.hidden = true;
    if (rollbackBar) {
      rollbackBar.style.transition = 'none';
      rollbackBar.style.transform = 'scaleX(1)';
    }
    for (var i = 0; i < seqStages.length; i++) {
      seqStages[i].classList.remove('is-active', 'is-done');
    }
  }

  function seqFinish() {
    seqRunning = false;
    seqClearTimers();
    if (rollbackSection) rollbackSection.classList.add('rollback--steady');
    if (rollbackVerb) rollbackVerb.textContent = 'steady';
    if (rollbackCount) rollbackCount.textContent = '0s';
    if (rollbackHint) rollbackHint.hidden = true;
    if (rollbackStatus) rollbackStatus.textContent = 'Rollback complete — fleet steady.';
    if (rollbackBtn) rollbackBtn.focus();
    for (var j = 0; j < seqStages.length; j++) {
      seqStages[j].classList.remove('is-active');
      seqStages[j].classList.add('is-done');
    }
    toast('success', 'Rolled back to run #4811 — fleet steady in eight seconds.');
    seqFinishTimer = setTimeout(seqReset, 2600);
  }

  function seqStep() {
    seqTick++;
    if (rollbackCount) rollbackCount.textContent = Math.max(0, 8 - seqTick) + 's';
    var active = Math.min(seqStages.length - 1, Math.floor(seqTick / 2));
    for (var i = 0; i < seqStages.length; i++) {
      seqStages[i].classList.toggle('is-done', i < active);
      seqStages[i].classList.toggle('is-active', i === active);
    }
    if (seqTick >= 8) { seqFinish(); return; }
    seqTimer = setTimeout(seqStep, SEQ_TICK);
  }

  function seqStart() {
    if (seqRunning || !rollbackSection) return;
    seqReset();                       /* clears any stale finish-reset timer */
    seqRunning = true;
    seqTick = 0;
    rollbackSection.classList.add('rollback--running');
    document.body.classList.add('seq-on');
    if (rollbackBtn) rollbackBtn.disabled = true;
    if (rollbackHint) rollbackHint.hidden = false;
    if (rollbackStatus) rollbackStatus.textContent = 'Rollback running — eight seconds to steady.';
    if (rollbackSection) rollbackSection.focus();   /* keyboard/SR context moves with the moment */
    if (rollbackBar) {
      void rollbackBar.offsetWidth;   /* commit start position before transition */
      rollbackBar.style.transition = 'transform ' + (SEQ_TICK * 8) + 'ms linear';
      rollbackBar.style.transform = 'scaleX(0)';
    }
    if (seqStages[0]) seqStages[0].classList.add('is-active');
    seqTimer = setTimeout(seqStep, SEQ_TICK);
  }

  function seqAbort() {
    if (!seqRunning) return;
    seqReset();
    toast('alert', 'Rollback aborted — fleet untouched.');
    if (rollbackStatus) rollbackStatus.textContent = 'Rollback aborted.';
    if (rollbackBtn) rollbackBtn.focus();           /* disabled drop focus — put it back */
  }

  if (rollbackBtn) rollbackBtn.addEventListener('click', seqStart);

  document.addEventListener('keydown', function (e) {
    if ((e.key === 'Escape' || e.key === 'Esc') && seqRunning) seqAbort();
  });

  /* Quick-action Rollback wires to the signature moment (spec §3.3) */
  var qaRollback = document.querySelector('[data-action="rollback"]');
  if (qaRollback) {
    qaRollback.addEventListener('click', function () {
      if (seqRunning) return;
      rollbackSection.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'center' });
      setTimeout(seqStart, RM ? 80 : 500);
    });
  }

  /* ---- ship log filter (Phase 7 — Plan §88 "filtering") ---- */
  all('.fchip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      if (chip.getAttribute('aria-pressed') === 'true') return;
      all('.fchip').forEach(function (c) {
        c.setAttribute('aria-pressed', c === chip ? 'true' : 'false');
      });
      var f = chip.getAttribute('data-filter');
      all('.log__item').forEach(function (item) {
        var show = f === 'all' || item.getAttribute('data-kind') === f;
        item.classList.toggle('log__item--hidden', !show);
        if (show) {
          item.classList.remove('log__item--in');
          void item.offsetWidth;            /* restart entrance animation */
          item.classList.add('log__item--in');
        }
      });
    });
  });

  /* ---- theme-aware canvas redraws ---- */
  redrawers.push(drawSpark);
  redrawers.push(drawChart);

  /* ---- boot ---- */
  drawSpark();
  drawGauge();
  drawChart();

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      drawSpark();
      drawGauge();
      drawMap();
      drawChart();
    }, 160);
  });

  /* ---- PHASE 9 — motion layer (Plan §27/§28/§30/§32/§64/§65) ---- */
  document.documentElement.classList.add('js-motion');

  /* §27/§28 reveals + sibling stagger. Hero band excluded — it has a CSS-only
     load-in choreography and sits above the fold. */
  var revealEls = all('.cell, .proofnum, .quote, .rollback__inner').filter(function (el) {
    return !el.closest('.band--hero');
  });
  revealEls.forEach(function (el) { el.classList.add('will-reveal'); });
  revealEls.forEach(function (el) {
    var parent = el.parentElement;
    if (!parent) return;
    var sibs = all(':scope > .will-reveal', parent);
    var idx = sibs.indexOf(el);
    el.style.setProperty('--reveal-i', String(Math.max(0, Math.min(idx, 5))));
  });

  if (reduced || !('IntersectionObserver' in window)) {
    /* §65 — reduced motion: everything visible immediately, no observer */
    revealEls.forEach(function (el) { el.classList.add('is-revealed'); });
  } else {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        revealIO.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { revealIO.observe(el); });
  }

  /* §32 kinetic numeral — the proof stat counts up once, on first view */
  var proofVal = $('proofTitle');
  if (proofVal && !reduced && 'IntersectionObserver' in window) {
    var proofTarget = parseInt((proofVal.textContent || '').replace(/[^0-9]/g, ''), 10) || 0;
    var proofIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        proofIO.disconnect();
        var t0 = null;
        var DUR = 950;
        var step = function (ts) {
          if (t0 === null) t0 = ts;
          var p = Math.min(1, (ts - t0) / DUR);
          var eased = 1 - Math.pow(1 - p, 3);   /* ease-out cubic */
          proofVal.textContent = Math.round(proofTarget * eased) + '%';
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });
    proofIO.observe(proofVal);
  }

  /* §30 restrained parallax — rollback numeral drifts ±11px while the strip
     is near the viewport. rAF-batched, hover-capable pointers only. */
  var rollSection = $('rollback');
  var rollDisplay = document.querySelector('.rollback__display');
  var coarsePointer = window.matchMedia && window.matchMedia('(hover: none)').matches;
  if (rollSection && rollDisplay && !reduced && !coarsePointer) {
    var rollNear = false, rollRAF = 0;
    var rollApply = function () {
      rollRAF = 0;
      var r = rollSection.getBoundingClientRect();
      var vh = window.innerHeight || 1;
      var progress = (r.top + r.height / 2 - vh / 2) / vh;
      rollDisplay.style.transform = 'translate3d(0,' + (progress * -18).toFixed(1) + 'px,0)';
    };
    var rollSchedule = function () {
      if (!rollRAF && rollNear) rollRAF = requestAnimationFrame(rollApply);
    };
    var rollIO = new IntersectionObserver(function (entries) {
      rollNear = entries[0].isIntersecting;
      if (rollNear) rollSchedule();
      else if (rollRAF) { cancelAnimationFrame(rollRAF); rollRAF = 0; }
    }, { rootMargin: '25% 0px 25% 0px' });
    rollIO.observe(rollSection);
    window.addEventListener('scroll', rollSchedule, { passive: true });
    window.addEventListener('resize', rollSchedule, { passive: true });
  }

  /* ---- a11y: chart tablist — roving tabindex + arrow keys (APG tabs pattern) ---- */
  (function () {
    var tablist = document.querySelector('.chart__tabs[role="tablist"]');
    if (!tablist) return;
    var RANGE_TEXT = { '1h': 'the last hour', '24h': 'the last 24 hours', '7d': 'the last 7 days' };
    var chartStatus = document.getElementById('chartStatus');

    function tabList() {
      return Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));
    }
    function rove(tab) {
      tabList().forEach(function (t) {
        t.setAttribute('tabindex', t === tab ? '0' : '-1');
      });
    }
    function announce(tab) {
      if (!chartStatus) return;
      var r = tab.getAttribute('data-range') || '1h';
      chartStatus.textContent = 'Showing p95 for ' + (RANGE_TEXT[r] || r) + '.';
    }
    tablist.addEventListener('click', function (e) {
      var tab = e.target && e.target.closest ? e.target.closest('[role="tab"]') : null;
      if (tab) { rove(tab); announce(tab); }
    });
    tablist.addEventListener('keydown', function (e) {
      var list = tabList();
      var idx = list.indexOf(document.activeElement);
      if (idx < 0) return;
      var next = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = list[(idx + 1) % list.length];
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = list[(idx - 1 + list.length) % list.length];
      else if (e.key === 'Home') next = list[0];
      else if (e.key === 'End') next = list[list.length - 1];
      if (!next) return;
      e.preventDefault();
      next.focus();
      rove(next);
      next.click();              /* reuses the existing range-switch handler */
    });
  })();

})();