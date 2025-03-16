// frontend/src/App.js

import React from 'react';
import TestData from './components/TestData';
import EconomicChart from './components/EconomicChart';

function App() {
  return (
    <div className="App">
      <h1>Welcome to Econosphere</h1>
      <TestData />
      <EconomicChart />
    </div>
  );
}

export default App;
