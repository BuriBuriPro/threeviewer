import { TOGGLE_SIDER, SELECT_WIREFRAME } from '../actions/actionTypes';

export const sider = (state = {
    visible: false,
    wireframe: 'none',
}, action) => {
    switch (action.type) {
        case TOGGLE_SIDER:
            return {
                ...state,
                visible: action.payload,
            }
        case SELECT_WIREFRAME:
            if (action.payload !== state.wireframe) {
                return {
                    ...state,
                    wireframe: action.payload,
                };
            } else {
                return state;
            }
        default:
            return state;
    }
};