import React, { useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import { people } from './peopleConstants';
import EditablePersonGrid from './EditableGrid';


function App() {
  const gridRef = useRef(null);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <EditablePersonGrid ref={gridRef} people={people} />
    </div>
  );
}

export default App;
