$(document).ready(function() {

  $(".tabs__content>li").not(":first").hide();
  $(".tabs__list>li").click(function() {
    $(".tabs__list>li").removeClass("active").eq($(this).index()).addClass("active");
    $(".tabs__content>li").hide().eq($(this).index()).fadeIn()
  }).eq(0).addClass("active");

});