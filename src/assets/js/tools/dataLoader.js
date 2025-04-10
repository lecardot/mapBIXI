


class dataLoader {

    







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

    let res = [];
    await loadDataStations.then(stations => {
        for (let station of stations) {
            var bicycles_avail = station.num_bikes_available - station.num_ebikes_available;
            var docks_avail = station.num_docks_available;
            res.push(100 * bicycles_avail / (bicycles_avail + docks_avail))
        }
    })

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

    return { "xValues": xValues, "yValues": yValues, "bicycles": number_bicyles, "docks": number_docks }
}