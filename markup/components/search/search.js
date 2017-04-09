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
    center: { lat: 41.393592, lng: 2.162570 },
    zoom: 8,
  };
  let $searchResultContainer = $('.js-search-result');

  /**Initialize map
   * @param map {string} ID of HTMLElement where map will displaying
   * @param mapOptions {Object} Google Map options
   * */
  gmap.init('gmap', mapOptions).then((data) => {
    $.getJSON('./data/apartments.json', (data) => {
      apartmentsArray = data;
      gmap.setMarkers(data);
      filtration = new AmentitiesFilter(data);
    });
  });

  /** Displaying filtering results
   * */
  $(document).on('filter:amentities', (event, data) => {
    gmap.setMarkers(data);
    accomodations.filterClear();
    accomodations.filter(data);
    $searchResultContainer.removeClass('_disabled');
  });

  /** Clear filtering results
   * */
  $(document).on('filter:clear', () => {
    gmap.setMarkers(apartmentsArray);
    accomodations.filterClear();
  });

  /** If not results display attention
   * */
  $(document).on('filter:no-result', () => {
    $searchResultContainer.addClass('_disabled');
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
