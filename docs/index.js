async function renderMap() {
    const map = L.map(document.querySelector(".map"), { 'worldCopyJump': true });

    L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
    L.control.scale().addTo(map);

    var pointYUL = new L.LatLng(45.4680288, -73.7276389);
    map.setView(pointYUL, 6);

    await fetch(`https://gbfs.velobixi.com/gbfs/fr/station_information.json`)
        .then(res => res.json())
        .then(res => {
            for (var station of res["data"]["stations"]) {
                L.marker([station.lat, station.lon]).addTo(map);
            }
        })
}

renderMap().catch(console.error)