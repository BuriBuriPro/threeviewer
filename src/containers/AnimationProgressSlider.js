import { connect } from 'react-redux';
import ProgressSlider from '../components/ProgressSlider/ProgressSlider';

const mapStateToProps = (state) => ({
    clipActions: state.clipActions,
    currentClipAction: state.currentClipAction,
    viewerRenderLoop: state.viewerRenderLoop,
});

export default connect(mapStateToProps)(ProgressSlider);