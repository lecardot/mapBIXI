import React from 'react'
import { Marker, Popup } from 'react-leaflet'

var iconMarker = (aMarker, bMarker) => {
    return L.divIcon({
        className: 'custom-div-icon',
        html: `<div style='background-color:${aMarker.color}' class='marker-pin'></div>
        <div style='background-color:${bMarker.color}' class='circle-marker'></div>
        <i class='material-icons-outlined'>${aMarker.name}</i>`,
        iconSize: [30, 42],
        iconAnchor: [15, 42]
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

var bicyleIcon = (use, dispo, reverse = false) => {
    if (reverse) {
        return iconMarker(
            { "name": dispo == 0 ? "block" : "api", "color": red2green(dispo) },
            { "name": use == 0 ? "block" : "directions_bike", "color": red2green(use) });
    }

    return iconMarker(
        { "name": use == 0 ? "block" : "directions_bike", "color": red2green(use) },
        { "name": dispo == 0 ? "block" : "api", "color": red2green(dispo) });
}


function MarkerStation(props) {

    var station = props.station;

    return (
        <Marker
            position={station.pos}
            icon={bicyleIcon(station.bicycles_dispo, station.docks_dispo)}>
            <Popup>{station.name} - {station.bicycles_avail} Vélos - {station.docks_avail} Stations</Popup>
        </Marker>
    );
}

export default MarkerStation;