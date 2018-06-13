import React, { Component } from 'react';
import './App.css';
import Viewer from './containers/Viewer';
import ViewerControlPanel from './containers/ViewerControlPanel';
import InspectorSider from './containers/InspectorSider';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Viewer />
        <ViewerControlPanel />
        <InspectorSider />
      </div>
    );
  }
}

export default App;