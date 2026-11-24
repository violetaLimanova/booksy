import Accordion from 'accordion-js';

// Возьми такое же начало адреса, как в books.js
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

let quantity = 1;
let currentTitle = '';
let lastFocused = null;

// Аккордеон создаём один раз: разметка модалки не пересоздаётся
new Accordion('[data-book-accordion]', { duration: 300, showMultiple: true });

/* ---------- Открытие ---------- */

export async function openBookModal(id) {
  try {
    const response = await fetch(`${BASE_URL}/books/${id}`);
    if (!response.ok) throw new Error(`Ошибка ${response.status}`);

    const book = await response.json();
    fillModal(book);
    showModal();
  } catch (error) {
    console.error('Не вдалося завантажити книгу:', error);
  }
}

function formatTitle(text) {
  const lower = text.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

function fillModal(book) {
  // textContent вставляет текст как есть, HTML из ответа сервера не выполняется
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

minusBtn.addEventListener('click', () => setQuantity(quantity - 1));
plusBtn.addEventListener('click', () => setQuantity(quantity + 1));
qtyInput.addEventListener('change', () => setQuantity(qtyInput.value));

/* ---------- Кнопки ---------- */

addToCartBtn.addEventListener('click', () => {
  console.log(`Add to cart: "${currentTitle}", ${quantity} шт.`);
  message.textContent = `Додано до кошика: ${quantity} шт.`;
});

form.addEventListener('submit', event => {
  // без этого submit перезагрузит страницу
  event.preventDefault();
  message.textContent = 'Дякуємо за покупку';
});
