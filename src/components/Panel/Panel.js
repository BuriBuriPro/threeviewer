import React, { Component } from 'react';
import { Button } from 'antd';
import AnimationSelector from '../../containers/AnimationSelector';
import { ClipActionStatus } from '../../actions/actionTypes';
import AnimationProgressSlider from '../../containers/AnimationProgressSlider';
import './PanelStyle.css';

class Panel extends Component {
    handleBtnClick = (key) => {
        switch (key) {
            case 'setting':
                this.props.toggleSider(!this.props.sider.visible);
                break;
            default:
                this.props.onClick(key);
                break;
        }
    }

    render() {
        const currentClipAction = this.props.currentClipAction;
        const status = currentClipAction.status;
        const stopDisabled = status === ClipActionStatus.STOP ? true : false;
        let icon, key;

        // change main button according to status;
        if (status === ClipActionStatus.PLAY) {
            icon = 'pause';
            key = ClipActionStatus.PAUSE;
        } else {
            icon = 'caret-right';
            key = ClipActionStatus.PLAY;
        }

        return (
            <div className="panel">
                <AnimationProgressSlider />
                <div className="panel-item">
                    <Button
                        className="btn"
                        type="primary"
                        icon={icon}
                        key={key}
                        onClick={() => this.handleBtnClick(key)}
                    ></Button>
                </div>
                <div className="panel-item">
                    <Button
                        className="btn"
                        type="primary"
                        icon="close-square"
                        key={ClipActionStatus.STOP}
                        disabled={stopDisabled}
                        onClick={() => this.handleBtnClick(ClipActionStatus.STOP)}
                    ></Button>
                </div>
                <div className="panel-item">
                    <AnimationSelector className="test" />
                </div>
                <div className="panel-item item-setting">
                    <Button
                        className="btn"
                        type="primary"
                        icon="setting"
                        onClick={() => this.handleBtnClick('setting')}
                    ></Button>
                </div>
            </div>
        );
    }
}

export default Panel;