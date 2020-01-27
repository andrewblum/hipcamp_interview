import React from 'react';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';

class App extends React.Component {

  async componentDidMount() {
    let response = await axios.get('/hi')
    console.log(response)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
            Can you see me world?
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
      </div>
    )
  }

}

export default App;
