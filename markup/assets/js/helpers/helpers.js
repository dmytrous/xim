define('helpers', () =>  {
  'use strict';
  /**
   * Helper for loading JSON from local/remote server
   * @param url {string}
   * @function {callback}
   * */
  function loadJSON(url, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', url, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
        callback(xobj.responseText);
      }
    };
    xobj.send(null);
  }
  module.exports.loadJSON = loadJSON;
});
