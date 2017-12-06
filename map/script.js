var GOOGLEMAP_KEY = 'AIzaSyDcNzI1i6Gg6vXmuP5p4Zk198pgNHvef9I';
var globalPositiveLocations = [];
var globalNegativeLocations = [];
var usaCenetr = {lat: 40, lng: -98};

function createMap(localPositiveLocations, localNegativeLocations) {
  console.log("Hello createMap");
  map = new google.maps.Map(document.getElementById('map'), {
    center: usaCenetr,
    zoom: 5
  });

  var markers = [];
  /* put positive marker */
  for(var i = 0; i < localPositiveLocations.length; ++i){
    var marker = new google.maps.Marker({
      position: localPositiveLocations[i],
      icon: 'greenMarker.png',
      map: map
    });
    markers.push();
  }

  /* put negative marker */
  for(var i = 0; i < localNegativeLocations.length; ++i){
    var marker = new google.maps.Marker({
      position: localNegativeLocations[i],
      icon: 'redMarker.png',
      map: map
    });
    markers.push();
  }
}

function drawTrenMap(localPositiveLocations, localNegativeLocations) { 
  globalPositiveLocations = localPositiveLocations;
  globalNegativeLocations = localNegativeLocations;
  var url = "https://maps.googleapis.com/maps/api/js?key=";
  url += GOOGLEMAP_KEY;
  url += "&sensor=false&async=2&size=100x50&callback=loadGoogleMap";
  $.getScript(url, function(){}); 
}

function loadGoogleMap() {
   createMap(globalPositiveLocations, globalNegativeLocations);
}

$(document).ready(function() {
  console.log("Hello ready....");
  drawTrenMap([{lat: 40.807, lng: -73.963}, {lat: 39.807, lng: -73.963}], [{lat: 34.022, lng: -118.285}, {lat: 35.022, lng: -118.285}]);
});
