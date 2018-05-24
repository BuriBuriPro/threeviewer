import React from 'react';
import { Dropdown, Menu, Button, Icon, Switch } from 'antd';


const { Item } = Menu;
const itemKeys = ['frameSwitch', 'axesSwitch'];

class MenuButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            frameSwitch: true,
        };
    }

    handleMenuClick = (e) => {
        this.setState({
            visible: true,
        });
    }

    handleBtnClick = (e) => {
        this.setState({
            visible: true,
        });
    }

    handleVisibleChange = (flag) => {
        this.setState({
            visible: flag
        });
    }

    handleFrameSwitch = (e) => {
        let key = e ? 'on' : 'off';

        this.props.toggleFrame(key);
    }

    render() {
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Item key={itemKeys[0]}>
                    <Switch onClick={this.handleFrameSwitch} /> frame
                </Item>
            </Menu>
        );

        return (
            <Dropdown overlay={menu} placement="topCenter"
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
            >
                <Button type="primary" onClick={this.handleBtnClick}>
                    Settings <Icon type="up" />
                </Button>
            </Dropdown>
        );
    }
}

export default MenuButton;