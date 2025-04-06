import React from 'react'
import { LayerGroup, GeoJSON } from 'react-leaflet'


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

function LayerRoads() {

    return (
        <LayerGroup>
            <GeoJSON data={} style={}></GeoJSON>
        </LayerGroup>

    );
}

export default LayerRoads;