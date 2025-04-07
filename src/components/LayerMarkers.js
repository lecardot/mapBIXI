import React from 'react'
import { LayerGroup } from 'react-leaflet'

import MarkerStation from './MarkerStation';




function mapStation(station_info1, station_info2) {

    var bicycles_avail = station_info2.num_bikes_available - station_info2.num_ebikes_available;
    var docks_avail = station_info2.num_docks_available;

    return {
        pos: [station_info1.lat, station_info1.lon],
        bicycles_avail: bicycles_avail,
        docks_avail: docks_avail,
        bicycles_dispo: 100 * bicycles_avail / (bicycles_avail + docks_avail),
        docks_dispo: 100 * docks_avail / (bicycles_avail + docks_avail),
        name: station_info1.name,
        id: station_info1.station_id - 1,
    };
}

const loadDataStations = new Promise((resolve, reject) => {
    Promise.all([
        fetch(`https://gbfs.velobixi.com/gbfs/fr/station_information.json`),
        fetch(`https://gbfs.velobixi.com/gbfs/fr/station_status.json`)])
        .then(res => Promise.all(res.map(r => r.json())))
        .then(res => Promise.all(res.map(r => r["data"]["stations"])))
        .then(stations => {
            resolve(stations[0]
                .map((info1, idx) => mapStation(info1, stations[1][idx]))
                .filter(s => (s.bicycles_avail != 0 || s.docks_avail != 0)));
        });
});

let data = await loadDataStations.then(stations => { return stations })

function LayerMarkers() {

    return (
        <LayerGroup>
            {data.map((station, key) => { return(<MarkerStation key={key} station={station} />)})}
        </LayerGroup>

    );
}

export default LayerMarkers;