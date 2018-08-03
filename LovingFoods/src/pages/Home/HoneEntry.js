import React,{ Component } from 'react';
import {
    View,
    StyleSheet,
    Image,TouchableOpacity,
    Text
} from 'react-native';
import Network from '../../comopnents/Network';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ImagePicker from 'react-native-image-crop-picker';
import {connect} from "react-redux";
import * as BarStyleActions from "../../actions/BarStyleActions";
import {PlatformTypeIOS, ScreenSize, IsIphoneX} from "../../constants/AppConfigure";
import EvaluatePage from './EvaluatePage';
import FoodPage from './FoodPage';
import KnowledgePage from './KnowledgePage';
import HomePage from './HomePage';

const sections = [
    '首页',
    '评测',
    '知识',
    '美食'
];

export default class HoneEntry extends Component {

    static navigationOptions = {

    };

    _rightBarItemClick = ()=> {
        ImagePicker.openPicker({
            multiple: true
        }).then(images => {
            console.log(images);
        });
    }

    render(){
        const { navigation } = this.props;
        return (
            <View style={{flex:1}}>
                <Header onPress={this._rightBarItemClick}/>
                <ScrollableTabView
                    renderTabBar={ScrollHeader}
                    scrollWithoutAnimation={true}
                >
                    <HomePage navigation={navigation}/>
                    <EvaluatePage navigation={navigation}/>
                    <KnowledgePage navigation={navigation}/>
                    <FoodPage navigation={navigation}/>
                </ScrollableTabView>
            </View>
        )
    }

}


const Header = ({onPress}) => {
    return (
        <View style={styles.navHeader}>
            <Image style={styles.titleItem} source={require('../../resource/ic_feed_nav.png')} resizeMode='contain'/>
            <TouchableOpacity style={styles.rightItem} onPress={onPress}>
                <Image source={require('../../resource/ic_feed_camera.png')} style={{width:20,height:20}}/>
            </TouchableOpacity>
        </View>
    )
}

const ScrollHeader = ({title,goToPage,activeTab}) => {
    return (
        <View style={styles.scrollHeader}>
            {
                sections.map((title,index)=>{
                    const style = activeTab===index?{color:'red', fontSize:16}:{color:'gray',fontSize:14};
                    return (
                        <TouchableOpacity activeOpacity={1} style={styles.scrollItem} onPress={()=>{
                            goToPage(index)
                        }}>
                            <Text style={style}>{title}</Text>
                        </TouchableOpacity>

                    )
                })
            }
        </View>
    )
}

var styles = StyleSheet.create({
    navHeader:{
        zIndex:3,
        justifyContent:'center',
        alignItems:'center',
        width:ScreenSize.width,
        height:PlatformTypeIOS?(IsIphoneX?88:64):50,
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderBottomColor:'#d5d5d5',
        backgroundColor:'#fff',
    },
    titleItem:{
        marginTop:20+(IsIphoneX?44:0),
        width:60,
        height:30,
    },
    rightItem:{
        position:'absolute',
        bottom:0,
        right:0,
        width:80,
        height:PlatformTypeIOS?44:50,
        justifyContent:'center',
        alignItems:'flex-end',
        paddingRight:10,
    },
    scrollHeader:{
        flexDirection:'row',
        width:ScreenSize.width,
        height:44,
        backgroundColor:'#fff',
    },
    scrollItem:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        // width:ScreenSize.width/sections.length,
        // height:44,
    }

});

