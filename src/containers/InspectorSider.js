import { connect } from 'react-redux';
import Sider from '../components/Sider/Sider';
import { toggleSider, selectWireframe, togglegrid, toggleAxes, togggleStats } from '../actions';

const mapStateToProps = (state) => ({
    sider: state.sider,
    viewer: state.viewer,
});

const mapDispatchToProps = (dispatch) => ({
    toggleSider: (key) => dispatch(toggleSider(key)),
    selectWireframe: (color) => dispatch(selectWireframe(color)),
    toggleGrid: (key) => dispatch(togglegrid(key)),
    toggleAxes: (key) => dispatch(toggleAxes(key)),
    toggleFrame: (key) => dispatch(togggleStats(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sider);