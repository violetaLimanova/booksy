import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import { createEventCard } from './components/events-markup.js';
// import { eventsModal } from './components/events-modal.js';

import events from './components/events-data.json';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const eventsList = document.querySelector('.events-list');
eventsList.innerHTML = events.map(createEventCard).join('');

function initEvents() {
  const slider = document.querySelector('.events-slider');

  if (!slider) return;

  return new Swiper(slider, {
    modules: [Navigation, Pagination],

    slidesPerView: 1,
    spaceBetween: 24,

    navigation: {
      nextEl: '.events-button-next',
      prevEl: '.events-button-prev',
    },

    pagination: {
      el: '.events-pagination',
      clickable: true,
    },

    breakpoints: {
      768: {
        slidesPerView: 2,
      },

      1440: {
        slidesPerView: 3,
        allowTouchMove: false,
      },
    },
  });
}

initEvents();
// eventsModal();
