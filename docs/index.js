
function distance(a, b) {
    return 1000;
}

function clickAction(e, stations)
{
    for (var station of stations) {
        if (distance({lat: e.lat, lon: e.lon}, {lat: station.lat, lon: station.lon}) < 1000) {

        } else {

        }
    }
}


async function renderMap() {
    const map = L.map(document.querySelector(".map"), { 'worldCopyJump': true });

    L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
    L.control.scale().addTo(map);

    map.setView(new L.LatLng(45.522575, -73.591757), 14);

    await fetch(`https://gbfs.velobixi.com/gbfs/fr/station_information.json`)
        .then(res => res.json())
        .then(res => res["data"]["stations"])
        .then(stations => {
            for (var station of stations) {
                let latlng = L.marker([station.lat, station.lon]).addTo(map); // .on('click', (e) => clickAction(e, stations)).addTo(map);
                latlng.bindTooltip(station.name)
            }
        })
}

renderMap().catch(console.error)