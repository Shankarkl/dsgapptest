var TrafficMap = {

    latitude: -30,
    longitude: 25,
    zoom: 5,
    map: null,

    init: function (canvas) {
        if (canvas != null && canvas.length > 0) {

            var mapOptions = {
                center: new google.maps.LatLng(TrafficMap.latitude, TrafficMap.longitude),
                zoom: TrafficMap.zoom,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            this.map = new google.maps.Map(canvas[0], mapOptions);

            var trafficLayer = new google.maps.TrafficLayer();
            trafficLayer.setMap(this.map);

            var mapscope = this;

	/*
            NewsSite.Code.TrafficAjax.GetAllIncidents(function (res) {
                for (var i in res.value) {
                    var item = res.value[i];

                    var incidentLink = "<a href='" + item.IncidentUrl + "'>View Incident</a>";
                    var location = item.EndLocation ? item.EndLocation : item.BeginLocation ? item.BeginLocation : null;
                    if (location != null) {
                        mapscope.createMarker(
                            item.Town + " : " + item.Road + " : " + item.Direction,
                            item.Road + " : " + item.Direction,
                            item.Description,
                            item.IncidentType,
                            item.Severity,
                            incidentLink,
                            location.Latitude,
                            location.Longitude);
                    }
                }

            });
	*/
        }
    },

    createMarker: function (title, infotitle, description, type, severity, lnk, lat, lng) {
        var pos = new google.maps.LatLng(lat, lng);

        var marker = new google.maps.Marker({
            position: pos,
            map: this.map,
            animation: google.maps.Animation.DROP,
            title: title,
            icon: "/images/traffic/" + severity.replace("Level ", "") + "-dot.png"
        });

        var contentString = '<div id="content">' +
        '<div id="siteNotice"></div>' +
        '<h2 id="firstHeading" class="firstHeading">' + infotitle + '</h2>' +
        '<div id="bodyContent" style="min-height:150px;width:300px;">' +
        '<p><strong>Type: </strong>' + type + '</p>' +
        '<p><strong>Severity: </strong>' + severity + '</p>' +
        '<p>' + description.substring(0, (description.substring(0, 35).lastIndexOf(" "))) + '...</p>' +
        '<p>' + lnk.toString() + '</p>' +
        '</div>' +
        '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(this.map, marker);
        });
    }
};

