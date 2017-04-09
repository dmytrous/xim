import 'perfect-scrollbar/js/perfect-scrollbar.jquery';
import 'jquery-mousewheel/jquery.mousewheel';
import GMap from './result/map/map';
import Accomodations from './result/accomodations/accomodations';
import AmentitiesFilter from './filter/filter';

$(document).ready(() => {

  let apartmentsArray;
  let gmap = new GMap();
  let accomodations = new Accomodations();
  let filtration;
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
      apartmentsArray = data;
      gmap.setMarkers(data);
      filtration = new AmentitiesFilter(data);
    });
  });

  $(document).on('filter:amentities', (event, data) => {
    gmap.setMarkers(data);
    accomodations.filter(data);
  });

  $(document).on('filter:clear', () => {
    gmap.setMarkers(apartmentsArray);
    accomodations.filterClear();
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
