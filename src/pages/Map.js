import React, { useContext, useState, useEffect } from 'react'
import { AppContext, DataContext } from '../context/Context'
import { MapContainer, TileLayer, ScaleControl, ZoomControl, useMapEvents, LayersControl } from 'react-leaflet'

import sideBySide from 'leaflet-side-by-side';
import LayerMarkers from '../components/LayerMarkers';
import { marker } from 'leaflet';

/*
Recherche de la station la plus proche
function MyComponent() {
    const map = useMapEvents({s
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
    const dataContext = useContext(DataContext);
    const [map, setMap] = useState();

    var osmLayer = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png');
    var stamenLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png');

    useEffect(() => {
        if (map) {
            osmLayer.addTo(map);
            stamenLayer.addTo(map);
            L.control.sideBySide(osmLayer, stamenLayer).addTo(map);
        }
    }, [map])

    function MapListener() {
        useMapEvents({
            zoom: () => api.updateZoom(map.getZoom())
        })
    }

    let station_id = state.main_station_id;
    // if (state.map.cur_pos) {
    //     station_id = state.map; // ou à proximité
    // }

    let station = dataContext.api.getStation(station_id);

    return (
        station ?
            <MapContainer
                ref={setMap}
                center={station.pos}
                zoom={state.map.zoom}
                style={{ height: "100vh", width: "100vw" }}
                zoomControl={false}
            >
                <MapListener />
                <LayerMarkers />
                <ScaleControl position="bottomright" />
                <ZoomControl position="topright" />
            </MapContainer>
            :
            <></>
    );
}

export default Map;