import React, { Component } from 'react'
import { Button } from 'antd';

class Link extends Component {
    render() {
        return (
            <Button
                type="primary"
                style={{
                    width: '100%',
                    marginRight: '10px'
                }}
                onClick={this.props.onClick}
                disabled={this.props.disabled}
            >
                {this.props.children}
            </Button>
        );
    }
}

export default Link;