import * as types from '../constants/BarStyleTypes';

const initialState = {
    hidden: false,
    barStyle: 'light-content'
};

export default function FeedEntryReducer(state=initialState,action) {
    switch (action.type) {
        case types.barStyle_default :
            return {
                ...state,
                barStyle: 'default'
            };
            break;
        case types.barStyle_lightContent :
            return {
                ...state,
                barStyle: 'light-content',
            };
            break;
        case types.barStyle_shown :
            return {
                ...state,
                hidden: false
            };
            break;
        case types.barStyle_hidden :
            return {
                ...state,
                hidden: true
            };
            break;
        default:
            return state;
    }
}