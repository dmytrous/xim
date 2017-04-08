/**
 * @name Gmap
 * @class This class for working with Google Maps
 **/

import loadGoogleMapsAPI from 'load-google-maps-api';
let MarkerClusterer = require('node-js-marker-clusterer');

export default class GMap {
  constructor() {
    this.markersArray = [];
    this.loadOptions = {
      key: 'AIzaSyDSUvoY93HWvuy8CT7Cr97NUj7VM7I3Hms',
      language: 'en',
    };
    this.clusteringOptions = {
      styles: [{
        url: './assets/img/plugins/gmap/cluster.png',
        width: 51,
        height: 51,
        textColor: 'white',
        textSize: 12,
      }]
    };
  }

  /**@method Google initialize
   * @name init
   * @param el {HTMLElement} id for display google map
   * @param options {Object} custom options
   * @returns {Promise}
   * */
  init(el, options) {
    return new Promise((resolve, reject) => {

      //Check for google maps options
      if (options == null || options == 'undefined') {
        console.log("You don't specify google maps options");
      }

      this.options = options || {};

      //Load Google Map and init with options
      loadGoogleMapsAPI(this.loadOptions).then((googleMap) => {
        this.googleMap = googleMap;

        //Init map
        this.map = new googleMap.Map(document.getElementById(el), this.options);
        resolve(this.map);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  /**@method Show markers on map
   * @name setMarkers
   * @param apartments {array} array of markers
   * */
  setMarkers(apartments) {

    //Async load RichMarker dependency
    require('static/js/plugins/gmap/richmarker');

    //Before make map clear
    if (this.markersArray.length) {
      this.clearMarkers();
    }

    //Prepare markers
    for (let i = 0; i < apartments.length; i++) {
      let apartment = apartments[i];
      let marker = new RichMarker({
        position: new this.googleMap.LatLng(
            apartment.lat,
            apartment.lng
        ),
        content: `<div class="gmap-marker"><div class="gmap-marker__price">€${apartment.price}</div></div>`,
        opacity: 0,
        shadow: 'none',
      });
      this.markersArray.push(marker);
    }

    this.showMarkers();
    this.clusteringMap();
  }

  /**@method Attach markers to map
   * @name showMarkers
   * */
  showMarkers() {
    for (let i = 0; i < this.markersArray.length; i++) {
      this.markersArray[i].setMap(this.map);
    }
  }

  /**@method Delete markers from map
   * @name clearMarkers
   * */
  clearMarkers() {
    if (!this.markersArray.length) { return; }

    for (let i = 0; i < this.markersArray.length; i++) {
      this.markersArray[i].setMap(null);
      this.markerCluster.clearMarkers();
    }

    this.markersArray = [];
  }

  /**@method Clustering map with MarkerClusterer
   * @name clusteringMap
   * */
  clusteringMap() {
    this.markerCluster = new MarkerClusterer(this.map, this.markersArray, this.clusteringOptions);
    this.markerCluster.fitMapToMarkers();
  }
}

//  TODO: fix google maps styles
