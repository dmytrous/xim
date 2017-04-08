import 'perfect-scrollbar/js/perfect-scrollbar.jquery';
import 'jquery-mousewheel/jquery.mousewheel';
import GMap from './result/map/map';

$(document).ready(() => {

  let gmap = new GMap();
  let mapOptions = {
    zoom: 8,
  };

  /**Load map styles data json
   * @param url {string}
   * */
  $.getJSON('./data/map.json', { async: false }, (data) => {
    mapOptions.styles = data;
  }).fail((err) => {
    console.log(err);
  });

  gmap.init('gmap', mapOptions).then((data) => {
    $.getJSON('./data/apartments.json', (data) => {
      gmap.setMarkers(data);
    });
  });

  /** Enable nested scrolling only on large devices
   * */
  if ($(window).width() > 1024) {
    $('.js-scroll').perfectScrollbar({
      theme: 'custom',
    });
  }

  /** Collapse all bootstrap entities on tablet and mobile
   * */
  if ($(window).width() <= 1024) {
    $('.collapse').collapse('hide');
  }
});
