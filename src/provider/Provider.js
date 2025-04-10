import { AppContext, DataContext } from "../context/Context";
import { reducerApp, reducerData } from "../reducer/Reducer";
import { ACTIONS } from "../assets/js/types/types";
import React, { useReducer } from "react";

import { CONFIG } from "../assets/js/types/config";
import CookieManager from "../assets/js/types/cookieManager";


export function ProviderApp({ children }) {
    // initialisation du contexte
    let main_station = CookieManager.getCookie("main_station");

    const [state, dispatch] = useReducer(
        reducerApp,
        {
            main_station: main_station ? main_station : CONFIG.STATION,
            map: { zoom: CONFIG.ZOOM, cycles: true }
        });

    const api = {

        clear: function () {
            dispatch({ type: ACTIONS.CLEAR });
        },

        defineAsMain: function (station) {
            CookieManager.setCookie("main_station", station, 365);
            dispatch({ type: ACTIONS.DEFINE_AS_MAIN, station });
        },

        updateZoom: function (zoom) {
            dispatch({ type: ACTIONS.UPDATE_ZOOM, zoom });
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
    }

    return (
        <DataContext.Provider value={{ state, dispatch, api }}>{children}</DataContext.Provider>
    );
}