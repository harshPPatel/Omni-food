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
});
