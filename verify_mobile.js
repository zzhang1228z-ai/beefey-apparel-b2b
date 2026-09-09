(async () => {
  const out = { page: location.href, viewport: window.innerWidth + 'x' + window.innerHeight };
  out.scrollW = document.documentElement.scrollWidth;
  out.hOverflow = document.documentElement.scrollWidth > window.innerWidth;
  out.bodyScrollW = document.body ? document.body.scrollWidth : null;
  const toggle = document.querySelector('.category-chrome-toggle');
  const nav = document.querySelector('.category-chrome-nav');
  if (toggle && nav) {
    out.toggleVisible = getComputedStyle(toggle).display !== 'none' && !!(toggle.offsetWidth || toggle.offsetHeight);
    out.navBefore = { display: getComputedStyle(nav).display, expanded: toggle.getAttribute('aria-expanded') };
    toggle.click();
    await new Promise(r => setTimeout(r, 500));
    out.navAfterOpen = {
      display: getComputedStyle(nav).display,
      expanded: toggle.getAttribute('aria-expanded'),
      navVisible: !!(nav.offsetWidth || nav.offsetHeight),
      navWidth: Math.round(nav.getBoundingClientRect().width)
    };
    toggle.click();
    await new Promise(r => setTimeout(r, 500));
    out.navAfterClose = {
      display: getComputedStyle(nav).display,
      expanded: toggle.getAttribute('aria-expanded'),
      navVisible: !!(nav.offsetWidth || nav.offsetHeight)
    };
  } else out.menu = null;
  out.waPresent = !!document.querySelector('.category-whatsapp-float');
  const main = document.querySelector('main') || document.querySelector('.category-hero') || document.querySelector('.category-products') || document.querySelector('.category-layout') || document.querySelector('section');
  if (main) {
    const r = main.getBoundingClientRect();
    out.firstScreenVisible = r.top < window.innerHeight && r.height > 0;
  } else out.firstScreenVisible = false;
  return out;
})()
