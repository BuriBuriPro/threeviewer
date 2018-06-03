import {
    INIT_VIEWER,
    TOGGLE_ORBITCONTROL,
    TOGGLE_STATS,
    TOGGLE_AXES,
    TOGGLE_BASEMATRIX
} from '../actions/actionTypes';

export const viewer = (state = {
    inited: false,
    orbitCtrlEnabled: true,
    statsEnabled: true,
    axesEnabled: true,
    baseMatrixEnabled: true,
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
                    orbitCtrlEnabled: action.payload,
                }
            } else {
                return state;
            }
        case TOGGLE_STATS:
            if (action.payload !== state.statsEnabled) {
                return {
                    ...state,
                    statsEnabled: action.payload,
                }
            } else {
                return state;
            }
        case TOGGLE_AXES:
            if (action.payload !== state.axesEnabled) {
                return {
                    ...state,
                    axesEnabled: action.payload,
                }
            } else {
                return state;
            }
        case TOGGLE_BASEMATRIX:
            if (action.payload !== state.baseMatrixEnabled) {
                return {
                    ...state,
                    baseMatrixEnabled: action.payload,
                }
            } else {
                return state;
            }
        default:
            return state;
    }
};