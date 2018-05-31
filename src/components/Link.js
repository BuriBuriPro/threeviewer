import React, { Component } from 'react'
import { Button } from 'antd';

class Link extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Button
                type="primary"
                style={{
                    width: '100%'
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