import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import {ScreenSize} from "../../constants/AppConfigure";

export default class FeedHandleView extends Component {


    render(){
        const {onSelect} = this.props;
        return (
            <View style={[this.props.style,styles.container]}>
                <FunctionItem title='饮食分析' icon={require('../../resource/ic_home_analyse.png')} onPress={()=>{
                    onSelect({'index':1,'title':'饮食分析'})
                }}/>
                <View style={styles.line}/>
                <FunctionItem title='搜索对比' icon={require('../../resource/ic_search_compare.png')} onPress={()=>{
                    onSelect({'index':2,'title':'搜索对比'})
                }}/>
                <View style={styles.line}/>
                <FunctionItem title='扫码对比' icon={require('../../resource/ic_scan_compare.png')} onPress={()=>{
                    onSelect({'index':3,'title':'扫码对比'})
                }}/>
            </View>
        )
    }
}

const FunctionItem = ({title, icon, onPress})=>{
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <View style={styles.Item}>
                <Image source={icon} style={{width:28,height:28}}/>
                <Text style={{marginTop:5,fontSize:13, color:'gray'}}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        width:ScreenSize.width-30,
        height:60,
        backgroundColor:'white',
        shadowColor: 'gray',
        shadowOpacity: 0.3,
        shadowOffset: {width: 1, height: -1},
        shadowRadius: 2,
        paddingVertical:5,
    },
    Item:{
        flex:1,
        alignItems:'center',
        width:(ScreenSize.width-30-2)/3.0,
        height:60,
    },
    line:{
        width:0.5,
        height:50,
        backgroundColor:'#d9d9d9'
    }
});