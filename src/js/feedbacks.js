import Swiper from 'swiper';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import 'swiper/css';

new Swiper('.feedbacks-swiper', {
  modules: [Navigation, Pagination, Keyboard],

  slidesPerView: 1,
  spaceBetween: 24,

  navigation: {
    nextEl: '.feedbacks-button-next',
    prevEl: '.feedbacks-button-prev',
  },

  pagination: {
    el: '.feedbacks-pagination',
    clickable: true,
  },

  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },

  breakpoints: {
    768: {
      slidesPerView: 2,
    },

    1440: {
      slidesPerView: 3,
    },
  },
});
