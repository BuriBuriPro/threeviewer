import { connect } from 'react-redux';
import Panel from '../components/Panel';
import { controlClipAction } from '../actions';

const mapStateToProps = (state, ownProps) => ({
    currentClipAction: {...state.currentClipAction},
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: (feature) => dispatch(controlClipAction(feature)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Panel);