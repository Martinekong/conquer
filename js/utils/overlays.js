export function createOverlay(content, ...buttons) {
  const overlayBg = document.createElement('div');
  const overlay = document.createElement('div');

  const closeOverlayBtn = document.createElement('span');

  const overlayContainer = document.createElement('div');
  const btnContainer = document.createElement('div');

  overlayBg.classList.add('overlay-bg');
  overlay.classList.add('overlay');
  closeOverlayBtn.classList.add(
    'material-symbols-outlined',
    'close-overlay-btn'
  );
  closeOverlayBtn.textContent = 'close';
  overlayContainer.classList.add('overlay-container');
  content.classList.add('content-container');
  btnContainer.classList.add('btn-container');

  btnContainer.append(...buttons);
  overlayContainer.append(content, btnContainer);
  overlay.append(closeOverlayBtn, overlayContainer);
  document.body.append(overlayBg, overlay);

  addOverlayCloseListeners([closeOverlayBtn, overlayBg], [overlayBg, overlay]);

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      overlayBg.remove();
      overlay.remove();
    });
  });
}

function addOverlayCloseListeners(triggers, targets) {
  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      targets.forEach((el) => el.remove());
    });
  });
}
