import Accordion from 'accordion-js';
import axios from 'axios';
import iziToast from 'izitoast';

const BASE_URL = 'https://books-backend-v2.b.goit.study';

const backdrop = document.querySelector('[data-book-modal]');
const closeBtn = backdrop.querySelector('[data-book-close]');
const img = backdrop.querySelector('[data-book-img]');
const title = backdrop.querySelector('[data-book-title]');
const author = backdrop.querySelector('[data-book-author]');
const price = backdrop.querySelector('[data-book-price]');
const details = backdrop.querySelector('[data-book-details]');
const form = backdrop.querySelector('[data-book-form]');
const qtyInput = backdrop.querySelector('[data-qty-input]');
const minusBtn = backdrop.querySelector('[data-qty-minus]');
const plusBtn = backdrop.querySelector('[data-qty-plus]');
const addToCartBtn = backdrop.querySelector('[data-add-to-cart]');
const message = backdrop.querySelector('[data-book-message]');
const modalContent = backdrop.querySelector('.book-modal');

let quantity = 1;
let currentTitle = '';
let lastFocused = null;

new Accordion('[data-book-accordion]', { duration: 300, showMultiple: false });

/* ---------- Открытие ---------- */

export async function openBookModal(id) {
  try {
    showModalLoader();

    const response = await axios.get(`${BASE_URL}/books/${id}`);
    const book = response.data;
    hideModalLoader();
    fillModal(book);
    showModal();
  } catch (error) {
    hideModalLoader();

    iziToast.error({
      title: 'Error',
      message: 'Failed to load book details. Please try again.',
      position: 'topRight',
    });
  }
}

function showModalLoader() {
  document.body.insertAdjacentHTML(
    'beforeend',
    '<div class="book-modal-loader"></div>'
  );
}

function hideModalLoader() {
  document.querySelector('.book-modal-loader')?.remove();
}

function formatTitle(text) {
  const lower = text.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

function fillModal(book) {
  img.src = book.book_image;
  img.alt = book.title;
  title.textContent = formatTitle(book.title);
  author.textContent = book.author;
  price.textContent = `$${book.price}`;
  details.textContent = book.description || 'No description yet.';

  currentTitle = book.title;
  message.textContent = '';
  setQuantity(1);
}

function showModal() {
  lastFocused = document.activeElement;
  backdrop.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', onEsc);
  closeBtn.focus();
}

/* ---------- Закрытие ---------- */

function closeModal() {
  backdrop.classList.remove('is-open');
  document.body.style.overflow = '';
  document.removeEventListener('keydown', onEsc);
  if (lastFocused) lastFocused.focus();
}

function onEsc(event) {
  if (event.key === 'Escape') closeModal();
}

closeBtn.addEventListener('click', closeModal);

backdrop.addEventListener('click', event => {
  // клик по самому фону, а не по окну внутри него
  if (event.target === backdrop) closeModal();
});

/* ---------- Количество ---------- */

function setQuantity(value) {
  // Number('abc') даёт NaN, а NaN || 1 даёт 1
  quantity = Math.max(1, Math.floor(Number(value)) || 1);
  qtyInput.value = quantity;
}

function showToast(text) {
  const toast = document.createElement('div');
  toast.className = 'book-modal-toast';
  toast.setAttribute('role', 'status');
  toast.textContent = text;
  document.body.append(toast);

  requestAnimationFrame(() => toast.classList.add('is-visible'));

  setTimeout(() => {
    toast.classList.remove('is-visible');
    toast.addEventListener('transitionend', () => toast.remove(), {
      once: true,
    });
  }, 3000);
}

minusBtn.addEventListener('click', () => setQuantity(quantity - 1));
plusBtn.addEventListener('click', () => setQuantity(quantity + 1));
qtyInput.addEventListener('change', () => setQuantity(qtyInput.value));

/* ---------- Кнопки ---------- */

addToCartBtn.addEventListener('click', () => {
  console.log(`Add to cart: "${currentTitle}", ${quantity} шт.`);
  showToast(`Додано до кошика: ${quantity} шт.`);
});

form.addEventListener('submit', event => {
  event.preventDefault();
  showToast('Дякуємо за покупку');
});
