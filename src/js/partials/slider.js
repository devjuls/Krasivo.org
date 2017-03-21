// -------- SLIDER ------- //

$(document).ready(function() {
  $(".slider").slick({
    // autoplay: true,
    autoplaySpeed: 4000,
    adaptiveHeight: true,
    responsive: [
    {
      breakpoint: 480,
      settings: {
        arrows: false
      }
    }]
  });

  // Слайдер на странице товара (с превью)

  //большая картинка

  $('.product__big-images').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.product__small-images'
  });

  //маленькие картинки (вертикальный)

  $('.product__small-images').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    focusOnSelect: true,
    vertical: true,
    arrows: true,
    prevArrow: ('<button type="button" class="top-arrow"></button>'),
    nextArrow: ('<button type="button" class="bottom-arrow"></button>'),
    asNavFor: '.product__big-images',
    responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 6,
        vertical: false,
        arrows: false
      }
    },
    {
      breakpoint: 480,
      settings: {
        vertical: false,
        arrows: false
      }
    }]
  });

});