import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';

new Swiper('.feedbacks-swiper', {
  modules: [Navigation, Pagination],

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

  breakpoints: {
    768: {
      slidesPerView: 2,
    },

    1440: {
      slidesPerView: 3,
    },
  },
});
