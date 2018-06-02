import { SELECT_CLIPACTION, CONTROL_CLIPACTION } from '../actions/actionTypes';

export const currentClipAction = (state = {
    id: '',
    status: 'STOP',
}, action) => {
    switch (action.type) {
        case SELECT_CLIPACTION:
            return {
                ...state,
                id: action.payload,
            };
        case CONTROL_CLIPACTION:
            return {
                ...state,
                status: action.payload,
            };
        default:
            return state;
    }
};