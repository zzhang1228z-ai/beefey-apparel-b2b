(() => {
  const categories = [
    ['women-pajama-sets', 'Women Pajama Sets'],
    ['lounge-sets', 'Lounge Sets'],
    ['satin-pajama-sets', 'Satin Pajama Sets'],
    ['maternity-nursing-pajamas', 'Maternity & Nursing Pajamas'],
    ['modal-bamboo-pajamas', 'Bamboo & Modal Pajamas'],
    ['nightgowns-sleep-dresses', 'Nightgowns & Robes']
  ];
  const icon = '<svg viewBox="0 0 448 512" aria-hidden="true"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32 101.5 32 1.9 131.6 1.9 254c0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9A222.2 222.2 0 0 0 224 476h.1c122.3 0 224-99.6 224-222 0-59.3-25.2-115-67.2-157zm-157 341.6a184.7 184.7 0 0 1-93.8-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7A184.2 184.2 0 0 1 39.4 254c0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1A183.3 183.3 0 0 1 410.5 254c0 101.8-84.9 184.7-186.6 184.7zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8s-14.3 18-17.6 21.8c-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2s-9.7 1.4-14.8 6.9c-5.1 5.6-19.4 19-19.4 46.3s19.9 53.7 22.6 57.4c2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>';

  function currentSlug() {
    const file = location.pathname.split('/').pop() || '';
    return file.replace(/\.html$/, '') || 'women-pajama-sets';
  }

  function collectionLinks(slug) {
    return categories.map(([path, label]) => `<a href="${path}.html"${path === slug ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  }

  function subnavLinks(slug) {
    return categories.map(([path, label]) => `<a class="category-subnav-link${path === slug ? ' is-active' : ''}" href="${path}.html">${label}</a>`).join('');
  }

  function headerMarkup(slug) {
    return `<div class="category-chrome-topbar">BSCI / OEKO-TEX SUPPORT · MOQ FROM 100 SETS · PRIVATE LABEL SLEEPWEAR</div>
      <header class="category-chrome-header">
        <div class="category-chrome-main">
          <div class="category-chrome-inner">
            <a class="category-chrome-brand" href="../index.html" aria-label="Beefey home"><img src="../assets/images/brand/logo.png" alt="Beefey"></a>
            <button class="category-chrome-toggle" type="button" aria-label="Toggle navigation" aria-expanded="false">☰</button>
            <nav class="category-chrome-nav" aria-label="Main navigation">
              <a class="category-chrome-link" href="../index.html">Home</a>
              <div class="category-chrome-item is-active">
                <a class="category-chrome-parent" href="index.html">Collections</a>
                <button class="category-chrome-trigger" type="button" aria-label="Open Collections menu" aria-expanded="false">▾</button>
                <div class="category-chrome-menu">
                  <div class="category-chrome-menu-head"><span class="category-chrome-kicker">Wholesale</span><span class="category-chrome-title">Customizable Foundations for Private Label Brands · MOQ 100 Sets</span></div>
                  <div class="category-chrome-menu-body"><div class="category-chrome-collection-links">${collectionLinks(slug)}</div><div class="category-chrome-quick"><strong>B2B Quick Access</strong><p>For private label brands, wholesalers, boutiques and sourcing teams.</p><a href="../contact.html">Request Swatch Pack</a></div></div>
                </div>
              </div>
              <a class="category-chrome-link" href="../oem-odm.html">OEM/ODM</a>
              <a class="category-chrome-link" href="../factory.html">Factory</a>
              <a class="category-chrome-link" href="../factory.html#certificates">Certificates</a>
              <a class="category-chrome-link" href="../index.html#faq">FAQ</a>
              <a class="category-chrome-link" href="../about.html">About</a>
              <a class="category-chrome-link" href="../contact.html">Contact</a>
              <a class="category-chrome-quote" href="https://wa.me/8619653679758?text=Hello%20Beefey%2C%20I%20would%20like%20to%20request%20a%20quotation%20for%20women%27s%20sleepwear." target="_blank" rel="noopener noreferrer">Request Quote</a>
            </nav>
          </div>
        </div>
        <nav class="category-subnav" aria-label="Product categories">
          <div class="category-subnav-inner">${subnavLinks(slug)}</div>
        </nav>
      </header>`;
  }

  function installChrome() {
    const slug = currentSlug();
    const oldHeader = document.querySelector('body > header, body > .site-header, body > .header, .header');
    const oldTop = document.querySelector('body > .topline, body > .topbar, .topline, .topbar');
    const selectors = ['.collection-nav', '.category-nav', '.ng-category-nav', 'nav[aria-label*="category"]', 'nav[aria-label*="Collection"]'];
    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        if (!el.classList.contains('category-subnav')) el.remove();
      });
    });
    if (oldHeader) oldHeader.remove();
    if (oldTop) oldTop.remove();
    document.body.insertAdjacentHTML('afterbegin', headerMarkup(slug));

    document.querySelectorAll('.float-cta,.whatsapp-float,.category-whatsapp-float').forEach(node => node.remove());
    const currentLabel = categories.find(([path]) => path === slug)?.[1] || 'women’s sleepwear';
    const message = encodeURIComponent(`Hello Beefey, I would like to send an inquiry about ${currentLabel}. Please share your catalog, MOQ, customization options and quotation.`);
    document.body.insertAdjacentHTML('beforeend', `<a class="category-whatsapp-float" href="https://wa.me/8619653679758?text=${message}" target="_blank" rel="noopener noreferrer" aria-label="Chat with Beefey on WhatsApp">${icon}<span>WhatsApp Inquiry</span></a>`);

    const toggle = document.querySelector('.category-chrome-toggle');
    const nav = document.querySelector('.category-chrome-nav');
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    document.querySelectorAll('.category-chrome-trigger').forEach(button => button.addEventListener('click', event => {
      event.preventDefault();
      const item = button.closest('.category-chrome-item');
      const open = item.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
    }));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', installChrome);
  else installChrome();
})();
