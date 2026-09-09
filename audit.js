(() => {
  const results = {};

  // 1) Hero title
  const hero = document.querySelector('h1, .hero h1, [class*="hero"] h1, [class*="banner"] h1');
  let heroInfo = null;
  if (hero) {
    const cs = getComputedStyle(hero);
    const rect = hero.getBoundingClientRect();
    const lh = parseFloat(cs.lineHeight) || 0;
    const lines = lh > 0 ? Math.round(rect.height / lh) : null;
    heroInfo = {
      text: hero.textContent.trim().slice(0, 120),
      fontSize: cs.fontSize,
      lineHeight: cs.lineHeight,
      boxHeight: Math.round(rect.height),
      approxLines: lines,
    };
  } else {
    // fallback: find largest heading
    const hs = Array.from(document.querySelectorAll('h1,h2,h3')).map(h => ({t: h.textContent.trim().slice(0,80), fs: getComputedStyle(h).fontSize}));
    heroInfo = { notFound: true, headings: hs.slice(0, 8) };
  }
  results.hero = heroInfo;

  // 2) Product cards — find grid items / cards
  const cards = Array.from(document.querySelectorAll('a[href*="product-details"], a[href*="product"], .product-card, .card, [class*="product"]'))
    .filter(el => {
      const href = el.getAttribute('href') || '';
      return href.includes('product-details') || href.includes('/products/') || href.includes('sku=') || href.includes('nightgown-product');
    });
  const uniqueCards = [];
  const seen = new Set();
  for (const c of cards) {
    const key = c.getAttribute('href');
    if (!seen.has(key)) { seen.add(key); uniqueCards.push(c); }
  }
  results.productLinks = uniqueCards.slice(0, 12).map(c => ({
    href: c.getAttribute('href'),
    tag: c.tagName,
    cls: (c.className || '').toString().slice(0, 60),
  }));
  results.productLinkCount = uniqueCards.length;

  // 3) Image aspect ratio inside first card
  const firstCard = uniqueCards[0];
  let imgInfo = null;
  if (firstCard) {
    const img = firstCard.querySelector('img');
    if (img) {
      const wrap = img.closest('a, div, figure') || img;
      const wr = wrap.getBoundingClientRect();
      const ir = img.getBoundingClientRect();
      imgInfo = {
        src: (img.currentSrc || img.src || '').slice(0, 150),
        naturalW: img.naturalWidth,
        naturalH: img.naturalHeight,
        containerW: Math.round(wr.width),
        containerH: Math.round(wr.height),
        containerRatio: wr.width && wr.height ? +(wr.width / wr.height).toFixed(3) : null,
        imgW: Math.round(ir.width),
        imgH: Math.round(ir.height),
        objectFit: getComputedStyle(img).objectFit,
      };
    }
  }
  results.firstCardImage = imgInfo;

  // 4) Send inquiry links
  const wa = Array.from(document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]')).map(a => a.getAttribute('href'));
  results.waLinks = wa;

  // 5) Horizontal overflow
  const de = document.documentElement;
  const body = document.body;
  results.overflow = {
    docScrollW: de.scrollWidth,
    docClientW: de.clientWidth,
    bodyScrollW: body ? body.scrollWidth : null,
    bodyClientW: body ? body.clientWidth : null,
    horizontalOverflow: de.scrollWidth > de.clientWidth || (body && body.scrollWidth > body.clientWidth),
  };

  // 6) Broken images
  const imgs = Array.from(document.images);
  const broken = imgs.filter(i => i.complete && i.naturalWidth === 0).map(i => (i.currentSrc || i.src || '').slice(0, 150));
  results.images = { total: imgs.length, brokenCount: broken.length, broken };
  results.consoleErrors = null; // filled separately

  return results;
})()
