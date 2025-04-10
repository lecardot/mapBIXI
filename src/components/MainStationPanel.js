import React, { useContext } from 'react'
import { AppContext } from '../context/Context'
import Station from './StationPanel'

function MainStationPanel() {
    const { state } = useContext(AppContext);

    return (
        <Station station={state.main_station}/>
    );
}

export default MainStationPanel;