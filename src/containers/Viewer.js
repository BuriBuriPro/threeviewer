import React, { Component } from 'react';
import ThreeViewer from '../ThreeViewer';
import { connect } from 'react-redux';
import {
    loadGLTF,
    getClipActions,
    primaryLoadClipActions,
    viewerRender,
    initViewer
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
            viewerRender: this.props.viewerRender,
        });
        this.core.init();
        this.props.initViewer();
        this.props.loadGLTF('./mae/scene.gltf');
    }

    shouldComponentUpdate(nextProps) {
        // never update component directly, handle with core
        // if model is valid, load it in viewer
        if (this.props.model !== nextProps.model) {
            if (!nextProps.model.isFetching && nextProps.model.gltf) {
                this.core.handleLoadedGLTF(nextProps.model.gltf);
            }
        }
        // control action
        if (this.props.currentClipAction !== nextProps.currentClipAction) {
            let action = this.props.clipActions.map[this.props.currentClipAction.id];

            this.core.controlAction(this.props.currentClipAction, nextProps.currentClipAction, action);
        }
        // config viewer
        if (this.props.viewer !== nextProps.viewer) {
            this.core.updateConfig(this.props.viewer, nextProps.viewer);
        }
        return false;
    }

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
    model: state.model,
    viewer: state.viewer,
    clipActions: state.clipActions,
    currentClipAction: state.currentClipAction,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    initViewer: () => dispatch(initViewer()),
    viewerRender: () => dispatch(viewerRender()),
    loadGLTF: (path) => dispatch(loadGLTF(path)),
    getClipActions: (actions) => dispatch(getClipActions(actions)),
    primaryLoadClipActions: (actions) => dispatch(primaryLoadClipActions(actions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);