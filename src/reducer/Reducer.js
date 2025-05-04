import { ACTIONS } from "../assets/js/types/types"
import { CONFIG } from "../assets/js/types/config";

export function reducerApp(state, action) {

    switch (action.type) {
        // AppContext
        case ACTIONS.CLEAR:
            return { ...state, main_station_id: CONFIG.STATION_ID, map: {zoom: CONFIG.ZOOM}, mode: {mainStation: false, cycles: true, continu: true}}
        case ACTIONS.DEFINE_AS_MAIN:
            return { ...state, main_station_id: action.payload.id}
        case ACTIONS.DEFINE_AS_CURRENT:
            return { ...state, current_station_id: action.payload.id}
        case ACTIONS.DEFINE_AS_CURRENT:
            return { ...state, current_station_id: action.payload.id}
        case ACTIONS.UPDATE_ZOOM:
            return { ...state, map: {zoom: action.payload.zoom}}
        case ACTIONS.REVERSE_CYCLES_DOCKS:
            return { ...state,  mode: {
                mainStation: state.mode.mainStation, 
                cycles: !state.mode.cycles,
                continu: state.mode.continu
            }}
        case ACTIONS.REVERSE_DISCRET_CONTINU:
            return { ...state,  mode: {
                mainStation: state.mode.mainStation, 
                cycles: state.mode.cycles, 
                continu: !state.mode.continu
            }}
        case ACTIONS.REVERSE_MAIN_MODE:
            console.log("Action", action.payload.value)
            return { ...state, mode: {mainStation: typeof action.payload.value == "boolean" ? action.payload.value : !state.mode.mainStation, cycles: state.mode.cycles}}
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