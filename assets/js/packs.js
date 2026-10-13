/* Bin Shaikh — branded packaging renderer.
   Draws own-brand rice bags, spice pouches and cartons as inline SVG so
   packaging stays crisp, on-brand and easy to update until real
   photography is supplied. */
(function () {
  let uid = 0;
  const MARK = "assets/brand/mark-white.webp";
  const MARK_GOLD = "assets/brand/mark-gold.webp";

  const PRODUCTS = {
    "royal-basmati":   { type: "bag",   base: "#1529e2", dark: "#08105c", accent: "#c9a25a", name: "Royal Basmati",   sub: "1121 Extra Long Grain", ar: "أرز بسمتي ملكي", weight: "5 KG", grain: "long" },
    "golden-sella":    { type: "bag",   base: "#b8862d", dark: "#5c3d0c", accent: "#0d1a96", name: "Golden Sella",    sub: "1121 Basmati · Parboiled", ar: "بسمتي سيلا ذهبي", weight: "5 KG", grain: "golden" },
    "white-sella":     { type: "bag",   base: "#f3eee2", dark: "#cfc6b0", accent: "#1529e2", name: "White Sella",     sub: "1121 Basmati · Parboiled", ar: "بسمتي سيلا أبيض", weight: "10 KG", grain: "long", light: true },
    "classic-basmati": { type: "bag",   base: "#0b1240", dark: "#03051a", accent: "#c9a25a", name: "Classic Basmati", sub: "Traditional · Aged", ar: "بسمتي كلاسيكي", weight: "5 KG", grain: "long" },
    "sona-masoori":    { type: "bag",   base: "#2b6b4f", dark: "#0f3324", accent: "#e3c992", name: "Sona Masoori",    sub: "Medium Grain · Premium", ar: "سونا مسوري", weight: "5 KG", grain: "short" },
    "kerala-matta":    { type: "bag",   base: "#7a2a1f", dark: "#3a0f09", accent: "#e3c992", name: "Kerala Matta",    sub: "Red Parboiled Rice", ar: "أرز ماتا كيرالا", weight: "5 KG", grain: "red" },
    "jeerakasala":     { type: "bag",   base: "#3d2b6b", dark: "#1a1033", accent: "#e3c992", name: "Jeerakasala",     sub: "Kaima Biryani Rice", ar: "أرز جيراكسالا", weight: "2 KG", grain: "short" },
    "ponni":           { type: "bag",   base: "#1d5f8a", dark: "#0a2a40", accent: "#e3c992", name: "Ponni Rice",      sub: "Boiled · Everyday", ar: "أرز بوني", weight: "10 KG", grain: "short" },
    "cardamom":        { type: "pouch", base: "#2f6b3a", dark: "#123018", accent: "#c9a25a", name: "Cardamom",        sub: "Green · 8mm Bold", ar: "هيل", weight: "250 G", grain: "cardamom" },
    "black-pepper":    { type: "pouch", base: "#1d1d22", dark: "#000000", accent: "#c9a25a", name: "Black Pepper",    sub: "Malabar Garbled", ar: "فلفل أسود", weight: "250 G", grain: "pepper" },
    "turmeric":        { type: "pouch", base: "#d99a12", dark: "#7a4e00", accent: "#0d1a96", name: "Turmeric",        sub: "Pure Ground", ar: "كركم", weight: "200 G", grain: "powder-yellow" },
    "red-chilli":      { type: "pouch", base: "#b3261e", dark: "#5a0d08", accent: "#e3c992", name: "Red Chilli",      sub: "Kashmiri · Ground", ar: "فلفل أحمر", weight: "200 G", grain: "powder-red" },
    "cumin":           { type: "pouch", base: "#7a5a32", dark: "#3b2a12", accent: "#e3c992", name: "Cumin",           sub: "Whole Seeds", ar: "كمون", weight: "200 G", grain: "seeds" },
    "cloves":          { type: "pouch", base: "#5a2e1c", dark: "#2a120a", accent: "#e3c992", name: "Cloves",          sub: "Hand Picked", ar: "قرنفل", weight: "100 G", grain: "pepper" },
    "pulses":          { type: "carton", base: "#c9a25a", dark: "#7a5a1f", accent: "#08105c", name: "Pulses",         sub: "Lentils & Dals", ar: "بقوليات", weight: "1 KG", grain: "seeds" },
    "tea":             { type: "carton", base: "#0d3b2e", dark: "#04170f", accent: "#c9a25a", name: "Kerala Tea",     sub: "Strong · CTC", ar: "شاي كيرالا", weight: "500 G", grain: "pepper" },
    "flour":           { type: "carton", base: "#f0e9d8", dark: "#c9bd9d", accent: "#1529e2", name: "Flours",         sub: "Atta · Rice Flour", ar: "دقيق", weight: "1 KG", grain: "powder-white", light: true }
  };

  function grainPattern(id, kind) {
    // Repeating pattern representing what is visible through the pack window
    const g = {
      long:   { bg: "#f4efe2", fill: "#fffdf7", stroke: "#d9cfb6", rx: 7.5, ry: 1.6 },
      golden: { bg: "#e6c27a", fill: "#f2d79c", stroke: "#b98b33", rx: 7.5, ry: 1.7 },
      short:  { bg: "#f1ece0", fill: "#fffdf8", stroke: "#d6cbb1", rx: 4.2, ry: 2.1 },
      red:    { bg: "#9b5a44", fill: "#c47f63", stroke: "#6e3424", rx: 4.6, ry: 2.3 },
      cardamom: { bg: "#6f9a52", fill: "#9cc277", stroke: "#4a6d33", rx: 4.2, ry: 2.6 },
      pepper: { bg: "#2a221d", fill: "#3e3129", stroke: "#15100c", rx: 2.4, ry: 2.4 },
      seeds:  { bg: "#a07c4c", fill: "#c39d68", stroke: "#6e522c", rx: 3.6, ry: 1.3 }
    }[kind];
    if (!g) {
      const c = { "powder-yellow": ["#e8a913", "#f5c443"], "powder-red": ["#b02b1c", "#d0432d"], "powder-white": ["#efe9dc", "#fbf8f1"] }[kind] || ["#ddd", "#eee"];
      return `<pattern id="${id}" width="14" height="14" patternUnits="userSpaceOnUse"><rect width="14" height="14" fill="${c[0]}"/><circle cx="3" cy="4" r="1.1" fill="${c[1]}"/><circle cx="10" cy="9" r="0.9" fill="${c[1]}"/><circle cx="6" cy="12" r="0.6" fill="${c[1]}"/></pattern>`;
    }
    const items = [
      [6, 5, 22], [20, 9, -18], [11, 15, 64], [26, 20, 8], [4, 24, -40], [16, 27, 30], [28, 4, 75], [22, 31, -12]
    ].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${g.rx}" ry="${g.ry}" transform="rotate(${r} ${x} ${y})" fill="${g.fill}" stroke="${g.stroke}" stroke-width="0.4"/>`).join("");
    return `<pattern id="${id}" width="32" height="34" patternUnits="userSpaceOnUse"><rect width="32" height="34" fill="${g.bg}"/>${items}</pattern>`;
  }

  function crimp() {
    let d = "M18 30";
    for (let i = 0; i < 41; i++) d += i % 2 ? " l4 -4" : " l4 4";
    return d + " L182 30 Z";
  }

  function bag(p, id) {
    const ink = p.light ? "#0b1240" : "#ffffff";
    const sub = p.light ? "rgba(11,18,64,0.7)" : "rgba(255,255,255,0.78)";
    const mark = p.light ? "assets/brand/mark.webp" : MARK;
    return `
<svg class="pack" viewBox="0 0 200 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bin Shaikh ${p.name} ${p.weight} pack">
  <defs>
    <linearGradient id="b${id}" x1="0" x2="1">
      <stop offset="0" stop-color="${p.dark}"/><stop offset="0.18" stop-color="${p.base}"/><stop offset="0.55" stop-color="${p.base}"/><stop offset="1" stop-color="${p.dark}"/>
    </linearGradient>
    <linearGradient id="s${id}" x1="0" x2="1">
      <stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="0.3" stop-color="#fff" stop-opacity="0.22"/><stop offset="0.42" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="g${id}" x1="0" x2="1"><stop offset="0" stop-color="${p.accent}"/><stop offset="0.5" stop-color="#f3dfae"/><stop offset="1" stop-color="${p.accent}"/></linearGradient>
    ${grainPattern("p" + id, p.grain)}
    <clipPath id="c${id}"><path d="M22 30 C15 95 15 190 24 252 Q100 264 176 252 C185 190 185 95 178 30 Z"/></clipPath>
  </defs>
  <path d="M22 30 C15 95 15 190 24 252 Q100 264 176 252 C185 190 185 95 178 30 Z" fill="url(#b${id})"/>
  <g clip-path="url(#c${id})">
    <path d="M0 196 L200 172 L200 186 L0 210 Z" fill="url(#g${id})" opacity="0.95"/>
    <rect x="58" y="128" width="84" height="40" rx="20" fill="url(#p${id})" stroke="url(#g${id})" stroke-width="2"/>
    <rect x="58" y="128" width="84" height="16" rx="8" fill="#fff" opacity="0.18"/>
  </g>
  <image href="${mark}" x="80" y="40" width="40" height="39"/>
  <text x="100" y="94" text-anchor="middle" fill="${ink}" font-family="Manrope, sans-serif" font-weight="800" font-size="13" letter-spacing="1">BIN SHAIKH</text>
  <text x="100" y="104" text-anchor="middle" fill="${sub}" font-family="Manrope, sans-serif" font-weight="600" font-size="5.2" letter-spacing="2.6">INTERNATIONAL</text>
  <text x="100" y="121" text-anchor="middle" fill="${ink}" font-family="Cormorant Garamond, serif" font-style="italic" font-weight="600" font-size="13.5">${p.name}</text>
  <text x="100" y="182" text-anchor="middle" fill="${sub}" font-family="Manrope, sans-serif" font-weight="700" font-size="5.4" letter-spacing="1.4">${p.sub.toUpperCase()}</text>
  <text x="100" y="230" text-anchor="middle" fill="${ink}" font-family="IBM Plex Sans Arabic, sans-serif" font-weight="600" font-size="9" direction="rtl">${p.ar}</text>
  <circle cx="150" cy="226" r="15" fill="url(#g${id})"/>
  <text x="150" y="229" text-anchor="middle" fill="#0b1240" font-family="Manrope, sans-serif" font-weight="800" font-size="7.2">${p.weight}</text>
  <path d="M18 14 H182 V32 H18 Z" fill="${p.dark}"/>
  <path d="M18 14 H182 V18 H18 Z" fill="#fff" opacity="0.12"/>
  <path d="${crimp()}" fill="${p.dark}"/>
  <circle cx="100" cy="23" r="3.2" fill="none" stroke="${p.accent}" stroke-width="1.2"/>
  <path d="M22 30 C15 95 15 190 24 252 Q100 264 176 252 C185 190 185 95 178 30 Z" fill="url(#s${id})"/>
</svg>`;
  }

  function pouch(p, id) {
    return `
<svg class="pack" viewBox="0 0 200 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bin Shaikh ${p.name} ${p.weight} pouch">
  <defs>
    <linearGradient id="b${id}" x1="0" x2="1">
      <stop offset="0" stop-color="${p.dark}"/><stop offset="0.2" stop-color="${p.base}"/><stop offset="0.6" stop-color="${p.base}"/><stop offset="1" stop-color="${p.dark}"/>
    </linearGradient>
    <linearGradient id="n${id}" x1="0" x2="1"><stop offset="0" stop-color="#050a33"/><stop offset="0.25" stop-color="#0d1a96"/><stop offset="0.65" stop-color="#0d1a96"/><stop offset="1" stop-color="#050a33"/></linearGradient>
    <linearGradient id="s${id}" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="0.28" stop-color="#fff" stop-opacity="0.25"/><stop offset="0.4" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <linearGradient id="g${id}" x1="0" x2="1"><stop offset="0" stop-color="#c9a25a"/><stop offset="0.5" stop-color="#f3dfae"/><stop offset="1" stop-color="#c9a25a"/></linearGradient>
    ${grainPattern("p" + id, p.grain)}
    <clipPath id="c${id}"><path d="M34 22 H166 Q172 22 172 28 L176 236 Q176 252 160 254 Q100 262 40 254 Q24 252 24 236 L28 28 Q28 22 34 22 Z"/></clipPath>
  </defs>
  <path d="M34 22 H166 Q172 22 172 28 L176 236 Q176 252 160 254 Q100 262 40 254 Q24 252 24 236 L28 28 Q28 22 34 22 Z" fill="url(#n${id})"/>
  <g clip-path="url(#c${id})">
    <path d="M0 150 Q100 128 200 150 V270 H0 Z" fill="url(#b${id})"/>
    <path d="M0 146 Q100 124 200 146" stroke="url(#g${id})" stroke-width="2.4" fill="none"/>
    <circle cx="100" cy="196" r="30" fill="url(#p${id})" stroke="url(#g${id})" stroke-width="2.2"/>
    <ellipse cx="92" cy="186" rx="14" ry="7" fill="#fff" opacity="0.18"/>
    <rect x="24" y="22" width="152" height="12" fill="#000" opacity="0.18"/>
  </g>
  <image href="${MARK_GOLD}" x="84" y="44" width="32" height="31"/>
  <text x="100" y="88" text-anchor="middle" fill="#fff" font-family="Manrope, sans-serif" font-weight="800" font-size="11" letter-spacing="1">BIN SHAIKH</text>
  <text x="100" y="96.5" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-family="Manrope, sans-serif" font-weight="600" font-size="4.6" letter-spacing="2.4">INTERNATIONAL</text>
  <text x="100" y="116" text-anchor="middle" fill="#f3dfae" font-family="Cormorant Garamond, serif" font-style="italic" font-weight="600" font-size="15">${p.name}</text>
  <text x="100" y="127" text-anchor="middle" fill="rgba(255,255,255,0.75)" font-family="IBM Plex Sans Arabic, sans-serif" font-weight="600" font-size="7.5" direction="rtl">${p.ar}</text>
  <text x="100" y="243" text-anchor="middle" fill="#fff" font-family="Manrope, sans-serif" font-weight="800" font-size="6.5" letter-spacing="1.6">${p.sub.toUpperCase()} · ${p.weight}</text>
  <path d="M28 30 H172" stroke="#fff" stroke-opacity="0.25" stroke-dasharray="2 2"/>
  <path d="M34 22 H166 Q172 22 172 28 L176 236 Q176 252 160 254 Q100 262 40 254 Q24 252 24 236 L28 28 Q28 22 34 22 Z" fill="url(#s${id})"/>
</svg>`;
  }

  function carton(p, id) {
    const ink = p.light ? "#0b1240" : "#fff";
    const mark = p.light ? "assets/brand/mark.webp" : MARK;
    return `
<svg class="pack" viewBox="0 0 200 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bin Shaikh ${p.name} ${p.weight}">
  <defs>
    <linearGradient id="g${id}" x1="0" x2="1"><stop offset="0" stop-color="#c9a25a"/><stop offset="0.5" stop-color="#f3dfae"/><stop offset="1" stop-color="#c9a25a"/></linearGradient>
    ${grainPattern("p" + id, p.grain)}
  </defs>
  <path d="M40 40 L150 30 L172 44 L62 54 Z" fill="${p.dark}"/>
  <path d="M150 30 L172 44 L172 246 L150 236 Z" fill="${p.dark}"/>
  <path d="M40 40 L150 30 L150 236 L40 246 Z" fill="${p.base}"/>
  <path d="M40 40 L150 30 L150 236 L40 246 Z" fill="url(#g${id})" opacity="0.08"/>
  <path d="M40 176 L150 166 L150 182 L40 192 Z" fill="url(#g${id})"/>
  <path d="M60 136 L130 130 L130 158 L60 164 Z" fill="url(#p${id})" stroke="url(#g${id})" stroke-width="1.5"/>
  <image href="${mark}" x="78" y="52" width="34" height="33"/>
  <text x="95" y="100" text-anchor="middle" fill="${ink}" font-family="Manrope, sans-serif" font-weight="800" font-size="10.5" letter-spacing="0.8" transform="skewY(-5) translate(0 8)">BIN SHAIKH</text>
  <text x="95" y="122" text-anchor="middle" fill="${ink}" font-family="Cormorant Garamond, serif" font-style="italic" font-weight="600" font-size="14" transform="skewY(-5) translate(0 8)">${p.name}</text>
  <text x="95" y="216" text-anchor="middle" fill="${ink}" font-family="Manrope, sans-serif" font-weight="700" font-size="6" letter-spacing="1.2" transform="skewY(-5) translate(0 10)">${p.sub.toUpperCase()} · ${p.weight}</text>
  <path d="M150 30 L172 44 L172 246 L150 236 Z" fill="#000" opacity="0.15"/>
</svg>`;
  }

  function render(key) {
    const p = PRODUCTS[key];
    if (!p) return "";
    const id = "k" + (++uid);
    return p.type === "pouch" ? pouch(p, id) : p.type === "carton" ? carton(p, id) : bag(p, id);
  }

  window.BSPacks = {
    PRODUCTS,
    render,
    mount(root = document) {
      root.querySelectorAll("[data-pack]").forEach((el) => {
        if (!el.dataset.packMounted) {
          el.insertAdjacentHTML("afterbegin", render(el.dataset.pack));
          el.dataset.packMounted = "1";
        }
      });
    }
  };
})();
