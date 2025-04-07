import TextTools from "../assets/js/tools/textTools";

function Station(props) {

    let station = props.station;

    return (
        <div style={{ textAlign: "center" }}>
            <div>{TextTools.extractNameStation(station.name)}</div>
            <div>{`${station.bicycles_avail} vélos / ${station.docks_avail} stations`}</div>
        </div>
    );
}

export default Station;