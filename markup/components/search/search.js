import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar';
import 'jquery-mousewheel';

$(document).ready(() => {
  $('.js-scroll').mCustomScrollbar({
    mouseWheel: { enable: true },
    documentTouchScroll: true,
    scrollInertia: 200,
    scrollbarPosition: "outside",
    theme: 'custom'
  })
});
