const nightgownStyles = [
  {
    id: 'ng-101', type: 'nightgown', category: 'Nightgown', name: 'Ivory Lace Nightgown',
    description: 'A softer starting point for neckline, lace and length development.',
    material: 'Select from approved options', moq: '100 sets', gsm: 'Confirm with fabric', custom: 'Neckline / lace / length',
    full: '../assets/images/custom/nightgowns-generated/ng-101-full.png', detail: '../assets/images/custom/nightgowns-generated/ng-101-detail.png',
    fullAlt: 'Ivory nightgown starting style with lace-trim neckline and flowing length', detailAlt: 'Close view of the neckline lace and seam construction on NG-101'
  },
  {
    id: 'sd-102', type: 'sleep-dress', category: 'Sleep Dress', name: 'Dusty Rose Sleep Dress',
    description: 'Refine this clean silhouette around your fabric, color and fit brief.',
    material: 'Select from approved options', moq: '100 sets', gsm: 'Confirm with fabric', custom: 'Straps / hem / color',
    full: '../assets/images/custom/nightgowns-generated/sd-102-full.png', detail: '../assets/images/custom/nightgowns-generated/sd-102-detail.png',
    fullAlt: 'Dusty rose sleep dress starting style with a clean draped silhouette', detailAlt: 'Close view of the strap, neckline binding and fabric drape on SD-102'
  },
  {
    id: 'rb-103', type: 'robe', category: 'Robe', name: 'Muted Mauve Wrap Robe',
    description: 'A versatile robe direction for sleeve, belt and trim development.',
    material: 'Select from approved options', moq: '100 sets', gsm: 'Confirm with fabric', custom: 'Sleeve / belt / trim',
    full: '../assets/images/custom/nightgowns-generated/rb-103-full.png', detail: '../assets/images/custom/nightgowns-generated/rb-103-detail.png',
    fullAlt: 'Muted mauve wrap robe starting style with long sleeves and a self-fabric belt', detailAlt: 'Close view of the belt, belt loop, pocket and cuff construction on RB-103'
  },
  {
    id: 'ng-104', type: 'nightgown', category: 'Nightgown', name: 'Champagne Flutter Nightgown',
    description: 'A feminine starting shape for square neck, lace and sleeve development.',
    material: 'Select from approved options', moq: '100 sets', gsm: 'Confirm with fabric', custom: 'Sleeve / lace / length',
    full: '../assets/images/custom/nightgowns-generated/ng-104-full.png', detail: '../assets/images/custom/nightgowns-generated/ng-104-detail.png',
    fullAlt: 'Champagne nightgown starting style with square neckline and flutter sleeves', detailAlt: 'Close view of square neckline lace, gathers and flutter sleeve on NG-104'
  },
  {
    id: 'ng-105', type: 'nightgown', category: 'Nightgown', name: 'Burgundy Long-Sleeve Nightgown',
    description: 'A longer-sleeve direction for neckline, waist and seasonal color development.',
    material: 'Select from approved options', moq: '100 sets', gsm: 'Confirm with fabric', custom: 'Neckline / cuff / color',
    full: '../assets/images/custom/nightgowns-generated/ng-105-full.png', detail: '../assets/images/custom/nightgowns-generated/ng-105-detail.png',
    fullAlt: 'Burgundy long-sleeve nightgown starting style with shaped waist', detailAlt: 'Close view of the V neckline, shaped waist and cuff on NG-105'
  },
  {
    id: 'rb-106', type: 'robe', category: 'Robe', name: 'Taupe Piped Short Robe',
    description: 'A compact robe direction for piping, cuff and belt development.',
    material: 'Select from approved options', moq: '100 sets', gsm: 'Confirm with fabric', custom: 'Piping / cuff / belt',
    full: '../assets/images/custom/nightgowns-generated/rb-106-full.png', detail: '../assets/images/custom/nightgowns-generated/rb-106-detail.png',
    fullAlt: 'Warm taupe short wrap robe starting style with ivory piping', detailAlt: 'Close view of ivory piping, belt, cuff and pocket on RB-106'
  }
];

function detailHref(style) {
  return `nightgown-product-details.html?sku=${style.id}`;
}

function inquiryHref(style) {
  const message = `Hello Beefey, I would like to inquire about ${style.id.toUpperCase()} — ${style.name}. Please share available fabrics, customization options, sampling details and quotation.`;
  return `https://wa.me/8619653679758?text=${encodeURIComponent(message)}`;
}

function renderCards(filter = 'all') {
  const container = document.querySelector('[data-products]');
  if (!container) return;
  const visible = filter === 'all' ? nightgownStyles : nightgownStyles.filter(style => style.type === filter);
  container.innerHTML = visible.map(style => `
    <article class="ng-card" data-component="starting-style-card" data-type="${style.type}">
      <a class="ng-image-link" href="${detailHref(style)}" aria-label="Open details for ${style.name}">
        <img src="${style.full}" width="1024" height="1536" alt="${style.fullAlt}">
        <span class="ng-view">View details <span aria-hidden="true">→</span></span>
      </a>
      <div class="ng-card-body">
        <div class="ng-card-meta"><span class="ng-category">${style.category}</span><span class="ng-code">Starting Style / ${style.id.toUpperCase()}</span></div>
        <h3>${style.name}</h3>
        <p class="ng-card-copy">${style.description}</p>
        <a class="ng-inquiry-link" href="${inquiryHref(style)}" target="_blank" rel="noopener noreferrer" aria-label="Send an inquiry for ${style.name}">Send inquiry <span aria-hidden="true">→</span></a>
      </div>
    </article>
  `).join('');
}

function applyFilter(filter) {
  document.querySelectorAll('[data-filter]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === filter)));
  renderCards(filter);
}

function initCollection() {
  renderCards();
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => applyFilter(button.dataset.filter)));
  document.querySelectorAll('[data-category-link]').forEach(link => link.addEventListener('click', () => applyFilter(link.dataset.categoryLink)));
}

function initDetail() {
  const sku = new URLSearchParams(location.search).get('sku') || nightgownStyles[0].id;
  const style = nightgownStyles.find(item => item.id === sku) || nightgownStyles[0];
  document.title = `${style.name} | Beefey Apparel`;
  document.querySelectorAll('[data-product-name]').forEach(node => { node.textContent = style.name; });
  document.querySelectorAll('[data-product-code]').forEach(node => { node.textContent = style.id.toUpperCase(); });
  document.querySelectorAll('[data-product-description]').forEach(node => { node.textContent = style.description; });
  document.querySelectorAll('[data-product-category]').forEach(node => { node.textContent = style.category; });
  document.querySelectorAll('[data-product-full]').forEach(node => { node.src = style.full; node.alt = style.fullAlt; });
  document.querySelectorAll('[data-product-detail]').forEach(node => { node.src = style.detail; node.alt = style.detailAlt; });
  document.querySelectorAll('[data-product-material]').forEach(node => { node.textContent = style.material; });
  document.querySelectorAll('[data-product-moq]').forEach(node => { node.textContent = style.moq; });
  document.querySelectorAll('[data-product-gsm]').forEach(node => { node.textContent = style.gsm; });
  document.querySelectorAll('[data-product-custom]').forEach(node => { node.textContent = style.custom; });
  const quote = document.querySelector('[data-product-quote]');
  if (quote) quote.href = `https://wa.me/8619653679758?text=${encodeURIComponent(`Hello Beefey, I would like to request a quotation for ${style.id.toUpperCase()} — ${style.name}.`)}`;
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.body.dataset.page === 'nightgown-detail') initDetail();
  else initCollection();
});
