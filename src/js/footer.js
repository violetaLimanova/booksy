import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const footerForm = document.querySelector('.footer-form');

footerForm?.addEventListener('submit', event => {
  // Native required/type/pattern validation runs before the submit event.
  event.preventDefault();

  const form = event.currentTarget;
  const email = form.elements.email.value.trim();
  console.log(email);

  iziToast.success({
    title: 'Done',
    message: 'You have successfully signed up!',
    position: 'topRight',
    onOpening: (_, toast) => {
      toast.setAttribute('role', 'status');
      toast
        .querySelector('.iziToast-close')
        ?.setAttribute('aria-label', 'Close notification');
    },
  });

  form.reset();
});
