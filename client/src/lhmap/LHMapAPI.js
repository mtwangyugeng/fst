export async function requestFishInfo (specie) {
    return await fetch('http://localhost:3000/fishinfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'Specie': specie
            })
        })
        
  }