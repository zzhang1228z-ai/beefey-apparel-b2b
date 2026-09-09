(() => {
  const out = { viewport: { w: window.innerWidth, h: window.innerHeight } };

  // document overflow
  out.doc = {
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body ? document.body.scrollWidth : null,
    overflowX: getComputedStyle(document.documentElement).overflowX
  };

  // Hero: first section element
  const sections = document.querySelectorAll('section, .hero, [class*="hero"], [class*="Hero"]');
  let hero = null;
  for (const s of sections) {
    const r = s.getBoundingClientRect();
    if (r.top >= 0 && r.top < window.innerHeight && r.height > 50) { hero = s; break; }
  }
  if (hero) {
    out.hero = { tag: hero.tagName, cls: hero.className };
    const h1 = hero.querySelector('h1, .hero-title, [class*="title"]');
    out.hero.h1Found = h1 ? true : false;
  }

  // Title: first h1 on page (hero title)
  const h1 = document.querySelector('h1');
  if (h1) {
    const cs = getComputedStyle(h1);
    const rect = h1.getBoundingClientRect();
    // count lines: use Range to get client rects
    const range = document.createRange();
    range.selectNodeContents(h1);
    const rects = range.getClientRects();
    const lineCount = rects.length;
    out.title = {
      text: h1.textContent.trim().slice(0, 80),
      fontSize: cs.fontSize,
      lineHeight: cs.lineHeight,
      fontWeight: cs.fontWeight,
      letterSpacing: cs.letterSpacing,
      width: rect.width,
      height: rect.height,
      lineCount
    };
    // nearest section ancestor of h1
    let anc = h1.parentElement;
    while (anc && anc.tagName !== 'SECTION' && anc.tagName !== 'HEADER' && anc.parentElement) anc = anc.parentElement;
    if (anc) out.title.section = { tag: anc.tagName, cls: (anc.className || '').toString().slice(0, 120) };
  }

  // description + button spacing inside same hero block
  if (h1) {
    const heroBlock = h1.closest('section') || h1.parentElement;
    const p = heroBlock.querySelector('p');
    const btn = heroBlock.querySelector('a, button');
    if (p) {
      const pcs = getComputedStyle(p);
      const pr = p.getBoundingClientRect();
      const hr = h1.getBoundingClientRect();
      out.desc = {
        text: p.textContent.trim().slice(0, 80),
        fontSize: pcs.fontSize,
        lineHeight: pcs.lineHeight,
        marginTop: pcs.marginTop,
        gapFromTitle: Math.round(pr.top - hr.bottom)
      };
    }
    if (btn) {
      const bcs = getComputedStyle(btn);
      const br = btn.getBoundingClientRect();
      const pr2 = p ? p.getBoundingClientRect() : null;
      out.btn = {
        text: btn.textContent.trim().slice(0, 40),
        fontSize: bcs.fontSize,
        padding: bcs.padding,
        gapFromDesc: pr2 ? Math.round(br.top - pr2.bottom) : null,
        gapFromTitle: pr2 ? null : Math.round(br.top - hr.bottom)
      };
    }
    // image on right
    const img = heroBlock.querySelector('img, picture img');
    if (img) {
      const ir = img.getBoundingClientRect();
      out.heroImg = { w: Math.round(ir.width), h: Math.round(ir.height), naturalW: img.naturalWidth, naturalH: img.naturalHeight };
    }
  }

  return out;
})()
