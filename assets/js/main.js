document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    if (!nav.id) nav.id = 'site-navigation';
    toggle.setAttribute('type', 'button');
    toggle.setAttribute('aria-controls', nav.id);
    toggle.setAttribute('aria-expanded', 'false');
    const closeMenu = () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      nav.querySelectorAll('.nav-item.is-open').forEach(item => item.classList.remove('is-open'));
      nav.querySelectorAll('.nav-trigger').forEach(trigger => trigger.setAttribute('aria-expanded', 'false'));
    };
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      if (!isOpen) closeMenu();
    });
    nav.querySelectorAll('.nav-trigger').forEach(trigger => {
      trigger.setAttribute('type', 'button');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.addEventListener('click', event => {
        event.preventDefault();
        const item = trigger.closest('.nav-item');
        if (!item) return;
        const open = item.classList.toggle('is-open');
        trigger.setAttribute('aria-expanded', String(open));
      });
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 980px)').matches) closeMenu();
    }));
    document.addEventListener('keydown', event => {
      if (event.key !== 'Escape') return; const wasOpen = nav.classList.contains('open') || nav.querySelector('.nav-item.is-open'); if (wasOpen) { closeMenu(); toggle.focus(); }
    });
    document.addEventListener('click', event => {
      if (nav.classList.contains('open') && !nav.contains(event.target) && !toggle.contains(event.target)) closeMenu();
    });
    window.addEventListener('resize', () => {
      if (!window.matchMedia('(max-width: 980px)').matches) closeMenu();
    });
  }

  // Gallery thumbnails
  document.querySelectorAll('[data-gallery]').forEach(gallery => {
    const main = gallery.querySelector('.gallery-main img');
    gallery.querySelectorAll('.gallery-thumbs button').forEach(button => {
      button.addEventListener('click', () => {
        gallery.querySelectorAll('.gallery-thumbs button').forEach(item => item.classList.remove('active'));
        button.classList.add('active');
        if (main) {
          main.src = button.dataset.src;
          main.alt = button.dataset.alt || 'Product image';
        }
      });
    });
  });

  // Pre-fill inquiry product name
  const params = new URLSearchParams(location.search);
  const product = params.get('product');
  const productField = document.querySelector('[name="product_name"]');
  if (productField && product) productField.value = product;
});
