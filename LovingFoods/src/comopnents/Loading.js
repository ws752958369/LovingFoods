import React,{ Component } from 'react';
import {
    View,
    ActivityIndicator,
    Text,
    StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';

export default class Loading extends Component {

    static propTypes = {
        isShow: PropTypes.bool,
        loadingTitle: PropTypes.string
    }

    render(){
        const { isShow, loadingTitle } = this.props;
        if (!isShow) return null;
        return (
            <View style={styles.container}>
                <View style={styles.loading}>
                    <ActivityIndicator color='white'/>
                    <Text style={styles.loadingTitle}>{loadingTitle?loadingTitle:'加载中...'}</Text>
                </View>
            </View>
        )
    }

}

var styles = StyleSheet.create({
    container:{
        position:'absolute',
        top:0,
        left:0,
        bottom:0,
        right:0,
        justifyContent:'center',
        alignItems:'center',
    },
    loading:{
        justifyContent:'center',
        alignItems:'center',
        width:100,
        height:80,
        marginVertical:10,
        borderRadius:6,
        backgroundColor:'gray',
    },
    loadingTitle:{
        marginTop:10,
        fontSize:14,
        color:'white'
    }
});