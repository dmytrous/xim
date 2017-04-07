import 'perfect-scrollbar/js/perfect-scrollbar.jquery.js'
import 'jquery-mousewheel';

declare const $: JQueryStatic;

$(document).ready(() => {

  $('.js-scroll').perfectScrollbar({
    theme: 'custom'
  });
});
