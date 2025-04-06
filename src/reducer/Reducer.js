import { ACTIONS } from "../assets/js/types/types"

export default function reducer(state, action) {

    switch (action.type) {
        case ACTIONS.CLEAR:
            return { ...state, id: "", article: ""}
        default:
            return state;
    }
}