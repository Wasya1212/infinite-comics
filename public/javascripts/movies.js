$('.intro').slick({
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,
  dots: true,
  draggable: false
});

$('.anounced-movies__slider').slick({
  autoplay: true,
  autoplaySpeed: 1000,
  arrows: false,
  dots: true,
  draggable: false,
  slidesToShow: 6,
  slidesToScroll: 1,
  pauseOnHover: false,
  pauseOnFocus: false,
  useTransform: false
});
