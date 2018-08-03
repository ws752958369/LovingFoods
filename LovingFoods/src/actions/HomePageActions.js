import Network from '../comopnents/Network';
import * as types from '../constants/HomeActionTypes';


export function loadData (params,pageIndex) {
    const url = 'http://food.boohee.com/fb/v1/feeds/category_feed';
    /*
    const params = {
        page: this.page,
        category: this.categoryId,
        per: 10
    }*/
    return (dispatch) => {
        console.log(`loadData-json111:${JSON.stringify(params)},pageIndex:${pageIndex}`)
        dispatch(loading(pageIndex));
        Network.get(url,params,30000).then((json)=> {
            console.log('loadData-json222:'+JSON.stringify(json))
            dispatch(loadEnd(pageIndex,json));
        },(err)=>{
            console.log('err:'+err);
            dispatch(loadError(pageIndex,err));
        });
    }
}


function loading (pageIndex) {

    let type = types.HomePageList1;
    switch (pageIndex) {
        case 1:{
            type = types.HomePageList1;
        }break;
        case 2:{
            type = types.HomePageList2;
        }break;
        case 3:{
            type = types.HomePageList3;
        }break;
        case 4:{
            type = types.HomePageList4;
        }break;
    }

    return {
        type: type,
        status: types.Home_Data_fetch_ing
    }
}


function loadEnd(pageIndex,data) {
    let type = types.HomePageList1;
    switch (pageIndex) {
        case 1:{
            type = types.HomePageList1;
        }break;
        case 2:{
            type = types.HomePageList2;
        }break;
        case 3:{
            type = types.HomePageList3;
        }break;
        case 4:{
            type = types.HomePageList4;
        }break;
    }
    return {
        type: type,
        status: types.Home_Data_fetch_end,
        data: data
    }
}

function loadError(pageIndex,error) {
    let type = types.HomePageList1;
    switch (pageIndex) {
        case 1:{
            type = types.HomePageList1;
        }break;
        case 2:{
            type = types.HomePageList2;
        }break;
        case 3:{
            type = types.HomePageList3;
        }break;
        case 4:{
            type = types.HomePageList4;
        }break;
    }
    return {
        type: type,
        status: types.Home_Data_fetch_err,
        errMsg: error.msg
    }
}

