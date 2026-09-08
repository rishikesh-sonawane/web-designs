/**
 * ============================================================
 * MATERIAL — Interactive Script
 * Handles: navigation, chart, form, snackbar, control panel,
 * draggable panel, ripples, spotlight, magnetic pull, theme.
 * ============================================================
 */

(function () {
  'use strict';

  var html = document.documentElement;
  var nav = document.getElementById('nav');
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');

  // ------------------------------------------------------------
  // Navigation
  // ------------------------------------------------------------
  function handleScroll() {
    nav.classList.toggle('md-nav--scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', handleScroll, { passive: true });

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen);
      mobileMenu.setAttribute('aria-hidden', !isOpen);
    });
    mobileMenu.querySelectorAll('.md-nav__link').forEach(function (l) {
      l.addEventListener('click', function () {
        mobileMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      });
    });
  }

  // ------------------------------------------------------------
  // Chart Toggle
  // ------------------------------------------------------------
  var chartData = {
    week: {
      path: 'M0,150 C50,140 100,100 150,105 C200,110 250,60 300,50 C350,40 400,70 450,30 C500,20 550,25 600,20',
      area: 'M0,150 C50,140 100,100 150,105 C200,110 250,60 300,50 C350,40 400,70 450,30 C500,20 550,25 600,20 L600,200 L0,200 Z',
      labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
    },
    month: {
      path: 'M0,160 C75,150 150,120 225,100 C300,80 375,90 450,50 C525,30 560,25 600,20',
      area: 'M0,160 C75,150 150,120 225,100 C300,80 375,90 450,50 C525,30 560,25 600,20 L600,200 L0,200 Z',
      labels: ['Week 1','Week 2','Week 3','Week 4']
    },
    year: {
      path: 'M0,170 C100,160 200,140 300,100 C400,60 500,30 600,10',
      area: 'M0,170 C100,160 200,140 300,100 C400,60 500,30 600,10 L600,200 L0,200 Z',
      labels: ['Q1','Q2','Q3','Q4']
    }
  };

  var chartLine = document.querySelector('.md-chart__line');
  var chartArea = document.querySelector('.md-chart__area');
  var chartLabels = document.querySelector('.md-chart__labels');
  var segBtns = document.querySelectorAll('.md-seg-btn');

  function updateChart(period) {
    var d = chartData[period];
    if (!d || !chartLine || !chartArea) return;
    chartLine.style.transition = 'none';
    chartArea.style.transition = 'none';
    chartLine.style.strokeDashoffset = '1200';
    chartArea.style.opacity = '0';
    requestAnimationFrame(function () {
      chartLine.setAttribute('d', d.path);
      chartArea.setAttribute('d', d.area);
      chartLine.style.transition = 'stroke-dashoffset 1s var(--md-easing-decelerate)';
      chartArea.style.transition = 'opacity 0.8s var(--md-easing-decelerate) 0.5s';
      chartLine.style.strokeDashoffset = '0';
      chartArea.style.opacity = '1';
    });
    if (chartLabels) chartLabels.innerHTML = d.labels.map(function (l) { return '<span>' + l + '</span>'; }).join('');
  }

  segBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      segBtns.forEach(function (b) { b.classList.remove('md-seg-btn--active'); });
      btn.classList.add('md-seg-btn--active');
      updateChart(btn.dataset.period);
    });
  });

  // ------------------------------------------------------------
  // Form Validation
  // ------------------------------------------------------------
  function setupForm() {
    var form = document.getElementById('contactForm');
    var success = document.getElementById('contactSuccess');
    if (!form) return;

    function validate(input, group) {
      var val = input.value.trim();
      var ok = false;
      if (input.type === 'email') ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      else if (input.id === 'message') ok = val.length >= 10;
      else ok = val.length > 0;
      group.classList.remove('is-valid', 'is-invalid');
      if (val.length > 0) group.classList.add(ok ? 'is-valid' : 'is-invalid');
      return ok;
    }

    form.querySelectorAll('.md-field__input').forEach(function (input) {
      var group = input.closest('.md-field');
      input.addEventListener('blur', function () { validate(input, group); });
      input.addEventListener('input', function () {
        if (group.classList.contains('is-invalid')) validate(input, group);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var allOk = true;
      form.querySelectorAll('.md-field__input').forEach(function (input) {
        var group = input.closest('.md-field');
        group.classList.add('is-invalid');
        if (!validate(input, group)) allOk = false;
      });
      if (allOk) {
        success.classList.add('is-visible');
        form.reset();
        form.querySelectorAll('.md-field').forEach(function (g) { g.classList.remove('is-valid', 'is-invalid'); });
        setTimeout(function () { success.classList.remove('is-visible'); }, 4000);
      }
    });
  }

  // ------------------------------------------------------------
  // Snackbar (Material Toast)
  // ------------------------------------------------------------
  var snackbarContainer = document.getElementById('toastContainer');
  var snackbarMessages = {
    success: { text: 'Action completed successfully', action: 'Dismiss' },
    error: { text: 'Something went wrong', action: 'Retry' },
    info: { text: 'Here is some information', action: 'OK' }
  };

  function showSnackbar(type) {
    if (!snackbarContainer) return;
    var d = snackbarMessages[type] || snackbarMessages.info;
    var el = document.createElement('div');
    el.className = 'md-snackbar';
    el.setAttribute('role', 'alert');
    el.innerHTML = '<span>' + d.text + '</span><button class="md-snackbar__action">' + d.action + '</button>';

    snackbarContainer.appendChild(el);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { el.classList.add('is-visible'); });
    });

    function dismiss() {
      el.classList.remove('is-visible');
      el.classList.add('is-dismissing');
      setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 300);
    }

    el.querySelector('.md-snackbar__action').addEventListener('click', dismiss);
    var timer = setTimeout(dismiss, 5000);
    el.addEventListener('mouseenter', function () { clearTimeout(timer); });
    el.addEventListener('mouseleave', function () { timer = setTimeout(dismiss, 3000); });
  }

  document.querySelectorAll('.toast-trigger').forEach(function (btn) {
    btn.addEventListener('click', function () { showSnackbar(btn.dataset.type); });
  });

  // ------------------------------------------------------------
  // Material Control Panel
  // ------------------------------------------------------------
  var controlPanel = document.getElementById('controlPanel');
  var controlToggle = document.getElementById('controlToggle');
  var controlBody = document.getElementById('controlBody');
  var radiusSlider = document.getElementById('radiusSlider');
  var elevationSlider = document.getElementById('elevationSlider');
  var motionSlider = document.getElementById('motionSlider');
  var radiusValueEl = document.getElementById('radiusValue');
  var elevationValueEl = document.getElementById('elevationValue');
  var motionValueEl = document.getElementById('motionValue');
  var presets = document.querySelectorAll('.md-preset');

  var liveStyle = document.createElement('style');
  liveStyle.id = 'md-live-overrides';
  document.head.appendChild(liveStyle);

  var currentRadius = 16;
  var currentElevation = 1;
  var currentMotion = 1;

  function applyMdStyles() {
    var r = currentRadius;
    var e = currentElevation;
    var m = currentMotion;

    var durShort = Math.round(100 * m);
    var durMedium = Math.round(300 * m);
    var durLong = Math.round(500 * m);

    liveStyle.textContent =
      ':root {' +
      '  --md-radius: ' + r + 'px !important;' +
      '  --md-radius-xs: ' + Math.max(r / 2, 4) + 'px !important;' +
      '  --md-radius-sm: ' + Math.round(r * 0.75) + 'px !important;' +
      '  --md-radius-lg: ' + Math.round(r * 1.75) + 'px !important;' +
      '  --md-duration-short: ' + durShort + 'ms !important;' +
      '  --md-duration-medium: ' + durMedium + 'ms !important;' +
      '  --md-duration-long: ' + durLong + 'ms !important;' +
      '}' +

      '.md-card--elevated { box-shadow: ' + getElevationShadow(1 * e) + ' !important; }' +
      '.md-card--elevated:hover { box-shadow: ' + getElevationShadow(2 * e) + ' !important; }' +
      '.md-fab--primary { box-shadow: ' + getElevationShadow(3 * e) + ' !important; }' +
      '.md-fab--primary:hover { box-shadow: ' + getElevationShadow(4 * e) + ' !important; }' +
      '.md-btn--filled:hover { box-shadow: ' + getElevationShadow(1 * e) + ' !important; }' +
      '.md-btn--tonal:hover { box-shadow: ' + getElevationShadow(1 * e) + ' !important; }' +
      '.md-btn--elevated { box-shadow: ' + getElevationShadow(1 * e) + ' !important; }' +
      '.md-btn--elevated:hover { box-shadow: ' + getElevationShadow(2 * e) + ' !important; }' +
      '.md-snackbar { box-shadow: ' + getElevationShadow(3 * e) + ' !important; }' +
      '.nav-rail { box-shadow: ' + getElevationShadow(1 * e) + ' !important; }';
  }

  function getElevationShadow(dp) {
    if (dp <= 0) return 'none';
    var umbra = '0 ' + Math.round(dp * 1) + 'px ' + Math.round(dp * 2) + 'px rgba(0,0,0,0.15)';
    var penumbra = '0 ' + Math.round(dp * 0.5) + 'px ' + Math.round(dp * 1) + 'px rgba(0,0,0,0.3)';
    return umbra + ', ' + penumbra;
  }

  function setRadius(val) {
    currentRadius = parseInt(val, 10);
    radiusSlider.value = currentRadius;
    radiusValueEl.textContent = currentRadius + 'px';
    applyMdStyles();
    updatePreset();
  }

  function setElevation(val) {
    currentElevation = parseFloat(val);
    elevationSlider.value = currentElevation;
    elevationValueEl.textContent = currentElevation.toFixed(1) + 'x';
    applyMdStyles();
    updatePreset();
  }

  function setMotion(val) {
    currentMotion = parseFloat(val);
    motionSlider.value = currentMotion;
    motionValueEl.textContent = currentMotion.toFixed(1) + 'x';
    applyMdStyles();
    updatePreset();
  }

  function updatePreset() {
    presets.forEach(function (p) {
      p.classList.toggle('md-preset--active',
        parseInt(p.dataset.radius) === currentRadius &&
        parseFloat(p.dataset.elevation) === currentElevation &&
        parseFloat(p.dataset.motion) === currentMotion
      );
    });
  }

  if (controlToggle && controlBody) {
    controlToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = controlBody.classList.toggle('is-open');
      controlToggle.setAttribute('aria-expanded', String(isOpen));
      controlBody.setAttribute('aria-hidden', String(!isOpen));
    });
    // Also allow clicking outside to close
    document.addEventListener('click', function (e) {
      if (!controlPanel.contains(e.target) && controlBody.classList.contains('is-open')) {
        controlBody.classList.remove('is-open');
        controlToggle.setAttribute('aria-expanded', 'false');
        controlBody.setAttribute('aria-hidden', 'true');
      }
    });
  }

  if (radiusSlider) radiusSlider.addEventListener('input', function () { setRadius(this.value); });
  if (elevationSlider) elevationSlider.addEventListener('input', function () { setElevation(this.value); });
  if (motionSlider) motionSlider.addEventListener('input', function () { setMotion(this.value); });

  presets.forEach(function (btn) {
    btn.addEventListener('click', function () {
      setRadius(btn.dataset.radius);
      setElevation(btn.dataset.elevation);
      setMotion(btn.dataset.motion);
    });
  });

  // ------------------------------------------------------------
  // Draggable Control Panel
  // ------------------------------------------------------------
  // Drag removed — was blocking toggle clicks

  // ------------------------------------------------------------
  // Button Ripples
  // ------------------------------------------------------------
  document.querySelectorAll('.md-btn, .md-fab').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var rect = btn.getBoundingClientRect();
      var size = Math.max(rect.width, rect.height);
      var ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', function () { ripple.remove(); });
    });
  });

  // ------------------------------------------------------------
  // Spotlight Effect
  // ------------------------------------------------------------
  function setupSpotlight() {
    var cards = document.querySelectorAll('.spotlight');
    if (!cards.length || 'ontouchstart' in window) return;
    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        card.style.setProperty('--spot-x', ((e.clientX - rect.left) / rect.width * 100).toFixed(1) + '%');
        card.style.setProperty('--spot-y', ((e.clientY - rect.top) / rect.height * 100).toFixed(1) + '%');
      });
    });
  }

  // ------------------------------------------------------------
  // Magnetic Pull
  // ------------------------------------------------------------
  function setupMagnetic() {
    var magnets = document.querySelectorAll('.magnetic');
    if (!magnets.length || 'ontouchstart' in window) return;
    magnets.forEach(function (el) {
      var strength = parseFloat(el.dataset.magnetStrength) || 0.3;
      el.addEventListener('mousemove', function (e) {
        var rect = el.getBoundingClientRect();
        el.style.transform = 'translate(' + ((e.clientX - rect.left - rect.width / 2) * strength) + 'px, ' + ((e.clientY - rect.top - rect.height / 2) * strength) + 'px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = 'translate(0, 0)'; });
    });
  }

  // ------------------------------------------------------------
  // Slider value display
  // ------------------------------------------------------------
  document.querySelectorAll('.md-slider').forEach(function (slider) {
    var valueEl = slider.parentElement.querySelector('.md-slider__value');
    if (valueEl) {
      slider.addEventListener('input', function () { valueEl.textContent = this.value; });
    }
  });

  // ------------------------------------------------------------
  // Scroll Reveal — Staggered
  // ------------------------------------------------------------
  function setupReveal() {
    var targets = document.querySelectorAll(
      '.md-card, .elevation-demo, .color-swatch, .component-showcase, ' +
      '.md-section-eyebrow, .md-section-title, .md-section-subtitle, ' +
      '.testimonial-card, .faq-item, .pricing-grid > .md-card'
    );
    targets.forEach(function (el) { el.classList.add('reveal'); });

    // Add stagger delays to sibling groups
    var staggerGroups = [
      '.features-grid .md-card',
      '.elevation-grid .elevation-demo',
      '.testimonials-grid .md-card',
      '.pricing-grid .md-card',
      '.faq-list .faq-item',
      '.components-grid > *',
      '.stats-row .md-card'
    ];
    staggerGroups.forEach(function (sel) {
      var items = document.querySelectorAll(sel);
      items.forEach(function (el, i) {
        el.classList.add('reveal');
        el.style.transitionDelay = (i * 80) + 'ms';
      });
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    targets.forEach(function (el) { observer.observe(el); });
    document.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });
  }

  // ------------------------------------------------------------
  // Counter Animation
  // ------------------------------------------------------------
  function animateCounters() {
    var counters = document.querySelectorAll('.stat-value[data-count]');
    counters.forEach(function (el) {
      var target = el.dataset.count;
      var prefix = el.dataset.prefix || '';
      var suffix = el.dataset.suffix || '';
      var duration = 1200;
      var start = 0;
      var startTime = null;
      var isDecimal = target.includes('.');
      var numericTarget = parseFloat(target.replace(/,/g, ''));

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        var current = numericTarget * eased;
        if (isDecimal) {
          el.textContent = prefix + current.toFixed(1) + suffix;
        } else {
          el.textContent = prefix + Math.round(current).toLocaleString() + suffix;
        }
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = prefix + target + suffix;
      }

      var observer = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
          requestAnimationFrame(step);
          observer.unobserve(el);
        }
      }, { threshold: 0.5 });
      observer.observe(el);
    });
  }

  // ------------------------------------------------------------
  // Active Nav Highlight
  // ------------------------------------------------------------
  function setupActiveNav() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.md-nav__link[href^="#"]');

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            link.style.color = '';
            link.style.background = '';
            if (link.getAttribute('href') === '#' + id) {
              link.style.color = 'var(--md-primary)';
              link.style.background = 'var(--md-primary-container)';
            }
          });
        }
      });
    }, { threshold: 0.3, rootMargin: '-64px 0px -50% 0px' });

    sections.forEach(function (s) { observer.observe(s); });
  }

  // ------------------------------------------------------------
  // Back to Top
  // ------------------------------------------------------------
  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > window.innerHeight * 0.8) {
        backToTop.classList.add('is-visible');
      } else {
        backToTop.classList.remove('is-visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ------------------------------------------------------------
  // Smooth Scroll
  // ------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  // ------------------------------------------------------------
  // Theme Toggle
  // ------------------------------------------------------------
  var themeToggle = document.getElementById('themeToggle');

  function getPreferredTheme() {
    var s = localStorage.getItem('md-theme');
    if (s) return s;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function setTheme(t) {
    html.setAttribute('data-theme', t);
    localStorage.setItem('md-theme', t);
    document.body.offsetHeight;
  }

  setTheme(getPreferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      setTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  }

  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function (e) {
    if (!localStorage.getItem('md-theme')) setTheme(e.matches ? 'light' : 'dark');
  });

  // ------------------------------------------------------------
  // Initialize
  // ------------------------------------------------------------
  function init() {
    setupReveal();
    animateCounters();
    setupActiveNav();
    setupForm();
    handleScroll();
    setupMagnetic();
    setupSpotlight();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
