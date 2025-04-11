import React, { useContext } from 'react'
import { AppContext, DataContext } from '../context/Context'

import ViolinShape from './ViolinShape';

function distance(a, b) {

    if (!b)
        return 0

    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(a[0] - b[0]);  // deg2rad below
    var dLon = deg2rad(a[1] - b[1]);
    
    var angle = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(a[0])) * Math.cos(deg2rad(b[0])) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(angle), Math.sqrt(1 - angle));
    var d = R * c;
    // distance in meters
    return d * 1000;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

function mapStation(station) {
    return 100 * station.bicycles_avail / (station.bicycles_avail + station.docks_avail)
}

function StationVisual({ main_id, current_id, dist }) {

    let dataContext = useContext(DataContext);
    let main_station = dataContext.api.getStation(main_id)
    let current_station = dataContext.api.getStation(current_id)
    let dataFilter = []
    let bicycles_avail = 0;
    let docks_avail = 0;
    let currentIsPresent = false;

    if (dataContext.state.data && main_station) {
        dataFilter = dataContext.state.data
            .filter(s => (distance(s.pos, main_station.pos) < dist))
            .map(s => {
                bicycles_avail += s.bicycles_avail;
                docks_avail += s.docks_avail;
                currentIsPresent ||= (s.id == current_id);
                return mapStation(s);
            })
    }

    let current_value = (current_station && currentIsPresent) ? mapStation(current_station) : null;

    return (
        <>
            <div style={{ textAlign: "center" }}>
                {`${bicycles_avail} vélos / ${docks_avail} stations`}
            </div>
            <ViolinShape
                main_data={current_value}
                data={dataFilter}
                binNumber={Math.sqrt(dataFilter.length)}
            />
        </>
    )
}


function AllStationVisual() {
    const { state } = useContext(AppContext);

    return (
        <>
            <div>Dans tout le réseau : </div>
            <StationVisual
                main_id={state.main_station_id}
                current_id={state.current_station_id}
                dist={Infinity}
            />
        </>
    );
}


function PartialStationVisual() {
    const { state } = useContext(AppContext);
    const dist = 500;

    return (
        <>
            <div>{`À ${dist} m :`}</div>
            <StationVisual
                main_id={state.main_station_id}
                current_id={state.current_station_id}
                dist={dist}
            />
        </>
    );
}

export { AllStationVisual, PartialStationVisual };