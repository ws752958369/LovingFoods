import React, { Component } from 'react';
import {
    View,
    Image,
    StyleSheet,
    ImageBackground,
    Text,
    TouchableOpacity
} from 'react-native';
import {ScreenSize} from "../../constants/AppConfigure";

export default class FeedEntryHeader extends Component {

    render(){
        return (
            <ImageBackground source={require('../../resource/img_home_bg.png')} style={[this.props.style,styles.headerBackground]}>
                <Image source={require('../../resource/ic_head_logo.png')} resizeMode='contain' style={styles.headerLogo}/>
                <TouchableOpacity activeOpacity={0.8} onPress={()=>{
                    alert('search')
                }}>
                    <View style={styles.searchViewContainer}>
                        <Text style={{color:'white',marginTop:5}}>查 询 食 物 信 息</Text>
                        <SearchView />
                    </View>
                </TouchableOpacity>
            </ImageBackground>
        )
    }

}

const SearchView = ()=> {
    return (
        <View style={styles.searchView}>
            <Image source={require('../../resource/ic_home_search.png')} style={{width:20,height:20,marginHorizontal:5}}/>
            <Text style={{fontSize:15,color:'rgba(222, 113, 56, 0.8)'}}>请输入食物名称</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerBackground:{
        width:ScreenSize.width,
        height:220,
        alignItems:'center'
    },
    headerLogo:{
        marginTop:35,
        width:66,
        height:24
    },
    searchViewContainer:{
        marginTop:45,
        alignItems:'center',
        width:ScreenSize.width,
        height:110,
    },
    searchView:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:15,
        width:ScreenSize.width-30,
        height:50,
        borderRadius:6,
        backgroundColor:'white',
    }
});