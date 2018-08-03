import * as types from '../constants/FeedActionTypes';

export function fetchFeedList() {
    return (dispatch) => {
        dispatch(fetching());
        const url = 'http://food.boohee.com/fb/v1/categories/list';
        fetch(url).then((res)=>res.json()).then((json)=>{
            dispatch(fetchEnd(json));
        }).catch((e)=>{
            console.log(e);
        })
    }
}


function fetching () {
    return {
        type: types.Feed_Data_fetch_ing
    };
}

function fetchEnd(resp) {
    return {
        type: types.Feed_Data_fetch_end,
        data: resp
    };
}