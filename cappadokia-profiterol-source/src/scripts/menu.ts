const menu = document.querySelector<HTMLDetailsElement>('.mobile-menu');
if (menu) {
  const summary = menu.querySelector('summary')!;
  const nav = menu.querySelector('nav')!;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let animation: Animation | undefined;
  let closing = false;
  const close = (focus = false) => {
    if (!menu.open) return;
    animation?.cancel();
    closing = true;
    if (focus) summary.focus({ preventScroll: true });
    const finish = () => { menu.open = false; closing = false; };
    if (motion.matches) { finish(); return; }
    animation = nav.animate([{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(-8px)' }], { duration: 180, easing: 'ease-in' });
    animation.onfinish = finish;
  };
  summary.addEventListener('click', event => {
    event.preventDefault();
    if (menu.open && !closing) { close(); return; }
    animation?.cancel();
    closing = false;
    menu.open = true;
    if (!motion.matches) animation = nav.animate([{ opacity: 0, transform: 'translateY(-8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 220, easing: 'ease-out' });
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => close(true)));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') close(true); });
  document.addEventListener('click', event => { if (!menu.contains(event.target as Node)) close(); });
  motion.addEventListener('change', event => {
    if (event.matches) { animation?.cancel(); if (closing) menu.open = false; closing = false; }
  });
  window.addEventListener('pagehide', () => { animation?.cancel(); menu.open = false; closing = false; });
}
