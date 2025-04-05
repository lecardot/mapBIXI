function distance(a, b) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(a.lat - b.lat);  // deg2rad below
    var dLon = deg2rad(a.lon - b.lon);
    var angle = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(a.lat)) * Math.cos(deg2rad(b.lat)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(angle), Math.sqrt(1 - angle));
    var d = R * c;
    // distance in meters
    return d * 1000;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

var iconMarker = (aMarker, bMarker) => {
    return L.divIcon({
        className: 'custom-div-icon',
        html: `<div style='background-color:${aMarker.color}' class='marker-pin'></div>
        <div style='background-color:${bMarker.color}' class='circle-marker'></div>
        <i class='material-icons-outlined'>${aMarker.name}</i>`,
        iconSize: [30, 42],
        iconAnchor: [15, 42]
    });
}

var red2green = (perc) => {
    var r, g, b = 0;
    if (perc < 50) {
        r = 255;
        g = Math.round(5.1 * perc);
    }
    else {
        g = 255;
        r = Math.round(510 - 5.10 * perc);
    }
    var h = r * 0x10000 + g * 0x100 + b * 0x1;
    return '#' + ('000000' + h.toString(16)).slice(-6);
}

var bicyleIcon = (use, dispo, reverse=false) => {
    if (reverse) {
        return iconMarker( 
            {"name" : dispo == 0 ? "block" : "api", "color" : red2green(dispo)},
            {"name" : use == 0 ? "block" : "directions_bike", "color": red2green(use)});
    }
    
    return iconMarker( 
        {"name" : use == 0 ? "block" : "directions_bike", "color": red2green(use)}, 
        {"name" : dispo == 0 ? "block" : "api", "color" : red2green(dispo)});
    }

async function renderMap() {
    const map = L.map(document.querySelector(".map"));

    L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
    L.control.scale().addTo(map);

    map.setView(new L.LatLng(45.522575, -73.591757), 14);

    var stationsMarkers = new L.FeatureGroup();

    Promise.all([fetch(`https://gbfs.velobixi.com/gbfs/fr/station_information.json`), fetch(`https://gbfs.velobixi.com/gbfs/fr/station_status.json`)])
        .then(res => Promise.all(res.map(r => r.json())))
        .then(res => Promise.all(res.map(r => r["data"]["stations"])))
        .then(stations => {

            let len = stations[0].length;

            for (let i = 0; i < len; i++) {
                var station_info1 = stations[0][i];
                var station_info2 = stations[1][i];

                var capacity = station_info1.capacity;
                var bicyles_avail = station_info2.num_bikes_available - station_info2.num_ebikes_available;
                var bicycles_dispo = 100 * bicyles_avail / capacity;

                var docks_avail = station_info2.num_docks_available;
                var docks_dispo = 100 * docks_avail / capacity;

                stationsMarkers.addLayer(
                    L.marker([station_info1.lat, station_info1.lon],
                        { icon: bicyleIcon(bicycles_dispo, docks_dispo) })
                        .bindTooltip(station_info1.name + " - " + bicyles_avail + " vélos - " + docks_avail + " stations"))
            }
        })

    map.addLayer(stationsMarkers);

}

renderMap().catch(console.error)