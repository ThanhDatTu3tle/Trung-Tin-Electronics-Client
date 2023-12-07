import {UPLOAD_IMAGE} from "../actions/types";

const initialState = {
    image: null
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    switch(action.type) {
        case UPLOAD_IMAGE:
            return {
                ...state,
                image: action.payload
            };
        default:
            return state;
    }
}