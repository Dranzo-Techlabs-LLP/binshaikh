/* Runs before first paint: language, direction, Arabic fonts, JS flag. */
(function () {
  var d = document.documentElement, l = "en";
  try {
    var q = new URLSearchParams(location.search).get("lang");
    if (q === "ar" || q === "en") localStorage.setItem("bsi-lang", q);
    l = q || localStorage.getItem("bsi-lang") || "en";
  } catch (e) {}
  d.classList.add("js");
  if (l === "ar") {
    d.lang = "ar"; d.dir = "rtl";
    var f = document.createElement("link");
    f.rel = "stylesheet";
    f.href = "https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap";
    document.head.appendChild(f);
  }
  // Safety net: if scripts fail to load, never leave content hidden.
  setTimeout(function () {
    if (!window.__bsBooted) { d.classList.add("no-gsap", "i18n-ready"); var l = document.querySelector(".loader"); if (l) l.remove(); }
  }, 3500);
})();
