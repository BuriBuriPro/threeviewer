import React, { Component } from 'react';
import { Row, Col } from 'antd';
import AnimationSelector from '../containers/AnimationSelector';
import Link from './Link';
import { ClipActionStatus } from '../actions';
import ProgressSlider from '../components/ProgressSlider';

class Panel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const status = this.props.control.status;
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
                </Row>
                <Row>
                    <Col span={12}>
                        <ProgressSlider />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Panel;