$(init);




function init(){
  initMap();
  console.log('hello world');

  // Check if you are on the right page...

}

function initMap() {
  var ga = {lat: 51.515113, lng: -0.072051};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: ga
  });
  $.get('http://localhost:3000/properties')
  .done(data => {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      const lat = data[i].coords[0].lat;
      const long = data[i].coords[0].long;
      const marker = new google.maps.Marker({
        position: {lat: lat, lng: long },
        map: map
      });
    }

  });
}
