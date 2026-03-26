/**
 * Jameel Wani Portfolio - Main Interactions
 * Lightweight vanilla JS: theme toggle, scroll animations, mobile menu, counter animations
 */

(function () {
  "use strict";

  // ─── Theme toggle (dark/light) ───
  const html = document.documentElement;
  const themeBtn = document.getElementById("theme-toggle");
  const darkIcon = themeBtn.querySelector(".dark-icon");
  const lightIcon = themeBtn.querySelector(".light-icon");

  function setTheme(mode) {
    if (mode === "dark") {
      html.classList.add("dark");
      darkIcon.classList.remove("hidden");
      lightIcon.classList.add("hidden");
    } else {
      html.classList.remove("dark");
      darkIcon.classList.add("hidden");
      lightIcon.classList.remove("hidden");
    }
    localStorage.setItem("theme", mode);
  }

  // Init: check localStorage, then system preference
  const saved = localStorage.getItem("theme");
  if (saved) {
    setTheme(saved);
  } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    setTheme("light");
  } else {
    setTheme("dark");
  }

  themeBtn.addEventListener("click", () => {
    setTheme(html.classList.contains("dark") ? "light" : "dark");
  });

  // ─── Navbar scroll effect ───
  const navbar = document.getElementById("navbar");

  function handleNavScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", handleNavScroll, { passive: true });

  // ─── Active nav link highlighting ───
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function updateActiveNav() {
    const scrollY = window.scrollY + 200;
    let currentId = "";

    sections.forEach((section) => {
      if (section.offsetTop <= scrollY) {
        currentId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href === "#" + currentId) {
        link.classList.add("is-active");
      } else {
        link.classList.remove("is-active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNav, { passive: true });
  updateActiveNav();

  // ─── Smooth scroll with offset ───
  const NAV_HEIGHT = 80;

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();

      closeMobileMenu();

      const top = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  // ─── Mobile hamburger menu ───
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");
  let menuOpen = false;

  function openMobileMenu() {
    menuOpen = true;
    hamburger.classList.add("active");
    mobileMenu.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeMobileMenu() {
    menuOpen = false;
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("open");
    document.body.style.overflow = "";
  }

  hamburger.addEventListener("click", () => {
    menuOpen ? closeMobileMenu() : openMobileMenu();
  });

  document.querySelectorAll(".mobile-nav-link").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  // ─── Scroll-triggered fade-in animations ───
  const animElements = document.querySelectorAll(".animate-on-scroll");

  const animObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          animObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  animElements.forEach((el) => animObserver.observe(el));

  // ─── Counter animation ───
  const counters = document.querySelectorAll(".counter");
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;

    counters.forEach((counter) => {
      const target = parseInt(counter.dataset.target, 10);
      const duration = 2000;
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.round(eased * target);
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.textContent = target;
        }
      }

      requestAnimationFrame(update);
    });
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
          counterObserver.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );

  const metricsSection = document.getElementById("metrics");
  if (metricsSection) {
    counterObserver.observe(metricsSection);
  }
})();
