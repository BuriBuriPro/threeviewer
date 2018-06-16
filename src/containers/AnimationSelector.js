import { connect } from 'react-redux';
import Selector from '../components/Selector/Selector';
import { selectClipAction, controlClipAction } from '../actions';

const mapStateToProps = (state, ownProps) => ({
    clipActions: state.clipActions,
    currentClipAction: state.currentClipAction,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    selectClipAction: (id) => dispatch(selectClipAction(id)),
    controlClipAction: (feature) => dispatch(controlClipAction(feature)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Selector);