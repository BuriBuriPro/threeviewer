import React, { Component } from 'react';
import { Dropdown, Button } from 'antd';
import ViewerSettingsMenu from '../containers/ViewerSettingsMenu';

class DropMenu extends Component {
    state = {
        visible: false,
    };

    handleVisibleChange = (flag) => {
        this.setState({
            visible: flag,
        });
    }

    render() {
        return (
            <Dropdown
                overlay={
                    <ViewerSettingsMenu
                        handleVisibleChange={this.handleVisibleChange}
                    />
                }
                placement="topCenter"
                onVisibleChange={this.handleVisibleChange}
                onChange={this.handleChange}
                visible={this.state.visible}
            >
                <Button type="primary" style={
                    {
                        width: '100%',
                        fontSize: '0.3em',
                        textAlign: 'center',
                    }
                }>
                    Settings
                </Button>
            </Dropdown>
        );
    }
}

export default DropMenu;