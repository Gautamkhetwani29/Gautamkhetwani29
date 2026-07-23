(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------------- Header scroll state ---------------- */
  const header = document.getElementById("siteHeader");
  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------------- Mobile nav ---------------- */
  const navToggle = document.getElementById("navToggle");
  const mobileNav = document.getElementById("mobileNav");
  navToggle.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("open");
    header.classList.toggle("nav-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  mobileNav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      header.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------------- Qualify form (static site: builds a mailto + logs to a Google Sheet) ---------------- */
  // Paste your deployed Google Apps Script Web App URL here once it's set up (see setup notes).
  const SHEET_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwq675jRYot5ghU8fmgBrWtzr0J-NB1WDo90VZT9dWwOFFnwckOCOMpcIwK2kAYTm38/exec";

  const qualifyForm = document.getElementById("qualifyForm");
  const qualifyNote = document.getElementById("qualifyNote");
  if (qualifyForm && qualifyNote) {
    qualifyForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(qualifyForm);
      const spend = data.get("spend").trim();
      const roas = data.get("roas").trim();
      const bottleneck = data.get("bottleneck").trim();
      const site = data.get("site").trim();

      if (SHEET_WEB_APP_URL) {
        // Apps Script web apps don't return CORS headers for cross-origin requests,
        // so this is fire-and-forget: we can't read the response, but the POST
        // still reaches the script and gets logged.
        fetch(SHEET_WEB_APP_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify({ spend, roas, bottleneck, site }),
        }).catch(() => {});
      }

      const subject = encodeURIComponent(`Meta Ads fit check: ${site}`);
      const body = encodeURIComponent(
        `Monthly ad spend on Meta: ${spend}\nCurrent ROAS: ${roas}\nBiggest bottleneck: ${bottleneck}\nWebsite: ${site}`
      );
      window.location.href = `mailto:gautamkhetwani29@gmail.com?subject=${subject}&body=${body}`;

      qualifyForm.hidden = true;
      qualifyNote.hidden = false;
    });
  }

  /* ---------------- Scroll reveal (IntersectionObserver, GSAP-independent) ---------------- */
  const revealEls = Array.from(document.querySelectorAll(".reveal-up, .reveal-line"));

  // stagger delay based on position among siblings sharing a parent
  const groups = new Map();
  revealEls.forEach((el) => {
    const parent = el.parentElement;
    if (!groups.has(parent)) groups.set(parent, []);
    groups.get(parent).push(el);
  });
  groups.forEach((els) => {
    els.forEach((el, i) => {
      const delay = Math.min(i * 70, 420);
      el.style.transitionDelay = prefersReducedMotion ? "0ms" : `${delay}ms`;
    });
  });

  if (prefersReducedMotion) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  }

  /* ---------------- Count-up stats ---------------- */
  const countEls = document.querySelectorAll("[data-count-to]");

  function animateCount(el) {
    const target = parseFloat(el.getAttribute("data-count-to"));
    const decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    const prefix = el.getAttribute("data-prefix") || "";
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 1400;
    const start = performance.now();

    const fmt = (n) => (decimals > 0 ? n.toFixed(decimals) : Math.round(n).toLocaleString("en-IN"));

    function frame(now) {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out-cubic
      const value = target * eased;
      el.textContent = `${prefix}${fmt(value)}${suffix}`;
      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        el.textContent = `${prefix}${fmt(target)}${suffix}`;
      }
    }

    if (prefersReducedMotion) {
      el.textContent = `${prefix}${fmt(target)}${suffix}`;
    } else {
      requestAnimationFrame(frame);
    }
  }

  const countObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  countEls.forEach((el) => countObserver.observe(el));

  /* ---------------- Case study expand/collapse ---------------- */
  function toggleCaseStudy(id) {
    const study = document.getElementById(id);
    if (!study) return;
    const isOpen = study.classList.toggle("open");
    const head = study.querySelector(".case-head");
    if (head) head.setAttribute("aria-expanded", String(isOpen));
    const readMore = study.querySelector(".case-read-more");
    if (readMore) {
      readMore.textContent = isOpen
        ? "Hide the full case study ↑"
        : "Read the full case study: problem, strategy, results ↓";
    }
  }

  document.querySelectorAll("[data-case-toggle]").forEach((trigger) => {
    const targetId = trigger.getAttribute("data-case-toggle");
    trigger.addEventListener("click", () => toggleCaseStudy(targetId));
    if (trigger.classList.contains("case-head")) {
      trigger.setAttribute("tabindex", "0");
      trigger.setAttribute("role", "button");
      trigger.setAttribute("aria-expanded", "false");
      trigger.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleCaseStudy(targetId);
        }
      });
    }
  });

  /* ---------------- Lightbox for proof screenshots ---------------- */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");
  let lastFocusedEl = null;

  function openLightbox(src, caption, alt) {
    lastFocusedEl = document.activeElement;
    lightboxImg.src = src;
    lightboxImg.alt = alt || caption || "";
    lightboxCaption.textContent = caption || "";
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = "";
    document.body.style.overflow = "";
    if (lastFocusedEl) lastFocusedEl.focus();
  }

  document.querySelectorAll("[data-lightbox]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const src = btn.getAttribute("data-lightbox");
      const caption = btn.getAttribute("data-caption");
      const alt = btn.querySelector("img")?.alt;
      openLightbox(src, caption, alt);
    });
  });

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
  });

  /* ---------------- Portfolio download gate (collects lead info, then opens the PDF) ---------------- */
  // Paste your deployed Google Apps Script Web App URL here once it's set up (see setup notes).
  const PORTFOLIO_SHEET_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbw1YVsReh0lepNUWkqy-DU6dPQfSUK9radscSvVKu0iwtvxFHD5ZMXHx3VKuJtI6I2VPA/exec";

  const portfolioGate = document.getElementById("portfolioGate");
  const portfolioGateTrigger = document.getElementById("portfolioGateTrigger");
  const portfolioGateClose = document.getElementById("portfolioGateClose");
  const portfolioGateForm = document.getElementById("portfolioGateForm");
  let portfolioPdfUrl = "";
  let portfolioLastFocusedEl = null;

  function openPortfolioGate() {
    portfolioLastFocusedEl = document.activeElement;
    portfolioPdfUrl = portfolioGateTrigger.getAttribute("data-pdf-url");
    portfolioGate.hidden = false;
    document.body.style.overflow = "hidden";
    document.getElementById("pgName").focus();
  }

  function closePortfolioGate() {
    portfolioGate.hidden = true;
    document.body.style.overflow = "";
    if (portfolioLastFocusedEl) portfolioLastFocusedEl.focus();
  }

  if (portfolioGate && portfolioGateTrigger && portfolioGateForm) {
    portfolioGateTrigger.addEventListener("click", openPortfolioGate);
    portfolioGateClose.addEventListener("click", closePortfolioGate);
    portfolioGate.addEventListener("click", (e) => {
      if (e.target === portfolioGate) closePortfolioGate();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !portfolioGate.hidden) closePortfolioGate();
    });

    portfolioGateForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(portfolioGateForm);
      const name = data.get("name").trim();
      const email = data.get("email").trim();
      const phone = data.get("phone").trim();
      const profession = data.get("profession").trim();

      if (PORTFOLIO_SHEET_WEB_APP_URL) {
        fetch(PORTFOLIO_SHEET_WEB_APP_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify({ name, email, phone, profession }),
        }).catch(() => {});
      }

      window.open(portfolioPdfUrl, "_blank", "noopener");
      portfolioGateForm.reset();
      closePortfolioGate();
    });
  }

  /* ---------------- Optional GSAP enhancement: subtle hero parallax ---------------- */
  window.addEventListener("load", () => {
    if (prefersReducedMotion) return;
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const glow = document.querySelector(".hero-glow");
    if (glow) {
      gsap.to(glow, {
        y: 120,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }

    gsap.utils.toArray(".hero-float-card").forEach((card, i) => {
      gsap.to(card, {
        y: i % 2 === 0 ? -10 : 10,
        duration: 2.6 + i * 0.3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });
  });

  /* ---------------- Nursery quarter selector ---------------- */
  (function () {
    const widget = document.getElementById("nurseryWidget");
    if (!widget) return;

    const quarters = JSON.parse(widget.getAttribute("data-quarters"));
    const baselineRoas = parseFloat(quarters[0].roas);
    const VB_W = 300;
    const VB_H = 140;

    const select = document.getElementById("nurseryPeriodSelect");
    const btn = document.getElementById("nurseryPeriodBtn");
    const menu = document.getElementById("nurseryPeriodMenu");
    const periodLabel = document.getElementById("nurseryPeriodLabel");
    const trend = document.getElementById("nurseryTrend");
    const trendPct = document.getElementById("nurseryTrendPct");
    const roasValue = document.getElementById("nurseryRoasValue");
    const spendVal = document.getElementById("nurserySpendVal");
    const cpaVal = document.getElementById("nurseryCpaVal");
    const revenueVal = document.getElementById("nurseryRevenueVal");
    const tooltip = document.getElementById("nurseryTooltip");
    const tooltipVal = document.getElementById("nurseryTooltipVal");
    const tooltipLabel = document.getElementById("nurseryTooltipLabel");
    const dots = widget.querySelectorAll(".mw-dot");
    const hitDots = widget.querySelectorAll(".mw-dot-hit");
    const options = menu.querySelectorAll(".mw-period-option");

    function positionTooltip(cx, cy) {
      tooltip.style.setProperty("--tt-tx", "-50%");
      tooltip.style.setProperty("--tt-ty", "-130%");
      tooltip.style.left = `${(cx / VB_W) * 100}%`;
      tooltip.style.top = `${(cy / VB_H) * 100}%`;

      const widgetRect = widget.getBoundingClientRect();
      const pad = 10;
      let ttRect = tooltip.getBoundingClientRect();

      if (ttRect.right > widgetRect.right - pad) {
        tooltip.style.setProperty("--tt-tx", "-100%");
      } else if (ttRect.left < widgetRect.left + pad) {
        tooltip.style.setProperty("--tt-tx", "0%");
      }

      ttRect = tooltip.getBoundingClientRect();
      if (ttRect.top < widgetRect.top + pad) {
        tooltip.style.setProperty("--tt-ty", "30%");
      }
    }

    function selectQuarter(index) {
      const q = quarters[index];
      const roas = parseFloat(q.roas);

      roasValue.textContent = `${q.roas}x`;
      spendVal.textContent = q.spend;
      cpaVal.textContent = q.cpa;
      revenueVal.textContent = q.revenue;
      periodLabel.textContent = `${q.label}, 2025`;
      tooltipVal.textContent = `${q.roas}x ROAS`;
      tooltipLabel.textContent = `${q.label}, 2025`;

      if (index === 0) {
        trend.classList.add("mw-trend-neutral");
        trendPct.textContent = "Baseline";
      } else {
        trend.classList.remove("mw-trend-neutral");
        const pct = Math.round(((roas - baselineRoas) / baselineRoas) * 100);
        trendPct.textContent = `+${pct}%`;
      }

      dots.forEach((dot) => {
        const isActive = Number(dot.getAttribute("data-quarter-index")) === index;
        dot.classList.toggle("mw-dot-active", isActive);
        if (isActive) {
          const cx = parseFloat(dot.getAttribute("cx"));
          const cy = parseFloat(dot.getAttribute("cy"));
          positionTooltip(cx, cy);
        }
      });

      options.forEach((opt) => {
        opt.setAttribute(
          "aria-selected",
          String(Number(opt.getAttribute("data-quarter-index")) === index)
        );
      });
    }

    function closeMenu() {
      select.classList.remove("mw-open");
      btn.setAttribute("aria-expanded", "false");
    }
    function openMenu() {
      select.classList.add("mw-open");
      btn.setAttribute("aria-expanded", "true");
    }

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (select.classList.contains("mw-open")) closeMenu();
      else openMenu();
    });

    options.forEach((opt) => {
      opt.addEventListener("click", () => {
        selectQuarter(Number(opt.getAttribute("data-quarter-index")));
        closeMenu();
      });
      opt.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          selectQuarter(Number(opt.getAttribute("data-quarter-index")));
          closeMenu();
        }
      });
    });

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        selectQuarter(Number(dot.getAttribute("data-quarter-index")));
      });
    });
    hitDots.forEach((hit) => {
      hit.addEventListener("click", () => {
        selectQuarter(Number(hit.getAttribute("data-quarter-index")));
      });
    });

    document.addEventListener("click", (e) => {
      if (!select.contains(e.target)) closeMenu();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });

    selectQuarter(3);
  })();
})();
