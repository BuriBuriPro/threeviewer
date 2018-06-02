import { LOAD_GLTF_REQUEST, LOAD_GLTF_SUCCESS, LOAD_GLTF_FAILURE } from '../actions/actionTypes';

export const model = (state = {
    isFetching: false,
    gltf: null,
}, action) => {
    switch (action.type) {
        case LOAD_GLTF_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case LOAD_GLTF_SUCCESS:
            return {
                ...state,
                isFetching: false,
                gltf: action.payload,
            };
        case LOAD_GLTF_FAILURE:
            return {
                ...state,
                isFetching: false,
            };
        default:
            return state;
    }
};