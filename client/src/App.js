import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

import LHMap from './lhmap/LHMap'

function App() {
  const [alldata, setAlldata] = useState('');
  const [mystat, setMystat] = useState('');

  //get all data
  const ccc = () => {
      fetch('http://localhost:3000/alldata').then((v) => {
      if(v.ok){
        return v
      }else {
        throw new Error('no response from server');
      }
    }).then((v)=>v.text())
      .then(data => setAlldata(data))
      .catch((error) => {
        setMystat(' no response from server')
      });
  }
  ccc()

  //send new data
  const ppp = () =>{
    fetch('http://localhost:3000/popo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'Specie': document.getElementById('Specie').value,
                'Size': document.getElementById('Size').value,
                'Lat': document.getElementById('Lat').value,
                'Lng': document.getElementById('Lng').value    
            })
        })
                    .then((v)=>v.text())
                    .then(data => document.getElementById('stat').innerHTML = data )
  }
  return (
    <div className="App">
        <textarea id = 'Specie' placeholder = 'Specie'></textarea>
        <textarea id = 'Size' placeholder = 'Size'></textarea>
        <textarea id = 'Lat' placeholder = 'Lat'></textarea>
        <textarea id = 'Lng' placeholder = 'Lng'></textarea>
        <button id='pr' onClick = {ppp}>send data</button>
        <button id='sr' onClick = {ccc}>request data</button>
    <div id="stat">{mystat}</div>
    <LHMap data = {alldata}/>
    </div>
  );
}

export default App;
