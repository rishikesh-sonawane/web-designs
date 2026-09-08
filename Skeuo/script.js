/**
 * ============================================================
 * SKEUO — Interactive Script
 * Handles: navigation, sidebar, chart, form, toasts,
 * skeuomorphic control panel, draggable panel, ripples,
 * spotlight, magnetic pull, theme toggle.
 * ============================================================
 */

(function () {
  'use strict';

  var html = document.documentElement;
  var nav = document.getElementById('nav');
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');
  var sidebar = document.getElementById('sidebar');
  var sidebarToggle = document.getElementById('sidebarToggle');

  // ------------------------------------------------------------
  // Navigation — throttled with rAF
  // ------------------------------------------------------------
  var scrollTicking = false;
  function handleScroll() {
    if (!scrollTicking) {
      requestAnimationFrame(function () {
        nav.classList.toggle('nav--scrolled', window.scrollY > 20);
        // Active nav highlight
        var sections = document.querySelectorAll('section[id]');
        var scrollPos = window.scrollY + 120;
        sections.forEach(function (section) {
          var top = section.offsetTop;
          var height = section.offsetHeight;
          var id = section.getAttribute('id');
          var link = document.querySelector('.nav__link[href="#' + id + '"]');
          if (link) {
            if (scrollPos >= top && scrollPos < top + height) {
              link.classList.add('nav__link--active');
              link.setAttribute('aria-current', 'true');
            } else {
              link.classList.remove('nav__link--active');
              link.removeAttribute('aria-current');
            }
          }
        });
        // Back-to-top visibility
        var btt = document.getElementById('backToTop');
        if (btt) btt.classList.toggle('is-visible', window.scrollY > 600);
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen);
      mobileMenu.setAttribute('aria-hidden', !isOpen);
    });
    mobileMenu.querySelectorAll('.nav__link').forEach(function (l) {
      l.addEventListener('click', function () {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      });
    });
  }

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', function () {
      sidebar.classList.toggle('sidebar--collapsed');
    });
  }

  // ------------------------------------------------------------
  // Chart Toggle
  // ------------------------------------------------------------
  var chartData = {
    week: { path: 'M0,100 C40,90 80,60 120,65 C160,70 200,30 240,25 C280,20 320,40 360,15 C380,10 400,20 400,20', area: 'M0,100 C40,90 80,60 120,65 C160,70 200,30 240,25 C280,20 320,40 360,15 C380,10 400,20 400,20 L400,120 L0,120 Z', labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], revenue: '$48,295', users: '2,847', conversion: '3.6%' },
    month: { path: 'M0,90 C40,85 80,70 120,55 C160,40 200,50 240,35 C280,20 320,30 360,10 C380,5 400,15 400,15', area: 'M0,90 C40,85 80,70 120,55 C160,40 200,50 240,35 C280,20 320,30 360,10 C380,5 400,15 400,15 L400,120 L0,120 Z', labels: ['Week 1','Week 2','Week 3','Week 4'], revenue: '$192,480', users: '11,205', conversion: '4.1%' },
    year: { path: 'M0,100 C40,95 80,80 120,70 C160,60 200,45 240,30 C280,25 320,18 360,8 C380,5 400,10 400,10', area: 'M0,100 C40,95 80,80 120,70 C160,60 200,45 240,30 C280,25 320,18 360,8 C380,5 400,10 400,10 L400,120 L0,120 Z', labels: ['Q1','Q2','Q3','Q4'], revenue: '$2.4M', users: '48,920', conversion: '5.2%' }
  };

  var chartLine = document.querySelector('.chart-line');
  var chartArea = document.querySelector('.chart-area');
  var chartLabels = document.querySelector('.chart-labels');
  var toggleBtns = document.querySelectorAll('.sk-pill');

  function updateChart(period) {
    var d = chartData[period];
    if (!d || !chartLine || !chartArea) return;
    chartLine.style.transition = 'none';
    chartArea.style.transition = 'none';
    chartLine.style.strokeDashoffset = '800';
    chartArea.style.opacity = '0';
    requestAnimationFrame(function () {
      chartLine.setAttribute('d', d.path);
      chartArea.setAttribute('d', d.area);
      chartLine.style.transition = 'stroke-dashoffset 1s ease-out';
      chartArea.style.transition = 'opacity 0.8s ease-out 0.5s';
      chartLine.style.strokeDashoffset = '0';
      chartArea.style.opacity = '1';
    });
    if (chartLabels) chartLabels.innerHTML = d.labels.map(function (l) { return '<span>' + l + '</span>'; }).join('');
    animateText('revenueStat', d.revenue);
    animateText('usersStat', d.users);
    animateText('convStat', d.conversion);
  }

  function animateText(id, val) {
    var el = document.getElementById(id);
    if (!el) return;
    el.style.transition = 'opacity 0.15s, transform 0.15s';
    el.style.opacity = '0';
    el.style.transform = 'translateY(4px)';
    setTimeout(function () { el.textContent = val; el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }, 150);
  }

  toggleBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      toggleBtns.forEach(function (b) { b.classList.remove('sk-pill--active'); });
      btn.classList.add('sk-pill--active');
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

    form.querySelectorAll('.sk-input').forEach(function (input) {
      var group = input.closest('.form-group');
      input.addEventListener('blur', function () { validate(input, group); });
      input.addEventListener('input', function () {
        if (group.classList.contains('is-invalid')) validate(input, group);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var allOk = true;
      form.querySelectorAll('.sk-input').forEach(function (input) {
        var group = input.closest('.form-group');
        group.classList.add('is-invalid');
        if (!validate(input, group)) allOk = false;
      });
      if (allOk) {
        success.classList.add('is-visible');
        form.reset();
        form.querySelectorAll('.form-group').forEach(function (g) { g.classList.remove('is-valid', 'is-invalid'); });
        setTimeout(function () { success.classList.remove('is-visible'); }, 4000);
      }
    });
  }

  // ------------------------------------------------------------
  // Toast System
  // ------------------------------------------------------------
  var toastContainer = document.getElementById('toastContainer');
  var toastMessages = {
    success: { title: 'Order Confirmed!', msg: 'Your piece is being crafted. We\'ll notify you when it ships.' },
    error: { title: 'Something went wrong', msg: 'Please try again or contact our workshop directly.' },
    info: { title: 'Workshop Update', msg: 'New collection dropping next week. Stay tuned.' }
  };
  var toastIcons = {
    success: '<polyline points="20 6 9 17 4 12"/>',
    error: '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>',
    info: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>'
  };

  function showToast(type) {
    if (!toastContainer) return;
    var d = toastMessages[type] || toastMessages.info;
    var t = document.createElement('div');
    t.className = 'toast toast--' + type;
    t.setAttribute('role', 'alert');
    t.innerHTML = '<div class="toast__icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' + toastIcons[type] + '</svg></div><div class="toast__content"><span class="toast__title">' + d.title + '</span><span class="toast__message">' + d.msg + '</span></div><button class="toast__close" aria-label="Dismiss"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button><div class="toast__progress" style="width:100%"></div>';
    toastContainer.appendChild(t);
    requestAnimationFrame(function () { requestAnimationFrame(function () { t.classList.add('is-visible'); }); });

    var dur = 5000, progress = t.querySelector('.toast__progress');
    progress.style.transition = 'width ' + dur + 'ms linear';
    requestAnimationFrame(function () { requestAnimationFrame(function () { progress.style.width = '0%'; }); });

    function dismiss() { t.classList.remove('is-visible'); t.classList.add('is-dismissing'); setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 400); }
    t.querySelector('.toast__close').addEventListener('click', dismiss);
    var timer = setTimeout(dismiss, dur);
    t.addEventListener('mouseenter', function () { clearTimeout(timer); progress.style.transition = 'none'; var w = progress.getBoundingClientRect().width, tw = t.getBoundingClientRect().width; progress.style.width = (w / tw * 100) + '%'; });
    t.addEventListener('mouseleave', function () { var w = progress.getBoundingClientRect().width, tw = t.getBoundingClientRect().width, rem = (w / tw) * dur; progress.style.transition = 'width ' + rem + 'ms linear'; requestAnimationFrame(function () { progress.style.width = '0%'; }); timer = setTimeout(dismiss, rem); });
  }

  document.querySelectorAll('.toast-trigger').forEach(function (btn) {
    btn.addEventListener('click', function () { showToast(btn.dataset.type); });
  });

  // ------------------------------------------------------------
  // Skeuomorphic Control Panel
  // ------------------------------------------------------------
  var controlPanel = document.getElementById('controlPanel');
  var controlToggle = document.getElementById('controlToggle');
  var controlBody = document.getElementById('controlBody');
  var shadowSlider = document.getElementById('shadowSlider');
  var bevelSlider = document.getElementById('bevelSlider');
  var radiusSlider = document.getElementById('radiusSlider');
  var shadowValueEl = document.getElementById('shadowValue');
  var bevelValueEl = document.getElementById('bevelValue');
  var radiusValueEl = document.getElementById('radiusValue');
  var presets = document.querySelectorAll('.sk-preset');

  var liveStyle = document.createElement('style');
  liveStyle.id = 'sk-live-overrides';
  document.head.appendChild(liveStyle);

  var currentShadow = 8;
  var currentBevel = 2;
  var currentRadius = 12;

  function applySkStyles() {
    var blur = currentShadow * 3;
    var b = currentBevel;

    liveStyle.textContent =
      '.sk-card,' +
      '.sk-btn:not(.sk-btn--ghost):not(.sk-btn--icon),' +
      '.sk-icon--sm,' +
      '.sk-icon--md,' +
      '.control-panel,' +
      '.sidebar,' +
      '.footer,' +
      '.nav {' +
      '  border-radius: ' + currentRadius + 'px !important;' +
      '}' +

      '.sk-card {' +
      '  box-shadow:' +
      '    0 ' + b + 'px 0 rgba(255,255,255,0.4),' +
      '    0 ' + (b * 2) + 'px 0 rgba(255,255,255,0.2),' +
      '    0 ' + (currentShadow + 4) + 'px ' + (blur / 2) + 'px rgba(0,0,0,0.15),' +
      '    0 ' + (currentShadow + 8) + 'px ' + blur + 'px rgba(0,0,0,0.2) !important;' +
      '}' +

      '.sk-card::before {' +
      '  box-shadow:' +
      '    inset 0 ' + b + 'px 0 rgba(255,255,255,0.35),' +
      '    inset 0 ' + (-b) + 'px 0 rgba(0,0,0,0.08) !important;' +
      '}' +

      '.sk-card--nested {' +
      '  box-shadow:' +
      '    inset 0 ' + b + 'px ' + (b * 2) + 'px rgba(0,0,0,0.15),' +
      '    inset 0 ' + (-b) + 'px ' + b + 'px rgba(0,0,0,0.08) !important;' +
      '}' +

      '.sk-btn:not(.sk-btn--ghost):not(.sk-btn--icon) {' +
      '  border-radius: ' + Math.max(currentRadius * 0.7, 4) + 'px !important;' +
      '}' +

      '.sk-btn--icon {' +
      '  border-radius: ' + Math.max(currentRadius / 2, 4) + 'px !important;' +
      '}' +

      '.sk-btn--primary:active {' +
      '  box-shadow:' +
      '    inset 0 ' + (b + 1) + 'px ' + (b * 2 + 2) + 'px rgba(0,0,0,0.3),' +
      '    inset 0 ' + b + 'px ' + (b + 1) + 'px rgba(0,0,0,0.2) !important;' +
      '}' +

      '.sk-pill--active {' +
      '  border-radius: ' + Math.max(currentRadius / 3, 3) + 'px !important;' +
      '}' +

      '.sk-chip {' +
      '  border-radius: ' + (currentRadius * 4) + 'px !important;' +
      '}' +

      '.sk-icon--sm, .sk-icon--md {' +
      '  border-radius: ' + Math.max(currentRadius, 8) + 'px !important;' +
      '}' +

      '.sk-input {' +
      '  border-radius: ' + Math.max(currentRadius * 0.7, 4) + 'px !important;' +
      '}' +

      '.toast {' +
      '  border-radius: ' + Math.max(currentRadius * 0.7, 4) + 'px !important;' +
      '}' +

      '.faq__item[open] {' +
      '  box-shadow:' +
      '    0 ' + currentShadow + 'px ' + blur + 'px rgba(0,0,0,0.3),' +
      '    0 ' + (currentShadow * 2) + 'px ' + (blur * 1.5) + 'px rgba(0,0,0,0.15) !important;' +
      '}' +

      '.sk-card--featured {' +
      '  box-shadow:' +
      '    0 ' + b + 'px 0 rgba(255,255,255,0.4),' +
      '    0 ' + (b * 2) + 'px 0 rgba(255,255,255,0.2),' +
      '    0 ' + (currentShadow + 4) + 'px ' + (blur / 2) + 'px rgba(0,0,0,0.15),' +
      '    0 ' + (currentShadow + 8) + 'px ' + blur + 'px rgba(0,0,0,0.2),' +
      '    0 0 0 3px var(--accent) !important;' +
      '}';
  }

  function setShadow(val) {
    currentShadow = parseInt(val, 10);
    shadowSlider.value = currentShadow;
    shadowValueEl.textContent = currentShadow;
    applySkStyles();
    updatePreset();
  }

  function setBevel(val) {
    currentBevel = parseInt(val, 10);
    bevelSlider.value = currentBevel;
    bevelValueEl.textContent = currentBevel;
    applySkStyles();
    updatePreset();
  }

  function setRadius(val) {
    currentRadius = parseInt(val, 10);
    radiusSlider.value = currentRadius;
    radiusValueEl.textContent = currentRadius + 'px';
    applySkStyles();
    updatePreset();
  }

  function updatePreset() {
    presets.forEach(function (p) {
      p.classList.toggle('sk-preset--active',
        parseInt(p.dataset.shadow) === currentShadow &&
        parseInt(p.dataset.bevel) === currentBevel &&
        parseInt(p.dataset.radius) === currentRadius
      );
    });
  }

  if (controlToggle && controlBody) {
    controlToggle.addEventListener('click', function () {
      if (controlPanel._justDragged) { controlPanel._justDragged = false; return; }
      var isOpen = controlBody.classList.toggle('is-open');
      controlToggle.setAttribute('aria-expanded', isOpen);
      controlBody.setAttribute('aria-hidden', !isOpen);
    });
  }

  if (shadowSlider) shadowSlider.addEventListener('input', function () { setShadow(this.value); });
  if (bevelSlider) bevelSlider.addEventListener('input', function () { setBevel(this.value); });
  if (radiusSlider) radiusSlider.addEventListener('input', function () { setRadius(this.value); });

  presets.forEach(function (btn) {
    btn.addEventListener('click', function () {
      setShadow(btn.dataset.shadow);
      setBevel(btn.dataset.bevel);
      setRadius(btn.dataset.radius);
    });
  });

  // ------------------------------------------------------------
  // Draggable Control Panel
  // ------------------------------------------------------------
  (function setupDrag() {
    if (!controlPanel) return;
    var isDragging = false, startX, startY, startLeft, startTop, hasMoved = false;
    var THRESHOLD = 5;

    try {
      var saved = JSON.parse(localStorage.getItem('sk-panel-pos'));
      if (saved && typeof saved.left === 'number' && typeof saved.top === 'number') {
        controlPanel.style.right = 'auto';
        controlPanel.style.left = saved.left + 'px';
        controlPanel.style.top = saved.top + 'px';
        controlPanel.style.bottom = 'auto';
      }
    } catch (e) {}

    function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

    function onDown(e) {
      if (e.target.closest('.control-panel__body')) return;
      if (e.button && e.button !== 0) return;
      isDragging = true; hasMoved = false;
      var rect = controlPanel.getBoundingClientRect();
      startX = e.touches ? e.touches[0].clientX : e.clientX;
      startY = e.touches ? e.touches[0].clientY : e.clientY;
      startLeft = rect.left; startTop = rect.top;
      controlPanel.style.transition = 'none';
      if (e.touches) {
        document.addEventListener('touchmove', onMove, { passive: false });
        document.addEventListener('touchend', onUp);
      } else {
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
      }
      e.preventDefault();
    }

    function onMove(e) {
      if (!isDragging) return;
      var cx = e.touches ? e.touches[0].clientX : e.clientX;
      var cy = e.touches ? e.touches[0].clientY : e.clientY;
      var dx = cx - startX, dy = cy - startY;
      if (!hasMoved && Math.abs(dx) + Math.abs(dy) < THRESHOLD) return;
      hasMoved = true;
      controlPanel.style.left = clamp(startLeft + dx, 8, window.innerWidth - controlPanel.offsetWidth - 8) + 'px';
      controlPanel.style.top = clamp(startTop + dy, 8, window.innerHeight - controlPanel.offsetHeight - 8) + 'px';
      controlPanel.style.right = 'auto';
      controlPanel.style.bottom = 'auto';
      if (e.cancelable) e.preventDefault();
    }

    function onUp() {
      isDragging = false;
      controlPanel.style.transition = '';
      if (hasMoved) {
        controlPanel._justDragged = true;
        try { var r = controlPanel.getBoundingClientRect(); localStorage.setItem('sk-panel-pos', JSON.stringify({ left: Math.round(r.left), top: Math.round(r.top) })); } catch (e) {}
        setTimeout(function () { controlPanel._justDragged = false; }, 50);
      }
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onUp);
    }

    controlPanel.addEventListener('mousedown', onDown);
    controlPanel.addEventListener('touchstart', onDown, { passive: false });
  })();

  // ------------------------------------------------------------
  // Button Ripples
  // ------------------------------------------------------------
  document.querySelectorAll('.sk-btn').forEach(function (btn) {
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
        var x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
        var y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
        card.style.setProperty('--spot-x', x + '%');
        card.style.setProperty('--spot-y', y + '%');
      });
    });
  }



  // ------------------------------------------------------------
  // Scroll Reveal
  // ------------------------------------------------------------
  function setupReveal() {
    var targets = document.querySelectorAll(
      '.sk-card--feature, .sk-card--testimonial, .sk-card--pricing, ' +
      '.sk-card--stat, .sk-card--wide, .sk-card--material, ' +
      '.section-title, .section-subtitle, .faq__item'
    );
    targets.forEach(function (el) { el.classList.add('reveal'); });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('reveal--visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(function (el) { observer.observe(el); });
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
    var s = localStorage.getItem('sk-theme');
    if (s) return s;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function setTheme(t) {
    html.setAttribute('data-theme', t);
    localStorage.setItem('sk-theme', t);
    document.body.offsetHeight; // force repaint
  }

  setTheme(getPreferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      document.body.classList.add('is-theme-transitioning');
      var current = html.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
      setTimeout(function () {
        document.body.classList.remove('is-theme-transitioning');
      }, 500);
    });
  }

  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function (e) {
    if (!localStorage.getItem('sk-theme')) setTheme(e.matches ? 'light' : 'dark');
  });

  // ------------------------------------------------------------
  // Wooden Toggle — state labels
  // ------------------------------------------------------------
  document.querySelectorAll('[data-toggle-state]').forEach(function (input) {
    var label = input.closest('.wood-toggle-showcase').querySelector('[data-toggle-label]');
    if (!label) return;
    input.addEventListener('change', function () {
      label.textContent = this.checked ? 'On' : 'Off';
      label.style.color = this.checked ? 'var(--accent)' : 'var(--text-tertiary)';
    });
  });

  // ------------------------------------------------------------
  // Flip Cards — Leather sample interaction
  // ------------------------------------------------------------
  function setupFlipCards() {
    var cards = document.querySelectorAll('.flip-card');
    cards.forEach(function (card) {
      var busy = false;

      function flip() {
        if (busy) return;
        busy = true;
        var isFlipped = card.classList.contains('is-flipped');
        var front = card.querySelector('.flip-card__front');
        var back = card.querySelector('.flip-card__back');

        if (isFlipped) {
          // Unflip: back to front
          card.classList.add('is-flipping-back');
          card.classList.remove('is-flipped');
          // Swap content at 90deg midpoint (350ms)
          setTimeout(function () {
            front.style.display = '';
            back.style.display = 'none';
            card.setAttribute('aria-expanded', 'false');
          }, 350);
          // Clean up after animation ends
          setTimeout(function () {
            card.classList.remove('is-flipping-back');
            busy = false;
          }, 700);
        } else {
          // Flip: front to back
          card.classList.add('is-flipping');
          card.classList.add('is-flipped');
          // Swap content at 90deg midpoint (350ms)
          setTimeout(function () {
            front.style.display = 'none';
            back.style.display = 'flex';
            card.setAttribute('aria-expanded', 'true');
          }, 350);
          // Clean up after animation ends
          setTimeout(function () {
            card.classList.remove('is-flipping');
            busy = false;
          }, 700);
        }
      }

      card.addEventListener('click', flip);
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          flip();
        }
      });
    });
  }

  // ------------------------------------------------------------
  // Counter Animations — animate numbers on scroll
  // ------------------------------------------------------------
  function setupCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;
    var observed = new Set();
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !observed.has(entry.target)) {
          observed.add(entry.target);
          var el = entry.target;
          var target = el.getAttribute('data-count');
          var suffix = el.getAttribute('data-suffix') || '';
          var prefix = el.getAttribute('data-prefix') || '';
          var num = parseInt(target.replace(/[^0-9]/g, ''), 10);
          var duration = 1200;
          var start = performance.now();
          function tick(now) {
            var progress = Math.min((now - start) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            var current = Math.round(num * eased);
            el.textContent = prefix + current.toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.3 });
    counters.forEach(function (el) { observer.observe(el); });
  }



  // ------------------------------------------------------------
  // Back to Top
  // ------------------------------------------------------------
  function setupBackToTop() {
    var btn = document.getElementById('backToTop');
    if (!btn) return;
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ------------------------------------------------------------
  // Initialize
  // ------------------------------------------------------------
  function init() { setupReveal(); setupForm(); handleScroll(); setupSpotlight(); setupFlipCards(); setupCounters(); setupBackToTop(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
