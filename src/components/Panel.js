import React, { Component } from 'react';
import { Row, Col } from 'antd';
import AnimationSelector from '../containers/AnimationSelector';
import Link from './Link';
import { ClipActionStatus } from '../actions/actionTypes';
import AnimationProgressSlider from '../containers/AnimationProgressSlider';

class Panel extends Component {
    render() {
        const currentClipAction = this.props.currentClipAction;
        const status = currentClipAction.status;
        const mainBtn = {};
        const stopBtn = {
            children: ClipActionStatus.STOP,
            feature: ClipActionStatus.STOP,
        };

        if (status === ClipActionStatus.PLAY) {
            mainBtn.children = ClipActionStatus.PAUSE;
            mainBtn.feature = ClipActionStatus.PAUSE;
        } else {
            mainBtn.children = ClipActionStatus.PLAY;
            mainBtn.feature = ClipActionStatus.PLAY;
        }
        if (status === ClipActionStatus.STOP) {
            stopBtn.disabled = true;
        } else {
            stopBtn.disabled = false;
        }
        mainBtn.onClick = () => this.props.onClick(mainBtn.feature);
        stopBtn.onClick = () => this.props.onClick(stopBtn.feature);

        return (
            <div>
                <Row gutter={12}>
                    <Col span={6}>
                        <AnimationSelector />
                    </Col>
                    <Col span={4}>
                        <Link {...mainBtn} />
                    </Col>
                    <Col span={4}>
                        <Link {...stopBtn} />
                    </Col>
                    <Col span={4}>

                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <AnimationProgressSlider />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Panel;