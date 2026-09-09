(async () => {
  const out = { page: location.href, viewport: window.innerWidth + 'x' + window.innerHeight };
  // 1. shared header present & old header removed (single header element)
  const headers = Array.from(document.querySelectorAll('header'));
  const h = document.querySelector('header.category-chrome-header');
  out.header = {
    count: headers.length,
    sharedClassPresent: !!h,
    oldHeaderLeftover: headers.length !== 1 || !h
  };
  if (h) {
    const html = h.outerHTML;
    let sum = 0;
    for (let i = 0; i < html.length; i++) sum = (sum + html.charCodeAt(i)) % 1000000;
    out.header.htmlLen = html.length;
    out.header.checksum = sum;
  }
  // 2. logo: red Beefey logo, displayed width >> 126/150px, not distorted
  const logo = document.querySelector('.category-chrome-brand img');
  if (logo) {
    const r = logo.getBoundingClientRect();
    const natRatio = logo.naturalWidth && logo.naturalHeight ? logo.naturalWidth / logo.naturalHeight : null;
    const dispRatio = r.width && r.height ? r.width / r.height : null;
    out.logo = {
      dispW: Math.round(r.width * 100) / 100,
      dispH: Math.round(r.height * 100) / 100,
      naturalW: logo.naturalWidth,
      naturalH: logo.naturalHeight,
      widerThanOld: r.width > 150,
      ratioDiff: natRatio && dispRatio ? Math.abs(dispRatio - natRatio) : null,
      src: logo.getAttribute('src'),
      alt: logo.alt
    };
  } else out.logo = null;
  // 3. collections menu: open, verify 6 links resolve to correct local pages
  const trigger = document.querySelector('.category-chrome-trigger');
  const menu = document.querySelector('.category-chrome-menu');
  const expected = ['women-pajama-sets.html', 'lounge-sets.html', 'satin-pajama-sets.html', 'maternity-nursing-pajamas.html', 'modal-bamboo-pajamas.html', 'nightgowns-sleep-dresses.html'];
  if (trigger && menu) {
    trigger.click();
    await new Promise(r => setTimeout(r, 400));
    const cs = getComputedStyle(menu);
    const links = Array.from(document.querySelectorAll('.category-chrome-collection-links a'));
    out.collections = {
      menuOpenedDisplay: cs.display,
      menuOpenedVisibility: cs.visibility,
      linkCount: links.length,
      hrefs: links.map(a => a.getAttribute('href')),
      resolved: links.map(a => new URL(a.getAttribute('href'), location.href).href),
      all6CorrectOrder: links.length === 6 && links.every((a, i) => a.getAttribute('href') === expected[i]),
      anyBrokenResolve: links.some(a => { const u = new URL(a.getAttribute('href'), location.href).href; return expected.every(e => u !== location.href.replace(/[^/]+$/, '') + e) && expected.every(e => u.indexOf(e) === -1); })
    };
    trigger.click(); // close again (read-only)
    await new Promise(r => setTimeout(r, 200));
  } else out.collections = null;
  // 4. whatsapp float bottom-right, blue bg, breathing animation running
  const w = document.querySelector('.category-whatsapp-float');
  if (w) {
    const cs = getComputedStyle(w);
    const m = (cs.backgroundColor.match(/[\d.]+/g) || []).map(Number);
    out.whatsapp = {
      found: true,
      bg: cs.backgroundColor,
      isBlue: m.length >= 3 && m[2] > m[0] && m[2] > m[1],
      animName: cs.animationName,
      animDur: cs.animationDuration,
      animIter: cs.animationIterationCount,
      animState: cs.animationPlayState,
      position: cs.position,
      right: cs.right,
      bottom: cs.bottom,
      zIndex: cs.zIndex,
      size: Math.round(w.getBoundingClientRect().width * 100) / 100 + 'x' + Math.round(w.getBoundingClientRect().height * 100) / 100
    };
  } else out.whatsapp = { found: false };
  // 5. body first screen visible (content below header in viewport)
  const main = document.querySelector('main') || document.querySelector('.category-hero') || document.querySelector('.category-products') || document.querySelector('.category-layout') || document.querySelector('section');
  if (main) {
    const r = main.getBoundingClientRect();
    out.firstScreen = { hasMain: true, top: Math.round(r.top), height: Math.round(r.height), visibleInViewport: r.top < window.innerHeight && r.height > 0 };
  } else out.firstScreen = { hasMain: false };
  // 6. desktop overflow
  out.hOverflow = document.documentElement.scrollWidth > window.innerWidth;
  out.scrollW = document.documentElement.scrollWidth;
  out.title = document.title;
  return out;
})()
