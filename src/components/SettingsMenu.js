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

    handleBaseMatrixChange = (e) => {
        this.props.toggleBaseMatrix(e);
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
                <Item key="baseMatrixSwitch">
                    <div>
                        <Switch 
                            checked={this.props.viewer.baseMatrixEnabled}
                            onChange={this.handleBaseMatrixChange}
                        /> baseMatrix
                    </div>
                </Item>
            </Menu>
        );
    }
}

export default SettingsMenu;