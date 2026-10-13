/* Bin Shaikh — dot-matrix trade map (India ⇄ Saudi Arabia).
   Simplified coastlines rendered as a dot grid, plus the sea lane
   Kochi → Arabian Sea → Gulf of Aden → Red Sea → Jeddah. */
(function () {
  const LON0 = 30, LAT0 = 34, K = 10;
  const P = (lon, lat) => [+((lon - LON0) * K).toFixed(1), +((LAT0 - lat) * K).toFixed(1)];

  const LAND = [
    // North-east Africa
    [[25,31.5],[29,30.9],[32.3,31.3],[32.55,29.95],[33.3,28.3],[33.9,27.2],[35.1,24.4],[35.7,23.0],[36.9,21.5],[37.2,19.6],[38.5,18.0],[39.5,15.6],[41.2,14.2],[42.7,13.0],[43.3,11.9],[43.1,11.5],[44.6,10.4],[46.6,10.7],[48.9,11.3],[51.3,11.8],[51.0,10.4],[50.6,9.0],[49.5,6.8],[48.5,5.0],[47.5,3.5],[25,3.5]],
    // Levant, Sinai, Arabia, Iran, Pakistan, India
    [[32.35,31.2],[32.4,30.0],[32.75,29.75],[33.6,28.3],[34.3,27.8],[34.7,28.9],[34.95,29.45],[34.85,28.3],[35.2,28.0],[35.7,27.35],[36.5,26.0],[37.3,25.05],[38.05,24.1],[39.0,22.8],[39.15,21.5],[40.25,20.15],[41.05,19.1],[42.0,17.8],[42.55,16.9],[42.8,16.3],[42.95,14.8],[43.25,13.3],[43.45,12.65],[45.0,12.8],[46.5,13.4],[48.0,14.0],[49.1,14.5],[50.5,15.0],[52.2,15.6],[54.1,17.0],[55.5,17.8],[56.6,18.1],[57.8,19.0],[58.4,20.4],[59.8,22.5],[58.6,23.6],[56.75,24.35],[56.35,25.1],[56.35,26.4],[55.95,25.8],[55.3,25.25],[54.4,24.45],[52.6,24.2],[51.6,24.3],[51.6,25.3],[51.3,26.15],[50.85,25.0],[50.2,25.6],[50.2,26.3],[49.6,27.1],[48.8,27.7],[48.4,28.5],[48.0,29.35],[48.5,30.0],[49.2,30.1],[50.1,30.1],[50.8,28.95],[51.4,27.9],[52.6,27.4],[54.0,26.7],[55.0,26.6],[56.2,27.1],[57.0,26.8],[57.3,25.8],[57.8,25.65],[59.5,25.4],[60.6,25.3],[61.6,25.2],[62.3,25.1],[63.5,25.2],[64.6,25.2],[66.0,25.4],[67.0,24.8],[67.4,24.0],[68.5,23.5],[69.1,22.4],[69.6,21.6],[70.4,20.9],[71.0,20.7],[72.1,21.6],[72.6,22.2],[72.8,21.2],[72.85,20.0],[72.8,19.0],[73.0,18.2],[73.3,17.0],[73.6,16.0],[73.8,15.4],[74.1,14.7],[74.4,14.0],[74.7,13.3],[74.85,12.85],[75.3,12.0],[75.8,11.25],[76.0,10.6],[76.25,9.95],[76.4,9.4],[76.6,8.9],[76.95,8.45],[77.55,8.08],[78.15,8.8],[78.4,9.1],[79.0,9.3],[79.85,10.3],[79.85,11.4],[80.25,13.1],[80.15,15.0],[81.1,15.7],[82.3,16.6],[83.3,17.7],[84.1,18.3],[85.1,19.3],[85.8,19.8],[86.5,20.2],[86.9,20.8],[87.0,21.5],[88.0,21.6],[88.8,21.6],[89.5,21.9],[90.3,22.2],[91.5,22.5],[93,21],[93,36],[35.9,36],[35.5,33.5],[34.9,32.4],[34.5,31.5],[33.0,31.1]],
    // Sri Lanka
    [[79.85,9.8],[80.25,9.8],[81.2,8.6],[81.9,7.4],[81.6,6.4],[80.6,5.95],[80.05,6.3],[79.85,7.2],[79.7,8.1]],
    // Socotra
    [[53.3,12.7],[54.5,12.75],[54.3,12.3],[53.4,12.35]]
  ].map((poly) => poly.map(([lon, lat]) => P(lon, lat)));

  const PLACES = {
    nilambur: { lon: 76.23, lat: 11.28, name: "Nilambur", sub: "India Office", key: "map.nilambur", anchor: "end" },
    jeddah:   { lon: 39.17, lat: 21.54, name: "Jeddah",   sub: "Head Office",  key: "map.jeddah",  anchor: "end", hq: true },
    tabuk:    { lon: 36.57, lat: 28.38, name: "Tabuk",    sub: "Branch",       key: "map.tabuk",   anchor: "start" },
    jazan:    { lon: 42.55, lat: 16.89, name: "Jazan",    sub: "Branch",       key: "map.jazan",   anchor: "start" }
  };

  const ROUTE = [[76.23,11.28],[76.25,9.95],[74.6,9.7],[70,10.8],[62,12.6],[56.5,13.4],[51,12.9],[47,12.4],[44.3,12.25],[43.35,12.55],[42.5,13.9],[41.5,15.6],[40.5,17.7],[39.8,19.6],[39.17,21.54]].map(([a, b]) => P(a, b));

  function inside(pt, poly) {
    let c = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const [xi, yi] = poly[i], [xj, yj] = poly[j];
      if ((yi > pt[1]) !== (yj > pt[1]) && pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi) + xi) c = !c;
    }
    return c;
  }

  // Catmull-Rom → cubic bezier for a smooth sea lane
  function smooth(points) {
    let d = `M${points[0][0]} ${points[0][1]}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i - 1] || points[i], p1 = points[i], p2 = points[i + 1], p3 = points[i + 2] || p2;
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0]} ${p2[1]}`;
    }
    return d;
  }

  function dots(step) {
    const out = [];
    const [x0, x1, y0, y1] = [0, 600, -20, 300];
    for (let y = y0; y <= y1; y += step) {
      for (let x = x0; x <= x1; x += step) {
        if (LAND.some((poly) => inside([x, y], poly))) {
          // Light up dots around India (sourcing) and western Saudi (markets)
          const lit = (x > 410 && x < 520 && y > 120 && y < 270) || (x > 50 && x < 140 && y > 40 && y < 190);
          out.push(`<circle class="dot${lit ? " dot--lit" : ""}" cx="${x}" cy="${y}" r="${(step * 0.28).toFixed(2)}"/>`);
        }
      }
    }
    return out.join("");
  }

  function pin(id, p, t) {
    const [x, y] = P(p.lon, p.lat);
    const dx = p.anchor === "end" ? -10 : 10;
    return `<g class="pin${p.hq ? " pin--hq" : ""}" id="pin-${id}" data-pin="${id}" transform="translate(${x} ${y})">
      <circle class="ring" r="5"/><circle class="core" r="${p.hq ? 4.2 : 3.4}"/>
      <text x="${dx}" y="-2" text-anchor="${p.anchor}">${t(p.key, p.name)}</text>
      <text class="sub" x="${dx}" y="9" text-anchor="${p.anchor}">${t(p.key + ".sub", p.sub)}</text>
    </g>`;
  }

  function render(svg, opts = {}) {
    const t = opts.t || ((k, f) => f);
    const step = opts.step || 6;
    const J = P(PLACES.jeddah.lon, PLACES.jeddah.lat), T = P(PLACES.tabuk.lon, PLACES.tabuk.lat), Z = P(PLACES.jazan.lon, PLACES.jazan.lat);
    const sea = (lon, lat, label, rot = 0) => { const [x, y] = P(lon, lat); return `<text class="sea-label" x="${x}" y="${y}" text-anchor="middle" transform="rotate(${rot} ${x} ${y})">${label}</text>`; };
    svg.setAttribute("viewBox", opts.viewBox || "10 20 540 255");
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    svg.innerHTML = `
      <g class="map-zoom">
        <g class="dots">${dots(step)}</g>
        ${sea(64, 14.5, t("map.arabianSea", "ARABIAN SEA"))}
        ${sea(38.4, 19.2, t("map.redSea", "RED SEA"), 62)}
        ${sea(79.5, 22.5, t("map.india", "INDIA"))}
        ${sea(45.5, 24.2, t("map.saudi", "SAUDI ARABIA"))}
        <path class="route-ghost" d="${smooth(ROUTE)}"/>
        <path class="route" id="${opts.routeId || "route"}" d="${smooth(ROUTE)}"/>
        <path class="branch branch--tabuk" d="M${J[0]} ${J[1]} Q${J[0] - 32} ${(J[1] + T[1]) / 2} ${T[0]} ${T[1]}"/>
        <path class="branch branch--jazan" d="M${J[0]} ${J[1]} Q${(J[0] + Z[0]) / 2 + 22} ${(J[1] + Z[1]) / 2 - 6} ${Z[0]} ${Z[1]}"/>
        <g class="ship"><circle class="halo" r="7"/><circle r="2.8"/></g>
        ${Object.entries(PLACES).map(([id, p]) => pin(id, p, t)).join("")}
      </g>`;
    return svg;
  }

  window.BSMap = { render, PLACES, project: P };
})();
