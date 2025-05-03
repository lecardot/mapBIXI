import React from 'react';
import { Tooltip } from 'react-leaflet';

function htmlTooltipName(station) {
    if (station.name.length > 42) {
        
        if (station.name.includes("(")) {
            station.name = station.name.slice(0, station.name.lastIndexOf('('))
        } else {
            station.name = station.name.substring(0, 42) + '...';
        }
    }
    return `<div class="tooltip_name">${station.name[0].toUpperCase() + station.name.slice(1)}</div>`;
}

function htmlTooltipDispo(station) {
    return `
    <div class="tooltip_info">${station.bicycles_avail} Vélos</div>
    <div class="tooltip_info">${station.docks_avail} Stations</div>`;
}

function TooltipStationLight({ station }) {

    return (
        <Tooltip permanent direction="bottom">
            <div dangerouslySetInnerHTML={{ __html: htmlTooltipName(station) }} />
        </Tooltip>
    )
}


function TooltipStationFull({ station }) {

    return (
        <Tooltip permanent direction="bottom">
            <div dangerouslySetInnerHTML={{ __html: htmlTooltipName(station) + htmlTooltipDispo(station) }} />
        </Tooltip>
    )
}



function TooltipStation({ station, zoomLevel }) {


    return (
        zoomLevel < 14 ? (
            <TooltipStationLight station={station} />
        ) : (
            <TooltipStationFull station={station} />
        )
    )
}

export default TooltipStation;