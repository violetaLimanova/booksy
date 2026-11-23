const footerForm = document.querySelector('.footer-form');

footerForm?.addEventListener('submit', event => {
  // Native required/type/pattern validation runs before the submit event.
  event.preventDefault();

  const email = event.currentTarget.elements.email.value.trim();
  console.log(email);
});
