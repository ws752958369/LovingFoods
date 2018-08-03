import React,{ Component } from 'react';
import {
    View,
    ImageBackground,
    TouchableOpacity,
    Text,Image,StyleSheet,
    StatusBar,
    Alert
} from 'react-native';
import {ScreenSize,PlatformTypeIOS,IsIphoneX} from "../../constants/AppConfigure";
import LoginEntry from '../Login/LoginEntry';
import {connect} from 'react-redux';
import * as BarStyleActions from '../../actions/BarStyleActions';

const icons = [
    require('../../resource/ic_my_photos.png'),
    require('../../resource/ic_my_collect.png'),
    require('../../resource/ic_my_upload.png')
];

const titles = [
    '我的照片',
    '我的收藏',
    '上传食物数据'
];

 class ProfileEntry extends Component {

    _settingPress = () => {
        Alert.alert(
          'Title',
          'Message',
          [
              {text:'确认', onPress: () => alert('1')},
              {text:'取消', onPress: null},
          ]
        );
    };

    _loginPress = () =>{
        const { navigation, changeBarStyle} = this.props;
        if (navigation){
            navigation.navigate('LoginModal',{
                //这里传参数
            });
            //update barStyle
            StatusBar.setBarStyle('default',true);
        }
    }

    render(){
        const { isLogin } = this.props;
        return (
            <View style={{flex:1}}>
                <ProfileHeader title='我的' settingPress={this._settingPress} isLogin={isLogin} loginPress={this._loginPress}/>
                <View style={{marginTop:15,borderTopColor:'#d9d9d9',borderBottomColor:'#d9d9d9'}}>
                    {
                        icons.map((item,index)=>{
                            return (
                                <CellItem icon={item} title={titles[index]} onPress={()=>{
                                    alert(titles[index])
                                }}/>
                            )
                        })
                    }
                </View>
            </View>
        )
    }

}


const ProfileHeader = ({title,settingPress,loginPress,isLogin}) => {
     const image = require('../../resource/shumei.png');
     const image_default = require('../../resource/img_default_avatar.png');
     console.log('isLogin---:'+isLogin);
     return (
        <ImageBackground source={require('../../resource/img_my_head.png')} style={styles.container}>
            <View style={styles.header}>
                <Text style={{color: 'white',fontSize:16}}>{title}</Text>
                <TouchableOpacity activeOpacity={0.8} style={styles.settingContainer} onPress={settingPress}>
                    <Image source={require('../../resource/ic_my_setting.png')} style={{width:20,height:20}}/>
                </TouchableOpacity>
            </View>
            <View style={styles.iconContainer}>
                <Image source={isLogin?image:image_default} resizeMode='contain' style={{width:80,height:80}}/>
            </View>
            {!isLogin &&
                <TouchableOpacity activeOpacity={0.8} style={styles.loginBtn} onPress={loginPress}>
                    <Text style={{color:'white'}}>点击登录</Text>
                </TouchableOpacity>
            }

        </ImageBackground>
    )
};

const CellItem = ({icon,title,onPress}) => {
    return (
        <TouchableOpacity activeOpacity={0.8} style={styles.cellItem} onPress={onPress}>
            <Image source={icon} style={{marginHorizontal:15,width:20,height:20}}/>
            <View style={styles.cellContainer}>
                <Text>{title}</Text>
                <Image source={require('../../resource/ic_my_right.png')} style={{width:20,height:20}}/>
            </View>
        </TouchableOpacity>
    )
}

var styles = StyleSheet.create({
    container:{
        width:ScreenSize.width,
        height:230,
        alignItems:'center',
    },
    header:{
        height:PlatformTypeIOS?44:50,
        width:ScreenSize.width,
        marginTop:PlatformTypeIOS?(IsIphoneX?34:20):0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    settingContainer:{
        position:'absolute',
        width:PlatformTypeIOS?44:50,
        height:PlatformTypeIOS?44:50,
        top:0,
        right:0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconContainer:{
        width:90,
        height:90,
        borderRadius:45,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginBtn:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:15,
        paddingHorizontal:15,
        paddingVertical:5,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 2,
    },
    cellItem:{
        flexDirection:'row',
        alignItems:'center',
        height:44,
        backgroundColor:'white'
    },
    cellContainer:{
        flex: 1,
        flexDirection:'row',
        height: 44,
        paddingRight:15,
        borderBottomColor:'#d9d9d9',
        borderBottomWidth:StyleSheet.hairlineWidth,
        justifyContent:'space-between',
        alignItems:'center'
    }
});


export default connect(
    (state) => ({
        isLogin: state.Login.isLogin
    })

)(ProfileEntry);
