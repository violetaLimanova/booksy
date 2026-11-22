export const createEventCard = event => `
  <li class="swiper-slide events-item">
    <article class="event-card">
      <img
        class="event-card-image"
        src="${event.image1x}"
        srcset="${event.image1x} 1x, ${event.image2x} 2x"
        alt="${event.alt}"
        loading="lazy"
      />

      <div class="event-card-body">
        <h3 class="event-card-title">${event.title}</h3>
        <p class="event-card-meta">${event.date}</p>
        <p class="event-card-description">${event.description}</p>

        <button class="event-card-register" type="button">
          Register <span aria-hidden="true">›</span>
        </button>
      </div>
    </article>
  </li>
`;
