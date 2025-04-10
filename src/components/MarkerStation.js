import React, { useContext } from 'react'
import { Marker, Tooltip } from 'react-leaflet'

import "leaflet-contextmenu";
import "leaflet-contextmenu/dist/leaflet.contextmenu.css";

import { AppContext } from '../context/Context'

var iconDetailsMarker = (aMarker, bMarker) => {
    return L.divIcon({
        className: 'custom-div-icon',
        html: `<div style='background-color:${aMarker.color}' class='marker-pin'></div>
        <div style='background-color:${bMarker.color}' class='circle-marker '></div>
        <i class='material-icons-outlined'>${aMarker.name}</i>`,
        iconSize:   [30, 42],
        iconAnchor: [15, 42]
    });
}

var iconSimpleMarker = (aMarker, bMarker) => {
    return L.divIcon({
        className: 'custom-div-icon',
        html: `<div style='background-color:${aMarker.color}' class='marker-simple-pin'>`,
        iconSize: [10, 10],
        iconAnchor: [5, 5]
    });
}

var red2green = (perc) => {
    var r, g, b = 0;
    if (perc < 50) {
        r = 255;
        g = Math.round(5.1 * perc);
    }
    else {
        g = 255;
        r = Math.round(510 - 5.10 * perc);
    }
    var h = r * 0x10000 + g * 0x100 + b * 0x1;
    return '#' + ('000000' + h.toString(16)).slice(-6);
}

var bicyleIcon = (use, dispo, zoomLevel, reverse = false) => {

    if (zoomLevel < 14) {

        if (!reverse) {
            return iconSimpleMarker(
                { "name": dispo == 0 ? "block" : "api", "color": red2green(dispo) },
                { "name": use == 0 ? "block" : "directions_bike", "color": red2green(use) }
            );
        }

        return iconSimpleMarker(
            { "name": use == 0 ? "block" : "directions_bike", "color": red2green(use) },
            { "name": dispo == 0 ? "block" : "api", "color": red2green(dispo) }
        );
    }

    if (!reverse) {
        return iconDetailsMarker(
            { "name": dispo == 0 ? "block" : "api", "color": red2green(dispo) },
            { "name": use == 0 ? "block" : "directions_bike", "color": red2green(use) }
        );
    }

    return iconDetailsMarker(
        { "name": use == 0 ? "block" : "directions_bike", "color": red2green(use) },
        { "name": dispo == 0 ? "block" : "api", "color": red2green(dispo) }
    );
}


function MarkerStation(props) {

    const { state, api } = useContext(AppContext);
    var station = props.station;
    var zoomLevel = state.map.zoom;

    var icon = bicyleIcon(station.bicycles_dispo, station.docks_dispo, zoomLevel, state.map.cycles)

    return (
        <Marker
        contextmenu={true}
            contextmenuItems={[
                { icon: 'https://cdn-icons-png.flaticon.com/512/3648/3648601.png',
                    text: 'Définir comme station principale', 
                    callback: () => { api.defineAsMain(station) }},
                { separator: true },
                { icon: 'https://cdn-icons-png.flaticon.com/512/5397/5397463.png', 
                    text: `Définir les ${state.map.cycles ? "vélos" : "stations"} comme principa${state.map.cycles ? "ux" : "les"}`, 
                    callback: () => api.changeCyclesDocks()}
            ]}
            position={station.pos}
            icon={icon}
        >
            <Tooltip>{station.name} {zoomLevel < 14 ? "" : `- ${station.bicycles_avail} Vélos - ${station.docks_avail} Stations`}</Tooltip>
        </Marker>
    );
}

export default MarkerStation;