import React, { useEffect, useContext } from 'react'
import AppContext from '../context/AppContext';

function distance(a, b) {

    if (!b) {
        return 0
    }

    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(a[0] - b[0]);  // deg2rad below
    var dLon = deg2rad(a[1] - b[1]);
    var angle = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(a[0])) * Math.cos(deg2rad(b[0])) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(angle), Math.sqrt(1 - angle));
    var d = R * c;
    // distance in meters
    return d * 1000;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

function mapStation(station) {

    var bicycles_avail = station.num_bikes_available - station.num_ebikes_available;
    var docks_avail = station.num_docks_available;

    return 100 * bicycles_avail / (bicycles_avail + docks_avail)
}


async function computeGraph(pos) {

    const loadDataStations = new Promise((resolve, reject) => {

        Promise.all([
            fetch(`https://gbfs.velobixi.com/gbfs/fr/station_information.json`),
            fetch(`https://gbfs.velobixi.com/gbfs/fr/station_status.json`)])
            .then(res => Promise.all(res.map(r => r.json())))
            .then(res => Promise.all(res.map(r => r["data"]["stations"])))
            .then(stations => {
                resolve(stations[1]
                    .filter((info1, idx) => (distance([stations[0][idx].lat, stations[0][idx].lon], pos) < 500))
                    .filter(s => (s.num_bikes_available != 0 || s.num_docks_available != 0))
                    //.map(s => mapStation(s))
                    )
            });
    });


    let number_bicyles = 0
    let number_docks = 0

    loadDataStations.then(stations => {
        for (let station of stations) {
            number_bicyles += station.num_bikes_available - station.num_ebikes_available;
            number_docks += station.num_docks_available;
        }
    })

    let dico = { "0": 0, "100": 0 }
    await loadDataStations.then(stations => {
        for (let station of stations) {
            let val = mapStation(station)
            if (val in dico) {
                dico[val] += 1;
            } else {
                dico[val] = 1;
            }
        }
    })

    let listE = Object.entries(dico)
        .map(data => { return { 'key': +(data[0]), 'value': data[1] } })
        .sort((a, b) => { return (a.key < b.key) ? -1 : 1; });

    let xValues = listE.map(val => val.key)
    let cout = 0;
    let yValues = listE.map(val => { cout += val.value; return cout; })
                    .reverse()

    return {"xValues": xValues, "yValues": yValues, "bicycles": number_bicyles, "docks": number_docks}
}


function StationVisual({ station }) {

    let randId = Math.floor(Math.random() * 1000001);

    useEffect(() => {

        computeGraph(station ? station.pos : null).then((res) => {
            let xValues = res.xValues
            let yValues = res.yValues

            new Chart(`StationsChart${randId}`, {
                type: "line",
                data: {
                    labels: xValues,
                    datasets: [{
                        fill: false,
                        borderWidth: 2,
                        lineTension: 0.5,
                        borderColor: "rgba(0,0,255,0.8)",
                        data: yValues,
                        pointRadius: 0,
                    }],
                },
                options: {
                    animation: false, // delete initial animation
                    layout: { padding: 10 },
                    tooltips: { enabled: false },
                    legend: { display: false },
                    scales: {
                        yAxes: [{
                            suggestedMin: 0,
                            suggestedMax: 100,
                            ticks: {
                                display: false,
                            }
                        }],
                        xAxes: [{
                            suggestedMin: 0,
                            suggestedMax: 100,
                            ticks: {
                                display: false,
                            }
                        }]
                    }
                },
            })
        }, [])
    })

    return (
        <canvas id={`StationsChart${randId}`} width="100px" height="30px" style={{ maxWidth: "90%", alignSelf: "center" }}></canvas>
    );
}


function AllStationVisual() {
    return (
        <>
            <div>Dans tout le réseau : </div>
            <StationVisual/>
        </>
    );
}

function PartialStationVisual() {
    const { state } = useContext(AppContext);

    return (
        <>
            <div>A 500 m : </div>
            <StationVisual station={state.main_station} />
        </>
    );
}

export { AllStationVisual, PartialStationVisual };