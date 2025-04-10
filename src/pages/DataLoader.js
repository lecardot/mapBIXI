import { DataContext } from "../context/Context";
import { useContext, useEffect } from "react";


function DataLoader () {

    const dataContext  = useContext(DataContext);

    useEffect(() => {
        dataContext.api.loadData();
    }, [])

    return (<></>)
}

export default DataLoader;