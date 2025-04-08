import React, { useContext } from 'react'
import AppContext from '../context/AppContext'
import { MapContainer, TileLayer, ScaleControl, ZoomControl, useMapEvents } from 'react-leaflet'

import LayerMarkers from '../components/LayerMarkers';
import { CONFIG } from '../assets/js/types/config';

/*
Recherche de la station la plus proche
function MyComponent() {
    const map = useMapEvents({
    mousemove: () => {
        map.locate()
      },
      locationfound: (location) => {
        console.log('location found:', location.latlng)
        api.defineCurrentPosition(location.latlng);
      },
    })
    return null
  }
    */
    
  
function Map() {

    const { state, api } = useContext(AppContext);

    function MapListener() {
        const map = useMapEvents({
            zoom: () => {
              api.updateZoom(map.getZoom());
              console.log('zoom:', map.getZoom())
            }
          })
          return null
        }

    let center = CONFIG.STATION.pos;
    if (state.main_station) {
        center = state.main_station.pos;
    } else if (state.map.cur_pos) {
        center = state.map.cur_pos; // ou à proximité
    }

    return (
        <MapContainer 
            center={center} 
            zoom={state.map.zoom} 
            style={{ height: "100vh", width: "100vw"}} 
            zoomControl={false}>
            <MapListener />
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <ScaleControl position="bottomright" />
            <ZoomControl position="topright" />
            <LayerMarkers />
        </MapContainer>
    );
}

export default Map;