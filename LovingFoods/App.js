/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StatusBar
} from 'react-native';
import {
    Provider
} from 'react-redux';
import SharedStore from './src/store/SharedStore';
import RootView from './src/RootView';

const store = SharedStore();

export default class App extends Component<Props> {
    render() {
        return (
            <Provider store={store}>
                <RootView />
            </Provider>
        );
    }
}


