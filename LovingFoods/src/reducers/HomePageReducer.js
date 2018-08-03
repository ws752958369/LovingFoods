import * as types from '../constants/HomeActionTypes';

const initialState = [
    {
        isFetching:false,
        isNoMore:false,
        errMsg:'',
        page: 1,
        per: 10,
        feedList:[]
    },//首页
    {
        isFetching:false,
        isNoMore:false,
        errMsg:'',
        page: 1,
        per: 10,
        feedList:[]
    },//评测
    {
        isFetching:false,
        isNoMore:false,
        errMsg:'',
        page: 1,
        per: 10,
        feedList:[]
    },//知识
    {
        isFetching:false,
        isNoMore:false,
        errMsg:'',
        page: 1,
        per: 10,
        feedList:[]
    }//美食
];

export default function HomePageReducer (state=initialState,action) {

   // console.log(`HomePageList1:action-${JSON.stringify(action)},state-${JSON.stringify(state)}`);

    switch (action.type) {
        case types.HomePageList1:{

            if (action.status == types.Home_Data_fetch_ing) {
                    let newState = [...state];
                    newState.splice(0,1,{
                        ...state[0],
                        isFetching: true,
                    });
                    return newState;
            } else if (action.status == types.Home_Data_fetch_end) {
                const { page, total_pages, feeds } = action.data;
                let isNoMore = false;
                if (page >= total_pages) {
                    isNoMore = true;
                }
                let newState = [...state];
                newState.splice(0,1,{
                    ...state[0],
                    page: state[0].page+1 ,
                    isNoMore: isNoMore,
                    isFetching: false,
                    feedList: state[0].feedList.concat(feeds)
                });
                return newState;
            } else {
                let newState = [...state];
                newState.splice(0,1,{
                    ...state[0],
                    errMsg: action.errMsg
                });
                return newState;
            }

        }break;
        case types.HomePageList2:{
            if (action.status == types.Home_Data_fetch_ing) {
                let newState = [...state];
                newState.splice(1,1,{
                    ...state[1],
                    isFetching: true,
                });
                return newState;
            } else if (action.status == types.Home_Data_fetch_end) {
                const { page, total_pages, feeds } = action.data;
                let isNoMore = false;
                if (page >= total_pages) {
                    isNoMore = true;
                }
                let newState = [...state];
                newState.splice(1,1,{
                    ...state[1],
                    page: state[1].page+1 ,
                    isNoMore: isNoMore,
                    isFetching: false,
                    feedList: state[1].feedList.concat(feeds)
                });
                return newState;
            } else {
                let newState = [...state];
                newState.splice(1,1,{
                    ...state[1],
                    errMsg: action.errMsg
                });
                return newState;
            }

        }break;
        case types.HomePageList3:{
            if (action.status == types.Home_Data_fetch_ing) {
                let newState = [...state];
                newState.splice(2,1,{
                    ...state[2],
                    isFetching: true,
                });
                return newState;
            } else if (action.status == types.Home_Data_fetch_end) {
                const { page, total_pages, feeds } = action.data;
                let isNoMore = false;
                if (page >= total_pages) {
                    isNoMore = true;
                }
                let newState = [...state];
                newState.splice(2,1,{
                    ...state[2],
                    page: state[2].page+1 ,
                    isNoMore: isNoMore,
                    isFetching: false,
                    feedList: state[2].feedList.concat(feeds)
                });
                return newState;
            } else {
                let newState = [...state];
                newState.splice(2,1,{
                    ...state[2],
                    errMsg: action.errMsg
                });
                return newState;
            }

        }break;
        case types.HomePageList4:{
            if (action.status == types.Home_Data_fetch_ing) {
                let newState = [...state];
                newState.splice(3,1,{
                    ...state[3],
                    isFetching: true,
                });
                return newState;
            } else if (action.status == types.Home_Data_fetch_end) {
                const { page, total_pages, feeds } = action.data;
                let isNoMore = false;
                if (page >= total_pages) {
                    isNoMore = true;
                }
                let newState = [...state];
                newState.splice(3,1,{
                    ...state[3],
                    page: state[3].page+1 ,
                    isNoMore: isNoMore,
                    isFetching: false,
                    feedList: state[3].feedList.concat(feeds)
                });
                return newState;
            } else {
                let newState = [...state];
                newState.splice(3,1,{
                    ...state[3],
                    errMsg: action.errMsg
                });
                return newState;
            }

        }break;
        default:return state
    }

}
