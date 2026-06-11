const header = document.querySelector('.site-header');
const revealItems = document.querySelectorAll('.reveal');

function updateHeader() {
  header.classList.toggle('is-solid', window.scrollY > 80);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

revealItems.forEach((item) => observer.observe(item));
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();
