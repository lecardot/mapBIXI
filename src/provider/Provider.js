import AppContext from "../context/AppContext";
import reducer from "../reducer/Reducer";
import { ACTIONS } from "../assets/js/types/types";
import React, { useReducer } from "react";

import { CONFIG } from "../assets/js/types/config";
import CookieManager from "../assets/js/types/cookieManager";

function Provider({ children }) {
    // initialisation du contexte
    let main_station = CookieManager.getCookie("main_station");

    const [state, dispatch] = useReducer(
        reducer, 
        { 
            main_station: main_station? main_station : CONFIG.STATION,
            map: {zoom: CONFIG.ZOOM, cycles: true}
        });

    const api = {

        clear: function () {
            dispatch({ type: ACTIONS.CLEAR })
        },

        defineAsMain: function (station) {
            CookieManager.setCookie("main_station", station, 365);
            console.log(station)
            dispatch({ type: ACTIONS.DEFINE_AS_MAIN, station})
        },

        updateZoom: function (zoom) {
            dispatch({ type: ACTIONS.UPDATE_ZOOM, zoom })
        },

        changeCyclesDocks: function () {
            dispatch({ type: ACTIONS.REVERSE_CYCLES_DOCKS })
        },
    }

    return (
        <AppContext.Provider value={{ state, dispatch, api }}>{children}</AppContext.Provider>
    );
}

export default Provider;