import { openBookModal } from './book-modal.js';
import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const booksList = document.querySelector('.books-list');
const categoriesList = document.querySelector('.books-categories');
const booksCount = document.querySelector('.books-count');
const showMoreBtn = document.querySelector('.books-more-btn');
const dropdownBtn = document.querySelector('.books-dropdown-btn');

let currentBooks = [];
let visibleBooks = 0;

async function fetchBooks() {
  try {
    booksList.innerHTML = '';
    showLoader();
    showMoreBtn.hidden = true;

    const res = await axios.get(
      'https://books-backend-v2.b.goit.study/books/top-books'
    );
    const data = res.data;

    currentBooks = getAllBooks(data);
    visibleBooks = getBooksPerPage();

    renderBooks(currentBooks.slice(0, visibleBooks));
  } catch (error) {
    currentBooks = [];
    booksList.innerHTML = '';
    booksCount.textContent = 'Showing 0 of 0';
    iziToast.error({
      title: 'Error',
      message: 'Failed to load books. Please try again.',
      position: 'topRight',
    });
    hideLoader();
    showMoreBtn.hidden = visibleBooks >= currentBooks.length;
  }
}

async function fetchCategories() {
  try {
    const res = await axios.get(
      'https://books-backend-v2.b.goit.study/books/category-list'
    );
    const data = res.data;
    renderCategories(data);
  } catch (error) {
    console.error(error);
  }
}

async function fetchBooksByCategory(category) {
  try {
    booksList.innerHTML = '';
    showLoader();
    showMoreBtn.hidden = true;
    const res = await axios.get(
      `https://books-backend-v2.b.goit.study/books/category?category=${encodeURIComponent(category)}`
    );
    const data = res.data;

    currentBooks = data;
    visibleBooks = getBooksPerPage();

    renderBooks(currentBooks.slice(0, visibleBooks));
  } catch (error) {
    currentBooks = [];
    booksList.innerHTML = '';
    booksCount.textContent = 'Showing 0 of 0';
    iziToast.error({
      title: 'Error',
      message: 'Failed to load books. Please try again.',
      position: 'topRight',
    });

    hideLoader();
    showMoreBtn.hidden = visibleBooks >= currentBooks.length;
  }
}

function showLoader() {
  booksList.insertAdjacentHTML('beforeend', '<li class="books-loader"></li>');
}

function hideLoader() {
  booksList.querySelector('.books-loader')?.remove();
}

function renderCategories(categories) {
  categoriesList.insertAdjacentHTML(
    'beforeend',
    categories
      .map(
        category => `
          <li class="books-category">
            <button type="button" class="books-category-btn">
              ${category.list_name}
            </button>
          </li>
        `
      )
      .join('')
  );
}

categoriesList.addEventListener('click', onCategoryClick);
showMoreBtn.addEventListener('click', onShowMoreClick);
dropdownBtn.addEventListener('click', onDropdownClick);
booksList.addEventListener('click', onBookBtnClick);

function onDropdownClick() {
  dropdownBtn.classList.toggle('is-open');
  categoriesList.classList.toggle('is-open');
  dropdownBtn.setAttribute(
    'aria-expanded',
    categoriesList.classList.contains('is-open')
  );
}

function onCategoryClick(event) {
  const button = event.target.closest('.books-category-btn');

  if (!button) return;

  categoriesList.querySelector('.is-active')?.classList.remove('is-active');

  button.classList.add('is-active');

  dropdownBtn.classList.remove('is-open');
  categoriesList.classList.remove('is-open');
  dropdownBtn.setAttribute('aria-expanded', 'false');

  const category = button.textContent.trim();

  if (category === 'All categories') {
    fetchBooks();
    return;
  }

  fetchBooksByCategory(category);
}

function onShowMoreClick() {
  visibleBooks += 4;

  renderBooks(currentBooks.slice(0, visibleBooks));
}

function onBookBtnClick(event) {
  const button = event.target.closest('.books-btn');

  if (!button) return;

  openBookModal(button.dataset.id);
}

function getAllBooks(data) {
  return data.flatMap(category => category.books);
}

function getBooksPerPage() {
  return window.innerWidth >= 768 ? 24 : 10;
}

function formatTitle(title) {
  return title
    .toLowerCase()
    .replace(/(^|\s)\S/g, letter => letter.toUpperCase());
}

function createBookMarkup(book) {
  return `
    <li class="books-item">
      <img
        class="books-img"
        src="${book.book_image}"
        alt="${book.title}"
        loading="lazy"
      />
      <div class="books-content">
        <div class="books-row">
          <h3 class="books-title">${formatTitle(book.title)}</h3>
          <p class="books-price">$${Math.round(book.price)}</p>
        </div>
        <p class="books-author">${book.author}</p>
        <button type="button" class="books-btn" data-id="${book._id}">
          Learn More
        </button>
      </div>
    </li>
  `;
}

function renderBooks(books) {
  booksList.innerHTML = books.map(createBookMarkup).join('');
  booksCount.textContent = `Showing ${books.length} of ${currentBooks.length}`;
  showMoreBtn.hidden = books.length >= currentBooks.length;
}

fetchBooks();
fetchCategories();
