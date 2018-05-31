import React, { Component } from 'react';
import ThreeViewer from '../ThreeViewer';
import { connect } from 'react-redux';
import {
    loadGLTF,
    viewerInfo,
    getClipActions,
    primaryLoadClipActions,
    ClipActionStatus,
    ViewerInfos
} from '../actions';

class Viewer extends Component {
    constructor(props) {
        super(props);
        this.root = React.createRef();
        this.canvas = React.createRef();
        this.core = null;
    }

    componentDidMount() {
        this.core = new ThreeViewer({
            canvas: this.canvas.current,
            root: this.root.current,
            primaryLoadClipActions: this.props.primaryLoadClipActions,
            viewerInfo: this.props.viewerInfo,
        });
        this.core.init();
        this.props.viewerInfo(ViewerInfos.INIT_VIEWER);
        this.props.loadGLTF('./mae/scene.gltf');
    }

    shouldComponentUpdate(nextProps) {
        // never update component directly, handle with core
        // if model is valid, load it in viewer
        if (!this.props.model.gltf && !nextProps.model.isFetching && nextProps.model.gltf) {
            this.core.handleLoadedGLTF(nextProps.model.gltf);
            return true;
        }
        if (this.props.clipActionControl.status !== nextProps.clipActionControl.status) {
            let action = this.props.clipActions.map[this.props.currentClipActionId];

            switch (nextProps.clipActionControl.status) {
                case ClipActionStatus.PLAY:
                    action.paused = false;
                    action.play();
                    break;
                case ClipActionStatus.PAUSE:
                    action.paused = true;
                    break;
                case ClipActionStatus.STOP:
                    action.stop();
                    break;
            }
            return true;
        }
        return false;
    }

    /* componentWillUnmount() {

    } */

    render() {
        return (
            <div ref={this.root}>
                <canvas ref={this.canvas} >
                    If you are seeing this, you need to change the browser. Chrome is recommended.
                </canvas>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    model: {...state.model},
    viewer: {...state.viewer},
    clipActionControl: {...state.clipActionControl},
    clipActions: {...state.clipActions},
    currentClipActionId: state.currentClipActionId,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    loadGLTF: (path) => dispatch(loadGLTF(path)),
    viewerInfo: (key) => dispatch(viewerInfo(key)),
    getClipActions: (actions) => dispatch(getClipActions(actions)),
    primaryLoadClipActions: (actions) => dispatch(primaryLoadClipActions(actions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);