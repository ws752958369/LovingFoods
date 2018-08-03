'use strict';
import React, { Component } from 'react';
import {
    Image,StatusBar
} from 'react-native';
import {
    createBottomTabNavigator,
} from 'react-navigation';
import Feed from './pages/Feed/FeedEntry';
import Home from './pages/Home/HoneEntry';
import Profile from './pages/Prodfile/ProfileEntry';
import {connect} from 'react-redux';
import * as BarStyleActions from './actions/BarStyleActions';



const tabBarView = createBottomTabNavigator({
    Feed: {
        screen: Feed,
        navigationOptions: {
            tabBarLabel: '食物百科',
            tabBarIcon : ({focused})=>{
                let image = focused?require('./resource/ic_tab_search_select.png'):require('./resource/ic_tab_search.png');
                return (
                    <Image source={image} style={{width:24,height:24}}/>
                )
            },
            tabBarOnPress: ({ navigation, defaultHandler }) => {
                defaultHandler();
                StatusBar.setBarStyle('light-content',true);
            }
        }
    },
    Home: {
        screen: Home,
        navigationOptions:{
            tabBarLabel: '逛吃',
            tabBarIcon : ({focused})=>{
                let image = focused?require('./resource/ic_tab_homepage_select.png'):require('./resource/ic_tab_homepage.png');
                return (
                    <Image source={image} style={{width:24,height:24}}/>
                )
            },
            tabBarOnPress: ({ navigation, defaultHandler }) => {
                defaultHandler();
                StatusBar.setBarStyle('default',true);
            }
        }
    },
    Profile: {
        screen: Profile,
        navigationOptions:{
            tabBarLabel: '我的',
            tabBarIcon : ({focused})=>{
                let image = focused?require('./resource/ic_tab_my_select.png'):require('./resource/ic_tab_my.png');
                return (
                    <Image source={image} style={{width:24,height:24}}/>
                )
            },
            tabBarOnPress: ({ navigation, defaultHandler }) => {
                defaultHandler();
                StatusBar.setBarStyle('light-content',true);
            }

        }
    }
},{
    initialRouteName: 'Feed',
    swipeEnabled: false,
    animationEnabled: false,
    lazy: true,
    tabBarOptions:{
        activeTintColor:'orange',
        inactiveTintColor:'#222222'
    },
});



export default tabBarView;

