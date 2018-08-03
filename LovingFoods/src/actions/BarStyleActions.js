import * as types from '../constants/BarStyleTypes';

export function changeBarStyle (barStyle) {
    return (dispatch) => {
        dispatch({
            type: barStyle === 'default'?types.barStyle_default:types.barStyle_lightContent
        });
    }
}

export function hideBar (hidden) {
    return (dispatch) => {
        dispatch({
            type: hidden?types.barStyle_hidden:types.barStyle_shown
        });
    }
}

