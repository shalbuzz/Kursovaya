const swiper = new Swiper('.testimonial-swiper', {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,
    navigation: {
        nextEl: '#nextTestimonial',
        prevEl: '#prevTestimonial',
    },
    breakpoints: {
        320: { slidesPerView: 1, spaceBetween: 10 },
        480: { slidesPerView: 1, spaceBetween: 15 },
        768: { slidesPerView: 2, spaceBetween: 15 },
        992: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 2, spaceBetween: 20 },
        1200: { slidesPerView: 3, spaceBetween: 20 },
        1400: { slidesPerView: 3, spaceBetween: 25 }
    }
});

window.addEventListener('load', () => {
const swiperAbout = new Swiper('.team-carousel', {
    slidesPerView: 4,
    spaceBetween: 20,
    loop: true,
    navigation: {
        nextEl: '.next-button',
        prevEl: '.prev-button',
    },
    breakpoints: {
        320: { slidesPerView: 1, spaceBetween: 10 },
        480: { slidesPerView: 1, spaceBetween: 15 },
        576: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        768: {
            slidesPerView: 1,
            spaceBetween: 25
        },
        992: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        1200: {
            slidesPerView: 3,
            spaceBetween: 25
        },
        1400: {
            slidesPerView: 4,
            spaceBetween: 30
        },
    }
});
});
