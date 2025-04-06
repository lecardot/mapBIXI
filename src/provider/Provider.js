import AppContext from "../context/AppContext";
import reducer from "../reducer/Reducer";
import { ACTIONS } from "../assets/js/types/types";
import React, { useReducer } from "react";

function Provider({ children }) {
    // initialisation du contexte
    const [state, dispatch] = useReducer(reducer, { id: "", article: ""});

    const api = {

        clear: function () {
            dispatch({ type: ACTIONS.CLEAR })
        }
    }

    return (
        <AppContext.Provider value={{ state, dispatch, api }}>{children}</AppContext.Provider>
    );
}

export default Provider;