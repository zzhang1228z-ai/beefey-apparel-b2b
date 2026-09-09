(async () => {
  const dh = document.documentElement;
  const sleep = ms => new Promise(res => setTimeout(res, ms));
  const btn = document.querySelector('.category-chrome-toggle');
  const nav = document.querySelector('.category-chrome-nav');
  const r = { url: location.href, vw: innerWidth };
  const m = () => ({ sw: dh.scrollWidth, cw: dh.clientWidth, ok: dh.scrollWidth === dh.clientWidth });
  r.scrollBefore = m();
  r.toggleFound = !!btn;
  if (btn && nav) {
    btn.click();
    await sleep(600);
    r.scrollOpen = m();
    r.expandedOpen = btn.getAttribute('aria-expanded');
    r.navDisplayOpen = getComputedStyle(nav).display;
    r.openLinkCount = Array.from(nav.querySelectorAll('a')).filter(a => a.getBoundingClientRect().width > 0).length;
    btn.click();
    await sleep(600);
    r.scrollClosed = m();
    r.expandedClosed = btn.getAttribute('aria-expanded');
    r.navDisplayClosed = getComputedStyle(nav).display;
  }
  return r;
})()
