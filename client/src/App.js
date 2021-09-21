import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

import LHMap from './lhmap/LHMap'

function App() {
  //send new data
  return (
    <div className="App">
    <LHMap center = {[43.6532, -79.347015]}/>
    </div>
  );
}

export default App;
