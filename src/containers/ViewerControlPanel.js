import { connect } from 'react-redux';
import Panel from '../components/Panel/Panel';
import { controlClipAction, toggleOrbitControl, toggleSider } from '../actions';

const mapStateToProps = (state, ownProps) => ({
    currentClipAction: state.currentClipAction,
    sider: state.sider,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: (feature) => dispatch(controlClipAction(feature)),
    toggleOrbitCtrl: (key) => dispatch(toggleOrbitControl(key)),
    toggleSider: (key) => dispatch(toggleSider(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Panel);