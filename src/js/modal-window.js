import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const backdrop = document.querySelector('[data-modal]');
const closeBtn = document.querySelector('[data-modal-close]');
const eventText = document.querySelector('[data-modal-event]');
const form = document.querySelector('[data-modal-form]');


document.addEventListener('click', event => {
  const btn = event.target.closest('.event-card-register');
  if (!btn) return;

  const card = btn.closest('.event-card');
  const title = card.querySelector('.event-card-title').textContent.trim();
  openModal(title);
});


function openModal(eventName) {
  if (eventName) {
    eventText.textContent = eventName; 
  }
  backdrop.classList.add('is-open'); 
  document.body.classList.add('no-scroll');
  document.addEventListener('keydown', onEscape); 
}

function closeModal() {
  backdrop.classList.remove('is-open');
  document.body.classList.remove('no-scroll');
  document.removeEventListener('keydown', onEscape); 
}


function onEscape(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}


closeBtn.addEventListener('click', closeModal);


backdrop.addEventListener('click', event => {
  if (event.target === backdrop) {
    closeModal();
  }
});


form.addEventListener('submit', event => {
  event.preventDefault();
  iziToast.success({
    title: 'Done',
    message: 'You have successfully registered for the event!',
    position: 'topRight',
  });
  form.reset();
  closeModal();
});
