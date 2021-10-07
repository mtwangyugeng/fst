function checkResponse(response, function_name) {
    if(response.ok){
        return response
    }else {
        throw new Error(function_name + ': no response from server');
    }
}

export async function requestFishInfo(specie) {
    return await fetch('http://localhost:3000/fishinfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'Specie': specie
            })
        })
        .then((v) => checkResponse(v, 'requestFishInfo'))
}

export async function requestAllLocations() {
    return await fetch('http://localhost:3000/AllLocations')
    .then((v) => checkResponse(v, 'requestAllLocations'))
}

export async function postNewLocation(name, lat, lng, description){
    return await fetch('http://localhost:3000/postNewLocation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'Name': name,
                'Lat': lat,
                'Lng': lng,
                'Description': description
            })
        })
        .then((v) => checkResponse(v, 'postNewLocation'))
}

export async function postNewFishLocal(specie_id, size, location_id, date, note){
    return await fetch('http://localhost:3000/popo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'SpecieID': specie_id,
                'Size': size,
                'LocationID': location_id,
                'Date': date,
                'Note': note
            })
        })
        .then((v) => checkResponse(v, 'postNewFishLocal'))
}

export async function requestAllFishlocals(){
    return await fetch('http://localhost:3000/FishLocal')
        .then((v) => checkResponse(v, 'requestAllFishlocals'))
}