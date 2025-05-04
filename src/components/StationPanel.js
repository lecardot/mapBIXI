import React, { useContext } from "react";
import TextTools from "../assets/js/tools/textTools";
import { DataContext } from "../context/Context";


function Station({ station_id }) {

    let { api } = useContext(DataContext)
    let station = api.getStation(station_id);

    return (
        <div style={{ textAlign: "center" }}>
            {station ?
                <div className="mainStation_name">
                    <div>{TextTools.extractNameStation(station.name, 30)}</div>
                    <div>{`${station.bicycles_avail} vélos / ${station.docks_avail} stations`}</div>
                </div>
                :
                <></>
            }
        </div>
    );
}

export default Station;