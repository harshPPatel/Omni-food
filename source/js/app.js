// Fade up navbar on scroll
$(document).ready(function() {

  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll >= 600) {
        $("nav").addClass("sticky");
    } else {
        $("nav").removeClass("sticky");
    }
  });

  $('.js--scroll-to-plans').click(function () {
    $('html, body').animate({scrollTop: $('.js--plans').offset().top}, 1000);
  });

  $('.js--scroll-to-start').click(function () {
    $('html, body').animate({scrollTop: $('.js--section-features').offset().top}, 1000);
  });

  $('.js--logo').click(function () {
    $('html, body').animate({scrollTop: $('header').offset().top}, 1000);
  });
});
