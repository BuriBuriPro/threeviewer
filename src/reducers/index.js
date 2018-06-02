import { combineReducers } from 'redux';
import { viewer } from './viewer';
import { model } from './model';
import { clipActions } from './clipActions';
import { currentClipAction } from './currentClipAction';

export default combineReducers({
    viewer,
    model,
    clipActions,
    currentClipAction,
});