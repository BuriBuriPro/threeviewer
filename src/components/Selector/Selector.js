import React, { Component } from 'react'
import { Select } from 'antd';
import { ClipActionStatus } from '../../actions/actionTypes';

const { Option } = Select;

class Selector extends Component {
    handleSelect = id => {
        if (this.props.currentClipAction.id !== id) {
            if (this.props.currentClipAction.id) {
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
        const currentAction = this.props.clipActions.map[this.props.currentClipAction.id];
        const value = currentAction ? currentAction._clip.name : '';

        return (
            <Select
                value={value}
                onSelect={this.handleSelect}
            >
                {opts}
            </Select>
        );
    }
}

export default Selector;