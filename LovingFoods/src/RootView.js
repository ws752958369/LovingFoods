import React,{ Component } from 'react';
import {
    View,
    StatusBar
} from 'react-native';
import {
    createStackNavigator
} from 'react-navigation';
import LoginEntry from './pages/Login/LoginEntry';
import TabView from './TabView';
import HomeDetail from './pages/Home/HomeDetail';
import FeedDetail from "./pages/Feed/FeedDetail";
import {connect} from 'react-redux'

export default class RootView extends Component {

    render(){
        const { barStyle, hidden } = this.props;
        StatusBar.setBarStyle('light-content',false);
        return (
            <StackNavigator />
        )
    }

}



/**
 * 自定义 StackNavigator，可以选择 screen 进入方式
 * 默认状态为 card，只需要输入对应页面，比如 ..navigate('ScreenSome1')
 * 如果要使某个页面进入方式为 modal 只需要在路径上加上 Modal
 * 比如：..navigate('ScreenSome2Modal')
 */

const StackModalNavigator = (routeConfigs, navigatorConfig) => {
    const CardStackNavigator = createStackNavigator(routeConfigs, navigatorConfig);
    const modalRouteConfig = {};
    const routeNames = Object.keys(routeConfigs);

    for (let i = 0; i < routeNames.length; i++) {
        modalRouteConfig[`${routeNames[i]}Modal`] = routeConfigs[routeNames[i]];
    }

    const ModalStackNavigator = createStackNavigator(
        {
            CardStackNavigator: { screen: CardStackNavigator },
            ...modalRouteConfig,
        },
        {
            // 如果页面进入方式为 modal，需要自定义 header（默认 header 样式失效，都叠在一块了）
            mode: 'modal',
            headerMode: 'none',
        },
    );

    return ModalStackNavigator;
};

const StackNavigator = StackModalNavigator({
    'Login': {
        screen: LoginEntry,
        navigationOptions: {

        }
    },
    'TabView': {
        screen: TabView,
        navigationOptions: {
            header: null
        }
    },
    'HomeDetail': {
        screen: HomeDetail,
        navigationOptions: {
            header: null
        }
    },
    'FeedDetail': {
        screen: FeedDetail,
        navigationOptions: {
            header: null
        }
    }

},{
    initialRouteName: 'TabView'
});





