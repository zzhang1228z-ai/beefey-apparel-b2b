(() => {
  const out = { scrollY: window.scrollY };
  const heroes = Array.from(document.querySelectorAll('section.ng-hero, .ng-hero')).map(s => {
    const r = s.getBoundingClientRect();
    return { cls: (s.className || '').toString().slice(0, 80), top: Math.round(r.top), h: Math.round(r.height) };
  });
  out.heroSections = heroes;
  const h1 = document.querySelector('h1');
  if (h1) {
    const r = h1.getBoundingClientRect();
    out.h1 = { top: Math.round(r.top), h: Math.round(r.height), sectionCls: h1.closest('section') ? (h1.closest('section').className || '').toString().slice(0, 80) : null };
    // elements above h1 in same section
    const sec = h1.closest('section');
    if (sec) {
      const sr = sec.getBoundingClientRect();
      out.h1Section = { top: Math.round(sr.top), h: Math.round(sr.height) };
      const before = [];
      sec.querySelectorAll('*').forEach(el => {
        const er = el.getBoundingClientRect();
        if (er.height > 0 && er.bottom < r.top + 1 && el !== h1) before.push({ tag: el.tagName, cls: (el.className || '').toString().slice(0, 40), text: el.textContent.trim().slice(0, 30), bottom: Math.round(er.bottom) });
      });
      out.aboveH1 = before.slice(0, 12);
    }
  }
  return out;
})()
