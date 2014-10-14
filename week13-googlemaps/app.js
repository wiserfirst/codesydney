function initialize(lat, lng, msg) {

    if (isNaN(lat)) {
        lat = -33.85;
    }
    if (isNaN(lng)) {
        lng = 151.144;
    }
    if (!msg) {
        msg = "Hello world";
    }

    var myLatLng = new google.maps.LatLng(lat, lng);
    var mapOptions = {
        zoom: 11,
        center: myLatLng
    };

    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: msg
    });

    var infowindow = new google.maps.InfoWindow({
        content: msg
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
    });
}

//window.onload = loadScript;

$(function() {
    initialize();
    $("#location").submit(function() {
        var latitude = parseFloat($("#latitude").val());
        var longitude = parseFloat($("#longitude").val());
        initialize(latitude, longitude, $("#message").val().trim());
        console.log("location form submitted", latitude, longitude);
        event.preventDefault();
    });
});

