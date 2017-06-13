/* global google */

$(() => {


  const $map = $('#map');
  const markers = [];

  function initMap() {
    const lat = 51.5073;
    const lng = -0.1276;
    const latLng = { lat: parseFloat(lat), lng: parseFloat(lng) };

    const map = new google.maps.Map($map[0], {
      zoom: 9,
      center: latLng,
      zoomControl: true,
      scaleControl: true,
      mapTypeControl: true
    });

    const infoWindow = new google.maps.InfoWindow();

    $.ajax({
      url: '/publicPoints',
      method: 'GET'
    })
    .then((results) => {
      $map.removeClass('loading');
      results.ChargeDevice.forEach((device) => {

        const pointLatLng = {
          lat: parseFloat(device.ChargeDeviceLocation.Latitude),
          lng: parseFloat(device.ChargeDeviceLocation.Longitude)
        };

        const marker = new google.maps.Marker({
          map: map,
          position: pointLatLng,
          title: device.ChargeDeviceName,
          icon: '/assets/images/dot.svg'
        });

        const address = device.ChargeDeviceLocation.Address;
        const format = device.Connector.ConnectorType;
        const subscription = device.SubscriptionDetails;

        marker.addListener('click', () => {
          if(infoWindow) infoWindow.close();
          infoWindow.setContent(`
            <div class="infowindow">
            <h3>${device.ChargeDeviceName}</h3>
            <p>Address: ${address}</p>
            <p>Format: ${format}</p>
            <% if(${subscription !== null}) { %>
            <p>Subscription: ${subscription}</p>
            <% } %>
            </div>
          `);
          infoWindow.open(map, marker);
        });

        markers.push(marker);

      });
    });

  }


  if($map.hasClass('markers')) initMap();

  function privatePointsMap() {
    const $map = $('#map');
    const hasData = !$.isEmptyObject($map.data('location'));

    if(hasData) {
      const map = new google.maps.Map($map[0], {
        zoom: 9,
        center: $map.data('location'),
        zoomControl: true,
        scaleControl: true,
        mapTypeControl: true
      });

      new google.maps.Marker({
        map: map,
        position: $map.data('location')
      });
    }

  }
  if($map.hasClass('user-point')) privatePointsMap();

});
