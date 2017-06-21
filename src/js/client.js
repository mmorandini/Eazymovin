$(init);

function init(){
  console.log('hello world');
  toggleViews();
}

function initMap() {
  var ga = {lat: 51.515113, lng: -0.072051};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: ga
  });
  $
  .get('https://localhost:3000/properties'|| 'https://serene-journey-60392.herokuapp.com/properties')
  .done(data => {
    console.log('data.length', data.length);
    for (var i = 0; i < data.length; i++) {
      console.log(data[i].coords, i);

      const lat = data[i].coords[0].lat;
      const long = data[i].coords[0].long;
      const marker = new google.maps.Marker({
        position: {lat: lat, lng: long },
        map: map
      });
    }
    
  });
}

function toggleViews(){
  $('#list-view-btn').on('click', () => {
    $('#map-view').toggleClass('hide');
    $('#list-view').toggleClass('hide');
    initMap();
  });
  $('#map-view-btn').on('click', () => {
    $('#map-view').toggleClass('hide');
    $('#list-view').toggleClass('hide');
    initMap();
  });
}
