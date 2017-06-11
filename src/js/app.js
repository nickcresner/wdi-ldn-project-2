$(() => {

  console.log('JS Loaded');

  function initMap() {
    const lat = 51.5073;
    const lng = -0.1276;
    const latLng = { lat: parseFloat(lat), lng: parseFloat(lng) };

    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 9,
      center: latLng,
      zoomControl: true,
      scaleControl: true,
      mapTypeControl: true
    });

    new google.maps.Marker({
      map: map,
      position: latLng
    });
  }

  const $publicChargePoint = $('.publicChargePoint');

  function getPublicChargePoints() {
    $.get('http://chargepoints.dft.gov.uk/api/retrieve/registry/format/json')
    .then((results) => {
      $publicChargePoint.empty();

      for (let i=0; i < results.length; i++) {
        const chargeDevice = results[i].ChargeDevice;
        console.log(chargeDevice);
        chargeDevice.forEach((object) => {
          if(object['key'] === 'ChargeDeviceName') ChargeDeviceName = object.value;
            ChargeDeviceLocation.forEach((object) => {
              if(object['key'] === 'Latitude') Latitude = object.value;
              if(object['key'] === 'Longitude') Longitude = object.value;
            });
        });
  //   if(object['key'] === 'NbEmptyDocks') freeSpaces = object.value
  // }
      }
    });
  }

  getPublicChargePoints();
  initMap();

});
