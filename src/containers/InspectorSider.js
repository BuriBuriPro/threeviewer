import { connect } from 'react-redux';
import Sider from '../components/Sider';
import { toggleSider, selectWireframe } from '../actions';

const mapStateToProps = (state) => ({
    sider: state.sider,
});

const mapDispatchToProps = (dispatch) => ({
    toggleSider: (key) => dispatch(toggleSider(key)),
    selectWireframe: (color) => dispatch(selectWireframe(color)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sider);