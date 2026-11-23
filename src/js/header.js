const openMenuBtn = document.querySelector('.header-btn-menu');
const closeMenuBtn = document.querySelector('.menu-close-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const menuLink = document.querySelectorAll('.mobile-item');

function openMenu() {
  mobileMenu.classList.add('is-open');
  document.body.classList.add('no-scroll');
}

function closeMenu() {
  mobileMenu.classList.remove('is-open');
  document.body.classList.remove('no-scroll');
}

openMenuBtn.addEventListener('click', openMenu);
closeMenuBtn.addEventListener('click', closeMenu);

menuLink.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    closeMenu();

    const targetId = link.getAttribute('href');
    if (targetId === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
      });
    }
  });
});
