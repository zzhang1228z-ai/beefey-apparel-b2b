
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle (Only for mobile)
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }

  // Gallery Thumbs logic
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

  // Pre-fill form logic
  const params = new URLSearchParams(location.search);
  const product = params.get('product');
  const productField = document.querySelector('[name="product_name"]');
  if (productField && product) productField.value = product;
});
