import React from 'react';
import { Dropdown, Menu, Button, Icon, Switch } from 'antd';

const { Item } = Menu;
const items = [
    {
        key: 'frameSwitch',
        name: 'frame',
        defaultVal: true,
    }, 
    {
        key: 'axesSwitch',
        name: 'axes',
        defaultVal: true,
    }, 
    {
        key: 'baseMatrixSwtich',
        name: 'baseMatrix',
        defaultVal: true,
    }
];

function createMenuItem(param) {
    let item = null;
    let content = null;

    switch (param.key) {
        default:
            item = (
                <Item key={param.key}>
                    <Switch defaultChecked={param.defaultVal} /> {param.name}
                </Item>
            );
            break;
    }
    return item;
}

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
        this.setState((prevState) => {
            return {
                visible: !prevState.visible,
            }
        });
        // this.props.settingsHandler
    }

    handleVisibleChange = (flag) => {}

    handleFrameSwitch = (e) => {
        let key = e ? 'on' : 'off';

        this.props.toggleFrame(key);
    }

    render() {
        const itemList = items.map((item) => {
            return createMenuItem(item);
        });
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                {itemList}
            </Menu>
        );

        return (
            <Dropdown overlay={menu} placement="topCenter"
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
            >
                <Button type="primary" onClick={this.handleBtnClick}>
                    Settings <Icon type={this.state.visible ? 'down' : 'up'} />
                </Button>
            </Dropdown>
        );
    }
}

export default MenuButton;