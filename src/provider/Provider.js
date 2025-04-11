import { AppContext, DataContext } from "../context/Context";
import { reducerApp, reducerData } from "../reducer/Reducer";
import { ACTIONS } from "../assets/js/types/types";
import React, { useReducer } from "react";

import { CONFIG } from "../assets/js/types/config";
import CookieManager from "../assets/js/types/cookieManager";


export function ProviderApp({ children }) {
    // initialisation du contexte
    let main_station = CookieManager.getCookie("main_station");

    let main_station_id = (main_station && "id" in main_station) ? main_station.id : CONFIG.STATION_ID;

    const [state, dispatch] = useReducer(
        reducerApp,
        {
            main_station_id: main_station_id,
            current_station_id: null,
            map: { zoom: CONFIG.ZOOM, cycles: true }
        });

    const api = {

        clear: function () {
            dispatch({ type: ACTIONS.CLEAR });
        },

        defineAsMain: function (station) {
            CookieManager.setCookie("main_station", { id: station.id }, 365);
            dispatch({ type: ACTIONS.DEFINE_AS_MAIN, payload: { id: station.id } });
        },

        defineAsCurrent: function (station) {
            dispatch({ type: ACTIONS.DEFINE_AS_CURRENT, payload: { id: station ? station.id : null } });
        },

        clearCookies: function () {
            CookieManager.clear();
        },

        updateZoom: function (zoom) {
            dispatch({ type: ACTIONS.UPDATE_ZOOM, payload: { zoom: zoom } });
        },

        changeCyclesDocks: function () {
            dispatch({ type: ACTIONS.REVERSE_CYCLES_DOCKS });
        },
    }

    return (
        <AppContext.Provider value={{ state, dispatch, api }}>{children}</AppContext.Provider>
    );
}


function mapStation(info1, info2) {
    return {
        "name": info1.name,
        "id": info1.station_id,
        "pos": [info1.lat, info1.lon],
        "bicycles_avail": info2.num_bikes_available - info2.num_ebikes_available,
        "docks_avail": info2.num_docks_available
    }
}

const loadDataStations = new Promise((resolve, reject) => {
    Promise.all([
        fetch(`https://gbfs.velobixi.com/gbfs/fr/station_information.json`),
        fetch(`https://gbfs.velobixi.com/gbfs/fr/station_status.json`)])
        .then(res => Promise.all(res.map(r => r.json())))
        .then(res => Promise.all(res.map(r => r["data"]["stations"])))
        .then(stations => {
            resolve(stations[0]
                .map((s, idx) => mapStation(s, stations[1][idx]))
                .filter(s => (s.bicycles_avail != 0 || s.docks_avail != 0))
            )
        });
});


export function ProviderData({ children }) {

    const [state, dispatch] = useReducer(
        reducerData,
        {
            data: null
        });

    const api = {
        loadData: async function () {
            loadDataStations.then((data) => dispatch({ type: ACTIONS.LOAD_DATA, data }))
        },

        getStation: function (station_id) {
            if (state.data) {
                let start_idx = Math.min(state.data.length-1, station_id)
                for (let idx=start_idx; idx>=0; idx--) {
                    let station = state.data[idx]
                    if (station_id == station.id)
                        return station
                }
            } else {
                return null
            }
        }
    }

    return (
        <DataContext.Provider value={{ state, dispatch, api }}>{children}</DataContext.Provider>
    );
}