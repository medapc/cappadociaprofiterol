const dialog = document.querySelector<HTMLDialogElement>('.gallery-dialog');
const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-gallery-photo]')];
if (dialog && typeof dialog.showModal === 'function' && links.length) {
  const stage = dialog.querySelector<HTMLElement>('[data-gallery-stage]')!;
  const caption = dialog.querySelector<HTMLElement>('[data-gallery-caption]')!;
  const counter = dialog.querySelector<HTMLElement>('[data-gallery-counter]')!;
  let index = 0;
  let opener: HTMLAnchorElement | undefined;
  const photo = new Image();
  stage.append(photo);
  const display = (next: number) => {
    index = (next + links.length) % links.length;
    const link = links[index];
    photo.alt = link.dataset.alt || '';
    photo.width = Number(link.dataset.width);
    photo.height = Number(link.dataset.height);
    photo.src = link.href;
    caption.textContent = link.dataset.caption || '';
    counter.textContent = `${index + 1} / ${links.length}`;
  };
  links.forEach((link, position) => link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    opener = link;
    display(position);
    dialog.showModal();
    document.body.classList.add('gallery-open');
  }));
  dialog.querySelector('[data-gallery-previous]')!.addEventListener('click', () => display(index - 1));
  dialog.querySelector('[data-gallery-next]')!.addEventListener('click', () => display(index + 1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'Tab') {
      const controls = [...dialog.querySelectorAll<HTMLButtonElement>('button')];
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      display(index + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('gallery-open');
    opener?.focus({ preventScroll: true });
  });
  window.addEventListener('pagehide', () => { if (dialog.open) dialog.close(); });
}
