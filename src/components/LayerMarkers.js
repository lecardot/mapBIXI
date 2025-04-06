import React from 'react'
import AppContext from '../context/AppContext'
import { LayerGroup } from 'react-leaflet'

import MarkerStation from './MarkerStation';

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


function mapStation(station_info1, station_info2) {

    var capacity = station_info1.capacity;
    var bicycles_avail = station_info2.num_bikes_available - station_info2.num_ebikes_available;
    var bicycles_dispo = 100 * bicycles_avail / capacity;

    var docks_avail = station_info2.num_docks_available;
    var docks_dispo = 100 * docks_avail / capacity;

    return {
        pos: [station_info1.lat, station_info1.lon],
        bicycles_avail: bicycles_avail,
        docks_avail: docks_avail,
        bicycles_dispo: bicycles_dispo,
        docks_dispo: docks_dispo,
        name: station_info1.name
    };
}

const loadDataStations = new Promise((resolve, reject) => {
    Promise.all([
        fetch(`https://gbfs.velobixi.com/gbfs/fr/station_information.json`),
        fetch(`https://gbfs.velobixi.com/gbfs/fr/station_status.json`)])
        .then(res => Promise.all(res.map(r => r.json())))
        .then(res => Promise.all(res.map(r => r["data"]["stations"])))
        .then(stations => {
            resolve(stations[0].map((info1, idx) => mapStation(info1, stations[1][idx])))
        });
});

let data = await loadDataStations.then(stations => { return stations })

function LayerMarkers() {

    return (
        <LayerGroup>
            {data.map(station => { return(<MarkerStation station={station} />)})}
        </LayerGroup>

    );
}

export default LayerMarkers;