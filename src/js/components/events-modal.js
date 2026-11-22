export function eventsModal() {
  const modal = document.querySelector('.events-register');
  const closeButton = document.querySelector('#events-register-close');
  const eventsSection = document.querySelector('.events');
  const modalEventTitle = document.querySelector('.events-register-event');

  if (!modal || !closeButton || !eventsSection || !modalEventTitle) return;

  const overlay = document.createElement('div');
  overlay.classList.add('events-overlay');
  document.body.append(overlay);
  document.body.append(modal);

  function openModal(title) {
    modalEventTitle.textContent = title;

    modal.classList.remove('is-hidden');
    modal.classList.add('is-open');
    overlay.classList.add('is-open');

    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.classList.add('is-hidden');
    overlay.classList.remove('is-open');

    document.body.style.overflow = '';
  }

  eventsSection.addEventListener('click', event => {
    const registerButton = event.target.closest('.event-card-register');

    if (!registerButton) return;

    const card = registerButton.closest('.event-card');
    const title = card.querySelector('.event-card-title').textContent.trim();

    openModal(title);
  });

  closeButton.addEventListener('click', closeModal);

  overlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
}
