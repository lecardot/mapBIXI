import { ACTIONS } from "../assets/js/types/types"
import { CONFIG } from "../assets/js/types/config";

export function reducerApp(state, action) {

    switch (action.type) {
        // AppContext
        case ACTIONS.CLEAR:
            return { ...state, main_station: CONFIG.STATION, map: {zoom: CONFIG.ZOOM, cycles: true}}
        case ACTIONS.DEFINE_AS_MAIN:
            return { ...state, main_station: action.station}
        case ACTIONS.UPDATE_ZOOM:
            return { ...state, map: {zoom: action.zoom, cycles: state.map.cycles} }
        case ACTIONS.REVERSE_CYCLES_DOCKS:
            return { ...state,  map: {zoom: state.map.zoom, cycles: !state.map.cycles} }
        default:
            return state;
        // DataContext
    }
}

export function reducerData(state, action) {

    switch (action.type) {
        // AppContext
        case ACTIONS.LOAD_DATA:
            return { ...state, data: action.data}
        default:
            return state;
    }
}