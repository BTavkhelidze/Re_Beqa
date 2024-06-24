const swiper = new Swiper('.mySwiper', {
  navigation: {
    prevEl: '.swiper-button-prev',
    nextEl: '.swiper-button-next',
  },

  efect: 'slide',

  breakpoints: {
    640: {
      slidesPerView: 1,
      //   spaceBetween: 10,
    },
    1200: {
      slidesPerView: 2,
    },
    1210: {
      slidesPerView: 3,
      spaceBetween: 12,
    },
  },
});
