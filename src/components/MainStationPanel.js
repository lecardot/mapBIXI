import React, { useContext } from 'react'
import { AppContext } from '../context/Context'
import Station from './StationPanel'

function MainStationPanel() {
    const { state } = useContext(AppContext);

    return (
        <Station station_id={state.main_station_id}/>
    );
}

export default MainStationPanel;