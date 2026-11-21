const booksList = document.querySelector('.books-list');
const categoriesList = document.querySelector('.books-categories');
const booksCount = document.querySelector('.books-count');
const showMoreBtn = document.querySelector('.books-more-btn');
const dropdownBtn = document.querySelector('.books-dropdown-btn');

let currentBooks = [];
let visibleBooks = 0;

async function topBooks() {
  try {
    const res = await fetch(
      'https://books-backend-v2.b.goit.study/books/top-books'
    );
    const data = await res.json();

    currentBooks = getAllBooks(data);
    visibleBooks = getBooksPerPage();

    renderBooks(currentBooks.slice(0, visibleBooks));
  } catch (error) {
    console.log(error);
  }
}

async function fetchCategories() {
  try {
    const res = await fetch(
      'https://books-backend-v2.b.goit.study/books/category-list'
    );
    const data = await res.json();
    renderCategories(data);
  } catch (error) {
    console.log(error);
  }
}

async function fetchBooksByCategory(category) {
  try {
    const res = await fetch(
      `https://books-backend-v2.b.goit.study/books/category?category=${encodeURIComponent(category)}`
    );
    const data = await res.json();

    currentBooks = data;
    visibleBooks = getBooksPerPage();

    renderBooks(currentBooks.slice(0, visibleBooks));
  } catch (error) {
    console.log(error);
  }
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

function onDropdownClick() {
  dropdownBtn.classList.toggle('is-open');
  categoriesList.classList.toggle('is-open');
}

function onCategoryClick(event) {
  const button = event.target.closest('.books-category-btn');

  if (!button) return;

  categoriesList.querySelector('.is-active')?.classList.remove('is-active');

  button.classList.add('is-active');

  dropdownBtn.classList.remove('is-open');
  categoriesList.classList.remove('is-open');

  const category = button.textContent.trim();

  if (category === 'All categories') {
    topBooks();
    return;
  }

  fetchBooksByCategory(category);
}

function onShowMoreClick() {
  visibleBooks += 4;

  renderBooks(currentBooks.slice(0, visibleBooks));
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

topBooks();
fetchCategories();
