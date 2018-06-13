import { connect } from 'react-redux';
import SettingsMenu from '../components/SettingsMenu';
import { togggleStats, toggleAxes, togglegrid } from '../actions';

const mapStateToProps = (state) => ({
    viewer: state.viewer,
});

const mapDispatchToProps = (dispatch) => ({
   toggleStats: (key) => dispatch(togggleStats(key)),
   toggleAxes: (key) => dispatch(toggleAxes(key)),
   togglegrid: (key) => dispatch(togglegrid(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsMenu);