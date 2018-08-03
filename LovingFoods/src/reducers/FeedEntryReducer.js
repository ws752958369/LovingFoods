import * as types from '../constants/FeedActionTypes';

const initialState = {
    isFetching: false
};

export default function FeedEntryReducer(state=initialState,action) {
    switch (action.type) {
        case types.Feed_Data_fetch_ing :
            return {
                ...state,
                isFetching: true
            };
            break;
        case types.Feed_Data_fetch_end :
            return {
                ...state,
                isFetching: false,
                data: action.data
            };
            break;

        default:
            return state;
    }
}