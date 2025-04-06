import React from 'react'
import AppContext from '../context/AppContext'
import { MapContainer, TileLayer, ScaleControl } from 'react-leaflet'

import LayerMarkers from '../components/LayerMarkers';

function Map() {

    return (
        <MapContainer center={[45.522575, -73.591757]} zoom={14} style={{ height: "100vh", width: "100vw" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <ScaleControl position="bottomright" />
            <LayerMarkers /> 
        </MapContainer>
    );
}

export default Map;