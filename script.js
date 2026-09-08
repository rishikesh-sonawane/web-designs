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

  /* ---------- Contact form (honest mailto) ---------- */
  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");
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
        status.hidden = false;
        status.textContent = "Please fill in your name, email, and a short description.";
        return;
      }

      var subject = encodeURIComponent("Project enquiry from " + name);
      var body = encodeURIComponent(
        "Hi Rishikesh,\n\n" +
        message +
        "\n\n— " + name +
        (company ? " (" + company + ")" : "") +
        "\nEmail: " + email +
        "\nProject type: " + type +
        "\nBudget: " + budget
      );
      window.location.href = "mailto:rishikeshsonawane1465@gmail.com?subject=" + subject + "&body=" + body;

      status.hidden = false;
      status.textContent = "Your email app should open with everything pre-filled. If not, email me directly at rishikeshsonawane1465@gmail.com.";
    });
  }
})();