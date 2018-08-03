import React,{ Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Animated,
    Easing,
    StyleSheet
} from 'react-native';
import {ScreenSize,PlatformTypeIOS,IsIphoneX} from "../constants/AppConfigure";

export default class PopupMenu extends Component {

    constructor(){
        super();
    }

    componentDidMount() {

    }

    render(){
        const {ItemList,isShow, touchDismiss} = this.props;
        if (!isShow)  return null;
        return (
            <TouchableOpacity activeOpacity={1} style={styles.mask} onPress={touchDismiss}>
            <ScrollView style={styles.container}>
                {ItemList.map((item)=>{
                    return (
                        <TouchableOpacity activeOpacity={0.8} onPress={()=>{
                            touchDismiss();
                            alert(item)
                        }} style={styles.item}>
                            <Text>{item}</Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
            </TouchableOpacity>
        )
    }
}

var styles = StyleSheet.create({
    mask:{
        position:'absolute',
        top:PlatformTypeIOS?(IsIphoneX?88:64):50,
        left:0,
        bottom:0,
        right:0,
        backgroundColor:'transparent'
    },
    container:{
        position:'absolute',
        top:5,
        right:5,
        width:80,
        height:120,
        backgroundColor:'#666',
    },
    item:{
        justifyContent:'center',
        height:30,
        borderBottomColor:'#fff',
        borderBottomWidth:StyleSheet.hairlineWidth
    }
});