import React, { Component } from 'react';
import './App.css';
import Viewer from './containers/Viewer';
import ViewerControlPanel from './containers/ViewerControlPanel';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Viewer />
        <ViewerControlPanel />
      </div>
    );
  }
}

export default App;
