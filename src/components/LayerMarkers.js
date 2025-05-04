import React, { useContext } from 'react'
import { LayerGroup } from 'react-leaflet'
import { AppContext, DataContext } from '../context/Context';

import LayerHeatMap, { HeatMapStation } from '../components/HeatMapLayer';
import MarkerStation from './MarkerStation';

function mapStation(station) {
    return {
        pos: station.pos,
        bicycles_avail: station.bicycles_avail,
        docks_avail: station.docks_avail,
        bicycles_dispo: 100 * station.bicycles_avail / (station.bicycles_avail + station.docks_avail),
        docks_dispo: 100 * station.docks_avail / (station.bicycles_avail + station.docks_avail),
        name: station.name,
        id: station.id,
    };
}

function LayerMarkers() {

    let appContext = useContext(AppContext);
    let { state } = useContext(DataContext);
    let data = state.data ? state.data.map(station => mapStation(station)) : [];

    let displayHeatMap = appContext.state.mode.continu && (appContext.state.map.zoom < 14);

    return (
        <>
            <LayerHeatMap>
                {data.map((station, key) => { return (<HeatMapStation key={key} station={station} hidden={displayHeatMap} />) })}
            </LayerHeatMap>
            <LayerGroup>
                {data.map((station, key) => { return (<MarkerStation key={key} station={station} hidden={!displayHeatMap} />) })}
            </LayerGroup>
        </>
    );
}

export default LayerMarkers;