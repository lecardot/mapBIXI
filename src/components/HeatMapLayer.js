import React, { useContext } from 'react';
import { AppContext } from '../context/Context';

import { HeatmapLayer } from 'react-leaflet-heatmap-layer-v3';

function mapStation(station, bicycle) {
    return {
        X: station.pos[0],
        Y: station.pos[1],
        value: bicycle ? station.bicycles_dispo : station.docks_dispo,
    };
}

export function HeatMapStation(station) {
    return <div/>;
}

export default function LayerHeatMap({ children }) {

    let { state } = useContext(AppContext);
    let displayHeatMap = children[0].props.hidden
    let points = displayHeatMap ? children.map(station => mapStation(station.props.station, state.mode.cycles)).filter(station => station.value > 0): [];

    return (
        <HeatmapLayer
            gradient={{ 0:'white', 1:'green' }}
            max={2}
            rad
            points={points}
            longitudeExtractor={m => m.Y}
            latitudeExtractor={m => m.X}
            intensityExtractor={m => m.value}
            radius={20}
            opacity={0.9}
        />
    );
}