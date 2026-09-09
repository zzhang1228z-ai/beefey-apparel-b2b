(() => {
  const out = {};
  const hero = document.querySelector('.ng-hero, section.ng-hero');
  if (!hero) return { error: 'no .ng-hero' };
  const h1 = hero.querySelector('h1');
  const hr = h1.getBoundingClientRect();
  const els = [];
  hero.querySelectorAll('p, a, button, h2').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.height > 0 && r.width > 0) {
      els.push({
        tag: el.tagName,
        cls: (el.className || '').toString().slice(0, 60),
        text: el.textContent.trim().slice(0, 50),
        top: Math.round(r.top - hr.bottom),
        bottom: Math.round(r.bottom - hr.bottom),
        fontSize: getComputedStyle(el).fontSize
      });
    }
  });
  // order by top offset
  els.sort((a, b) => a.top - b.top);
  out.elementsBelowTitle = els;
  // right-side image
  const img = hero.querySelector('img, picture img, .hero-media img');
  if (img) {
    const ir = img.getBoundingClientRect();
    const heroR = hero.getBoundingClientRect();
    out.image = { w: Math.round(ir.width), h: Math.round(ir.height), top: Math.round(ir.top - heroR.top), left: Math.round(ir.left - heroR.left) };
  }
  out.heroRect = (() => { const r = hero.getBoundingClientRect(); return { top: Math.round(r.top), h: Math.round(r.height), w: Math.round(r.width) }; })();
  // overflow check on hero
  const heroCS = getComputedStyle(hero);
  out.heroOverflowX = heroCS.overflowX;
  out.heroScrollWidth = hero.scrollWidth;
  out.heroClientWidth = hero.clientWidth;
  return out;
})()
