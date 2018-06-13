import React, { Component } from 'react'
import { Menu, Switch } from 'antd';

const { Item } = Menu;

class SettingsMenu extends Component {
    handleStatsChange = (e) => {
        this.props.toggleStats(e);        
    }

    handleAxesChange = (e) => {
        this.props.toggleAxes(e);
    }

    handlegridChange = (e) => {
        this.props.togglegrid(e);
    }

    render() {
        return (
            <Menu>
                <Item key="frameSwitch">
                    <div>
                        <Switch
                            checked={this.props.viewer.statsEnabled}
                            onChange={this.handleStatsChange}
                        /> Frame
                    </div>
                </Item>
                <Item key="axesSwitch">
                    <div>
                        <Switch 
                            checked={this.props.viewer.axesEnabled}
                            onChange={this.handleAxesChange}
                        /> Axes
                    </div>
                </Item>
                <Item key="gridSwitch">
                    <div>
                        <Switch 
                            checked={this.props.viewer.gridEnabled}
                            onChange={this.handlegridChange}
                        /> grid
                    </div>
                </Item>
            </Menu>
        );
    }
}

export default SettingsMenu;