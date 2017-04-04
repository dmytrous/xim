import loadGoogleMapsAPI from 'load-google-maps-api';

$(document).ready(() => {
  let map;
  let dataApartments;
  let loadOptions = {
    key: 'AIzaSyDSUvoY93HWvuy8CT7Cr97NUj7VM7I3Hms',
    language: 'en'
  };
  let mapOptions = {
    center: {lat: 41.393592, lng: 2.162570},
    zoom: 8
  };

  /**Google maps load then init
   * @param options {object}
   * */
  loadGoogleMapsAPI(loadOptions).then((googleMaps) => {

    /**Load apartmenrs data json
     * @param url {string}
     * */
    $.getJSON('/data/apartments.json', (data) => {
      dataApartments = data;

      /**Load map styles data json
       * @param url {string}
       * */
      $.getJSON('/data/map.json', (data) => {
        mapOptions.styles = data;

        /**Initialize map
         * @param el {object} en HTMLElement where map will appear
         * @param options {object} google maps standart options
         * */

        map = new googleMaps.Map(document.getElementById('gmap'), mapOptions);
      });


    }).catch((err) => {
      console.error(err);
    });
  });

});
