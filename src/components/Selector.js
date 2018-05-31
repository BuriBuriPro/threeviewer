import React, { Component } from 'react'
import { Select } from 'antd';
import { ClipActionStatus } from '../actions';

const { Option } = Select;

class Selector extends Component {
    constructor(props) {
        super(props);
    }

    handleSelect = id => {
        if (this.props.currentClipActionId !== id) {
            if (this.props.currentClipActionId) {
                this.props.controlClipAction(ClipActionStatus.STOP);
            }
            this.props.selectClipAction(id);
        }
    }

    render() {
        const opts = this.props.clipActions.arr.map(action => {
            let clip = action._clip;

            return <Option key={clip.uuid}>{clip.name}</Option>
        });
        const currentAction = this.props.clipActions.map[this.props.currentClipActionId];
        const value = currentAction ? currentAction._clip.name : '';

        return (
            <Select
                style={{
                    width: '100%',
                }}
                value={value}
                onSelect={this.handleSelect}
            >
                {opts}
            </Select>
        );
    }
}

export default Selector;