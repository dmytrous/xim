let loadJSON = require('static/js/helpers/helpers').loadJSON;

$(document).ready(() => {
  let map;
  let mapStyle;
  let dataApartments;

  var styledMap = new google.maps.StyledMapType(mapStyle,
      {name: "Styled Map"});

  function initMap() {
    map = new google.maps.Map(document.getElementById('gmap'), {
      center: {lat: 41.393592, lng: 2.162570},
      zoom: 8,
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
      }
    });
    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');
  }

  $.getJSON('/data/apartments.json', (data) => {
    dataApartments = data;

    $.getJSON('/data/map.json', (data) => {
      mapStyle = data;
      console.log(mapStyle)
    });

    // window.initMap = initMap;
    initMap();
  });


});
