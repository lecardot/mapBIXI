import React from 'react';
import { Tooltip } from 'react-leaflet';

import TextTools from '../assets/js/tools/textTools';

function htmlTooltipName(station) {
    return `<div class="tooltip_name">${TextTools.extractNameStation(station.name, 42)}</div>`;
}

function htmlTooltipDispo(station) {
    return `
    <center>Disponibilité</center>
    <center>
    <i><i class="tooltip_info">${station.bicycles_avail}</i><i class='material-icons-outlined tooltip_icons'>directions_bike</i></i>
    <i><i class="tooltip_info">${station.docks_avail}</i><i class='material-icons-outlined tooltip_icons'>api</i></i>
    </center>`;
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