import type { ProductVariant } from '../data/products';
import { formatPrice } from '../lib/catalogue';

const motion = matchMedia('(prefers-reduced-motion: reduce)');
const panels = document.querySelectorAll<HTMLElement>('.variant-panel');
const animations = new Map<HTMLElement, Animation>();

function animateSummary(panel: HTMLElement) {
  animations.get(panel)?.cancel();
  if (motion.matches) return;
  const summary = panel.querySelector<HTMLElement>('.variant-summary')!;
  const animation = summary.animate([{ opacity: .45, transform: 'translateY(4px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 220, easing: 'ease-out' });
  animations.set(panel, animation);
  animation.onfinish = () => animations.delete(panel);
}

panels.forEach(panel => {
  const variants: ProductVariant[] = JSON.parse(panel.dataset.variants || '[]');
  const radios = panel.querySelectorAll<HTMLInputElement>('input[type="radio"]');
  const key = `cappadokia:weight:${panel.dataset.productId}`;
  const detail = panel.closest('[data-product-detail]');
  const update = (weight: string, animate = false) => {
    const variant = variants.find(item => item.weight === weight) || variants[0];
    radios.forEach(input => { input.checked = input.value === variant.weight; });
    panel.querySelector('[data-variant-price]')!.textContent = formatPrice(variant.price);
    panel.querySelector('[data-variant-weight]')!.textContent = variant.weight;
    panel.querySelector('[data-variant-description]')!.textContent = variant.description || panel.dataset.description || '';
    if (animate) animateSummary(panel);
  };
  const restore = () => {
    let weight = variants[0].weight;
    try { weight = sessionStorage.getItem(key) || weight; } catch { /* Storage is optional. */ }
    if (detail) weight = new URL(location.href).searchParams.get('gramaj') || weight;
    update(weight);
  };
  restore();
  panel.querySelector<HTMLFieldSetElement>('fieldset')!.hidden = false;
  panel.querySelector<HTMLElement>('.variant-fallback')!.hidden = true;
  panel.addEventListener('change', event => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement) || input.type !== 'radio') return;
    update(input.value, true);
    try { sessionStorage.setItem(key, input.value); } catch { /* Navigation still works. */ }
    if (detail) {
      const url = new URL(location.href);
      url.searchParams.set('gramaj', input.value);
      history.replaceState(null, '', url);
    }
  });
  window.addEventListener('pageshow', restore);
});

const filters = document.querySelector<HTMLElement>('.filters');
if (filters) {
  const buttons = filters.querySelectorAll<HTMLButtonElement>('button[data-filter]');
  const cards = document.querySelectorAll<HTMLElement>('.product-card');
  const applyFilter = () => {
    const requested = new URL(location.href).searchParams.get('kategori') || 'all';
    const selected = [...buttons].some(button => button.dataset.filter === requested) ? requested : 'all';
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === selected)));
    let count = 0;
    cards.forEach(card => {
      card.hidden = selected !== 'all' && card.dataset.category !== selected;
      if (!card.hidden) count++;
    });
    document.querySelector('#filter-status')!.textContent = `${count} tatlı gösteriliyor.`;
  };
  filters.hidden = false;
  applyFilter();
  buttons.forEach(button => button.addEventListener('click', () => {
    const url = new URL(location.href);
    if (button.dataset.filter === 'all') url.searchParams.delete('kategori');
    else url.searchParams.set('kategori', button.dataset.filter!);
    if (url.href !== location.href) history.pushState(null, '', url);
    applyFilter();
  }));
  window.addEventListener('popstate', applyFilter);
  window.addEventListener('pageshow', applyFilter);
}

// Baseline content is visible: no JavaScript, failed observers, or reduced motion cannot hide cards.
if ('IntersectionObserver' in window && !motion.matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-revealed');
    observer.unobserve(entry.target);
  }), { threshold: .08 });
  document.querySelectorAll('.product-card').forEach(card => observer.observe(card));
  motion.addEventListener('change', event => { if (event.matches) observer.disconnect(); });
}
motion.addEventListener('change', event => {
  if (event.matches) { animations.forEach(animation => animation.cancel()); animations.clear(); }
});
