import Swiper from 'swiper';
import { Keyboard, Navigation } from 'swiper/modules';
import 'swiper/css';

new Swiper('#hero .swiper', {
  modules: [Navigation, Keyboard],
  slidesPerView: 1,
  navigation: {
    prevEl: '.hero-button-prev',
    nextEl: '.hero-button-next',
    addIcons: false,
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
});
