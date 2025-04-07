import React, { useContext } from 'react'
import AppContext from '../context/AppContext'
import StationPanel from './StationPanel'

function MainStationPanel() {
    const { state } = useContext(AppContext);

    return (
        <StationPanel station={state.main_station}/>
    );
}

export default MainStationPanel;