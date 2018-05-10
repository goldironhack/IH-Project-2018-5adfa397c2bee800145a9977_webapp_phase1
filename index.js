const API_KEY = "AIzaSyAmsoNWToucbKC9uArndPzSpqS15bITqTM";
var count2=1;
var count=0;
var ver;
var map;
var ny_coordinates = {lat:40.703092,lng:-73.989741};
var u_coordinates = {lat:40.7291,lng:-73.9965};
var u_marker;

function coloresRandom(){
  var color = ["#023fa5", "#7d87b9", "#bec1d4", "#d6bcc0", "#bb7784", "#8e063b", "#4a6fe3", "#8595e1", "#b5bbe3", "#e6afb9", "#e07b91", "#d33f6a", "#11c638", "#8dd593", "#c6dec7", "#ead3c6", "#f0b98d", "#ef9708", "#0fcfc0"];
  return color[Math.floor(Math.random()*color.length)];
}
function uMarker(){
  if (ver!=0) {
    u_marker = new google.maps.Marker({
      position: u_coordinates,
      map: map
    });

  }
  else if (ver==0) {
      u_marker.setMap(null);

  }
    count2=count2+1;
    ver=count2%2;

}

function districts() {
  if (count==0) {
    map.data.loadGeoJson('https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson');
    map.data.setStyle(function(feature) {
      var color = coloresRandom();
      return {
        fillColor: color,
        strokeWeight: 1
      };
    });
  }
  count=+1;
}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10.7,
    center: u_coordinates
  });

}

function markerEvents(marker) {
  if(marker!="undefined"){
    marker.addListener("click",function () {
      getRoute();
    });
  }
}

function getRoute() {
  var request = {
    origin: ny_marker.position,
    destination: bro_marker.position,
    travelMode: 'DRIVING'
  }
  directionsRenderer.setMap(map);
  directionsService.route(request, function(result,status){
    if(status=="OK"){
      directionsRenderer.setDirections(result);
    }
  })
}

$("document").ready(function(){
  $("#showU").on("click",uMarker)
  $("#showDistricts").on("click",districts)
});

/*function drawPolygon(polygon,color) {
  polygon = new google.maps.Polygon({
          paths: triangleCoords,
          strokeColor: color,
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: color,
          fillOpacity: 0.35
});
  polygon.setMap(map);
}*/
