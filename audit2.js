(() => {
  const cards = Array.from(document.querySelectorAll('a.ng-image-link'));
  const out = cards.map(a => {
    const card = a.closest('div[class*="card"], article, li, .ng-card, div') || a.parentElement;
    // find Send inquiry anchor within same card container
    let cardEl = a;
    let depth = 0;
    while (cardEl && depth < 4) {
      cardEl = cardEl.parentElement;
      depth++;
      const btn = cardEl && cardEl.querySelector ? cardEl.querySelector('a[href*="wa.me"]') : null;
      if (btn) {
        const btnText = btn.textContent.trim();
        const href = btn.getAttribute('href');
        const sku = (href.match(/about%20([A-Z]{2}-\d{3})/) || [])[1] || (href.match(/inquire%20about\s+([A-Z]{2}-\d{3})/i) || [])[1] || null;
        return {
          imgHref: a.getAttribute('href'),
          btnText,
          btnHref: href.slice(0, 90),
          skuInHref: sku,
        };
      }
    }
    return { imgHref: a.getAttribute('href'), btnText: null, btnHref: null, skuInHref: null, warn: 'no wa.me link found in card' };
  });
  return out;
})()
