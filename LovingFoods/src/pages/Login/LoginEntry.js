import React,{ Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    StatusBar
} from 'react-native';
import NavigationHeader from '../../comopnents/NavigationHeader';
import {connect} from 'react-redux';
import * as BarStyleActions from '../../actions/BarStyleActions';
import * as LoginActions from '../../actions/LoginActions';
import {ScreenSize} from "../../constants/AppConfigure";
import Loading from '../../comopnents/Loading';

const loginTypes = [
    {
        name: 'QQ',
        icon:require('../../resource/ic_account_qq.png')
    },
    {
        name: '微信',
        icon:require('../../resource/ic_account_wechat.png')
    },
    {
        name: '微博',
        icon:require('../../resource/ic_account_weibo.png'),
    },
    {
        name: '薄荷',
        icon:require('../../resource/ic_account_boohee.png')
    }
];



class LoginEntry extends Component {


    constructor(){
        super();
        this.state = {
            startLogin:false
        }
    }

    componentWillReceiveProps(nextProps,nextState) {
        if (nextProps.isLogin == true) {
            this.props.navigation.pop();
        }
    }

    componentWillUnmount() {

        StatusBar.setBarStyle('light-content',true);
    }

    render(){
        const { navigation , isLogin, login} = this.props;
        return (
            <View style={{flex:1}}>
                <NavigationHeader style={{zIndex:3}} navigation={navigation} title='登录'/>
                <View style={styles.container}>
                    <Text>不用注册，用一下账号直接登录</Text>
                    <View style={styles.loginTypes}>
                        {
                            loginTypes.map((item)=>{
                                return <CellItem title={item.name} icon={item.icon} onPress={()=> {
                                        login();
                                        this.setState({
                                            startLogin: true
                                        })
                                    }
                                }/>
                            })
                        }
                    </View>
                    <Text>没有以上账号？</Text>
                    <TouchableOpacity activeOpacity={0.8} style={styles.registerBtn} onPress={()=>{
                        alert('注册')
                    }}>
                        <Text style={{color:'red',fontSize:16}}>注册</Text>
                    </TouchableOpacity>
                </View>
                <Loading  loadingTitle='登录中...' isShow={!isLogin&&this.state.startLogin}/>
            </View>
        )
    }

}


const CellItem = ({title,icon,onPress}) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.loginItem}>
            <Image source={icon} style={{width:50,height:50}}/>
            <Text>{title}</Text>
        </TouchableOpacity>
    )
}

var styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        paddingTop:50,
    },
    loginTypes:{
        flexDirection:'row',
        marginBottom:30,
    },
    loginItem:{
        alignItems:'center',
        paddingVertical:10,
        width:ScreenSize.width/4.0,
        height:80,
    },
    registerBtn:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
        width:ScreenSize.width*0.4,
        height:40,
        borderRadius:20,
        backgroundColor:'white'
    }
})

export default connect(
    (state) => ({
        isLogin: state.Login.isLogin
    }),
    (dispatch) => ({
        changeBarStyle: (style) => dispatch(BarStyleActions.changeBarStyle(style)),
        login: () => dispatch(LoginActions.Login())
    })
)(LoginEntry);