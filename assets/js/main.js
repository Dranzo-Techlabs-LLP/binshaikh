/* Bin Shaikh International — site runtime
   Layout injection · i18n (EN/AR) · scroll-driven storytelling (GSAP + Lenis) */
(function () {
  "use strict";

  /* ------------------------------------------------------------------
     COMPANY DETAILS — replace placeholders with real contact details
     ------------------------------------------------------------------ */
  const CONFIG = {
    whatsapp: "966500000000",            // international format, digits only
    whatsappDisplay: "+966 50 000 0000",
    phoneSA: "+966 12 000 0000",
    phoneIN: "+91 4931 000 000",
    email: "info@binshaikh.com",
    instagram: "binshaikhinternational",
    founded: 1994
  };

  window.__bsBooted = true;
  const root = document.documentElement;
  const LANG = root.lang === "ar" ? "ar" : "en";
  const RTL = LANG === "ar";
  const AR = window.BS_AR || {};
  const t = (k, f) => (LANG === "ar" && AR[k] ? AR[k] : f);
  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const PAGE = document.body.dataset.page || "home";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const YEAR = new Date().getFullYear();

  if (REDUCED) root.classList.add("reduced-motion");

  /* ------------------------------ Icons ------------------------------ */
  const I = {
    arrow: '<svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.8 14.1c-.24.68-1.42 1.3-1.95 1.35-.5.05-1.13.07-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-3s.75-2.13 1.02-2.42c.26-.29.58-.36.77-.36h.55c.18 0 .42-.07.65.5.24.58.82 2.01.89 2.15.07.15.12.32.02.51-.1.19-.14.31-.29.48-.14.17-.3.38-.43.51-.14.14-.29.3-.13.59.17.29.74 1.22 1.59 1.98 1.09.97 2.01 1.27 2.3 1.42.29.14.46.12.63-.07.17-.19.72-.84.92-1.13.19-.29.38-.24.65-.14.26.1 1.68.79 1.97.94.29.14.48.22.55.34.07.12.07.7-.17 1.38z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>'
  };
  window.BSIcons = I;

  /* ------------------------------ i18n ------------------------------- */
  function applyI18n() {
    if (LANG !== "ar") return;
    $$("[data-t]").forEach((el) => {
      const v = AR[el.dataset.t];
      if (v) el.innerHTML = v;
    });
    $$("[data-t-attr]").forEach((el) => {
      el.dataset.tAttr.split(";").forEach((pair) => {
        const [attr, key] = pair.split(":").map((s) => s.trim());
        if (AR[key]) el.setAttribute(attr, AR[key]);
      });
    });
    const meta = $('meta[name="description"]');
    if (meta && meta.dataset.t && AR[meta.dataset.t]) meta.setAttribute("content", AR[meta.dataset.t]);
  }

  function setLang(next) {
    try { localStorage.setItem("bsi-lang", next); } catch (e) {}
    const url = new URL(location.href);
    url.searchParams.delete("lang");
    location.href = url.toString();
  }

  /* ------------------------------ Layout ----------------------------- */
  const NAV = [
    ["index.html", "home", "nav.home", "Home"],
    ["about.html", "about", "nav.about", "About Us"],
    ["products.html", "products", "nav.products", "Products"],
    ["presence.html", "presence", "nav.presence", "Our Presence"],
    ["network.html", "network", "nav.network", "Business Network"],
    ["contact.html", "contact", "nav.contact", "Contact"]
  ];
  const wa = (msg) => `https://wa.me/${CONFIG.whatsapp}${msg ? "?text=" + encodeURIComponent(msg) : ""}`;
  const ig = `https://instagram.com/${CONFIG.instagram}`;

  function brand(light = true) {
    return `<a class="brand" href="index.html" aria-label="Bin Shaikh International — ${t("nav.home", "Home")}">
      <img class="brand__mark brand__mark--light" src="assets/brand/mark-white.webp" width="44" height="43" alt="">
      <img class="brand__mark brand__mark--dark" src="assets/brand/mark.webp" width="44" height="43" alt="">
      <span class="brand__text"><span class="brand__name">${t("brand.name", "BIN SHAIKH")}</span><span class="brand__sub">${t("brand.sub", "INTERNATIONAL")}</span></span>
    </a>`;
  }

  function langToggle() {
    return LANG === "ar"
      ? `<button class="lang-toggle" type="button" data-lang="en" aria-label="Switch to English">${I.globe}<span lang="en">English</span></button>`
      : `<button class="lang-toggle" type="button" data-lang="ar" aria-label="التبديل إلى العربية">${I.globe}<span lang="ar">العربية</span></button>`;
  }

  function header() {
    const links = NAV.map(([href, id, k, f]) => `<li><a class="nav__link" href="${href}"${id === PAGE ? ' aria-current="page"' : ""}>${t(k, f)}</a></li>`).join("");
    const mlinks = NAV.map(([href, id, k, f], i) => `<li><a href="${href}"${id === PAGE ? ' aria-current="page"' : ""}><span>0${i + 1}</span>${t(k, f)}</a></li>`).join("");
    return `
<a class="skip-link" href="#main">${t("a11y.skip", "Skip to content")}</a>
<header class="site-header" id="top">
  <div class="container site-header__inner">
    ${brand()}
    <nav class="nav" aria-label="${t("a11y.mainnav", "Main navigation")}"><ul class="nav__list">${links}</ul></nav>
    <div class="header-actions">
      ${langToggle()}
      <a class="btn btn--gold header-cta" href="contact.html">${t("cta.enquire", "Enquire Now")}</a>
      <button class="menu-btn" type="button" aria-label="${t("a11y.menu", "Open menu")}" aria-expanded="false" aria-controls="mobile-menu"><span class="menu-btn__lines"><span></span><span></span></span></button>
    </div>
  </div>
</header>
<div class="mobile-menu" id="mobile-menu" role="dialog" aria-modal="true" aria-label="${t("a11y.menu", "Menu")}">
  <div class="mobile-menu__top">${brand()}<button class="menu-btn" type="button" aria-label="${t("a11y.close", "Close menu")}" data-close><span class="menu-btn__lines"><span style="top:5px;transform:rotate(45deg)"></span><span style="top:5px;transform:rotate(-45deg)"></span></span></button></div>
  <ul class="mobile-menu__list">${mlinks}</ul>
  <div class="mobile-menu__foot">
    <a class="btn btn--whatsapp" href="${wa()}" target="_blank" rel="noopener">${I.whatsapp}<span>WhatsApp</span></a>
    ${langToggle()}
  </div>
</div>`;
  }

  function footer() {
    const links = NAV.map(([href, , k, f]) => `<li><a href="${href}">${t(k, f)}</a></li>`).join("");
    return `
<footer class="site-footer">
  <div class="container">
    <div class="site-footer__grid">
      <div class="site-footer__about">
        <img class="site-footer__logo" src="assets/brand/logo-white.webp" width="150" height="195" alt="Bin Shaikh International" loading="lazy">
        <p>${t("footer.about", "Exporters of premium Basmati rice, specialty rice and Indian spices from Kerala to the Kingdom of Saudi Arabia — trusted since 1994.")}</p>
        <div class="socials">
          <a href="${wa()}" target="_blank" rel="noopener" aria-label="WhatsApp">${I.whatsapp}</a>
          <a href="${ig}" target="_blank" rel="noopener" aria-label="Instagram">${I.instagram}</a>
          <a href="mailto:${CONFIG.email}" aria-label="Email">${I.mail}</a>
        </div>
      </div>
      <div><h3>${t("footer.explore", "Explore")}</h3><ul>${links}</ul></div>
      <div><h3>${t("footer.offices", "Offices")}</h3><ul>
        <li><a href="presence.html#jeddah">${t("office.jeddah", "Jeddah — Head Office")}</a></li>
        <li><a href="presence.html#tabuk">${t("office.tabuk", "Tabuk — Branch")}</a></li>
        <li><a href="presence.html#jazan">${t("office.jazan", "Jazan — Branch")}</a></li>
        <li><a href="presence.html#nilambur">${t("office.nilambur", "Nilambur, Kerala — India")}</a></li>
      </ul></div>
      <div><h3>${t("footer.contact", "Get in touch")}</h3><ul>
        <li><a href="${wa()}" target="_blank" rel="noopener"><bdi>${CONFIG.whatsappDisplay}</bdi>&nbsp;· WhatsApp</a></li>
        <li><a href="tel:${CONFIG.phoneSA.replace(/\s/g, "")}"><bdi>${CONFIG.phoneSA}</bdi>&nbsp;· KSA</a></li>
        <li><a href="tel:${CONFIG.phoneIN.replace(/\s/g, "")}"><bdi>${CONFIG.phoneIN}</bdi>&nbsp;· India</a></li>
        <li><a href="mailto:${CONFIG.email}">${CONFIG.email}</a></li>
        <li><a href="${ig}" target="_blank" rel="noopener">@${CONFIG.instagram}</a></li>
      </ul></div>
    </div>
    <div class="site-footer__bottom">
      <span>© ${YEAR} Bin Shaikh International. ${t("footer.rights", "All rights reserved.")}</span>
      <span>${t("footer.tag", "Basmati Rice · Specialty Rice · Spices — Since 1994")}</span>
    </div>
  </div>
  <div class="site-footer__giant" aria-hidden="true">BIN SHAIKH</div>
</footer>
<a class="wa-float" href="${wa(t("wa.default", "Hello Bin Shaikh International, I would like to enquire about your products."))}" target="_blank" rel="noopener" aria-label="${t("a11y.wa", "Chat with us on WhatsApp")}">${I.whatsapp}</a>
<div class="toast" role="status" aria-live="polite"></div>`;
  }

  function mountLayout() {
    document.body.insertAdjacentHTML("afterbegin", header());
    document.body.insertAdjacentHTML("beforeend", footer());

    // Fill config placeholders used inside page content
    $$("[data-cfg]").forEach((el) => {
      const k = el.dataset.cfg;
      if (k === "wa") el.href = wa(el.dataset.msg ? t(el.dataset.msg, el.dataset.msgEn || "") : "");
      else if (k === "ig") el.href = ig;
      else if (k === "mail") el.href = "mailto:" + CONFIG.email;
      else if (k === "telSA") el.href = "tel:" + CONFIG.phoneSA.replace(/\s/g, "");
      else if (k === "telIN") el.href = "tel:" + CONFIG.phoneIN.replace(/\s/g, "");
    });
    $$("[data-cfg-text]").forEach((el) => {
      const k = el.dataset.cfgText;
      el.textContent = k === "ig" ? "@" + CONFIG.instagram : CONFIG[k] || "";
    });
    $$("[data-icon]").forEach((el) => { el.innerHTML = I[el.dataset.icon] || ""; });
    $$("[data-year]").forEach((el) => { el.textContent = YEAR; });
    $$("[data-years]").forEach((el) => { el.textContent = YEAR - CONFIG.founded; });

    // Language toggles
    $$("[data-lang]").forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang)));

    // Mobile menu
    const menuBtns = $$(".menu-btn");
    const menu = $("#mobile-menu");
    const toggleMenu = (open) => {
      document.body.classList.toggle("menu-open", open);
      root.classList.toggle("menu-open", open);
      menuBtns[0].setAttribute("aria-expanded", String(open));
      if (open) setTimeout(() => menu.querySelector("a")?.focus(), 300);
      if (window.__lenis) open ? window.__lenis.stop() : window.__lenis.start();
    };
    menuBtns[0].addEventListener("click", () => toggleMenu(!document.body.classList.contains("menu-open")));
    menu.querySelector("[data-close]").addEventListener("click", () => { toggleMenu(false); menuBtns[0].focus(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && document.body.classList.contains("menu-open")) toggleMenu(false); });
  }

  function toast(msg) {
    const el = $(".toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("is-visible");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove("is-visible"), 4000);
  }

  /* --------------------------- Text helpers -------------------------- */
  function splitWords(el, cls) {
    const walk = (node) => {
      Array.from(node.childNodes).forEach((n) => {
        if (n.nodeType === 3) {
          const parts = n.textContent.split(/(\s+)/);
          const frag = document.createDocumentFragment();
          parts.forEach((p) => {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(" ")); return; }
            if (cls === "w") {
              const s = document.createElement("span"); s.className = "w"; s.textContent = p; frag.appendChild(s);
            } else {
              const o = document.createElement("span"); o.className = "split-line";
              const i = document.createElement("span"); i.textContent = p; o.appendChild(i); frag.appendChild(o);
            }
          });
          node.replaceChild(frag, n);
        } else if (n.nodeType === 1 && n.tagName !== "BR") walk(n);
      });
    };
    walk(el);
    el.setAttribute("aria-label", el.textContent.replace(/\s+/g, " ").trim());
    return cls === "w" ? $$(".w", el) : $$(".split-line > span", el);
  }

  /* --------------------------- Grain canvas -------------------------- */
  // Falling basmati grains in the hero — speed follows scroll velocity.
  function grainField(canvas) {
    const ctx = canvas.getContext("2d");
    let w, h, dpr, grains = [], running = true, boost = 0;
    const count = () => (window.innerWidth < 700 ? 34 : 80);
    const make = (initial) => ({
      x: Math.random() * w,
      y: initial ? Math.random() * h : -20,
      len: 9 + Math.random() * 9,
      th: 1.6 + Math.random() * 1.1,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.02,
      vy: 0.25 + Math.random() * 0.55,
      vx: (Math.random() - 0.5) * 0.25,
      z: 0.35 + Math.random() * 0.65,
      gold: Math.random() < 0.18
    });
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      grains = Array.from({ length: count() }, () => make(true));
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (const g of grains) {
        if (running && !REDUCED) {
          g.y += (g.vy + boost) * g.z * 1.4;
          g.x += g.vx;
          g.rot += g.vr + boost * 0.004;
          if (g.y > h + 30) Object.assign(g, make(false));
        }
        ctx.save();
        ctx.translate(g.x, g.y);
        ctx.rotate(g.rot);
        ctx.globalAlpha = 0.25 + g.z * 0.6;
        const grad = ctx.createLinearGradient(0, -g.th, 0, g.th);
        grad.addColorStop(0, g.gold ? "#f3dfae" : "#ffffff");
        grad.addColorStop(1, g.gold ? "#b98b33" : "#cfd3ff");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(0, 0, (g.len * g.z) / 2 + 2, g.th * g.z, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      boost *= 0.92;
      if (!REDUCED) requestAnimationFrame(draw);
    }
    resize();
    draw();
    window.addEventListener("resize", () => { clearTimeout(resize._t); resize._t = setTimeout(resize, 200); });
    new IntersectionObserver(([e]) => { running = e.isIntersecting; }).observe(canvas);
    return { kick(v) { boost = Math.min(6, boost + Math.abs(v) * 0.02); } };
  }

  /* ------------------------- Floating grains ------------------------- */
  function grainsSVG(n = 14, gold) {
    let s = '<svg class="grains" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">';
    for (let i = 0; i < n; i++) {
      const x = (8 + Math.random() * 84).toFixed(1), y = (8 + Math.random() * 84).toFixed(1), r = Math.round(Math.random() * 180);
      const d = (0.4 + Math.random() * 1.2).toFixed(2);
      s += `<g data-depth="${d}"><ellipse cx="${x}" cy="${y}" rx="${(2 + Math.random() * 1.4).toFixed(2)}" ry="0.55" transform="rotate(${r} ${x} ${y})" fill="${gold && Math.random() < 0.6 ? "#d9b46a" : "#fffdf6"}" stroke="#d6cbb1" stroke-width="0.12"/></g>`;
    }
    return s + "</svg>";
  }

  /* --------------------------- Contact form -------------------------- */
  function initForm() {
    const form = $("#enquiry-form");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let firstBad = null;
      $$(".field", form).forEach((f) => {
        const input = f.querySelector("input,textarea,select");
        if (!input) return;
        const bad = input.required && !input.value.trim() || (input.type === "email" && input.value && !/^\S+@\S+\.\S+$/.test(input.value));
        f.classList.toggle("has-error", !!bad);
        input.setAttribute("aria-invalid", bad ? "true" : "false");
        if (bad && !firstBad) firstBad = input;
      });
      if (firstBad) { firstBad.focus(); return; }
      const d = Object.fromEntries(new FormData(form));
      const lines = [
        t("form.msg.head", "New enquiry via website"),
        `${t("form.name", "Name")}: ${d.name}`,
        d.company ? `${t("form.company", "Company")}: ${d.company}` : "",
        `${t("form.country", "Country")}: ${d.country || "-"}`,
        `${t("form.interest", "Interested in")}: ${d.interest}`,
        d.email ? `Email: ${d.email}` : "",
        "",
        d.message
      ].filter((l) => l !== "").join("\n");
      const via = (e.submitter && e.submitter.dataset.via) || "wa";
      if (via === "mail") {
        location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(t("form.subject", "Business enquiry — ") + d.interest)}&body=${encodeURIComponent(lines)}`;
      } else {
        window.open(wa(lines), "_blank", "noopener");
      }
      toast(t("form.sent", "Thank you — your enquiry is ready to send."));
    });
    $$(".field input, .field textarea, .field select", form).forEach((i) =>
      i.addEventListener("blur", () => {
        const f = i.closest(".field");
        if (f.classList.contains("has-error") && i.value.trim()) { f.classList.remove("has-error"); i.setAttribute("aria-invalid", "false"); }
      })
    );
  }

  function initMapTabs() {
    const tabs = $$("[data-map-tab]");
    const frame = $("#office-map");
    if (!tabs.length || !frame) return;
    tabs.forEach((tab) => tab.addEventListener("click", () => {
      tabs.forEach((x) => x.setAttribute("aria-selected", String(x === tab)));
      frame.src = `https://maps.google.com/maps?q=${encodeURIComponent(tab.dataset.mapTab)}&z=12&output=embed`;
      frame.title = tab.textContent.trim() + " map";
    }));
  }

  /* ----------------------------- Animations -------------------------- */
  function animate() {
    const gsap = window.gsap, ST = window.ScrollTrigger;
    const loader = $(".loader");
    const hideLoader = () => loader && loader.remove();

    if (!gsap || !ST || REDUCED) {
      root.classList.add("no-gsap");
      hideLoader();
      $$(".journey__frame img")[0]?.classList.add("is-active");
      $$(".journey__step").forEach((s) => s.classList.add("is-active"));
      $$(".loc-panel").forEach((s) => s.classList.add("is-active"));
      $$("[data-count]").forEach((el) => { el.textContent = el.dataset.count + (el.dataset.suffix || ""); });
      const ship = $(".trade-map .ship");
      if (ship) ship.style.display = "none";
      return;
    }

    gsap.registerPlugin(ST);
    gsap.defaults({ ease: "power3.out", duration: 1 });

    /* Smooth scroll */
    if (window.Lenis) {
      const lenis = new window.Lenis({ lerp: 0.1, smoothWheel: true });
      window.__lenis = lenis;
      lenis.on("scroll", ST.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
      $$('a[href^="#"]').forEach((a) => a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        if (id.length > 1 && $(id)) { e.preventDefault(); lenis.scrollTo(id, { offset: -90 }); }
      }));
    }

    /* Header behaviour */
    const hdr = $(".site-header");
    let lastY = 0;
    ST.create({
      start: 0, end: "max",
      onUpdate(self) {
        const y = self.scroll();
        hdr.classList.toggle("is-scrolled", y > 40);
        hdr.classList.toggle("is-hidden", y > 400 && y > lastY && !document.body.classList.contains("menu-open"));
        lastY = y;
      }
    });

    /* Generic: reveal */
    $$("[data-reveal]").forEach((el) => {
      const kids = el.hasAttribute("data-stagger") ? Array.from(el.children) : null;
      if (kids) {
        gsap.set(el, { opacity: 1 });
        gsap.from(kids, { y: 48, opacity: 0, duration: 1.1, stagger: 0.09, scrollTrigger: { trigger: el, start: "top 85%" } });
      } else {
        gsap.fromTo(el, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, delay: +el.dataset.delay || 0, scrollTrigger: { trigger: el, start: "top 88%" } });
      }
    });

    /* Generic: split headings */
    $$("[data-split]").forEach((el) => {
      const words = splitWords(el);
      if (el.closest(".hero--home")) return; // handled by hero intro
      gsap.from(words, { yPercent: 115, duration: 1.15, stagger: 0.035, ease: "power4.out", scrollTrigger: { trigger: el, start: "top 88%" } });
    });

    /* Generic: word-fill statement (reads as you scroll) */
    $$("[data-word-fill]").forEach((el) => {
      el.classList.add("word-fill");
      const words = splitWords(el, "w");
      gsap.to(words, { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true } });
    });

    /* Generic: parallax media */
    $$("[data-parallax]").forEach((el) => {
      const amt = parseFloat(el.dataset.parallax) || 12;
      gsap.fromTo(el, { yPercent: -amt }, { yPercent: amt * 0.4, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
    });

    /* Generic: clip reveal for images */
    $$("[data-clip]").forEach((el) => {
      const img = el.querySelector("img");
      const from = RTL ? "inset(0 0 0 100% round 28px)" : "inset(0 100% 0 0 round 28px)";
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 80%" } });
      tl.fromTo(el, { clipPath: el.dataset.clip === "up" ? "inset(100% 0 0 0 round 28px)" : from }, { clipPath: "inset(0% 0% 0% 0% round 28px)", duration: 1.5, ease: "power4.inOut" });
      if (img) tl.from(img, { scale: 1.35, duration: 1.8, ease: "power3.out" }, 0);
    });

    /* Generic: counters */
    $$("[data-count]").forEach((el) => {
      const end = +el.dataset.count, o = { v: +el.dataset.from || 0 };
      ST.create({
        trigger: el, start: "top 90%", once: true,
        onEnter: () => gsap.to(o, { v: end, duration: 2.2, ease: "power2.out", onUpdate: () => { el.textContent = Math.round(o.v) + (el.dataset.suffix || ""); } })
      });
    });

    /* Page hero (inner pages) */
    const ph = $(".page-hero");
    if (ph) {
      const img = $(".page-hero__media img", ph);
      gsap.from(img, { scale: 1.25, duration: 2.4, ease: "power3.out" });
      gsap.to(img, { yPercent: 14, ease: "none", scrollTrigger: { trigger: ph, start: "top top", end: "bottom top", scrub: true } });
      gsap.from($$(".page-hero__inner > :not(.page-hero__title)", ph), { y: 30, opacity: 0, duration: 1.2, stagger: 0.1, delay: 0.3 });
      gsap.to($(".page-hero__inner", ph), { y: -60, opacity: 0.2, ease: "none", scrollTrigger: { trigger: ph, start: "center center", end: "bottom top", scrub: true } });
    }

    /* Page-specific */
    if (PAGE === "home") homeAnimations(gsap, ST, hideLoader);
    else hideLoader();
    if (PAGE === "about") aboutAnimations(gsap, ST);
    if (PAGE === "products") productAnimations(gsap, ST);
    if (PAGE === "presence") presenceAnimations(gsap, ST);
    if (PAGE === "network") networkAnimations(gsap, ST);

    mapRouteAnimation(gsap, ST);

    // Refresh after fonts + images settle
    document.fonts && document.fonts.ready.then(() => ST.refresh());
    window.addEventListener("load", () => ST.refresh());
  }

  /* ---- Home ---- */
  function homeAnimations(gsap, ST, hideLoader) {
    const hero = $(".hero--home");
    const field = grainField($(".grain-canvas", hero));
    if (window.__lenis) window.__lenis.on("scroll", (l) => field.kick(l.velocity));

    const words = $$(".hero__title .split-line > span", hero);
    const intro = gsap.timeline({ delay: 0.15, onStart: () => {
      const l = $(".loader");
      if (l) gsap.to(l, { opacity: 0, duration: 0.6, ease: "power2.out", onComplete: hideLoader });
    } });
    gsap.set(".hero__inner", { opacity: 1 });
    intro
      .from(".hero__media img", { scale: 1.3, opacity: 0, duration: 2.4, ease: "power3.out" }, 0.2)
      .from(".hero .eyebrow", { y: 20, opacity: 0, duration: 0.9 }, 0.5)
      .from(words, { yPercent: 115, duration: 1.3, stagger: 0.045, ease: "power4.out" }, 0.55)
      .from(".hero__lead", { y: 24, opacity: 0, duration: 1 }, 1.05)
      .from(".hero__actions > *", { y: 20, opacity: 0, duration: 0.9, stagger: 0.1 }, 1.2)
      // The genie lamp: body appears, then the smoke rises out of the spout
      .fromTo(".hero__mark", { clipPath: "inset(100% 0% 0% 0%)", y: 30 }, { clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: 1.8, ease: "power3.inOut" }, 0.9)
      .from(".hero__strip li", { y: 30, opacity: 0, duration: 1, stagger: 0.12 }, 1.35);

    // Scroll-out: content lifts away, rice image pushes in
    const out = { trigger: hero, start: "top top", end: "bottom top", scrub: true };
    gsap.to(".hero__inner", { yPercent: -18, opacity: 0, ease: "none", scrollTrigger: out });
    gsap.to(".hero__media img", { scale: 1.18, yPercent: 8, ease: "none", scrollTrigger: out });
    gsap.to(".hero__mark", { yPercent: -60, rotate: -6, opacity: 0, ease: "none", scrollTrigger: out });

    // "Since 1994" — the year advances with the scroll
    const since = $(".since");
    if (since) {
      const yearEl = $(".since__year", since);
      const caps = $$(".since__caption p", since);
      const o = { y: 1994 };
      const tl = gsap.timeline({ scrollTrigger: { trigger: since, start: "top top", end: "+=220%", pin: true, scrub: 0.8 } });
      tl.to(o, { y: YEAR, ease: "none", duration: 1, onUpdate: () => { yearEl.textContent = Math.round(o.y); } }, 0)
        .to(".since__bar span", { scaleX: 1, ease: "none", duration: 1 }, 0)
        .fromTo(".since__bg img", { scale: 1.3 }, { scale: 1, ease: "none", duration: 1 }, 0);
      caps.forEach((c, i) => {
        if (!i) return;
        const at = (i / caps.length) * 0.95;
        tl.to(caps[i - 1], { opacity: 0, y: -14, duration: 0.06 }, at)
          .fromTo(c, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.06 }, at + 0.04);
      });
    }

    railAnimation(gsap, ST);
    journeyAnimation(gsap, ST);

    // CTA background drift
    $$(".cta-band__bg img").forEach((img) => gsap.fromTo(img, { yPercent: -8, scale: 1.1 }, { yPercent: 8, ease: "none", scrollTrigger: { trigger: img.closest(".cta-band"), start: "top bottom", end: "bottom top", scrub: true } }));
  }

  /* ---- Horizontal product rail ---- */
  function railAnimation(gsap, ST) {
    const rail = $(".rail");
    if (!rail) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const track = $(".rail__track", rail);
      const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const tween = gsap.to(track, {
        x: () => (RTL ? dist() : -dist()), ease: "none",
        scrollTrigger: { trigger: rail, start: "top top", end: () => "+=" + dist(), pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 }
      });
      gsap.to(".rail__progress span", { scaleX: 1, ease: "none", scrollTrigger: { trigger: rail, start: "top top", end: () => "+=" + dist(), scrub: true } });
      // Each pack tilts upright as it slides into view
      $$(".pack-card", rail).forEach((card) => {
        const pack = $(".pack", card);
        if (!pack) return;
        gsap.fromTo(pack, { rotate: RTL ? -10 : 10, y: 40, scale: 0.9 }, {
          rotate: 0, y: 0, scale: 1, ease: "none",
          scrollTrigger: { trigger: card, containerAnimation: tween, start: RTL ? "right left" : "left right", end: "center center", scrub: true }
        });
      });
    });
  }

  /* ---- Field to table journey ---- */
  function journeyAnimation(gsap, ST) {
    const steps = $$(".journey__step");
    if (!steps.length) return;
    const imgs = $$(".journey__frame img");
    const num = $(".journey__badge b");
    const label = $(".journey__badge span");
    const set = (i) => {
      steps.forEach((s, j) => s.classList.toggle("is-active", j === i));
      imgs.forEach((im, j) => im.classList.toggle("is-active", j === i));
      if (num) num.textContent = String(i + 1).padStart(2, "0");
      if (label) label.textContent = steps[i].querySelector("h3").textContent;
    };
    set(0);
    steps.forEach((s, i) => ST.create({ trigger: s, start: "top 62%", end: "bottom 62%", onToggle: (self) => self.isActive && set(i) }));
    gsap.to(".journey__line span", { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".journey__steps", start: "top 62%", end: "bottom 62%", scrub: true } });
  }

  /* ---- Trade route (home + presence) ---- */
  function mapRouteAnimation(gsap, ST) {
    const svg = $("[data-map='route']");
    if (!svg) return;
    const route = $(".route", svg);
    const ship = $(".ship", svg);
    const len = route.getTotalLength();
    const pins = (id) => $(`#pin-${id}`, svg);
    const branches = $$(".branch", svg);
    const legend = $$(".legend li");
    gsap.set(route, { strokeDasharray: len, strokeDashoffset: len });
    gsap.set([pins("jeddah"), pins("tabuk"), pins("jazan"), ...branches], { opacity: 0 });
    gsap.set(legend, { opacity: 0.35 });
    const start = route.getPointAtLength(0);
    ship.setAttribute("transform", `translate(${start.x} ${start.y})`);

    const s = { p: 0 };
    const tl = gsap.timeline({ scrollTrigger: { trigger: svg, start: "top 80%", end: "center 40%", scrub: 1 } });
    tl.to(legend[3] || {}, { opacity: 1, duration: 0.2 }, 0)
      .to(route, { strokeDashoffset: 0, ease: "none", duration: 3 }, 0.1)
      .to(s, { p: 1, ease: "none", duration: 3, onUpdate: () => {
        const pt = route.getPointAtLength(s.p * len);
        ship.setAttribute("transform", `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)})`);
      } }, 0.1)
      .to(pins("jeddah"), { opacity: 1, duration: 0.3 }, 3)
      .to(legend[0] || {}, { opacity: 1, duration: 0.3 }, 3)
      .to(ship, { opacity: 0, duration: 0.3 }, 3.1)
      .to(branches, { opacity: 1, duration: 0.5, stagger: 0.2 }, 3.2)
      .to(pins("tabuk"), { opacity: 1, duration: 0.3 }, 3.5)
      .to(legend[1] || {}, { opacity: 1, duration: 0.3 }, 3.5)
      .to(pins("jazan"), { opacity: 1, duration: 0.3 }, 3.7)
      .to(legend[2] || {}, { opacity: 1, duration: 0.3 }, 3.7);
  }

  /* ---- About ---- */
  function aboutAnimations(gsap, ST) {
    const tlSec = $(".timeline");
    if (!tlSec) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const track = $(".timeline__track", tlSec);
      const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const tween = gsap.to(track, { x: () => (RTL ? dist() : -dist()), ease: "none", scrollTrigger: { trigger: tlSec, start: "top top", end: () => "+=" + dist(), pin: true, scrub: 1, invalidateOnRefresh: true } });
      gsap.to(".timeline__axis span", { scaleX: 1, ease: "none", scrollTrigger: { trigger: tlSec, start: "top top", end: () => "+=" + dist(), scrub: true } });
      $$(".chapter", tlSec).forEach((c) => {
        gsap.from($$(".chapter__year, .chapter__dot, h3, p", c), {
          y: 30, opacity: 0, stagger: 0.08, ease: "power2.out",
          scrollTrigger: { trigger: c, containerAnimation: tween, start: RTL ? "right 15%" : "left 85%", end: RTL ? "right 55%" : "left 45%", scrub: true }
        });
      });
    });
  }

  /* ---- Products ---- */
  function productAnimations(gsap, ST) {
    // Category nav follows the reader
    const links = $$(".cat-nav a");
    links.forEach((a) => {
      const sec = $(a.getAttribute("href"));
      if (!sec) return;
      ST.create({ trigger: sec, start: "top 50%", end: "bottom 50%", onToggle: (self) => {
        if (!self.isActive) return;
        links.forEach((l) => l.classList.toggle("is-active", l === a));
        a.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
      } });
    });

    // Feature packs rise and turn; grains drift at different depths
    $$(".product-feature").forEach((f) => {
      const stage = $(".product-feature__stage", f);
      stage.insertAdjacentHTML("beforeend", grainsSVG(16, f.dataset.gold === "1"));
      const pack = $(".pack", stage);
      const st = { trigger: f, start: "top bottom", end: "bottom top", scrub: true };
      gsap.fromTo(pack, { y: 90, rotate: RTL ? 7 : -7 }, { y: -50, rotate: RTL ? -3 : 3, ease: "none", scrollTrigger: st });
      gsap.fromTo($$(".halo", stage), { scale: 0.75, opacity: 0 }, { scale: 1.08, opacity: 1, ease: "none", stagger: 0.1, scrollTrigger: st });
      $$(".grains g", stage).forEach((g) => gsap.fromTo(g, { y: 25 * g.dataset.depth }, { y: -35 * g.dataset.depth, rotate: 40 * g.dataset.depth, transformOrigin: "50% 50%", ease: "none", scrollTrigger: st }));
      gsap.from($$(".product-feature__body > *", f), { y: 30, opacity: 0, stagger: 0.07, duration: 1, scrollTrigger: { trigger: f, start: "top 75%" } });
    });

    // Spice band — background takes on the colour of each spice
    const band = $(".spice-band");
    if (band) {
      $$(".spice-row", band).forEach((row) => {
        ST.create({ trigger: row, start: "top 55%", end: "bottom 55%", onToggle: (self) => self.isActive && gsap.to(band, { backgroundColor: row.dataset.color, duration: 0.9, ease: "power2.out" }) });
        const pack = $(".pack", row);
        const st = { trigger: row, start: "top bottom", end: "bottom top", scrub: true };
        gsap.fromTo(pack, { y: 80, rotate: -10 }, { y: -60, rotate: 8, ease: "none", scrollTrigger: st });
        gsap.fromTo($(".spice-ring", row), { rotate: 0 }, { rotate: 120, ease: "none", scrollTrigger: st });
        gsap.from($$(".spice-row__body > *", row), { y: 40, opacity: 0, stagger: 0.08, scrollTrigger: { trigger: row, start: "top 70%" } });
      });
    }

    // Packing sizes grow in sequence
    gsap.from(".packing__item svg", { scaleY: 0, transformOrigin: "50% 100%", stagger: 0.08, duration: 0.9, ease: "back.out(1.6)", scrollTrigger: { trigger: ".packing", start: "top 85%" } });
  }

  /* ---- Presence: map follows the reader ---- */
  function presenceAnimations(gsap, ST) {
    const svg = $("[data-map='locator']");
    if (!svg) return;
    const P = window.BSMap.project;
    const base = svg.getAttribute("viewBox");
    const focus = (id) => {
      $$(".pin", svg).forEach((p) => p.style.opacity = !id || p.dataset.pin === id ? 1 : 0.35);
      if (!id) { gsap.to(svg, { attr: { viewBox: base }, duration: 1.3, ease: "power3.inOut" }); return; }
      const pl = window.BSMap.PLACES[id];
      const [x, y] = P(pl.lon, pl.lat);
      const w = id === "nilambur" ? 260 : 220, h = w * (255 / 540);
      gsap.to(svg, { attr: { viewBox: `${(x - w / 2).toFixed(1)} ${(y - h / 2).toFixed(1)} ${w} ${h.toFixed(1)}` }, duration: 1.3, ease: "power3.inOut" });
    };
    const panels = $$(".loc-panel");
    panels.forEach((p) => ST.create({ trigger: p, start: "top 55%", end: "bottom 55%", onToggle: (self) => {
      if (!self.isActive) return;
      panels.forEach((x) => x.classList.toggle("is-active", x === p));
      focus(p.dataset.focus || null);
    } }));
    panels[0]?.classList.add("is-active");
  }

  /* ---- Network constellation ---- */
  function networkAnimations(gsap, ST) {
    const svg = $(".constellation");
    if (!svg) return;
    const links = $$(".link", svg);
    links.forEach((l) => { const len = l.getTotalLength(); gsap.set(l, { strokeDasharray: l.classList.contains("link--soft") ? "3 5" : len, strokeDashoffset: l.classList.contains("link--soft") ? 0 : len, opacity: l.classList.contains("link--soft") ? 0 : 0.8 }); });
    const tl = gsap.timeline({ scrollTrigger: { trigger: svg, start: "top 70%", end: "bottom 45%", scrub: 1 } });
    tl.from(".node--main", { scale: 0.4, opacity: 0, transformOrigin: "50% 50%", duration: 0.6 })
      .to(".link--main", { strokeDashoffset: 0, duration: 0.8, stagger: 0.15, ease: "none" })
      .from(".node--biz", { scale: 0.4, opacity: 0, transformOrigin: "50% 50%", stagger: 0.15, duration: 0.5 }, "-=0.3")
      .to(".link--soft", { opacity: 0.8, duration: 0.6, stagger: 0.05 })
      .from(".node--sector", { scale: 0.5, opacity: 0, transformOrigin: "50% 50%", stagger: 0.1, duration: 0.4 }, "-=0.4");
  }

  /* ------------------------------- Boot ------------------------------ */
  applyI18n();
  root.classList.add("i18n-ready");
  mountLayout();
  window.BSPacks && window.BSPacks.mount();
  $$("[data-map]").forEach((svg) => window.BSMap && window.BSMap.render(svg, { t, routeId: "route-" + svg.dataset.map }));
  initForm();
  initMapTabs();
  animate();
})();
