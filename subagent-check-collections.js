(() => {
  const r = { url: location.href, vw: innerWidth };
  const q = (s, root) => (root || document).querySelector(s);
  const qa = (s, root) => Array.from((root || document).querySelectorAll(s));

  r.headerCount = qa('header').length;
  r.bannerCount = qa('[role="banner"]').length;

  const logoImg = q('[role="banner"] img') || q('header img') || q('.logo img');
  if (logoImg) {
    const cr = logoImg.getBoundingClientRect();
    r.logo = {
      w: Math.round(cr.width), h: Math.round(cr.height),
      naturalW: logoImg.naturalWidth, naturalH: logoImg.naturalHeight,
      distorted: logoImg.complete && logoImg.naturalWidth > 0 &&
        Math.abs(cr.width / cr.height - logoImg.naturalWidth / logoImg.naturalHeight) > 0.05
    };
  } else r.logo = null;

  // 2. nav collection links (relative hrefs, current dir = /collections/)
  r.navLinks = qa('[role="banner"] a, header a, nav a').map(a => ({ text: (a.textContent || '').trim().replace(/\s+/g, ' '), href: a.getAttribute('href') }));
  const expected = ['women-pajama-sets.html', 'lounge-sets.html', 'satin-pajama-sets.html', 'maternity-nursing-pajamas.html', 'modal-bamboo-pajamas.html', 'nightgowns-sleep-dresses.html'];
  const found = r.navLinks.filter(l => expected.includes(l.href)).map(l => l.href);
  r.colMenuCount = found.length;
  r.colMenuHrefs = found;

  // 3. ALL whatsapp-ish elements
  r.whatsappButtons = [];
  const waEls = qa('a[href*="wa.me"], a[href*="whatsapp"], [class*="whatsapp" i], [id*="whatsapp" i]');
  waEls.forEach(wa => {
    const wcs = getComputedStyle(wa);
    const anims = wa.getAnimations().concat(qa('*', wa).flatMap(el => el.getAnimations()));
    r.whatsappButtons.push({
      tag: wa.tagName,
      cls: (wa.className || '').toString().slice(0, 60),
      href: (wa.getAttribute('href') || '').slice(0, 90),
      bg: wcs.backgroundColor,
      position: wcs.position,
      animName: wcs.animationName,
      animDur: wcs.animationDuration,
      animPlayState: wcs.animationPlayState,
      runningAnims: anims.filter(a => a.playState === 'running').map(a => a.animationName || 'css-anim').slice(0, 6)
    });
  });
  const fixed = r.whatsappButtons.filter(b => b.position === 'fixed');
  r.whatsappFixedBlue = fixed.filter(b => b.bg === 'rgb(22, 119, 255)');
  r.whatsappFixed = fixed;

  // 5. overflow
  const dh = document.documentElement;
  r.scrollDefault = { sw: dh.scrollWidth, cw: dh.clientWidth, ok: dh.scrollWidth === dh.clientWidth };
  r.bodyScrollDefault = { sw: document.body.scrollWidth, cw: document.body.clientWidth, ok: document.body.scrollWidth === document.body.clientWidth };

  // 6. content
  r.bodyTextLen = (document.body.innerText || '').trim().length;
  r.mainTextLen = q('main') ? q('main').innerText.trim().length : 0;
  return r;
})()
