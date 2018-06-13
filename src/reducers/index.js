import { combineReducers } from 'redux';
import { viewer } from './viewer';
import { model } from './model';
import { clipActions } from './clipActions';
import { currentClipAction } from './currentClipAction';
import { viewerRenderLoop } from './viewerRenderLoop';
import { sider } from './sider';

export default combineReducers({
    viewer,
    viewerRenderLoop,
    model,
    clipActions,
    currentClipAction,
    sider,
});