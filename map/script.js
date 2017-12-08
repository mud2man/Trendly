var GOOGLEMAP_KEY = 'AIzaSyDcNzI1i6Gg6vXmuP5p4Zk198pgNHvef9I';
var globalPositiveLocations = [];
var globalNegativeLocations = [];
var usaCenetr = {lat: 40, lng: -98};

function createMarker(location, map, tweet, icon) {
  var marker = new google.maps.Marker({       
      position: location, 
      icon: icon,
      map: map
  });

  var infowindow = new google.maps.InfoWindow({
    content: tweet,
    maxWidth: 200
  });

  google.maps.event.addListener(marker, 'mouseover', function() { 
     infowindow.open(map, marker);
  }); 

  google.maps.event.addListener(marker, 'mouseout', function() {
    infowindow.close();
});
  return marker;  
}

function createMap(localPositiveLocations, localNegativeLocations) {
  console.log("Hello createMap");
  map = new google.maps.Map(document.getElementById('map'), {
    center: usaCenetr,
    zoom: 5
  });

  var markers = [];
  /* put positive marker */
  for(var i = 0; i < localPositiveLocations.length; ++i){
    markers.push(createMarker(localPositiveLocations[i].location, map, localPositiveLocations[i].tweet, 'greenMarker.png'));
  }

  /* put negative marker */
  for(var i = 0; i < localNegativeLocations.length; ++i){
    markers.push(createMarker(localNegativeLocations[i].location, map, localNegativeLocations[i].tweet, 'redMarker.png'));
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
  drawTrenMap([{location: {lat: 40.807, lng: -73.963}, tweet: "tweet0"}, {location: {lat: 39.807, lng: -73.963}, tweet: "tweet1"}], 
              [{location: {lat: 34.022, lng: -118.285}, tweet: "tweet2"}, {location: {lat: 35.022, lng: -118.285}, tweet: "tweet3"}]);
});
