import React, { Component } from 'react';
import { Row, Col, Icon } from 'antd';
import AnimationSelector from '../containers/AnimationSelector';
import Link from './Link';
import { ClipActionStatus } from '../actions/actionTypes';
import DropMenu from './DropMenu';
import AnimationProgressSlider from '../containers/AnimationProgressSlider';
import './PanelStyle.css';

class Panel extends Component {
    componentDidMount() {

    }

    render() {
        const currentClipAction = this.props.currentClipAction;
        const status = currentClipAction.status;
        const mainBtn = {};
        const stopBtn = {
            children: <Icon style={{ width: '100%' }} type="close-square" />,
            feature: ClipActionStatus.STOP,
        };

        if (status === ClipActionStatus.PLAY) {
            mainBtn.children = <Icon type="pause"></Icon>;
            mainBtn.feature = ClipActionStatus.PAUSE;
        } else {
            mainBtn.children = <Icon type="caret-right"></Icon>;
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
            <div style={
                {
                    width: '100%',
                    padding: '8px',
                    overflow: 'hidden',
                }
            }>
                <Row>
                    <Col span={24}>
                        <AnimationProgressSlider />
                    </Col>
                </Row>
                <Row gutter={{
                    xs: 0,
                    sm: 8,
                    md: 16,
                    lg: 24,
                }}
                    type="flex"
                    justify="space-around"
                    align="middle"
                >
                    <Col className="panelCol" span={2}>
                        <Link {...mainBtn} />
                    </Col>
                    <Col className="panelCol" span={2}>
                        <Link {...stopBtn} />
                    </Col>
                    <Col className="panelCol" span={3}>
                        <AnimationSelector />
                    </Col>
                    {/* <Col className="panelCol" span={3}>
                        <DropMenu />
                    </Col> */}
                    <Col className="panelCol" span={3}>
                        <Link
                            onClick={() => {
                                console.log(!this.props.sider.visible);
                                
                                this.props.toggleSider(!this.props.sider.visible)}
                            }>Inspector</Link>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Panel;