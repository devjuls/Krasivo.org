$(document).ready(function() {

  ///popup

  $('.open-popup-link').magnificPopup({
    type:'inline',
    removalDelay: 200,
    mainClass: 'mfp-fade',
    midClick: true
    // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
  });

  ///phone mask

  $('input[type="tel"]').mask('+0 (000) 000 - 00 - 00');

});