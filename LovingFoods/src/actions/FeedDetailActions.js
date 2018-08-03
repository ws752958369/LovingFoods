import * as types from '../constants/FeedDetailActionTypes';

export function showPopupMenu (isShow) {
    return (dispatch) => {
        dispatch(isShow?showMenu():hideMenu())
    }
}

function showMenu () {
    return {
        type: types.ShowPopupMenu
    }
}

function hideMenu () {
    return {
        type: types.HidePopupMenu
    }
}