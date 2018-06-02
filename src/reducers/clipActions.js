import { GET_CLIPACTIONS } from '../actions/actionTypes';

export const clipActions = (state = {
    arr: [],
    map: {},
}, action) => {
    switch (action.type) {
        case GET_CLIPACTIONS:
            let arr = [];
            let map = {};
            
            arr = action.payload.map(clipAction => {
                let clip = clipAction._clip;

                map[clip.uuid] = clipAction;
                return clipAction;
            });
            return {
                arr,
                map,
            };
        default:
            return state;
    }
};