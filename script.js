/* Rishikesh Sonawane — portfolio interactions */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isCoarse = window.matchMedia("(pointer: coarse)").matches;

  /* ---------- Custom cursor ---------- */
  if (!prefersReduced && !isCoarse) {
    var dot = document.querySelector(".cursor-dot");
    var ring = document.querySelector(".cursor-ring");
    if (dot && ring) {
      var mx = -100, my = -100;
      var rx = -100, ry = -100;
      document.addEventListener("mousemove", function (e) {
        mx = e.clientX;
        my = e.clientY;
        dot.style.left = mx + "px";
        dot.style.top = my + "px";
      });
      (function loop() {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        ring.style.left = rx + "px";
        ring.style.top = ry + "px";
        requestAnimationFrame(loop);
      })();
      var hoverEls = document.querySelectorAll("a, button, .work-item__media, input, textarea, select");
      hoverEls.forEach(function (el) {
        el.addEventListener("mouseenter", function () { ring.classList.add("is-hover"); });
        el.addEventListener("mouseleave", function () { ring.classList.remove("is-hover"); });
      });
      document.addEventListener("mousedown", function () { ring.classList.add("is-click"); });
      document.addEventListener("mouseup", function () { ring.classList.remove("is-click"); });
    }
  }

  /* ---------- Page loader ---------- */
  var loader = document.getElementById("pageLoader");
  if (loader) {
    window.addEventListener("load", function () {
      setTimeout(function () {
        loader.classList.add("fade-out");
        setTimeout(function () { loader.remove(); }, 600);
      }, 1400);
    });
  }

  /* ---------- Mobile nav ---------- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.getAttribute("data-open") === "true";
      links.setAttribute("data-open", open ? "false" : "true");
      toggle.setAttribute("aria-expanded", open ? "false" : "true");
      toggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
    });
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        links.setAttribute("data-open", "false");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && links.getAttribute("data-open") === "true") {
        links.setAttribute("data-open", "false");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      }
    });
  }

  /* ---------- Scroll progress bar ---------- */
  var progressBar = document.querySelector(".scroll-progress__bar");
  if (progressBar) {
    window.addEventListener("scroll", function () {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = scrollPercent + "%";
    }, { passive: true });
  }

  /* ---------- Now Playing toggle ---------- */
  var nowPlaying = document.getElementById("nowPlaying");
  if (nowPlaying) {
    nowPlaying.addEventListener("click", function () {
      nowPlaying.classList.toggle("is-active");
    });
  }

  /* ---------- Back to top ---------- */
  var backToTop = document.getElementById("backToTop");
  if (backToTop) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 600) {
        backToTop.classList.add("is-visible");
      } else {
        backToTop.classList.remove("is-visible");
      }
    }, { passive: true });
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Magnetic button ---------- */
  var magneticBtns = document.querySelectorAll(".magnetic-btn");
  if (magneticBtns.length && !prefersReduced) {
    magneticBtns.forEach(function (btn) {
      btn.addEventListener("mousemove", function (e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = "translate(" + (x * 0.15) + "px, " + (y * 0.15) + "px)";
      });
      btn.addEventListener("mouseleave", function () {
        btn.style.transform = "translate(0, 0)";
      });
    });
  }

  /* ---------- Service card tilt ---------- */
  var serviceCards = document.querySelectorAll(".service");
  if (serviceCards.length && !prefersReduced) {
    serviceCards.forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = "perspective(800px) rotateY(" + (x * 5) + "deg) rotateX(" + (-y * 5) + "deg) translateY(-4px)";
      });
      card.addEventListener("mouseleave", function () {
        card.style.transform = "";
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if (revealEls.length) {
    if (prefersReduced || !("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
      revealEls.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---------- Cookie consent ---------- */
  var cookieBanner = document.getElementById("cookieConsent");
  if (cookieBanner) {
    var accepted = localStorage.getItem("cookie-accepted");
    if (!accepted) {
      setTimeout(function () { cookieBanner.classList.add("is-visible"); }, 2000);
    }
    var acceptBtn = cookieBanner.querySelector("[data-accept]");
    if (acceptBtn) {
      acceptBtn.addEventListener("click", function () {
        localStorage.setItem("cookie-accepted", "true");
        cookieBanner.classList.remove("is-visible");
      });
    }
    var dismissBtn = cookieBanner.querySelector("[data-dismiss]");
    if (dismissBtn) {
      dismissBtn.addEventListener("click", function () {
        cookieBanner.classList.remove("is-visible");
      });
    }
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Contact form ---------- */
  var FORM_ENDPOINT = "https://formspree.io/f/xljepkek";
  var CONTACT_EMAIL = "rishikeshsonawane1465@gmail.com";
  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");
  var submitBtn = form && form.querySelector("button[type=submit]");

  function setStatus(msg) {
    status.hidden = false;
    status.textContent = msg;
  }

  if (form && status) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = (document.getElementById("f-name") || {}).value || "";
      var email = (document.getElementById("f-email") || {}).value || "";
      var company = (document.getElementById("f-company") || {}).value || "";
      var type = (document.getElementById("f-type") || {}).value || "";
      var message = (document.getElementById("f-message") || {}).value || "";
      var budget = (document.getElementById("f-budget") || {}).value || "";

      if (!name || !email || !message) {
        setStatus("Please fill in your name, email, and a short description.");
        var first = form.querySelector("#f-name, #f-email, #f-message:invalid");
        if (first) first.focus();
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setStatus("That email address doesn't look right — double-check it and try again.");
        document.getElementById("f-email").focus();
        return;
      }

      if (!FORM_ENDPOINT) {
        var subject = encodeURIComponent("Project enquiry from " + name);
        var body = encodeURIComponent(
          "Hi Rishikesh,\n\n" + message + "\n\n— " + name +
          (company ? " (" + company + ")" : "") +
          "\nEmail: " + email +
          "\nProject type: " + type +
          "\nBudget: " + budget
        );
        window.location.href = "mailto:" + CONTACT_EMAIL + "?subject=" + subject + "&body=" + body;
        setStatus("Your email app should open with everything pre-filled. If not, email me directly at " + CONTACT_EMAIL + ".");
        return;
      }

      var btnText = submitBtn ? submitBtn.textContent : "";
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Sending…"; }
      setStatus("Sending…");

      fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email,
          company: company,
          "project type": type,
          budget: budget,
          message: message,
          _subject: "New enquiry from " + name + " via rishikesh-sonawane.github.io",
        }),
      })
        .then(function (res) {
          if (res.ok) {
            setStatus("Thanks " + name + " — your message is on its way. I'll reply personally, usually within a day.");
            form.reset();
          } else {
            return res.json().then(function (data) {
              throw new Error((data && data.errors && data.errors.map(function (er) { return er.message; }).join(", ")) || "Request failed");
            });
          }
        })
        .catch(function (err) {
          setStatus("Something went wrong sending that (" + err.message + "). Please email me directly at " + CONTACT_EMAIL + ".");
        })
        .finally(function () {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = btnText; }
        });
    });
  }
})();
