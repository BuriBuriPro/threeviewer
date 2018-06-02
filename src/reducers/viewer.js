import { INIT_VIEWER, VIEWER_RENDER } from '../actions/actionTypes';

export const viewer = (state = {
    inited: false,
    renderTime: 0,
}, action) => {
    switch (action.type) {
        case INIT_VIEWER:
            return {
                ...state,
                inited: true,
            };
        case VIEWER_RENDER:
            return {
                ...state,
                renderTime: action.renderTime,
            }
        default:
            return state;
    }
};