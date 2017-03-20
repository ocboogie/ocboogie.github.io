//jQuery to collapse the navbar on scroll
// $(window).scroll(function() {
//     navbarExpandCheck();
// });
// console.log($(".navbar"))
// function navbarExpandCheck() {
//     if ($(".navbar").offset().top > 50) {
//         $(".navbar-fixed-top").addClass("top-nav-collapse");
//     } else {
//         $(".navbar-fixed-top").removeClass("top-nav-collapse");
//     }
// }
// navbarExpandCheck();

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
      }, 600);
        return false;
      }
    }
  });
});
