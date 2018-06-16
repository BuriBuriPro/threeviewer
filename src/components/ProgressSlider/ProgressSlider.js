import React, { Component } from 'react';
import { Slider } from 'antd';
import { ClipActionStatus } from '../../actions/actionTypes';
import './ProgressSliderStyle.css';

class ProgressSlider extends Component {
    constructor(props) {
        super(props);
        this.backupStatus = 'uncertain';
    }

    handleChange = (value) => {
        const action = this.props.clipActions.map[this.props.currentClipAction.id];
        
        if (this.backupStatus === 'uncertain') {
            this.backupStatus = this.props.currentClipAction.status;
        }
        if (!action.paused) {
            action.paused = true;
        }
        action.time = value;
    }

    handleAfterChange = (value) => {
        const action = this.props.clipActions.map[this.props.currentClipAction.id];

        if (this.backupStatus === ClipActionStatus.PLAY) {
            action.paused = false;
        } else {
            action.paused = true;
        }
        this.backupStatus = 'uncertain';
    }

    render() {
        let time = 0;
        let max = 0;        
        let action = this.props.clipActions.map[this.props.currentClipAction.id];
        let disabled = true;
        
        if (action) {
            time = action.time;
            max = action._clip.duration;
            if (this.props.currentClipAction.status !== ClipActionStatus.STOP) {
                disabled = false;
            }
        }
        
        return (
            <div className="progress-slider">
                <Slider min={0} max={max} step={0.001} value={time} 
                    onChange={this.handleChange}
                    onAfterChange={this.handleAfterChange}
                    disabled={disabled}
                />
            </div>
        );
    }
}

export default ProgressSlider;