/* global google */

$(() => {

  var $navToggle = $('.nav-toggle');
  var $navMenu = $('.nav-menu');

  $navToggle.on('click', () => {
    $navMenu.toggleClass('is-active');
  });


  const $map = $('#map');
  const markers = [];

  function indexMap() {
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
    const userPoints = $map.data('points');

    console.log(userPoints);
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
          icon: '/assets/images/flash.png'
        });

        const address = device.ChargeDeviceLocation.Address.PostCode;
        const format = device.Connector[0].ConnectorType;
        const subscription = device.SubscriptionDetails;

        marker.addListener('click', () => {
          if(infoWindow) infoWindow.close();
          infoWindow.setContent(`
            <div class="infowindow">
            <h3>${device.ChargeDeviceName}</h3>
            <p>PostCode: ${address}</p>
            <p>Format: ${format}</p>
            <p>Subscription: ${subscription}</p>
            </div>
            `);
          infoWindow.open(map, marker);
        });

        markers.push(marker);

      });

      userPoints.forEach((point, i) => {

        setTimeout(() => {
          const marker = new google.maps.Marker({
            map: map,
            icon: {
              url: '/assets/images/001-technology.png',
              anchor: new google.maps.Point(16, 64),
              size: new google.maps.Size(64, 64),
              origin: new google.maps.Point(0, 0)
            },
            position: {
              lat: point.lat,
              lng: point.lng
            },
            title: point.pointName,
            animation: google.maps.Animation.BOUNCE
          });

          marker.addListener('click', () => window.location.replace(`/points/${point._id}`));
          markers.push(map, marker);
        }, 200 * i);

      });

    });

  }


  if($map.hasClass('markers')) indexMap();




  function privatePointsMap() {

    const latLng = { lat: 51.5152887, lng: -0.072099 };
    const map = new google.maps.Map($map[0], {
      zoom: 9,
      center: latLng,
      zoomControl: true,
      scaleControl: true,
      mapTypeControl: true
    });

    const marker = new google.maps.Marker({
      map: map,
      icon: {
        url: '/assets/images/001-technology.png',
        anchor: new google.maps.Point(16, 64),
        size: new google.maps.Size(64, 64),
        origin: new google.maps.Point(0, 0)
      },
      animation: google.maps.Animation.BOUNCE
    });
    google.maps.event.addListener(map, 'click', (event) => {
      const myLatLng = event.latLng;
      const lat = myLatLng.lat();
      const lng = myLatLng.lng();
      console.log('lat', lat);
      console.log('lng', lng);
      marker.setPosition(myLatLng);

      $('#lat').val(lat);
      $('#lng').val(lng);
    });
  }

  if($map.hasClass('private-point')) privatePointsMap();



  function privatePointsShowMap() {

    const myLatLng = $map.data('location');

    console.log(myLatLng);
    const map = new google.maps.Map($map[0], {
      zoom: 14,
      center: myLatLng,
      zoomControl: true,
      scaleControl: true,
      mapTypeControl: true
    });

    new google.maps.Marker({
      map: map,
      position: myLatLng,
      icon: {
        url: '/assets/images/001-technology.png',
        anchor: new google.maps.Point(16, 64),
        size: new google.maps.Size(64, 64),
        origin: new google.maps.Point(0, 0)
      },
      animation: google.maps.Animation.BOUNCE
    });

  }

  if($map.hasClass('private-point-show')) privatePointsShowMap();

});
