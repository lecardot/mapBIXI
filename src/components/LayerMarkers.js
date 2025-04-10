import React, { useContext } from 'react'
import { LayerGroup } from 'react-leaflet'

import MarkerStation from './MarkerStation';
import { DataContext } from '../context/Context';

function mapStation(station) {
    return {
        pos: station.pos,
        bicycles_avail: station.bicycles_avail,
        docks_avail: station.docks_avail,
        bicycles_dispo: 100 * station.bicycles_avail / (station.bicycles_avail + station.docks_avail),
        docks_dispo: 100 * station.docks_avail / (station.bicycles_avail + station.docks_avail),
        name: station.name,
    };
}

function LayerMarkers() {

    let dataContext = useContext(DataContext)
    let data = dataContext.state.data ? dataContext.state.data.map(station => mapStation(station)) : [];

    return (
        <LayerGroup>
            {data.map((station, key) => { return(<MarkerStation key={key} station={station} />)})}
        </LayerGroup>

    );
}

export default LayerMarkers;