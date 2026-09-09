(() => {
  const cards = Array.from(document.querySelectorAll('.ng-card'));
  const result = {
    cardCount: cards.length,
    cards: []
  };

  cards.forEach((card, i) => {
    const info = { index: i };

    // Image container: find element containing img inside card
    const img = card.querySelector('img');
    let imgContainer = null;
    if (img) {
      // climb to a wrapper that has aspect-ratio style or is a div around the img
      let p = img.parentElement;
      while (p && p !== card) {
        const style = getComputedStyle(p);
        if (style.aspectRatio && style.aspectRatio !== 'auto') { imgContainer = p; break; }
        p = p.parentElement;
      }
      if (!imgContainer) imgContainer = img.parentElement;
      const r = imgContainer.getBoundingClientRect();
      info.image = {
        src: img.getAttribute('src'),
        imgNatural: img.naturalWidth ? img.naturalWidth + 'x' + img.naturalHeight : 'n/a',
        containerBox: Math.round(r.width) + 'x' + Math.round(r.height),
        containerAspect: +(r.width / r.height).toFixed(3),
        containerAspectStyle: getComputedStyle(imgContainer).aspectRatio,
        containerClass: imgContainer.className
      };
    }

    // Links inside card
    const links = Array.from(card.querySelectorAll('a')).map(a => ({
      text: (a.textContent || '').trim().slice(0, 60),
      href: a.getAttribute('href'),
      cls: a.className
    }));
    info.links = links;

    // Buttons
    const btns = Array.from(card.querySelectorAll('a,button')).filter(b => /send|inquir/i.test(b.textContent || '')).map(b => ({
      tag: b.tagName,
      text: (b.textContent || '').trim().slice(0, 60),
      href: b.getAttribute('href'),
      cls: b.className
    }));
    info.sendInquiryButtons = btns;

    // Title element: find heading or element with product title (largest text or .ng-card-title)
    const titleEl = card.querySelector('.ng-card-title, h2, h3, h4, .title, [class*=title]');
    if (titleEl) {
      info.title = {
        text: titleEl.textContent.trim().slice(0, 80),
        cls: titleEl.className,
        tag: titleEl.tagName,
        isLink: titleEl.closest('a') ? true : false,
        parentIsLink: titleEl.parentElement && titleEl.parentElement.tagName === 'A' ? true : false
      };
    }

    result.cards.push(info);
  });

  // Overflow check at current viewport
  const docW = document.documentElement.scrollWidth;
  const winW = window.innerWidth;
  result.overflow = {
    viewport: winW + 'x' + window.innerHeight,
    docScrollWidth: docW,
    clientWidth: document.documentElement.clientWidth,
    hasHorizontalOverflow: docW > winW
  };

  return result;
})()
