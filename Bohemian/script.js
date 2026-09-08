/* ============================================
   OCHRE — SCRIPT v3
   Flat dye-plate art, Dye Baths,
   scroll interactions, mobile menu
   ============================================ */

(function () {
  'use strict';

/* OCHRE R1: shim removed — native getElementById restored. Removed scene elements now return null so existing guards work. */

  // ---------------------------------------------------------------
  // COLOR TOKENS
  // ---------------------------------------------------------------
  function getColors() {
    return {
      clay: '#A84E33',
      clayDeep: '#8F4229',
      clayLight: '#C47050',
      sage: '#7C8B72',
      sageLight: '#9AAB90',
      sageDark: '#5A6B52',
      gold: '#C99B47',
      goldLight: '#D9B25F',
      sand: '#E3D8C5',
      ivory: '#FBF7F0',
      paper: '#F6F1E8',
      ink: '#33251C',
      inkSoft: '#5C4B3C',
      muted: '#7C6A5A'
    };
  }

  // ---------------------------------------------------------------
  // COLOR HELPERS
  // ---------------------------------------------------------------
  function hexToRgb(hex) {
    var n = parseInt(hex.replace('#', ''), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  function rgbToHex(r, g, b) {
    return '#' + ((1 << 24) + (Math.round(r) << 16) + (Math.round(g) << 8) + Math.round(b)).toString(16).slice(1);
  }

  function shade(hex, amt) {
    var rgb = hexToRgb(hex);
    return rgbToHex(
      Math.min(255, Math.max(0, rgb[0] + amt)),
      Math.min(255, Math.max(0, rgb[1] + amt)),
      Math.min(255, Math.max(0, rgb[2] + amt))
    );
  }

  function alpha(hex, a) {
    var rgb = hexToRgb(hex);
    return 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + a + ')';
  }

  // ---------------------------------------------------------------
  // ORGANIC CURVE (Catmull-Rom)
  // ---------------------------------------------------------------
  function drawOrganicCurve(ctx, points, tension) {
    tension = tension || 0.4;
    if (points.length < 2) return;
    ctx.moveTo(points[0][0], points[0][1]);
    for (var i = 0; i < points.length - 1; i++) {
      var p0 = points[Math.max(i - 1, 0)];
      var p1 = points[i];
      var p2 = points[i + 1];
      var p3 = points[Math.min(i + 2, points.length - 1)];
      ctx.bezierCurveTo(
        p1[0] + (p2[0] - p0[0]) * tension, p1[1] + (p2[1] - p0[1]) * tension,
        p2[0] - (p3[0] - p1[0]) * tension, p2[1] - (p3[1] - p1[1]) * tension,
        p2[0], p2[1]
      );
    }
  }

  // ---------------------------------------------------------------
  // OCHRE PLATE PALETTE — dye-bath colours
  // ---------------------------------------------------------------
  function drawPot3D(ctx, cx, rimY, bodyW, bodyH, rimW, baseColor, opts) {
    opts = opts || {};
    var bottomY = rimY + bodyH;
    var bellyY = rimY + bodyH * 0.52;
    var neckY = rimY + bodyH * 0.08;

    // 1. CAST SHADOW on ground
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(cx + bodyW * 0.1, bottomY + 6, bodyW * 0.55, 5, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(51, 37, 28, 0.1)';
    ctx.filter = 'blur(3px)';
    ctx.fill();
    ctx.restore();

    // 2. BODY — main shape with 3D shading
    ctx.beginPath();
    ctx.moveTo(cx - rimW, rimY);
    // Left side: neck narrows, belly swells, tapers to base
    ctx.bezierCurveTo(cx - rimW * 1.02, neckY, cx - bodyW * 0.7, rimY + bodyH * 0.2, cx - bodyW, bellyY);
    ctx.bezierCurveTo(cx - bodyW * 1.02, bellyY + bodyH * 0.12, cx - bodyW * 0.7, bottomY - bodyH * 0.02, cx - bodyW * 0.55, bottomY);
    // Base
    ctx.lineTo(cx + bodyW * 0.55, bottomY);
    // Right side
    ctx.bezierCurveTo(cx + bodyW * 0.7, bottomY - bodyH * 0.02, cx + bodyW * 1.02, bellyY + bodyH * 0.12, cx + bodyW, bellyY);
    ctx.bezierCurveTo(cx + bodyW * 0.7, rimY + bodyH * 0.2, cx + rimW * 1.02, neckY, cx + rimW, rimY);
    ctx.closePath();

    // Body gradient — left shadow, center midtone, right highlight
    var bodyGrad = ctx.createLinearGradient(cx - bodyW * 1.1, rimY, cx + bodyW * 1.1, bottomY);
    bodyGrad.addColorStop(0, shade(baseColor, -35));
    bodyGrad.addColorStop(0.15, shade(baseColor, -20));
    bodyGrad.addColorStop(0.35, shade(baseColor, -5));
    bodyGrad.addColorStop(0.5, baseColor);
    bodyGrad.addColorStop(0.65, shade(baseColor, 10));
    bodyGrad.addColorStop(0.8, shade(baseColor, 20));
    bodyGrad.addColorStop(0.95, shade(baseColor, 5));
    bodyGrad.addColorStop(1, shade(baseColor, -15));
    ctx.fillStyle = bodyGrad;
    ctx.fill();

    // 3. SURFACE TEXTURE — subtle noise/grain
    ctx.save();
    ctx.clip();
    ctx.globalAlpha = 0.04;
    for (var sy = rimY; sy < bottomY; sy += 2) {
      for (var sx = cx - bodyW; sx < cx + bodyW; sx += 3) {
        if (Math.random() > 0.6) {
          ctx.fillStyle = Math.random() > 0.5 ? 'white' : 'black';
          ctx.fillRect(sx, sy, 1, 1);
        }
      }
    }
    ctx.restore();

    // 4. HIGHLIGHT STREAK — left-of-center vertical highlight
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cx - rimW * 0.6, rimY + bodyH * 0.05);
    ctx.bezierCurveTo(
      cx - bodyW * 0.55, bellyY - bodyH * 0.15,
      cx - bodyW * 0.5, bellyY + bodyH * 0.1,
      cx - bodyW * 0.45, bottomY - bodyH * 0.08
    );
    ctx.bezierCurveTo(
      cx - bodyW * 0.4, bottomY - bodyH * 0.05,
      cx - bodyW * 0.35, bellyY + bodyH * 0.12,
      cx - bodyW * 0.35, bellyY - bodyH * 0.1
    );
    ctx.bezierCurveTo(
      cx - bodyW * 0.38, rimY + bodyH * 0.15,
      cx - rimW * 0.4, rimY + bodyH * 0.06,
      cx - rimW * 0.6, rimY + bodyH * 0.05
    );
    ctx.closePath();
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.filter = 'blur(4px)';
    ctx.fill();
    ctx.restore();

    // 5. RIM — 3D ellipse with gradient
    ctx.beginPath();
    ctx.ellipse(cx, rimY, rimW, rimW * 0.26, 0, 0, Math.PI * 2);
    var rimGrad = ctx.createLinearGradient(cx - rimW, rimY - rimW * 0.3, cx + rimW, rimY + rimW * 0.3);
    rimGrad.addColorStop(0, shade(baseColor, -20));
    rimGrad.addColorStop(0.3, shade(baseColor, 5));
    rimGrad.addColorStop(0.6, shade(baseColor, 20));
    rimGrad.addColorStop(1, shade(baseColor, -10));
    ctx.fillStyle = rimGrad;
    ctx.fill();

    // 6. INNER RIM — dark opening
    ctx.beginPath();
    ctx.ellipse(cx, rimY, rimW * 0.75, rimW * 0.18, 0, 0, Math.PI * 2);
    var innerGrad = ctx.createRadialGradient(cx, rimY, 0, cx, rimY, rimW * 0.75);
    innerGrad.addColorStop(0, shade(baseColor, -40));
    innerGrad.addColorStop(0.6, shade(baseColor, -30));
    innerGrad.addColorStop(1, shade(baseColor, -15));
    ctx.fillStyle = innerGrad;
    ctx.fill();

    // 7. RIM EDGE — thin bright line on top edge
    ctx.beginPath();
    ctx.ellipse(cx, rimY, rimW, rimW * 0.26, 0, Math.PI, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // 8. BOTTOM EDGE shadow
    ctx.beginPath();
    ctx.moveTo(cx - bodyW * 0.55, bottomY);
    ctx.lineTo(cx + bodyW * 0.55, bottomY);
    ctx.strokeStyle = shade(baseColor, -25);
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = 0.3;
    ctx.stroke();
    ctx.globalAlpha = 1;

    // 9. OPTIONAL: Decorative band
    if (opts.bandColor) {
      var bandY = rimY + bodyH * (opts.bandPos || 0.35);
      ctx.strokeStyle = opts.bandColor;
      ctx.lineWidth = opts.bandWidth || 1.5;
      ctx.globalAlpha = opts.bandAlpha || 0.3;
      ctx.beginPath();
      ctx.ellipse(cx, bandY, bodyW * 0.92, 2.5, 0, 0, Math.PI * 2);
      ctx.stroke();
      if (opts.bandDouble) {
        ctx.beginPath();
        ctx.ellipse(cx, bandY + 7, bodyW * 0.9, 2, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }
  }

  // ---------------------------------------------------------------
  // ORGANIC LEAF
  // ---------------------------------------------------------------
  function drawLeaf(ctx, x, y, angle, len, w, color, alpha) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(w * 0.7, -len * 0.25, w * 0.9, -len * 0.65, 0, -len);
    ctx.bezierCurveTo(-w * 0.9, -len * 0.65, -w * 0.7, -len * 0.25, 0, 0);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.globalAlpha = alpha || 0.5;
    ctx.fill();
    // Vein
    ctx.beginPath();
    ctx.moveTo(0, -1);
    ctx.lineTo(0, -len * 0.88);
    ctx.strokeStyle = shade(color, -20);
    ctx.lineWidth = 0.6;
    ctx.globalAlpha = (alpha || 0.5) * 0.5;
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // ---------------------------------------------------------------
  // PAPER GRAIN OVERLAY
  // ---------------------------------------------------------------
  function drawPaperGrain(ctx, w, h, opacity) {
    ctx.save();
    ctx.globalAlpha = opacity || 0.06;
    // Horizontal linen lines
    ctx.fillStyle = 'rgba(139, 119, 101, 0.3)';
    for (var y = 0; y < h; y += 3) {
      ctx.fillRect(0, y, w, 0.5);
    }
    // Random grain dots
    ctx.fillStyle = 'rgba(80, 60, 45, 0.4)';
    for (var i = 0; i < h * w * 0.003; i++) {
      ctx.fillRect(Math.random() * w, Math.random() * h, 0.8, 0.8);
    }
    ctx.restore();
  }

  // ---------------------------------------------------------------
  // NAVIGATION + UI (unchanged)
  // ---------------------------------------------------------------
  function updateNavTime() {
    var el = document.getElementById('navTime');
    if (el) el.textContent = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }
  updateNavTime();
  setInterval(updateNavTime, 30000);

  function updateStudioTime() {
    var el = document.getElementById('footerStudio');
    if (el) el.textContent = 'Studio time: ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }
  updateStudioTime();
  setInterval(updateStudioTime, 1000);

  // Mobile menu
  var hamburger = document.getElementById('navHamburger');
  var mobileMenu = document.getElementById('mobileMenu');
  var isMenuOpen = false;
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    hamburger.classList.toggle('nav__hamburger--open', isMenuOpen);
    mobileMenu.classList.toggle('mobile-menu--open', isMenuOpen);
    mobileMenu.setAttribute('aria-hidden', !isMenuOpen);
    hamburger.setAttribute('aria-expanded', isMenuOpen);
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
  }
  if (hamburger) hamburger.addEventListener('click', toggleMenu);
  var mobileMenuClose = document.getElementById('mobileMenuClose');
  if (mobileMenuClose) mobileMenuClose.addEventListener('click', function () { if (isMenuOpen) toggleMenu(); });
  document.querySelectorAll('.mobile-menu__link').forEach(function (l) {
    l.addEventListener('click', function () { if (isMenuOpen) toggleMenu(); });
  });

  // Nav scroll — R1.1: nav stays sticky (auto-hide removed); only density + shadow change
  var nav = document.getElementById('nav');
  var toTop = document.getElementById('toTop');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    nav.classList.toggle('nav--scrolled', y > 60);
    if (toTop) toTop.classList.toggle('is-visible', y > 640);
  }, { passive: true });

  // Back to top — R1.2
  if (toTop) toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  // Smooth scroll
  document.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        var t = document.querySelector(href);
        if (t) window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
      }
    });
  });

  // Hero button
  var heroBtn = document.getElementById('heroBtn');
  if (heroBtn) heroBtn.addEventListener('click', function () {
    var t = document.getElementById('taller');
    if (t) window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  });

// ---------------------------------------------------------------
  // ARCH CANVAS — EL ARCO DEL SOL · A LIVING SCENE
  // Dawn over Ronda · the horno (kiln) burning · the wheel turning
  // ---------------------------------------------------------------
  var archCanvas = document.getElementById('archCanvas');
  var archCtx = null;
  var archDpr = 1;
  var archW = 0;
  var archH = 0;
  var archRaf = null;
  var archOn = false;
  var archInView = false;
  var archT0 = null;
  var archLastT = 0;
  var archReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // deterministic PRNG so the scene is identical on every load
  function mulberry32(a) {
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  function fitArchFrame() {
    if (!archCanvas) return;
    var parent = archCanvas.parentElement;
    if (!parent || typeof parent.getBoundingClientRect !== 'function') return;
    var rect = parent.getBoundingClientRect();
    archDpr = Math.min(2, window.devicePixelRatio || 1);
    archW = Math.max(120, rect.width);
    archH = Math.max(180, rect.height);
    archCanvas.width = Math.round(archW * archDpr);
    archCanvas.height = Math.round(archH * archDpr);
    archCanvas.style.width = archW + 'px';
    archCanvas.style.height = archH + 'px';
  }

  var MOTE_N = 30;
  var EMBER_N = 52;
  var motes = [];
  var embers = [];
  var flecks = [];
  var rngArch = mulberry32(1927);

  (function seedArch() {
    for (var i = 0; i < MOTE_N; i++) {
      motes.push({ x: rngArch(), y: rngArch() * 0.5, s: 0.5 + rngArch() * 1.2, ph: rngArch() * 6.283 });
    }
    for (var j = 0; j < EMBER_N; j++) {
      embers.push({
        x: 0.3 + (rngArch() - 0.5) * 0.16,
        y: 0.66 + rngArch() * 0.12,
        vy: 0.02 + rngArch() * 0.05,
        vx: (rngArch() - 0.5) * 0.012,
        sz: 0.7 + rngArch() * 2.2,
        age: rngArch() * 1,
        life: 1.2 + rngArch() * 2.4,
        tw: 3 + rngArch() * 6,
        ph: rngArch() * 6.283
      });
    }
    for (var f = 0; f < 30; f++) {
      flecks.push({ x: rngArch(), y: 0.9 + rngArch() * 0.09, s: 0.8 + rngArch() * 1.4 });
    }
  })();

  function resetEmber(e) {
    e.x = 0.3 + (rngArch() - 0.5) * 0.16;
    e.y = 0.68 + rngArch() * 0.06;
    e.vy = 0.02 + rngArch() * 0.05;
    e.age = 0;
    e.life = 1.2 + rngArch() * 2.4;
  }

  function updateEmbers(dt, t) {
    for (var i = 0; i < embers.length; i++) {
      var e = embers[i];
      e.age += dt;
      e.y -= e.vy * dt;
      e.x += e.vx * dt + Math.sin(t * e.tw + e.ph) * 0.00018;
      if (e.y < 0.52 || e.age >= e.life) resetEmber(e);
    }
  }
function drawScene(t, c) {
    var w = archW, h = archH;
    var ctx = archCtx;

    // Sky: slow-breathing dawn
    var sky = ctx.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, '#F2E3C6');
    sky.addColorStop(0.5, '#EFDCBB');
    sky.addColorStop(0.82, '#E6CDA4');
    sky.addColorStop(1, '#D9B98C');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    // Heat haze pooling above the kiln corner
    var haze = ctx.createRadialGradient(w * 0.28, h * 0.86, 0, w * 0.28, h * 0.86, w * 0.55);
    haze.addColorStop(0, 'rgba(255, 190, 120, 0.30)');
    haze.addColorStop(0.55, 'rgba(240, 160, 90, 0.12)');
    haze.addColorStop(1, 'rgba(240, 160, 90, 0)');
    ctx.fillStyle = haze;
    ctx.fillRect(0, 0, w, h);

    // Gold motes drifting high in the warm air
    for (var m = 0; m < motes.length; m++) {
      var mt = motes[m];
      var ma = 0.1 + 0.22 * (0.5 + 0.5 * Math.sin(t * 0.9 + mt.ph * 2));
      ctx.beginPath();
      ctx.arc(mt.x * w, mt.y * h * 0.85 + h * 0.02, mt.s, 0, 6.283);
      ctx.fillStyle = 'rgba(190, 130, 60, ' + (ma * 0.7).toFixed(3) + ')';
      ctx.fill();
    }

    // El sol: breathing halo, slowly turning its rays
    var sunX = w * 0.74;
    var sunY = h * 0.2;
    var breathe = 1 + 0.08 * Math.sin(t * 0.7);

    var halo = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, w * 0.32);
    halo.addColorStop(0, 'rgba(226, 174, 92, 0.55)');
    halo.addColorStop(0.5, 'rgba(226, 174, 92, 0.16)');
    halo.addColorStop(1, 'rgba(226, 174, 92, 0)');
    ctx.fillStyle = halo;
    ctx.fillRect(0, 0, w, h);

    ctx.save();
    ctx.translate(sunX, sunY);
    var rot = t * 0.06;
    ctx.strokeStyle = '#C9903B';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    for (var r8 = 0; r8 < 14; r8++) {
      var a8 = rot + (r8 / 14) * 6.283;
      var len = (10 + 4 * Math.sin(t * 1.7 + r8 * 2.1)) * breathe + 4;
      ctx.beginPath();
      ctx.moveTo(Math.cos(a8) * 25 * breathe, Math.sin(a8) * 25 * breathe);
      ctx.lineTo(Math.cos(a8) * (25 * breathe + len), Math.sin(a8) * (25 * breathe + len));
      ctx.globalAlpha = 0.4 + 0.2 * Math.sin(t * 1.3 + r8);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    var disc = ctx.createRadialGradient(0, 0, 0, 0, 0, 22 * breathe);
    disc.addColorStop(0, '#F2CD7E');
    disc.addColorStop(0.75, '#E0AE52');
    disc.addColorStop(1, '#C9903B');
    ctx.fillStyle = disc;
    ctx.beginPath();
    ctx.arc(0, 0, 22 * breathe, 0, 6.283);
    ctx.fill();
    ctx.restore();

    // Ronda's silhouette on the crest — houses and the church tower
    ctx.fillStyle = 'rgba(92, 101, 74, 0.42)';
    for (var hh = 0; hh < 5; hh++) {
      var hx = w * (0.06 + hh * 0.12) + Math.sin(t * 0.3 + hh) * 1.5;
      var hy = h * (0.66 - (hh % 2) * 0.018);
      ctx.fillRect(hx, hy, w * 0.022, h * 0.016);
    }
    ctx.fillRect(w * 0.5, h * 0.6, w * 0.02, h * 0.07);
    ctx.beginPath();
    ctx.moveTo(w * 0.496, h * 0.6);
    ctx.lineTo(w * 0.51, h * 0.6);
    ctx.lineTo(w * 0.503, h * 0.57);
    ctx.closePath();
    ctx.fill();

    // Far hills: olive, swaying a breath
    ctx.beginPath();
    ctx.moveTo(-4, h * 0.74);
    ctx.quadraticCurveTo(w * 0.18, h * (0.62 + 0.008 * Math.sin(t * 0.3)), w * 0.42, h * 0.71);
    ctx.quadraticCurveTo(w * 0.66, h * 0.69, w + 4, h * (0.72 + 0.006 * Math.sin(t * 0.4 + 2)));
    ctx.lineTo(w + 4, h);
    ctx.lineTo(-4, h);
    ctx.closePath();
    ctx.fillStyle = 'rgba(92, 110, 78, 0.5)';
    ctx.fill();

    // Mid hills: gold
    ctx.beginPath();
    ctx.moveTo(-4, h * 0.82);
    ctx.quadraticCurveTo(w * 0.24, h * (0.74 + 0.01 * Math.sin(t * 0.24 + 1)), w * 0.5, h * 0.8);
    ctx.quadraticCurveTo(w * 0.76, h * 0.79, w + 4, h * (0.81 + 0.008 * Math.sin(t * 0.3 + 3)));
    ctx.lineTo(w + 4, h);
    ctx.lineTo(-4, h);
    ctx.closePath();
    ctx.fillStyle = 'rgba(178, 128, 66, 0.42)';
    ctx.fill();
  }
function drawKlin(t, c, ctx, w, h) {
    var kx = w * 0.28;
    var kTopY = h * 0.55;
    var kBaseY = h * 0.94;
    var kHalf = w * 0.2;

    // Stone body of the horno
    var stone = ctx.createLinearGradient(kx - kHalf, 0, kx + kHalf, 0);
    stone.addColorStop(0, '#7A4A33');
    stone.addColorStop(0.35, '#9A5E40');
    stone.addColorStop(0.7, '#84503A');
    stone.addColorStop(1, '#6E3F2C');
    ctx.fillStyle = stone;
    ctx.beginPath();
    ctx.moveTo(kx - kHalf, kBaseY);
    ctx.lineTo(kx - kHalf * 0.82, kTopY + h * 0.1);
    ctx.quadraticCurveTo(kx - kHalf * 0.82, kTopY, kx, kTopY);
    ctx.quadraticCurveTo(kx + kHalf * 0.82, kTopY, kx + kHalf * 0.82, kTopY + h * 0.1);
    ctx.lineTo(kx + kHalf, kBaseY);
    ctx.closePath();
    ctx.fill();

    // Smoking chimney pipe from the kiln top
    ctx.fillStyle = 'rgba(74, 48, 34, 0.8)';
    ctx.fillRect(kx - w * 0.016, kTopY - h * 0.14, w * 0.032, h * 0.14);

    // Dark horno mouth
    var openW = kHalf * 1.14;
    var openTop = kTopY + h * 0.1;
    ctx.fillStyle = '#2E1B10';
    ctx.beginPath();
    ctx.moveTo(kx - openW, kBaseY);
    ctx.lineTo(kx - openW * 0.92, openTop);
    ctx.quadraticCurveTo(kx - openW * 0.92, openTop - h * 0.06, kx, openTop - h * 0.06);
    ctx.quadraticCurveTo(kx + openW * 0.92, openTop - h * 0.06, kx + openW * 0.92, openTop);
    ctx.lineTo(kx + openW, kBaseY);
    ctx.closePath();
    ctx.fill();

    // ---- The fire: three layered flame banners, flickering ----
    var flameBase = kBaseY - h * 0.02;
    var flick = Math.sin(t * 3.1) * 0.5 + Math.sin(t * 5.3 + 1.7) * 0.5;
    var fl1 = h * (0.16 + 0.02 * flick);
    var fl2 = h * (0.1 + 0.018 * flick);
    var fl3 = h * 0.055;

    var fo = ctx.createLinearGradient(0, flameBase, 0, flameBase - fl1);
    fo.addColorStop(0, 'rgba(214, 92, 40, 0.85)');
    fo.addColorStop(1, 'rgba(214, 92, 40, 0.02)');
    ctx.fillStyle = fo;
    ctx.beginPath();
    ctx.moveTo(kx - openW * 0.82, flameBase);
    ctx.quadraticCurveTo(kx - openW * 0.5, flameBase - fl1 * 0.7, kx, flameBase - fl1);
    ctx.quadraticCurveTo(kx + openW * 0.5, flameBase - fl1 * 0.7, kx + openW * 0.82, flameBase);
    ctx.closePath();
    ctx.fill();

    var fm = ctx.createLinearGradient(0, flameBase, 0, flameBase - fl2);
    fm.addColorStop(0, 'rgba(240, 150, 60, 0.9)');
    fm.addColorStop(1, 'rgba(240, 150, 60, 0.03)');
    ctx.fillStyle = fm;
    ctx.beginPath();
    ctx.moveTo(kx - openW * 0.6, flameBase);
    ctx.quadraticCurveTo(kx - openW * 0.32, flameBase - fl2 * 0.75, kx + openW * 0.04, flameBase - fl2);
    ctx.quadraticCurveTo(kx + openW * 0.4, flameBase - fl2 * 0.7, kx + openW * 0.6, flameBase);
    ctx.closePath();
    ctx.fill();

    var fc = ctx.createLinearGradient(0, flameBase, 0, flameBase - fl3);
    fc.addColorStop(0, 'rgba(255, 224, 160, 0.95)');
    fc.addColorStop(1, 'rgba(255, 224, 160, 0.05)');
    ctx.fillStyle = fc;
    ctx.beginPath();
    ctx.moveTo(kx - openW * 0.34, flameBase);
    ctx.quadraticCurveTo(kx - openW * 0.1, flameBase - fl3 * 0.75, kx, flameBase - fl3);
    ctx.quadraticCurveTo(kx + openW * 0.14, flameBase - fl3 * 0.72, kx + openW * 0.34, flameBase);
    ctx.closePath();
    ctx.fill();

    // Fire glow spilling across the courtyard
    var fg = ctx.createRadialGradient(kx, flameBase, 0, kx, flameBase, w * 0.42);
    fg.addColorStop(0, 'rgba(255, 176, 90, 0.5)');
    fg.addColorStop(0.5, 'rgba(255, 150, 70, 0.16)');
    fg.addColorStop(1, 'rgba(255, 150, 70, 0)');
    ctx.fillStyle = fg;
    ctx.fillRect(0, 0, w, h);
  }

  function drawWheel(t, c, ctx, w, h) {
    var wx = w * 0.76;
    var wy = h * 0.9;

    // wheel base
    ctx.fillStyle = 'rgba(74, 52, 36, 0.65)';
    ctx.beginPath();
    ctx.moveTo(wx - 20, wy + 4);
    ctx.lineTo(wx - 10, wy + 30);
    ctx.lineTo(wx + 10, wy + 30);
    ctx.lineTo(wx + 20, wy + 4);
    ctx.closePath();
    ctx.fill();

    // wheel disc
    ctx.beginPath();
    ctx.ellipse(wx, wy, 34, 8.5, 0, 0, 6.283);
    ctx.fillStyle = 'rgba(255, 236, 206, 0.92)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(126, 84, 52, 0.5)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // The wheel turns — a tick orbiting as it spins
    var ang = t * 1.1;
    ctx.strokeStyle = 'rgba(168, 78, 51, 0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(wx, wy + 4);
    ctx.lineTo(wx + Math.cos(ang) * 26, wy + Math.sin(ang) * 6);
    ctx.stroke();

    // The vessel being shaped — it gently grows
    var grow = 1 + 0.05 * Math.sin(t * 0.5);
    var vy = wy - 4;
    ctx.beginPath();
    ctx.moveTo(wx - 16 * grow, vy);
    ctx.quadraticCurveTo(wx - 24 * grow, vy - 22 * grow, wx - 11 * grow, vy - 34 * grow);
    ctx.quadraticCurveTo(wx, vy - 42 * grow, wx + 11 * grow, vy - 34 * grow);
    ctx.quadraticCurveTo(wx + 24 * grow, vy - 22 * grow, wx + 16 * grow, vy);
    ctx.lineTo(wx - 16 * grow, vy);
    ctx.closePath();
    var vg = ctx.createLinearGradient(wx - 20, vy - 40, wx + 20, vy);
    vg.addColorStop(0, '#C36A48');
    vg.addColorStop(0.5, c.clay);
    vg.addColorStop(1, c.clayDeep);
    ctx.fillStyle = vg;
    ctx.fill();

    // rim
    ctx.beginPath();
    ctx.ellipse(wx, vy, 17 * grow, 5, 0, 0, 6.283);
    ctx.strokeStyle = c.clayDeep;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // wet sheen gliding around as it spins
    var sheenX = wx + Math.cos(-t * 1.6) * 7 * grow;
    ctx.beginPath();
    ctx.ellipse(sheenX, vy - 14 * grow, 2.4, 7 * grow, -0.4, 0, 6.283);
    ctx.fillStyle = 'rgba(255, 236, 214, 0.4)';
    ctx.fill();
  }
function drawEmbers(t, ctx, w, h) {
    for (var i = 0; i < embers.length; i++) {
      var e = embers[i];
      var lf = Math.min(1, e.age / e.life);
      var a = 0.75 * (1 - lf) * (0.6 + 0.4 * Math.sin(t * e.tw + e.ph));
      if (a <= 0.02) continue;
      var x = e.x * w;
      var y = e.y * h;
      ctx.fillStyle = 'rgba(236, 140, 60, ' + a.toFixed(3) + ')';
      ctx.beginPath();
      ctx.arc(x, y, e.sz, 0, 6.283);
      ctx.fill();
      var sp = Math.sin(t * e.tw * 2 + e.ph);
      if (sp > 0.92) {
        ctx.strokeStyle = 'rgba(255, 226, 170, ' + (a * 0.8).toFixed(3) + ')';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x - 3, y); ctx.lineTo(x + 3, y);
        ctx.moveTo(x, y - 3); ctx.lineTo(x, y + 3);
        ctx.stroke();
      }
    }
  }

  function drawSmoke(t, ctx, w, h) {
    ctx.fillStyle = 'rgba(246, 241, 232, 0.55)';
    for (var k = 0; k < 7; k++) {
      var lift = ((t * 0.014) % 1 + k * 0.14);
      var sy = h * (0.62 - lift * 0.42);
      if (sy < h * 0.06) continue;
      var sx = w * 0.28 + Math.sin(t * 0.45 + k * 1.3) * w * 0.05 + lift * w * 0.03;
      var rad = w * (0.028 + lift * 0.045 + 0.006 * Math.sin(t * 0.8 + k));
      var sa = Math.max(0, 0.10 * (1 - lift));
      ctx.beginPath();
      ctx.arc(sx, sy, rad, 0, 6.283);
      ctx.globalAlpha = sa;
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function drawFore(t, ctx, w, h) {
    // courtyard floor
    var gr = ctx.createLinearGradient(0, h * 0.82, 0, h);
    gr.addColorStop(0, 'rgba(168, 78, 51, 0.32)');
    gr.addColorStop(1, 'rgba(143, 66, 41, 0.5)');
    ctx.fillStyle = gr;
    ctx.fillRect(0, h * 0.86, w, h * 0.14);

    // earthen seams
    ctx.strokeStyle = 'rgba(61, 37, 28, 0.18)';
    ctx.lineWidth = 1;
    for (var s = 0; s < 4; s++) {
      var sx2 = w * (0.1 + s * 0.26) + Math.sin(t * 0.2 + s) * 2;
      ctx.beginPath();
      ctx.moveTo(sx2, h * 0.88);
      ctx.quadraticCurveTo(sx2 + 6, h * 0.9, sx2 + 2, h * 0.94);
      ctx.stroke();
    }

    // dry grass tufts at the edges, swaying
    ctx.strokeStyle = 'rgba(92, 110, 74, 0.55)';
    ctx.lineWidth = 1.4;
    for (var g = 0; g < 6; g++) {
      var gx = (g < 3 ? 0 : w);
      var gy = h * 0.9 - (g % 3) * 4;
      for (var b = -1; b <= 1; b++) {
        ctx.beginPath();
        ctx.moveTo(gx, gy);
        ctx.quadraticCurveTo(gx + b * 4, gy - 8, gx + b * 7 + Math.sin(t * 0.8 + g + b) * 1.5, gy - 16 - (g % 3) * 3);
        ctx.stroke();
      }
    }

    // clay flecks on the ground
    ctx.fillStyle = 'rgba(51, 37, 28, 0.22)';
    for (var f = 0; f < flecks.length; f++) {
      var fl = flecks[f];
      ctx.beginPath();
      ctx.arc(fl.x * w, fl.y * h, fl.s, 0, 6.283);
      ctx.fill();
    }
  }

  function archRender(t) {
    if (!archCanvas) return;
    if (!archCtx) {
      archCtx = archCanvas.getContext('2d');
      fitArchFrame();
    }
    if (!archW || !archH) fitArchFrame();
    archCtx.setTransform(archDpr, 0, 0, archDpr, 0, 0);
    var c = getColors();
    drawScene(t, c);
    drawKlin(t, c, archCtx, archW, archH);
    drawWheel(t, c, archCtx, archW, archH);
    drawEmbers(t, archCtx, archW, archH);
    drawSmoke(t, archCtx, archW, archH);
    drawFore(t, archCtx, archW, archH);

    // soft frame vignette — keeps the eye on the fire
    var vig = archCtx.createRadialGradient(archW / 2, archH * 0.45, archW * 0.2, archW / 2, archH * 0.5, archW * 0.75);
    vig.addColorStop(0, 'rgba(40, 26, 18, 0)');
    vig.addColorStop(1, 'rgba(40, 26, 18, 0.22)');
    archCtx.fillStyle = vig;
    archCtx.fillRect(0, 0, archW, archH);
  }

  function archTick(now) {
    if (!archOn) return;
    if (archT0 === null) archT0 = now;
    var t = (now - archT0) / 1000;
    var dt = Math.min(0.1, t - archLastT);
    archLastT = t;
    if (dt > 0) updateEmbers(dt, t);
    archRender(t);
    archRaf = requestAnimationFrame(archTick);
  }

  function archStart() {
    if (archReduce || !archInView || !archCanvas) return;
    archOn = true;
    archT0 = null;
    archLastT = 0;
    if (archRaf) cancelAnimationFrame(archRaf);
    archRaf = requestAnimationFrame(archTick);
  }

  function archStop() {
    archOn = false;
    if (archRaf) {
      cancelAnimationFrame(archRaf);
      archRaf = null;
    }
  }

  function archResize() {
    fitArchFrame();
    if (archCanvas) archRender(archLastT || 0);
  }

  fitArchFrame();
  if (archReduce) {
    if (archCanvas) archRender(1.7);
  } else {
    archInView = true;
    archStart();
    var archObserver = new IntersectionObserver(function (entries) {
      archInView = entries[0].isIntersecting;
      if (archInView) archStart(); else archStop();
    }, { threshold: 0.05 });
    if (archCanvas) archObserver.observe(archCanvas);

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) archStop();
      else if (archInView) archStart();
    });
  }

  // ---------------------------------------------------------------
  // COURTYARD CANVASES
  // ---------------------------------------------------------------
  var courtyardCanvases = document.querySelectorAll('.courtyard__canvas');

  // ---------------------------------------------------------------
  // JOURNAL CANVASES
  // ---------------------------------------------------------------
  var journalCanvases = document.querySelectorAll('.journal-entry__canvas');

  function ochreC() {
    return {
      paper: '#F8F2E6', paper2: '#F2EADA', espresso: '#3A2C24',
      clay: '#B5643A', clayDk: '#8F4B2A', madder: '#9C3F33',
      ochre: '#C0913C', weld: '#D8B356', marig: '#CE7F3A',
      sage: '#8A8B6C', sageDk: '#66684E', indigo: '#46586B',
      indigoDk: '#33445A', rose: '#BC7F62', walnut: '#5C4636',
      cream: '#FDFBF7', line: 'rgba(58,44,36,0.55)'
    };
  }
  function ochrePaper(ctx, w, h, c) {
    ctx.fillStyle = c.paper; ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(58,44,36,0.05)'; ctx.lineWidth = 1;
    for (var x = 0; x < w; x += 6) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (var y = 0; y < h; y += 6) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
  }
  function ochrePlate(ctx, w, h, c, num) {
    ctx.strokeStyle = c.line; ctx.lineWidth = 1;
    ctx.strokeRect(10.5, 10.5, w - 21, h - 21);
    ctx.strokeStyle = 'rgba(58,44,36,0.25)';
    ctx.strokeRect(14.5, 14.5, w - 29, h - 29);
    if (num) {
      ctx.fillStyle = c.espresso; ctx.globalAlpha = 0.65;
      ctx.font = '9px "Tenor Sans", sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(num, w / 2, h - 20); ctx.globalAlpha = 1;
    }
  }
  function ochreRod(ctx, x1, x2, y, c) {
    ctx.fillStyle = c.walnut; ctx.fillRect(x1, y - 2.5, x2 - x1, 5);
    ctx.beginPath(); ctx.arc(x1, y, 4, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(x2, y, 4, 0, Math.PI * 2); ctx.fill();
  }
  function ochreCloth(ctx, x1, x2, y1, y2, base, dip, dipFrom) {
    ctx.fillStyle = base; ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
    if (dip) { ctx.fillStyle = dip; ctx.fillRect(x1, dipFrom, x2 - x1, y2 - dipFrom); }
    ctx.strokeStyle = 'rgba(58,44,36,0.18)'; ctx.lineWidth = 1;
    for (var yy = y1 + 5; yy < y2; yy += 5) {
      ctx.beginPath(); ctx.moveTo(x1, yy); ctx.lineTo(x2, yy); ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(58,44,36,0.35)';
    ctx.beginPath(); ctx.moveTo(x1 + .5, y1); ctx.lineTo(x1 + .5, y2);
    ctx.moveTo(x2 - .5, y1); ctx.lineTo(x2 - .5, y2); ctx.stroke();
  }
  function ochreStitch(ctx, x1, x2, y, color) {
    ctx.strokeStyle = color; ctx.lineWidth = 1.4; ctx.setLineDash([5, 4]);
    ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y); ctx.stroke();
    ctx.setLineDash([]);
  }
  function ochreChevrons(ctx, x1, x2, y, rows, step, color) {
    ctx.strokeStyle = color; ctx.lineWidth = 1.4;
    for (var r = 0; r < rows; r++) {
      ctx.beginPath();
      for (var x = x1, up = true; x <= x2; x += step) {
        var yy = y + r * 7 + (up ? 0 : 4); up = !up;
        if (x === x1) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
      }
      ctx.stroke();
    }
  }
  function ochreSun(ctx, x, y, r, c) {
    ctx.strokeStyle = c; ctx.lineWidth = 1.3;
    for (var a = 0; a < 12; a++) {
      var t = (Math.PI * 2 / 12) * a;
      ctx.beginPath();
      ctx.moveTo(x + Math.cos(t) * (r + 4), y + Math.sin(t) * (r + 4));
      ctx.lineTo(x + Math.cos(t) * (r + 11), y + Math.sin(t) * (r + 11));
      ctx.stroke();
    }
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = c; ctx.globalAlpha = 0.22;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 1;
  }
  function ochreSprig(ctx, x, y, len, c) {
    ctx.strokeStyle = c; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(x, y + len); ctx.quadraticCurveTo(x + 5, y + len / 2, x + 2, y); ctx.stroke();
    for (var i = 0; i < 4; i++) {
      var ly = y + len - (i + 1) * (len / 5), side = i % 2 ? 1 : -1;
      ctx.beginPath(); ctx.moveTo(x + 2 - side, ly);
      ctx.quadraticCurveTo(x + 2 + side * 11, ly - 4, x + 2 + side * 14, ly + 3);
      ctx.quadraticCurveTo(x + 2 + side * 9, ly + 4, x + 2 - side, ly); ctx.stroke();
    }
  }
  function ochreArch(ctx, x, y, w, h, c, rings) {
    ctx.strokeStyle = c; ctx.lineWidth = 1.2;
    for (var i = 0; i < rings; i++) {
      var inset = i * 7;
      ctx.beginPath();
      ctx.moveTo(x + inset, y + h);
      ctx.lineTo(x + inset, y - h * 0.28 + inset * 0.4);
      ctx.arc(x + w / 2, y - h * 0.28 + inset * 0.4, w / 2 - inset, Math.PI, 0, false);
      ctx.lineTo(x + w - inset, y + h); ctx.stroke();
    }
  }
  function ochreFit(canvas) {
    var rect = canvas.getBoundingClientRect(); /* R1.2: measure the canvas box, not the parent card — art now honors CSS caps */
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    var w = Math.max(rect.width, 10), h = Math.max(rect.height, 160);
    canvas.width = w * dpr; canvas.height = h * dpr;
    var ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx: ctx, w: w, h: h, c: ochreC() };
  }

  function drawCourtyardCanvas(canvas) {
    var f = ochreFit(canvas), ctx = f.ctx, w = f.w, h = f.h, c = f.c;
    var type = canvas.getAttribute('data-type');
    ochrePaper(ctx, w, h, c);
    var cx = w / 2, rodY = 34;
    var x1 = Math.max(26, w * 0.12), x2 = w - x1;
    var cy1 = rodY + 12, cy2 = h - 44;
    if (type === 'pottery') {            /* Madder Root */
      ochreRod(ctx, x1, x2, rodY, c);
      ochreCloth(ctx, x1 + 6, x2 - 6, cy1, cy2, c.cream, c.madder, cy1 + (cy2 - cy1) * 0.3);
      ochreStitch(ctx, x1 + 10, x2 - 10, cy2 - 8, 'rgba(253,251,247,0.8)');
      ochreSprig(ctx, cx - 7, cy2 + 12, 16, c.espresso);
    } else if (type === 'textile') {     /* Weld & Marigold */
      ochreRod(ctx, x1, x2, rodY, c);
      var bh = (cy2 - cy1) / 4;
      var bandCols = [c.weld, c.marig, c.weld, c.ochre];
      for (var i = 0; i < 4; i++) {
        ctx.fillStyle = bandCols[i];
        ctx.fillRect(x1 + 6, cy1 + i * bh, x2 - x1 - 12, bh);
      }
      ctx.strokeStyle = 'rgba(58,44,36,0.15)';
      for (var yy = cy1; yy < cy2; yy += 5) {
        ctx.beginPath(); ctx.moveTo(x1 + 6, yy); ctx.lineTo(x2 - 6, yy); ctx.stroke();
      }
      ochreChevrons(ctx, x1 + 14, x2 - 14, cy1 + 8, 2, 9, c.espresso);
      ochreSun(ctx, cx, cy2 + 4, 8, c.ochre);
    } else if (type === 'botanical') {   /* Walnut Hull */
      ochreRod(ctx, x1, x2, rodY, c);
      ochreCloth(ctx, x1 + 6, x2 - 6, cy1, cy2, c.cream, c.walnut, cy1 + (cy2 - cy1) * 0.18);
      ochreSprig(ctx, cx - 8, cy1 + (cy2 - cy1) * 0.42, 26, c.cream);
      ochreStitch(ctx, x1 + 10, x2 - 10, cy2 - 8, 'rgba(253,251,247,0.7)');
    } else if (type === 'ceramic') {     /* Indigo Vat — shibori */
      ochreRod(ctx, x1, x2, rodY, c);
      ctx.fillStyle = c.indigo; ctx.fillRect(x1 + 6, cy1, x2 - x1 - 12, cy2 - cy1);
      ctx.fillStyle = c.cream;
      for (var r = 0; r < 3; r++) {
        for (var k = 0; k < 3; k++) {
          var sx = x1 + 22 + k * ((x2 - x1 - 44) / 2), sy = cy1 + 18 + r * ((cy2 - cy1 - 30) / 2.4);
          ctx.beginPath(); ctx.arc(sx, sy, 7, 0, Math.PI * 2); ctx.fill();
          ctx.strokeStyle = c.indigo; ctx.beginPath(); ctx.arc(sx, sy, 10, 0, Math.PI * 2); ctx.stroke();
        }
      }
      ochreStitch(ctx, x1 + 10, x2 - 10, cy2 - 8, 'rgba(253,251,247,0.75)');
    } else if (type === 'weave') {       /* Cochineal */
      ochreRod(ctx, x1, x2, rodY, c);
      ctx.fillStyle = c.rose; ctx.fillRect(x1 + 6, cy1, x2 - x1 - 12, cy2 - cy1);
      ctx.strokeStyle = 'rgba(58,44,36,0.22)';
      for (var wy = cy1; wy < cy2; wy += 6) {
        ctx.beginPath(); ctx.moveTo(x1 + 6, wy); ctx.lineTo(x2 - 6, wy); ctx.stroke();
      }
      ctx.fillStyle = c.clayDk;
      for (var wx = x1 + 12; wx < x2 - 12; wx += 14) {
        ctx.fillRect(wx, cy1 + (cy2 - cy1) * 0.42, 7, (cy2 - cy1) * 0.16);
      }
      ochreStitch(ctx, x1 + 10, x2 - 10, cy2 - 8, 'rgba(253,251,247,0.8)');
    } else {                             /* The Dye Yard */
      ochreArch(ctx, cx - w * 0.3, h - 26, w * 0.6, h * 0.42, c.line, 3);
      ochreSun(ctx, cx + w * 0.16, h * 0.3, 12, c.ochre);
      var ry = h * 0.3;
      ctx.strokeStyle = c.espresso; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(cx - w * 0.34, ry); ctx.lineTo(cx + w * 0.34, ry); ctx.stroke();
      var cloths = [c.madder, c.weld, c.indigo];
      for (var d = 0; d < 3; d++) {
        var dx = cx - w * 0.24 + d * w * 0.22;
        ctx.fillStyle = cloths[d];
        ctx.fillRect(dx - 9, ry, 18, h * 0.3 + (d % 2) * 8);
        ctx.strokeStyle = 'rgba(58,44,36,0.15)';
        for (var ly = ry + 4; ly < ry + h * 0.3; ly += 4) {
          ctx.beginPath(); ctx.moveTo(dx - 9, ly); ctx.lineTo(dx + 9, ly); ctx.stroke();
        }
      }
      ochreStitch(ctx, 24, w - 24, h - 26, c.line);
    }
    ochrePlate(ctx, w, h, c, 'PLATE ' + (['pottery','textile','botanical','ceramic','weave','space'].indexOf(type) + 1));
  }

  // ---------------------------------------------------------------
  // LAZY CANVAS RENDERING
  // ---------------------------------------------------------------
  var canvasObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var canvas = entry.target;
        if (canvas.classList.contains('courtyard__canvas')) drawCourtyardCanvas(canvas);
        else if (canvas.classList.contains('journal-entry__canvas')) drawJournalCanvas(canvas);
        else if (canvas.id === 'glazeCanvas') drawGlazeVessel();
        canvasObserver.unobserve(canvas);
      }
    });
  }, { threshold: 0.05, rootMargin: '100px' });

  courtyardCanvases.forEach(function (c) { canvasObserver.observe(c); });
  journalCanvases.forEach(function (c) { canvasObserver.observe(c); });

  // ---------------------------------------------------------------
  // DYE BATHS — cloth plate
  // ---------------------------------------------------------------
  var glazeCanvas = document.getElementById('glazeCanvas');
  var glazeLabel = document.getElementById('glazeLabel');
  function drawGlazeVessel() {
    if (!glazeCanvas) return;
    var ctx = glazeCanvas.getContext('2d');
    var c = ochreC();
    var g = glazeData[currentGlaze];
    var rect = glazeCanvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    glazeCanvas.width = rect.width * dpr;
    glazeCanvas.height = rect.height * dpr;
    glazeCanvas.style.width = rect.width + 'px';
    glazeCanvas.style.height = rect.height + 'px';
    ctx.scale(dpr, dpr);
    var w = rect.width, h = rect.height;

    ochrePaper(ctx, w, h, c);

    /* the vat — a wide dye bath */
    var vx = w * 0.16, vy = h * 0.30, vw = w * 0.68, vh = h * 0.42;
    ctx.fillStyle = g.body;
    ctx.beginPath();
    ctx.moveTo(vx, vy);
    ctx.lineTo(vx + vw, vy);
    ctx.lineTo(vx + vw, vy + vh - 10);
    ctx.quadraticCurveTo(vx + vw / 2, vy + vh + 14, vx, vy + vh - 10);
    ctx.closePath(); ctx.fill();
    /* surface ripples */
    ctx.strokeStyle = 'rgba(253,251,247,0.35)'; ctx.lineWidth = 1.2;
    for (var r2 = 1; r2 <= 3; r2++) {
      var ryy = vy + (vh * r2 / 4);
      ctx.beginPath();
      ctx.moveTo(vx + 10, ryy);
      ctx.quadraticCurveTo(vx + vw / 2, ryy + 4, vx + vw - 10, ryy);
      ctx.stroke();
    }
    /* dipping cloth on a rod above the bath */
    var rodY = vy - 26;
    ochreRod(ctx, vx + 6, vx + vw - 6, rodY, c);
    var cx2 = vx + vw / 2;
    ctx.fillStyle = c.cream;
    ctx.fillRect(cx2 - 16, rodY, 32, 34);
    var dg = ctx.createLinearGradient(0, rodY + 12, 0, rodY + 34);
    dg.addColorStop(0, 'rgba(253,251,247,0)');
    dg.addColorStop(1, g.body);
    ctx.fillStyle = dg;
    ctx.fillRect(cx2 - 16, rodY + 12, 32, 22);
    ctx.strokeStyle = 'rgba(58,44,36,0.3)';
    ctx.strokeRect(cx2 - 16 + .5, rodY + .5, 31, 33);
    /* steam marks */
    ctx.strokeStyle = 'rgba(58,44,36,0.28)'; ctx.lineWidth = 1.2;
    for (var s = -1; s <= 1; s++) {
      ctx.beginPath();
      ctx.moveTo(cx2 + s * 26, vy - 16);
      ctx.quadraticCurveTo(cx2 + s * 26 + 5, vy - 26, cx2 + s * 26, vy - 36);
      ctx.stroke();
    }
    /* mordant ring */
    ctx.strokeStyle = g.accent; ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.arc(vx + vw - 22, vy + vh + 4, 6, 0, Math.PI * 2); ctx.stroke();
    ochreSun(ctx, w - 40, 40, 9, c.ochre);
    ochrePlate(ctx, w, h, c, g.label ? String(g.label).toUpperCase() : 'DYE BATH');
  }

  var currentGlaze = 'talavera';
  var glazeData = {
    talavera: { body: '#9C3F33', accent: '#3A2C24', label: 'Madder Root Bath · No. 01', pattern: 'madder' },
    verde:    { body: '#D8B356', accent: '#8F4B2A', label: 'Weld & Marigold · No. 02', pattern: 'weld' },
    negro:    { body: '#5C4636', accent: '#B5643A', label: 'Walnut Hull Bath · No. 03', pattern: 'walnut' },
    raku:     { body: '#46586B', accent: '#D8B356', label: 'Indigo Vat · No. 04', pattern: 'indigo' }
  };

  function drawJournalCanvas(canvas) {
    var ctx = canvas.getContext('2d');
    var c = ochreC();
    var type = canvas.getAttribute('data-type') || 'journal1';
    var rect = canvas.parentElement.getBoundingClientRect();
    if (!rect.width) return;
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    var h = 200;
    canvas.width = rect.width * dpr;
    canvas.height = h * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = h + 'px';
    ctx.scale(dpr, dpr);
    var w = rect.width;

    ochrePaper(ctx, w, h, c);

    if (type === 'journal2') {          /* loom diagram */
      var lx = 30, rx = w - 30, ly = 40, lyy = h - 46;
      ctx.strokeStyle = 'rgba(58,44,36,0.28)'; ctx.lineWidth = 1;
      for (var wx = lx; wx <= rx; wx += 9) {
        ctx.beginPath(); ctx.moveTo(wx, ly); ctx.lineTo(wx, lyy); ctx.stroke();
      }
      var weft = [c.madder, c.indigo, c.weld];
      for (var r = 0; r < 3; r++) {
        var wy = ly + 26 + r * 30;
        ctx.fillStyle = weft[r];
        ctx.fillRect(lx, wy - 5, rx - lx, 10);
      }
      ctx.fillStyle = c.walnut;
      ctx.fillRect(lx - 8, ly - 12, rx - lx + 16, 6);
      ctx.beginPath(); ctx.arc(lx - 10, ly - 9, 4, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(rx + 10, ly - 9, 4, 0, Math.PI * 2); ctx.fill();
      ochreStitch(ctx, lx, rx, lyy + 8, 'rgba(58,44,36,0.3)');
      ochrePlate(ctx, w, h, c, 'LOOM 02');
    } else if (type === 'journal3') {   /* botanical study */
      ochreSprig(ctx, w / 2 - 14, h * 0.3, 66, c.sageDk);
      ochreSun(ctx, w - 40, 44, 10, c.ochre);
      ctx.strokeStyle = c.line; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(w / 2 + 6, h * 0.44); ctx.lineTo(w - 56, h * 0.44); ctx.stroke();
      ctx.fillStyle = c.espresso; ctx.globalAlpha = 0.6;
      ctx.font = '9px "Tenor Sans", sans-serif'; ctx.textAlign = 'right';
      ctx.fillText('root · weld · sun', w - 34, h * 0.47);
      ctx.globalAlpha = 1;
      ochreStitch(ctx, 30, w - 30, h - 50, 'rgba(58,44,36,0.3)');
      ochrePlate(ctx, w, h, c, 'STUDY 03');
    } else {                            /* journal1 — dye recipe card */
      var sw = [c.madder, c.weld, c.walnut];
      for (var i = 0; i < 3; i++) {
        var sy = 46 + i * 34;
        ctx.fillStyle = sw[i];
        ctx.beginPath(); ctx.arc(46, sy, 11, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = c.line; ctx.lineWidth = 1; ctx.stroke();
        ochreStitch(ctx, 70, w - 40, sy - 3, 'rgba(58,44,36,0.35)');
        ochreStitch(ctx, 70, w - 90, sy + 6, 'rgba(58,44,36,0.2)');
      }
      ochreSun(ctx, w - 34, 32, 8, c.ochre);
      ochrePlate(ctx, w, h, c, 'RECIPE 01');
    }
  }

  // Glaze swatches
  document.querySelectorAll('.glaze-swatch').forEach(function (swatch) {
    swatch.addEventListener('click', function () {
      var glaze = this.getAttribute('data-glaze');
      if (glaze === currentGlaze) return;
      currentGlaze = glaze;
      document.querySelectorAll('.glaze-swatch').forEach(function (s) {
        s.classList.remove('glaze-swatch--active');
        s.setAttribute('aria-checked', 'false');
      });
      this.classList.add('glaze-swatch--active');
      this.setAttribute('aria-checked', 'true');
      if (glazeLabel) glazeLabel.textContent = glazeData[glaze].label;
      drawGlazeVessel();
      showToast('info', 'Glaze changed to ' + glazeData[glaze].label);
    });
  });

  if (glazeCanvas) canvasObserver.observe(glazeCanvas);

  // ---------------------------------------------------------------
  // COUNTER ANIMATION
  // ---------------------------------------------------------------
  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var startTime = null;
    function step(ts) {
      if (!startTime) startTime = ts;
      var p = Math.min((ts - startTime) / 1800, 1);
      el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target).toLocaleString();
      if (p < 1) requestAnimationFrame(step); else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(step);
  }

  // ---------------------------------------------------------------
  // OCHRE R1.1 — DATA-REVEAL (hero copy + plates rise on first view)
  // ---------------------------------------------------------------
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-in');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { revealObs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('reveal-in'); });
  }

  // ---------------------------------------------------------------
  // SCROLL REVEAL
  // ---------------------------------------------------------------
  var fadeEls = document.querySelectorAll(
    '.philosophy__inner, .courtyard__card, .journal-entry, .studio__inner, ' +
    '.price-pod, .faq-item, .connect__inner, .maker-letter, ' +
    '.timeline__entry, .glaze-lab__inner, .process'
  );
  fadeEls.forEach(function (el) { el.classList.add('fade-in'); });
  var obsv = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in--visible');
        entry.target.querySelectorAll('[data-count]').forEach(animateCounter);
        obsv.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  fadeEls.forEach(function (el) { obsv.observe(el); });

  // ---------------------------------------------------------------
  // FAQ
  // ---------------------------------------------------------------
  document.querySelectorAll('.faq-item__trigger').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var item = this.closest('.faq-item');
      var isOpen = item.classList.contains('faq-item--open');
      document.querySelectorAll('.faq-item').forEach(function (fi) {
        fi.classList.remove('faq-item--open');
        fi.querySelector('.faq-item__trigger').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('faq-item--open');
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ---------------------------------------------------------------
  // CONTACT FORM
  // ---------------------------------------------------------------
  var form = document.getElementById('connectForm');
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('formName').value.trim();
    showToast('success', name ? 'Thank you, ' + name + '! Your vision warms our studio. ☀' : 'Message sent! We\'ll be in touch. 🌿');
    this.reset();
  });

  // ---------------------------------------------------------------
  // TOAST
  // ------------------------------------------------;
  var toastBox = document.getElementById('toastContainer');
  function showToast(type, msg) {
    if (!toastBox) return;
    var t = document.createElement('div');
    t.className = 'toast toast--' + type;
    t.innerHTML = '<span>' + ({ success: '🌿', error: '🍂', info: '☀' }[type] || '✦') + '</span><span>' + msg + '</span>';
    toastBox.appendChild(t);
    setTimeout(function () {
      t.style.animation = 'toastOut 0.4s ease forwards';
      setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 400);
    }, 3500);
  }

  // ---------------------------------------------------------------
  // SUN DIVIDER + ACTIVE NAV + PARALLAX
  // ---------------------------------------------------------------
  var sunObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('sun-divider--visible'); sunObs.unobserve(e.target); } });
  }, { threshold: 0.5 });
  document.querySelectorAll('.sun-divider').forEach(function (d) { sunObs.observe(d); });

  var secs = document.querySelectorAll('section[id]');
  var nLinks = document.querySelectorAll('.nav__link');
  function updateActiveNav() {
    var sy = window.scrollY + 120;
    secs.forEach(function (s) {
      if (sy >= s.offsetTop && sy < s.offsetTop + s.offsetHeight) {
        nLinks.forEach(function (l) {
          l.classList.toggle('nav__link--active', l.getAttribute('href') === '#' + s.getAttribute('id'));
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });

  var heroText = document.querySelector('.hero__text');
  var heroStamp = document.querySelector('.hero__stamp');
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ((heroText || heroStamp) && !reduceMotion) {
    // Layered parallax (Plan §39): copy drifts slower than the stamp.
    var heroParLayer = [];
    if (heroText) heroParLayer.push({ el: heroText, rate: 0.045, base: '' });
    if (heroStamp) heroParLayer.push({ el: heroStamp, rate: 0.1, base: 'rotate(-1.2deg)' });
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      if (y > 1400) return;
      heroParLayer.forEach(function (l) {
        l.el.style.transform = 'translateY(' + (y * l.rate).toFixed(1) + 'px)' + l.base;
      });
    }, { passive: true });
  }

  // ---------------------------------------------------------------
  // RESIZE
  // ---------------------------------------------------------------
  var rTimer;
  window.addEventListener('resize', function () {
    clearTimeout(rTimer);
    rTimer = setTimeout(function () {
      archResize();
      courtyardCanvases.forEach(drawCourtyardCanvas);
      journalCanvases.forEach(drawJournalCanvas);
      drawGlazeVessel();
    }, 250);
  });

})();
