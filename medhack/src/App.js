import React, { Component } from 'react';
import './App.css';
// import Main from './components/Main/Main';
import Router from "./components/Router"


export const link = 'http://46.101.236.211:2222';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router/> 
      </div>
    );
  }
}

export default App;