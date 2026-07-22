
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }

  document.querySelectorAll('[data-gallery]').forEach(gallery => {
    const main = gallery.querySelector('.gallery-main img');
    gallery.querySelectorAll('.gallery-thumbs button').forEach(btn => {
      btn.addEventListener('click', () => {
        gallery.querySelectorAll('.gallery-thumbs button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        main.src = btn.dataset.src;
        main.alt = btn.dataset.alt || 'Product image';
      });
    });
  });

  const params = new URLSearchParams(location.search);
  const product = params.get('product');
  const field = document.querySelector('[name="message"]');
  const productField = document.querySelector('[name="product_name"]');
  if (productField && product) productField.value = product;
  if (field && product && !field.value) {
    field.value = `Hello, I am interested in ${product}. Please send MOQ, fabric options, sample lead time and quotation.`;
  }

  document.querySelectorAll('.nav-item .nav-trigger').forEach(btn => {
    btn.addEventListener('click', e => {
      if (window.innerWidth < 981) {
        e.preventDefault();
        e.stopPropagation();
        const menu = btn.nextElementSibling;
        const willOpen = menu && menu.style.display !== 'block';
        document.querySelectorAll('.mega-menu').forEach(m => {
          if (window.innerWidth < 981) m.style.display = 'none';
        });
        if (menu) menu.style.display = willOpen ? 'block' : 'none';
      }
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 981) {
      document.querySelectorAll('.mega-menu').forEach(m => m.style.display = '');
    }
  });
});
