const footerForm = document.querySelector('.footer-form');

footerForm?.addEventListener('submit', event => {
  // Native required/type/pattern validation runs before the submit event.
  // The assignment provides no subscription endpoint; keep the form on the page.
  event.preventDefault();
});
