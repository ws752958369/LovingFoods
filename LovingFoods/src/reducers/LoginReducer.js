import * as types from '../constants/LoginTypes'

const initialState = {
  isLogin:false
};

export default function LoginReducer (state=initialState, action) {

    switch (action.type) {
        case types.Login_doing: {
            return {
                ...state,
                isLogin: false
            }
        }break;
        case types.Login_success: {
            return {
                ...state,
                isLogin: true
            }
        }break;
        default: return state
    }
}