import { VIEWER_RENDER } from '../actions/actionTypes';

export const viewerRenderLoop = (state = 0, action) => {
    switch (action.type) {
        case VIEWER_RENDER:
            return action.payload;
        default:
            return state;
    }
};