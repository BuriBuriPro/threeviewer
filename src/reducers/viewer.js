import { INIT_VIEWER, TOGGLE_ORBITCONTROL } from '../actions/actionTypes';

export const viewer = (state = {
    inited: false,
    orbitCtrlEnabled: true,
}, action) => {
    switch (action.type) {
        case INIT_VIEWER:
            return {
                ...state,
                inited: true,
            };
        case TOGGLE_ORBITCONTROL:
            if (action.payload !== state.orbitCtrlEnabled) {
                return {
                    ...state,
                    orbitCtrlEnabled: !state.orbitCtrlEnabled,
                }
            } else {
                return state;
            }
        default:
            return state;
    }
};