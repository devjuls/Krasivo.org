// -------- SLIDER ------- //
;$(document).ready(function() {

  $(".slider").owlCarousel({

      navigation : true,
      navigationText : ["",""],
      loop: true,
      // rewind: false,
      dots: false,
      slideSpeed : 300,
      paginationSpeed : 400,
      items: 1,
      // singleItem : true,
      autoPlay : true
  });
});