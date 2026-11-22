
const backdrop = document.querySelector('[data-modal]');
const closeBtn = document.querySelector('[data-modal-close]');
const eventText = document.querySelector('[data-modal-event]');
const form = document.querySelector('[data-modal-form]');
const openBtns = document.querySelectorAll('[data-modal-open]');


openBtns.forEach(btn => {
  btn.addEventListener('click', () => openModal(btn.dataset.event));
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
  form.reset();
  closeModal();
});
