import React, { Component } from 'react';
import { Menu, Switch, Icon } from 'antd';
import './SiderStyle.css';

const { Item, SubMenu, ItemGroup, Divider } = Menu;

const wireframeColors = ['none', 'black', 'silver', 'red', 'blue', 'green', 'yellow'];

class Sider extends Component {
    handleClick = (e) => {
        switch (e.key) {
            case 'toggleSwitch':
                this.props.toggleSider(!this.props.sider.visible);
                break;
            default:
                break;
        }
    }

    selectWireframe = (color) => {
        this.props.selectWireframe(color);
    }

    render() {
        const style = {
            transform: true ? 'translate(0)' : 'translate(-100%)',
            // transform: this.props.sider.visible ? 'translate(0)' : 'translate(-100%)',
        };
        const wireframeItems = wireframeColors.map(color => {
            let className = ['sider-wireframe-colors'];
            let style = {};

            if (color === 'none') {
                className.push('none');
            } else {
                style = {
                    backgroundColor: color,
                };
            }
            if (color === this.props.sider.wireframe) {
                className.push('active');
            }
            return (
                <div
                    key={color}
                    className={className.join(' ')}
                    style={style}
                    onClick={() => {this.selectWireframe(color)}}
                ></div>
            );
        });
        return (
            <Menu
                className="sider-menu"
                style={style}
                theme="dark"
                onClick={this.handleClick}
                selectable={false}
            >
                <Item key="toggleSwitch">
                    <Icon type="left" /> Model Inspector
                </Item>
                <Item key="Wireframe" style={{
                    padding: '5px',
                    height: '100px',
                }}>
                    Wireframe
                    <div>
                        {wireframeItems}                    
                    </div>
                </Item>
                <Item key="gridSwitch" style={{
                    padding: '5px',
                    height: '240px',
                }}>
                    Viewer
                    <div style={{
                       display: 'flex',
                       alignItems: 'center', 
                    }}>
                        <Switch checkedChildren="ON" unCheckedChildren="OFF" 
                            style={{
                                width: '55px',
                            }}
                        />
                        <span style={{
                            marginLeft: '8px',
                        }}>Grid</span>
                    </div>
                    <div style={{
                       display: 'flex',
                       alignItems: 'center', 
                    }}>
                        <Switch checkedChildren="ON" unCheckedChildren="OFF" 
                            style={{
                                width: '55px',
                            }}
                        />
                        <span style={{
                            marginLeft: '8px',
                        }}>Axes</span>
                    </div>
                    <div style={{
                       display: 'flex',
                       alignItems: 'center', 
                    }}>
                        <Switch checkedChildren="ON" unCheckedChildren="OFF" 
                            style={{
                                width: '55px',
                            }}
                        />
                        <span style={{
                            marginLeft: '8px',
                        }}>Frame</span>
                    </div>
                </Item>
            </Menu>
        );
    }
}

export default Sider;