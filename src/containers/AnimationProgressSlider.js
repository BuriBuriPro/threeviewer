import { connect } from 'react-redux';
import ProgressSlider from '../components/ProgressSlider';

const mapStateToProps = (state) => ({
    viewer: {...state.viewer},
    clipActions: {...state.clipActions},
    currentClipActionId: state.currentClipActionId,
});


export default connect(mapStateToProps)(ProgressSlider);