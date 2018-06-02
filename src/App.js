import React, { Component } from 'react';
import './App.css';
import Viewer from './containers/Viewer';
import ViewerControlPanel from './containers/ViewerControlPanel';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btns: ['play', 'stop'],
      actions: [],
      selectValue: '',
      actionStatus: {},
    };
    this.threeRoot = React.createRef();
    this.canvas = React.createRef();
    this.viewer = null;
    this.currentAction = null;
    this.preparationListener = null;
    this.viewerRenderListener = null;
  }

  componentDidMount() {
    /* this.props.emitter.addListener('viewerPrepared', this.handleViewerPrepared);
    this.viewer = new ThreeViewer({
      root: this.threeRoot.current,
      canvas: this.canvas.current,
      emitter: this.props.emitter,
      // store: this.
    });
    this.viewer.initScene(); */
  }

  componentWillUnmount() {
    this.props.emitter.remove(this.preparationListener);
    this.resetActionStatus();
  }

  handleViewerPrepared = (data) => {
    let { actions } = data;
    // show panel
    this.updateSelect(actions);
    // select first action as default
    this.handleSelect(actions[0]._clip.name);
  }

  handleSliderChange = (value) => {
    this.setState((prevState) => {
      let status = Object.assign({}, prevState.actionStatus, { time: value });
      return {
        actionStatus: status
      };
    }, () => {
      this.currentAction.time = this.state.actionStatus.time;
    });
  }

  handleViewerRender = () => {
    this.setState((prevState) => {
      let status = Object.assign({}, prevState.actionStatus, { time: this.currentAction.time });

      return {
        actionStatus: status
      };
    });
  }

  handleMouseOver = () => {
    // turn off orbitControls
    this.viewer.toggleOrbitControls('off');
  }

  handleMouseOut = () => {
    // turn on orbitControls
    this.viewer.toggleOrbitControls('on');
  }

  settingsHandler = (key) => {
    switch (key) {
      case 'value':
        
        break;
    
      default:
        break;
    }
  }

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
