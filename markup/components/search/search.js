// import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar';
// import 'static/js/plugins/_jquery.scrollbar'
import 'perfect-scrollbar/js/perfect-scrollbar.jquery.js'
import 'jquery-mousewheel';

$(document).ready(() => {
  // $('.js-scroll').mCustomScrollbar({
  //   mouseWheel: { enable: true },
  //   documentTouchScroll: true,
  //   scrollInertia: 200,
  //   scrollbarPosition: "inside",
  //   theme: 'custom'
  // });

  $('.js-scroll').perfectScrollbar({
    theme: 'custom'
  });
});
