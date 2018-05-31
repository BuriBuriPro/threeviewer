import { combineReducers } from 'redux';
import {
    LOAD_GLTF_REQUEST,
    LOAD_GLTF_FAILURE,
    LOAD_GLTF_SUCCESS,
    GET_CLIPACTIONS,
    SELECT_CLIPACTION,
    ClipActionStatus,
    CONTROL_CLIPACTION,
    controlClipAction,
    ViewerInfos,
    VIEWER_INFO
} from '../actions';

const model = (state = {
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
        default:
            return state;
    }
};

const viewer = (state = {
    inited: false,
    timeStamp: 0,
}, action) => {
    switch (action.type) {
        case VIEWER_INFO:
            switch (action.payload) {
                case ViewerInfos.INIT_VIEWER:
                    return {
                        ...state,
                        inited: true,
                    };
                case ViewerInfos.VIEWER_RENDER:
                    return {
                        ...state,
                        timeStamp: new Date().getTime(),
                    };
                default:
                    break;
            }
            /* if (!state.inited) {
                return {
                    ...state,
                    inited: true
                };
            } */
        // case 
        default:
            return state;
    }
}

const clipActions = (state = {
    arr: [],
    map: {},
}, action) => {
    switch (action.type) {
        case GET_CLIPACTIONS:
            let arr = [];
            let map = {};
            
            action.payload.map(clipAction => {
                let clip = clipAction._clip;

                arr.push(clipAction);
                map[clip.uuid] = clipAction;
            });
            return {
                arr,
                map,
            };
        default:
            return state;
    }
};

const currentClipActionId = (state = '', action) => {
    switch (action.type) {
        case SELECT_CLIPACTION:
            
            return action.payload;
        default:
            return state;
    }
}

const currentClipActionControl = (state = {
    status: ClipActionStatus.STOP
}, action) => {
    switch (action.type) {
        case CONTROL_CLIPACTION:
            return {
                status: action.payload
            };
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    model,
    viewer,
    clipActions,
    currentClipActionId,
    clipActionControl: currentClipActionControl,
});

export default rootReducer;