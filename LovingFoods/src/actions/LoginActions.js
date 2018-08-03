import * as types from '../constants/LoginTypes';

export function Login() {
    return (dispatch) => {
        dispatch(Login_doing())
        setTimeout(()=>{
            dispatch(Login_success())
        },3000);
    }
}


function Login_doing() {
    return {
        type: types.Login_doing
    }
}

function Login_success() {
    return {
        type: types.Login_success
    }
}