import React, { Component } from 'react';
import './App.css';
import ThreeViewer from './ThreeViewer';
import { Button, Select, Slider, Row, Col, Icon, Dropdown, Menu, Switch } from 'antd';
import MenuButton from './MenuButton';

const Option = Select.Option;
const { SubMenu, Item } = Menu;

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
    this.props.emitter.addListener('viewerPrepared', this.handleViewerPrepared);
    this.viewer = new ThreeViewer({
      root: this.threeRoot.current,
      canvas: this.canvas.current,
      emitter: this.props.emitter,
    });
    this.viewer.initScene();
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

  updateSelect(actions) {
    let acts = [...actions];

    this.setState({
      actions: acts
    });
  }

  handleBtnClick = (key) => {
    let btns = this.state.btns.slice(0);
    let action = this.currentAction;

    switch (key) {
      case 'play':
        btns[0] = 'pause';
        action.paused = false;
        action.play();
        break;
      case 'pause':
        btns[0] = 'play';
        action.paused = true;
        break;
      case 'stop':
        action.stop();
        if (btns[0] === 'pause') {
          btns[0] = 'play';
        }
        break;
    }
    this.setState({
      btns: btns,
    });
  }

  handleSelect = (value) => {
    let action = this.state.actions.find((act) => {
      if (act._clip.name === value) {
        return act;
      }
    });
    let prevAction = this.currentAction;
    let btns = this.state.btns.slice(0);

    btns[0] = 'play';
    // should not use state to maintain the value, when deep cloning action to update state, connection between animation and mixer will loose.
    this.currentAction = action;
    this.setState({
      selectValue: value,
      actionStatus: {
        time: this.currentAction.time,
        duration: this.currentAction._clip.duration,
      },
      btns: btns,
    }, () => {
      if (prevAction) {
        prevAction.stop();
      }
      this.resetActionStatus();
      this.props.emitter.addListener('viewerRendering', this.handleViewerRender);
    });

  }

  resetActionStatus() {
    this.props.emitter.removeListener('viewerRendering', this.handleViewerRender);
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

  toggleFrame = (key) => {
    // control frame detector
    this.viewer.toggleStats(key);
  }

  render() {
    let select, opts, btns, slider;

    if (this.state.actions.length > 0) {
      opts = this.state.actions.map((action) => {
        let clip = action._clip;

        return <Option key={clip.name}>{clip.name}</Option>
      });
      select = <Col span={4}>select animation<Select className="select" value={this.state.selectValue} onSelect={this.handleSelect}>{opts}</Select></Col>;
      btns = this.state.btns.map((btn) => {
        return (<Col key={btn} span={2}><Button className="btn" type="primary" onClick={() => { this.handleBtnClick(btn); }}>{btn}</Button></Col>);
      });
      if (this.currentAction) {
        slider = <Col span={12}><Slider step={0.0001} min={0} max={this.state.actionStatus.duration} value={this.state.actionStatus.time} onChange={this.handleSliderChange} /></Col>;
      }
    }

    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Item>
          <Switch>frame</Switch>
        </Item>
      </Menu>
    );

    return (
      <div className="App">
        <div ref={this.threeRoot}>
          <canvas ref={this.canvas}></canvas>
        </div>
        <div className="Panel" onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
          <Row gutter={16} type="flex" align="bottom">
            {select}
            {btns}
            <Col>
              <MenuButton toggleFrame={this.toggleFrame}></MenuButton>
            </Col>
          </Row>
          <Row>
            {slider}
          </Row>
        </div>
      </div>
    );
  }
}

export default App;
