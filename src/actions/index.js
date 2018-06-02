import GLTFLoader from 'three-gltf-loader';
import {
    INIT_VIEWER,
    VIEWER_RENDER,
    LOAD_GLTF_FAILURE,
    LOAD_GLTF_SUCCESS,
    LOAD_GLTF_REQUEST,
    GET_CLIPACTIONS,
    SELECT_CLIPACTION,
    CONTROL_CLIPACTION
} from './actionTypes';

// create a loader for loading GLLF Model
const __GLTFLoader = new GLTFLoader();

export function initViewer() {
    return {
        type: INIT_VIEWER,
    };
}

export function viewerRender() {
    return {
        type: VIEWER_RENDER,
        payload: new Date().getTime(),
    }
}

export function requestLoadingGLTF(path) {
    return {
        type: LOAD_GLTF_REQUEST,
        path
    };
}

export function failLoadingGLTF(err) {
    return {
        type: LOAD_GLTF_FAILURE,
        error: true,
        payload: err,
    };
}

export function succeedLoadingGLTF(gltf) {
    return {
        type: LOAD_GLTF_SUCCESS,
        payload: gltf,
    };
}

// use promise to wrap loading functions of three.js
export function promiseLoadingGLTF(path) {
    return new Promise((resolve, reject) => {
        __GLTFLoader.load(
            path,
            gltf => {
                resolve(gltf);
            },
            progress => {},
            err => {
                reject(err);
            }
        );
    });
}

export function loadGLTF(path) {
    return function(dispatch) {
        dispatch(requestLoadingGLTF(path));
        return promiseLoadingGLTF(path)
            .then(
                response => dispatch(succeedLoadingGLTF(response))
            )
        ;
    };
}

export function getClipActions(clipActions) {
    return {
        type: GET_CLIPACTIONS,
        payload: clipActions
    };
}

export function selectClipAction(id) {
    return {
        type: SELECT_CLIPACTION,
        payload: id
    }
}

export function primaryLoadClipActions(clipActions) {
    return function(dispatch, getState) {
        dispatch(getClipActions(clipActions));
        // take first clipAction as default
        let firstClipAction = getState().clipActions.arr[0];
        if (firstClipAction) {
            // firstClipAction
            return dispatch(selectClipAction(firstClipAction._clip.uuid));
        }
    }
}

export function controlClipAction(feature) {
   return {
       type: CONTROL_CLIPACTION,
       payload: feature,
   } 
}