
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }

  // Mega Menu "Freeze" Logic for Desktop and Mobile
  document.querySelectorAll('.nav-has-mega').forEach(item => {
    const trigger = item.querySelector('.nav-trigger');
    const parentLink = item.querySelector('.nav-parent');
    const menu = item.querySelector('.mega-menu');
    
    const toggleMenu = (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const isCurrentlyOpen = menu.style.display === 'block';
      
      // Close all other menus first
      document.querySelectorAll('.mega-menu').forEach(m => {
        m.style.display = 'none';
        m.parentElement.classList.remove('active');
      });

      if (!isCurrentlyOpen) {
        menu.style.display = 'block';
        item.classList.add('active');
      }
    };

    if (trigger) trigger.addEventListener('click', toggleMenu);
    // On mobile, clicking the text also opens it. On desktop, hover still works via CSS.
    if (parentLink && window.innerWidth < 981) parentLink.addEventListener('click', toggleMenu);
  });

  // Close menus when clicking anywhere else
  document.addEventListener('click', () => {
    document.querySelectorAll('.mega-menu').forEach(m => {
      m.style.display = 'none';
      m.parentElement.classList.remove('active');
    });
  });

  // Re-enable CSS hover state by clearing JS styles on large screens
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 981) {
      document.querySelectorAll('.mega-menu').forEach(m => m.style.display = '');
    }
  });
});
