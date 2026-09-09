(() => {
  const out = { viewport: { w: window.innerWidth, h: window.innerHeight } };
  out.doc = {
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body ? document.body.scrollWidth : null,
    overflowX: getComputedStyle(document.documentElement).overflowX
  };
  const h1 = document.querySelector('h1');
  if (h1) {
    const cs = getComputedStyle(h1);
    const range = document.createRange();
    range.selectNodeContents(h1);
    out.title = {
      fontSize: cs.fontSize,
      lineHeight: cs.lineHeight,
      lineCount: range.getClientRects().length,
      width: Math.round(h1.getBoundingClientRect().width)
    };
    const sec = h1.closest('section');
    if (sec) {
      out.hero = {
        cls: (sec.className || '').toString().slice(0, 60),
        clientWidth: sec.clientWidth,
        scrollWidth: sec.scrollWidth,
        overflowX: getComputedStyle(sec).overflowX
      };
      const img = sec.querySelector('img, picture img');
      if (img) {
        const ir = img.getBoundingClientRect();
        out.img = { w: Math.round(ir.width), h: Math.round(ir.height), left: Math.round(ir.left) };
      }
    }
  }
  // any element causing horizontal overflow (width > viewport)
  const bad = [];
  document.querySelectorAll('body *').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.right > window.innerWidth + 1 && r.width > 0) {
      const tag = el.tagName;
      const cls = (el.className || '').toString().slice(0, 40);
      const key = tag + '.' + cls;
      const found = bad.find(b => b.key === key);
      if (found) found.count++; else bad.push({ key, right: Math.round(r.right), count: 1 });
    }
  });
  out.overflowing = bad.slice(0, 8);
  return out;
})()
