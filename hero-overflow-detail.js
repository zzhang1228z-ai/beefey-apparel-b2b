(() => {
  const out = { vw: window.innerWidth, scrollbar: window.innerWidth - document.documentElement.clientWidth };
  const h1 = document.querySelector('h1');
  const sec = h1.closest('section');
  const sr = sec.getBoundingClientRect();
  out.hero = { left: Math.round(sr.left), right: Math.round(sr.right), width: Math.round(sr.width) };
  const btns = sec.querySelectorAll('a.ng-primary, a.ng-secondary, a[class*="primary"], a[class*="secondary"]');
  const btnArr = [];
  btns.forEach(b => {
    const r = b.getBoundingClientRect();
    btnArr.push({ text: b.textContent.trim().slice(0, 30), left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width), marginRight: getComputedStyle(b).marginRight, padding: getComputedStyle(b).padding });
  });
  out.buttons = btnArr;
  // container of buttons
  const btnParent = btns.length ? btns[0].parentElement : null;
  if (btnParent) {
    const pr = btnParent.getBoundingClientRect();
    out.btnRow = { tag: btnParent.tagName, cls: (btnParent.className || '').toString().slice(0, 60), left: Math.round(pr.left), right: Math.round(pr.right), width: Math.round(pr.width), overflowX: getComputedStyle(btnParent).overflowX, paddingRight: getComputedStyle(btnParent).paddingRight };
    // walk up ancestors checking for clipping
    let el = btnParent.parentElement;
    let clipInfo = [];
    while (el && el !== document.body) {
      const cs = getComputedStyle(el);
      if (cs.overflowX !== 'visible' || cs.overflow !== 'visible') {
        clipInfo.push({ tag: el.tagName, cls: (el.className || '').toString().slice(0, 50), overflowX: cs.overflowX, overflow: cs.overflow });
      }
      el = el.parentElement;
    }
    out.clippingAncestors = clipInfo;
  }
  // can the page scroll horizontally?
  out.maxScrollX = window.scrollX;
  window.scrollTo(5000, window.scrollY);
  out.maxScrollX = window.scrollX;
  window.scrollTo(0, window.scrollY);
  out.canHScroll = window.scrollX > 0;
  return out;
})()
