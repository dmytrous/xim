import 'perfect-scrollbar/js/perfect-scrollbar.jquery.js'
import 'jquery-mousewheel';

declare const $: JQueryStatic;

$(document).ready(() => {

  /** Enable nested scrolling only on large devices
   * */
  if ($(window).width() > 1024) {
    $('.js-scroll').perfectScrollbar({
      theme: 'custom'
    });
  }

  /** Collapse all bootstrap entities on tablet and mobile
   * */
  if ($(window).width() <= 1024) {
    // $('.collapse').collapse('hide');
  }
});
