/* Rishikesh Sonawane — portfolio interactions */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
      revealEls.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Contact form ----------
     Submits to the Formspree endpoint configured below (JSON POST).
     Until an endpoint is set, falls back to opening a pre-filled email. */
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
        // Honest fallback: open the visitor's email app with everything pre-filled.
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

      // Real submission via Formspree
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