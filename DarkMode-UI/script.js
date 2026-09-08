/* ============================================
   LUMEN — INTERACTIVE ENGINE
   ============================================ */
(function () {
  'use strict';

  // ---------------------------------------------------------------
  // CONFIGURATION
  // ---------------------------------------------------------------
  var config = {
    chartSpeed: 2,
    spotlightEnabled: true,
    scrollAnimationsEnabled: true
  };

  // ---------------------------------------------------------------
  // THEME TOGGLE
  // ---------------------------------------------------------------
  var themeToggle = document.getElementById('themeToggle');
  var html = document.documentElement;

  // Load saved theme or respect OS preference
  var savedTheme = localStorage.getItem('lumen-theme');
  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    html.setAttribute('data-theme', 'light');
  }

  function toggleTheme() {
    var current = html.getAttribute('data-theme');
    var next = current === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('lumen-theme', next);
    refreshChartPalette();
    // Re-apply opacity slider value
    var val = parseInt(opacitySlider ? opacitySlider.value : 100);
    if (opacityValue) opacityValue.textContent = val + '%';
    document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card, .integration-card, .showcase__stat').forEach(function (card) {
      card.style.setProperty('--card-opacity', val / 100);
    });
  }

  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
  var themeToggleMobile = document.getElementById('themeToggleMobile');
  if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

  // ---------------------------------------------------------------
  // MOBILE NAVIGATION
  // ---------------------------------------------------------------
  var navToggle = document.getElementById('navToggle');
  var mobileMenu = document.getElementById('mobileMenu');
  var nav = document.getElementById('nav');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.contains('nav__mobile--open');
      if (isOpen) {
        mobileMenu.classList.remove('nav__mobile--open');
        navToggle.classList.remove('nav__toggle--active');
        navToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      } else {
        mobileMenu.classList.add('nav__mobile--open');
        navToggle.classList.add('nav__toggle--active');
        navToggle.setAttribute('aria-expanded', 'true');
        mobileMenu.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('nav__mobile--open');
        navToggle.classList.remove('nav__toggle--active');
        navToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  }

  // ---------------------------------------------------------------
  // NAV SCROLL STATE
  // ---------------------------------------------------------------
  window.addEventListener('scroll', function () {
    if (nav) {
      nav.classList.toggle('nav--scrolled', window.scrollY > 40);
    }
  }, { passive: true });

  // ---------------------------------------------------------------
  // CHART SPEED HELPER — accessible to both charts
  // ---------------------------------------------------------------
  function getSpeedMultiplier() {
    // 1=slow: every 8 frames, 2=normal: every 4 frames, 3=fast: every 2 frames
    return config.chartSpeed === 1 ? 8 : config.chartSpeed === 2 ? 4 : 2;
  }

  // ---------------------------------------------------------------
  // THEME-AWARE CHART PALETTE
  // ---------------------------------------------------------------
  var chartPalette = {
    line: '#C9A96E',
    lineGlow: 'rgba(201,169,110,0.15)',
    fillTop: 'rgba(201,169,110,0.12)',
    fillMid: 'rgba(201,169,110,0.04)',
    dotGlow: 'rgba(201,169,110,0.3)',
    grid: 'rgba(255,255,255,0.04)',
    line2: 'rgba(148, 163, 184, 0.2)'
  };

  function refreshChartPalette() {
    var isLight = html.getAttribute('data-theme') === 'light';
    if (isLight) {
      chartPalette.grid = 'rgba(0,0,0,0.12)';
      chartPalette.line = '#92702A';
      chartPalette.lineGlow = 'rgba(146,112,42,0.15)';
      chartPalette.fillTop = 'rgba(146,112,42,0.10)';
      chartPalette.fillMid = 'rgba(146,112,42,0.03)';
      chartPalette.dotGlow = 'rgba(146,112,42,0.25)';
      chartPalette.line2 = 'rgba(87,83,78,0.25)';
    } else {
      chartPalette.grid = 'rgba(255,255,255,0.04)';
      chartPalette.line = '#C9A96E';
      chartPalette.lineGlow = 'rgba(201,169,110,0.15)';
      chartPalette.fillTop = 'rgba(201,169,110,0.12)';
      chartPalette.fillMid = 'rgba(201,169,110,0.04)';
      chartPalette.dotGlow = 'rgba(201,169,110,0.3)';
      chartPalette.line2 = 'rgba(148, 163, 184, 0.2)';
    }
  }
  refreshChartPalette();

  // Shared smooth bezier helper (defined once, not per-frame)
  function drawSmoothLine(ctx, pts) {
    if (pts.length < 2) return;
    ctx.moveTo(pts[0].x, pts[0].y);
    for (var i = 0; i < pts.length - 1; i++) {
      var p0 = pts[Math.max(i - 1, 0)];
      var p1 = pts[i];
      var p2 = pts[i + 1];
      var p3 = pts[Math.min(i + 2, pts.length - 1)];
      ctx.bezierCurveTo(
        p1.x + (p2.x - p0.x) / 6, p1.y + (p2.y - p0.y) / 6,
        p2.x - (p3.x - p1.x) / 6, p2.y - (p3.y - p1.y) / 6,
        p2.x, p2.y
      );
    }
  }

  // ---------------------------------------------------------------
  // HERO CHART
  // ---------------------------------------------------------------
  var heroCanvas = document.getElementById('heroChart');
  if (heroCanvas) {
    var hCtx = heroCanvas.getContext('2d');
    var hData = [];
    var hTime = 0;
    var hFrameCount = 0;
    var hW = 0, hH = 0; // cached dimensions

    function resizeHeroChart() {
      var rect = heroCanvas.getBoundingClientRect();
      var dpr = window.devicePixelRatio || 1;
      hW = rect.width;
      hH = rect.height;
      heroCanvas.width = hW * dpr;
      heroCanvas.height = hH * dpr;
      hCtx.setTransform(1, 0, 0, 1, 0, 0);
      hCtx.scale(dpr, dpr);
    }
    resizeHeroChart();
    window.addEventListener('resize', resizeHeroChart);

    for (var i = 0; i < 100; i++) {
      hData.push(40 + Math.sin(i * 0.12) * 12 + Math.random() * 6);
    }

    function drawHeroChart() {
      var w = hW;
      var h = hH;
      hCtx.clearRect(0, 0, w, h);

      // Subtle dot grid (palette-aware)
      hCtx.fillStyle = chartPalette.grid;
      for (var gx = 20; gx < w; gx += 24) {
        for (var gy = 20; gy < h; gy += 24) {
          hCtx.beginPath();
          hCtx.arc(gx, gy, 1, 0, Math.PI * 2);
          hCtx.fill();
        }
      }

      // New data point — slower
      hFrameCount++;
      if (hFrameCount % getSpeedMultiplier() === 0) {
        hData.push(40 + Math.sin(hTime * 0.04) * 12 + (Math.random() - 0.5) * 8);
        if (hData.length > 100) hData.shift();
        hTime++;
      }

      // Build points array
      var points = [];
      for (var j = 0; j < hData.length; j++) {
        points.push({
          x: (j / (hData.length - 1)) * w,
          y: h - (hData[j] / 100) * h * 0.85 - h * 0.05
        });
      }

      // Line glow (wider, fainter)
      hCtx.save();
      hCtx.strokeStyle = chartPalette.lineGlow;
      hCtx.lineWidth = 6;
      hCtx.lineCap = 'round';
      hCtx.lineJoin = 'round';
      hCtx.beginPath();
      drawSmoothLine(hCtx, points);
      hCtx.stroke();
      hCtx.restore();

      // Main line
      hCtx.strokeStyle = chartPalette.line;
      hCtx.lineWidth = 2;
      hCtx.lineCap = 'round';
      hCtx.lineJoin = 'round';
      hCtx.beginPath();
      drawSmoothLine(hCtx, points);
      hCtx.stroke();

      // Area fill
      hCtx.lineTo(w, h);
      hCtx.lineTo(0, h);
      hCtx.closePath();
      var grad = hCtx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, chartPalette.fillTop);
      grad.addColorStop(0.5, chartPalette.fillMid);
      grad.addColorStop(1, 'rgba(201,169,110,0)');
      hCtx.fillStyle = grad;
      hCtx.fill();

      // Latest point — glow dot
      var last = points[points.length - 1];
      hCtx.fillStyle = chartPalette.dotGlow;
      hCtx.beginPath();
      hCtx.arc(last.x, last.y, 8, 0, Math.PI * 2);
      hCtx.fill();
      hCtx.fillStyle = chartPalette.line;
      hCtx.beginPath();
      hCtx.arc(last.x, last.y, 3, 0, Math.PI * 2);
      hCtx.fill();

      requestAnimationFrame(drawHeroChart);
    }
    drawHeroChart();
  }

  // ---------------------------------------------------------------
  // HERO PROOF — Counter Animation
  // ---------------------------------------------------------------
  var proofValues = document.querySelectorAll('.hero__proof-value');
  if (proofValues.length) {
    var proofData = [
      { target: 2400, suffix: '+', decimals: 0 },
      { target: 99.98, suffix: '%', decimals: 2 },
      { target: 8, suffix: 'ms', decimals: 0, prefix: '<' }
    ];
    var proofAnimated = false;

    function animateCounters() {
      if (proofAnimated) return;
      proofAnimated = true;
      var duration = 1500;
      var start = performance.now();

      function step(now) {
        var progress = Math.min((now - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);

        proofValues.forEach(function (el, idx) {
          var d = proofData[idx];
          if (!d) return;
          var current = eased * d.target;
          var formatted;
          if (d.decimals > 0) {
            formatted = current.toFixed(d.decimals);
          } else {
            formatted = Math.round(current).toLocaleString();
          }
          el.textContent = (d.prefix || '') + formatted + d.suffix;
        });

        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    var proofObserver = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) animateCounters();
    }, { threshold: 0.5 });
    proofObserver.observe(proofValues[0].closest('.hero__proof'));
  }

  // ---------------------------------------------------------------
  // SHOWCASE CHART — Slower, more realistic
  // ---------------------------------------------------------------
  // Shared range configuration (used by both chart init and tab switching)
  var sRangeData = {
    '7 days':  { amp: 18, freq: 0.1, noise: 5, label: 'Last 7 days' },
    '30 days': { amp: 25, freq: 0.06, noise: 8, label: 'Last 30 days' },
    '90 days': { amp: 35, freq: 0.03, noise: 12, label: 'Last 90 days' }
  };
  sRangeData.active = sRangeData['7 days'];

  var showcaseCanvas = document.getElementById('showcaseChart');
  if (showcaseCanvas) {
    var sCtx = showcaseCanvas.getContext('2d');
    var sData1 = [];
    var sData2 = [];
    var sTime = 0;
    var sFrameCount = 0;
    var sW = 0, sH = 0;

    function resizeShowcaseChart() {
      var rect = showcaseCanvas.getBoundingClientRect();
      var dpr = window.devicePixelRatio || 1;
      sW = rect.width;
      sH = rect.height;
      showcaseCanvas.width = sW * dpr;
      showcaseCanvas.height = sH * dpr;
      sCtx.setTransform(1, 0, 0, 1, 0, 0);
      sCtx.scale(dpr, dpr);
    }
    resizeShowcaseChart();
    window.addEventListener('resize', resizeShowcaseChart);

    for (var k = 0; k < 80; k++) {
      var sk = sRangeData.active;
      sData1.push(50 + Math.sin(k * sk.freq) * sk.amp + Math.random() * sk.noise);
      sData2.push(30 + Math.cos(k * sk.freq * 0.8) * (sk.amp * 0.6) + Math.random() * (sk.noise * 0.7));
    }

    function drawShowcaseChart() {
      var w = sW;
      var h = sH;
      sCtx.clearRect(0, 0, w, h);

      // Subtle dot grid (palette-aware)
      sCtx.fillStyle = chartPalette.grid;
      for (var gx = 20; gx < w; gx += 28) {
        for (var gy = 20; gy < h; gy += 28) {
          sCtx.beginPath();
          sCtx.arc(gx, gy, 1, 0, Math.PI * 2);
          sCtx.fill();
        }
      }

      // New data — slower
      sFrameCount++;
      if (sFrameCount % getSpeedMultiplier() === 0) {
        var r = sRangeData.active;
        sData1.push(50 + Math.sin(sTime * r.freq) * r.amp + (Math.random() - 0.5) * r.noise);
        sData2.push(30 + Math.cos(sTime * r.freq * 0.8) * (r.amp * 0.6) + (Math.random() - 0.5) * (r.noise * 0.7));
        if (sData1.length > 80) { sData1.shift(); sData2.shift(); }
        sTime++;
      }

      // Build points for line 1
      var pts1 = [];
      for (var a = 0; a < sData1.length; a++) {
        pts1.push({
          x: (a / (sData1.length - 1)) * w,
          y: h - (sData1[a] / 100) * h * 0.85 - h * 0.05
        });
      }

      // Line 1 glow
      sCtx.save();
      sCtx.strokeStyle = chartPalette.lineGlow;
      sCtx.lineWidth = 6;
      sCtx.lineCap = 'round';
      sCtx.lineJoin = 'round';
      sCtx.beginPath();
      drawSmoothLine(sCtx, pts1);
      sCtx.stroke();
      sCtx.restore();

      // Line 1 main
      sCtx.strokeStyle = chartPalette.line;
      sCtx.lineWidth = 2;
      sCtx.lineCap = 'round';
      sCtx.lineJoin = 'round';
      sCtx.beginPath();
      drawSmoothLine(sCtx, pts1);
      sCtx.stroke();

      // Fill 1
      sCtx.lineTo(w, h);
      sCtx.lineTo(0, h);
      sCtx.closePath();
      var g1 = sCtx.createLinearGradient(0, 0, 0, h);
      g1.addColorStop(0, chartPalette.fillTop);
      g1.addColorStop(0.5, chartPalette.fillMid);
      g1.addColorStop(1, 'transparent');
      sCtx.fillStyle = g1;
      sCtx.fill();

      // Last point glow
      var last1 = pts1[pts1.length - 1];
      sCtx.fillStyle = chartPalette.dotGlow;
      sCtx.beginPath();
      sCtx.arc(last1.x, last1.y, 8, 0, Math.PI * 2);
      sCtx.fill();
      sCtx.fillStyle = chartPalette.line;
      sCtx.beginPath();
      sCtx.arc(last1.x, last1.y, 3, 0, Math.PI * 2);
      sCtx.fill();

      // Line 2 — sessions (muted, smooth)
      var pts2 = [];
      for (var b = 0; b < sData2.length; b++) {
        pts2.push({
          x: (b / (sData2.length - 1)) * w,
          y: h - (sData2[b] / 100) * h * 0.85 - h * 0.05
        });
      }
      sCtx.strokeStyle = chartPalette.line2;
      sCtx.lineWidth = 1.5;
      sCtx.lineCap = 'round';
      sCtx.lineJoin = 'round';
      sCtx.setLineDash([4, 4]);
      sCtx.beginPath();
      drawSmoothLine(sCtx, pts2);
      sCtx.stroke();
      sCtx.setLineDash([]);

      requestAnimationFrame(drawShowcaseChart);
    }
    drawShowcaseChart();
  }

  // ---------------------------------------------------------------
  // SHOWCASE TABS — change time range & chart data
  // ---------------------------------------------------------------
  var tabs = document.querySelectorAll('.showcase__tab');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('showcase__tab--active'); });
      tab.classList.add('showcase__tab--active');

      // Update chart data parameters
      var range = tab.textContent.trim();
      if (sRangeData[range]) {
        sRangeData.active = sRangeData[range];
        // Reset data with new params
        sData1 = [];
        sData2 = [];
        sTime = 0;
        for (var i = 0; i < 80; i++) {
          var r = sRangeData.active;
          sData1.push(50 + Math.sin(i * r.freq) * r.amp + Math.random() * r.noise);
          sData2.push(30 + Math.cos(i * (r.freq * 0.8)) * (r.amp * 0.6) + Math.random() * (r.noise * 0.7));
        }
      }
    });
  });

  // ---------------------------------------------------------------
  // CONTACT FORM
  // ---------------------------------------------------------------
  var form = document.getElementById('contactForm');
  var submitBtn = document.getElementById('ctaSubmit');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nameInput = form.querySelector('input[name="name"]');
      var emailInput = form.querySelector('input[name="email"]');
      var nameError = nameInput.parentElement.querySelector('.form-error');
      var emailError = emailInput.parentElement.querySelector('.form-error');
      var valid = true;

      nameInput.classList.remove('form-input--error');
      emailInput.classList.remove('form-input--error');
      nameError.textContent = '';
      emailError.textContent = '';

      if (!nameInput.value.trim()) {
        nameInput.classList.add('form-input--error');
        nameError.textContent = 'Name is required';
        valid = false;
      }
      if (!emailInput.value.trim()) {
        emailInput.classList.add('form-input--error');
        emailError.textContent = 'Email is required';
        valid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
        emailInput.classList.add('form-input--error');
        emailError.textContent = 'Enter a valid email address';
        valid = false;
      }
      if (!valid) return;

      submitBtn.classList.add('btn--loading');
      submitBtn.disabled = true;
      setTimeout(function () {
        submitBtn.classList.remove('btn--loading');
        submitBtn.classList.add('btn--success');
        showToast('Thanks! We\'ll be in touch soon.');
        setTimeout(function () {
          form.reset();
          submitBtn.classList.remove('btn--success');
          submitBtn.disabled = false;
        }, 2000);
      }, 1200);
    });

    form.querySelectorAll('.form-input').forEach(function (input) {
      input.addEventListener('input', function () {
        input.classList.remove('form-input--error');
        var error = input.parentElement.querySelector('.form-error');
        if (error) error.textContent = '';
      });
    });
  }

  // ---------------------------------------------------------------
  // TOASTS
  // ---------------------------------------------------------------
  function showToast(text, type) {
    var container = document.getElementById('toastContainer');
    if (!container) return;
    var toast = document.createElement('div');
    toast.className = 'toast' + (type === 'error' ? ' toast--error' : '');
    toast.textContent = text;
    container.appendChild(toast);
    setTimeout(function () { toast.remove(); }, 3000);
  }

  // ---------------------------------------------------------------
  // SCROLL REVEAL
  // ---------------------------------------------------------------
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && config.scrollAnimationsEnabled) {
        entry.target.classList.add('reveal--visible');
      }
    });
  }, { threshold: 0.1 });

  var revealTargets = document.querySelectorAll(
    '.feature-card, .pricing-card, .testimonial-card, .integration-card, ' +
    '.statement__content, .cta__content, .cta__form-wrap, ' +
    '.showcase__panel, .showcase__sidebar'
  );

  revealTargets.forEach(function (el) {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // Stagger grid children
  var grids = document.querySelectorAll(
    '.features__grid, .pricing__grid, .testimonials__grid, .integrations__grid'
  );
  grids.forEach(function (grid) {
    var children = grid.children;
    for (var i = 0; i < children.length; i++) {
      children[i].style.transitionDelay = (i * 60) + 'ms';
    }
  });

  // Section-level reveals
  var sectionRevealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && config.scrollAnimationsEnabled) {
        entry.target.classList.add('reveal-section--visible');
      }
    });
  }, { threshold: 0.05 });

  document.querySelectorAll('.statement, .features, .showcase, .integrations, .pricing, .testimonials, .faq, .cta').forEach(function (section) {
    section.classList.add('reveal-section');
    sectionRevealObserver.observe(section);
  });

  // ---------------------------------------------------------------
  // SIGNATURE INTERACTION — Cursor Spotlight
  // ---------------------------------------------------------------
  var heroDash = document.querySelector('.hero__dashboard');
  if (heroDash && window.matchMedia('(hover: hover)').matches) {
    heroDash.addEventListener('mousemove', function (e) {
      if (!config.spotlightEnabled) return;
      var rect = heroDash.getBoundingClientRect();
      heroDash.style.setProperty('--spotlight-x', (e.clientX - rect.left) + 'px');
      heroDash.style.setProperty('--spotlight-y', (e.clientY - rect.top) + 'px');
    });
  }

  // ---------------------------------------------------------------
  // ACTIVE NAV LINK ON SCROLL
  // ---------------------------------------------------------------
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav__link');

  function updateActiveNav() {
    var scrollY = window.scrollY + 120;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('nav__link--active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('nav__link--active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ---------------------------------------------------------------
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ---------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var offset = 80;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ---------------------------------------------------------------
  // CONTROL CENTER
  // ---------------------------------------------------------------
  var controlToggle = document.getElementById('controlToggle');
  var controlPanel = document.getElementById('controlPanel');

  if (controlToggle && controlPanel) {
    controlToggle.addEventListener('click', function () {
      var isOpen = controlPanel.classList.contains('control-center__panel--open');
      controlPanel.classList.toggle('control-center__panel--open');
      controlToggle.classList.toggle('control-center__toggle--active');
      controlToggle.setAttribute('aria-expanded', !isOpen);
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.control-center')) {
        controlPanel.classList.remove('control-center__panel--open');
        controlToggle.classList.remove('control-center__toggle--active');
        controlToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Chart speed slider
  var speedSlider = document.getElementById('chartSpeed');
  var speedValue = document.getElementById('speedValue');
  if (speedSlider) {
    speedSlider.addEventListener('input', function () {
      config.chartSpeed = parseInt(this.value);
      if (speedValue) {
        speedValue.textContent = config.chartSpeed === 1 ? 'Slow' : config.chartSpeed === 2 ? 'Normal' : 'Fast';
      }
    });
  }

  // Card opacity slider
  var opacitySlider = document.getElementById('cardOpacity');
  var opacityValue = document.getElementById('opacityValue');
  if (opacitySlider) {
    opacitySlider.addEventListener('input', function () {
      var val = parseInt(this.value);
      if (opacityValue) opacityValue.textContent = val + '%';
      document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card, .integration-card, .showcase__stat').forEach(function (card) {
        card.style.setProperty('--card-opacity', val / 100);
      });
    });
  }

  // Spotlight toggle
  var spotlightToggle = document.getElementById('spotlightToggle');
  if (spotlightToggle) {
    spotlightToggle.addEventListener('click', function () {
      config.spotlightEnabled = !config.spotlightEnabled;
      this.classList.toggle('control-center__switch--on', config.spotlightEnabled);
      this.setAttribute('aria-checked', config.spotlightEnabled);
    });
  }

  // Scroll animations toggle
  var scrollToggle = document.getElementById('scrollToggle');
  if (scrollToggle) {
    scrollToggle.addEventListener('click', function () {
      config.scrollAnimationsEnabled = !config.scrollAnimationsEnabled;
      this.classList.toggle('control-center__switch--on', config.scrollAnimationsEnabled);
      this.setAttribute('aria-checked', config.scrollAnimationsEnabled);
      // If disabling, show all elements immediately
      if (!config.scrollAnimationsEnabled) {
        document.querySelectorAll('.reveal, .reveal-section').forEach(function (el) {
          el.classList.add('reveal--visible');
          el.classList.add('reveal-section--visible');
        });
      }
    });
  }

  // ---------------------------------------------------------------
  // BACK TO TOP
  // ---------------------------------------------------------------
  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      backToTop.classList.toggle('back-to-top--visible', window.scrollY > 400);
    }, { passive: true });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

})();
