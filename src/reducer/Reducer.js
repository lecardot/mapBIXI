import { ACTIONS } from "../assets/js/types/types"
import { CONFIG } from "../assets/js/types/config";

export default function reducer(state, action) {

    switch (action.type) {
        case ACTIONS.CLEAR:
            return { ...state, main_station: {id: "", pos: []}, map: {zoom: CONFIG.ZOOM, cycles: true}}
        case ACTIONS.DEFINE_AS_MAIN:
            return { ...state, main_station: {id: action.id, pos: action.pos} }
        case ACTIONS.LOAD_MAIN:
                return { ...state, main_station: {id: action.id, pos: action.pos} }
        case ACTIONS.UPDATE_ZOOM:
            return { ...state, map: {zoom: action.zoom, cycles: state.map.cycles} }
        case ACTIONS.REVERSE_CYCLES_DOCKS:
            return { ...state,  map: {zoom: state.map.zoom, cycles: !state.map.cycles} }
        default:
            return state;
    }
}