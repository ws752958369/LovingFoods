import * as types from '../constants/FeedDetailActionTypes';

const initialState = {
    isShow: false
};

export default function FeedDetailReducer(state = initialState, action) {
    switch (action.type) {
        case types.ShowPopupMenu:{
            return {
                ...state,
                isShow: true
            }
        }break;
        case types.HidePopupMenu:{
            return {
                ...state,
                isShow: false
            }
        }break;
        default:
            return state;
    }
}