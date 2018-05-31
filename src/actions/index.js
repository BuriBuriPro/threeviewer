import THREE from 'three';
import GLTFLoader from 'three-gltf-loader';

const __GLTFLoader = new GLTFLoader();

export const VIEWER_INFO = 'VIEWER_INFO';
export const ViewerInfos = {
    INIT_VIEWER: 'INIT_VIEWER',
    VIEWER_RENDER: 'VIEWER_RENDER',
};
export function viewerInfo(key) {
    return {
        type: VIEWER_INFO,
        payload: key
    };
}

export const LOAD_GLTF_REQUEST = 'LOAD_GLTF_REQUEST';
export function requestLoadingGLTF(path) {
    return {
        type: LOAD_GLTF_REQUEST,
        path
    };
}

export const LOAD_GLTF_FAILURE = 'LOAD_GLTF_FAILURE';
export function failLoadingGLTF(err) {
    return {
        type: LOAD_GLTF_FAILURE,
        error: true,
        payload: err,
    };
}

export const LOAD_GLTF_SUCCESS = 'LOAD_GLTF_SUCCESS';
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

export const GET_CLIPACTIONS = 'GET_CLIPACTIONS';
export function getClipActions(clipActions) {
    return {
        type: GET_CLIPACTIONS,
        payload: clipActions
    };
}

export const SELECT_CLIPACTION = 'SELECT_CLIPACTION';
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

export const ClipActionStatus = {
    PLAY: 'PLAY',
    STOP: 'STOP',
    PAUSE: 'PAUSE',
};
export const CONTROL_CLIPACTION = 'CONTROL_CLIPACTION';
export function controlClipAction(key) {
    return {
        type: CONTROL_CLIPACTION,
        payload: key,
    };
}