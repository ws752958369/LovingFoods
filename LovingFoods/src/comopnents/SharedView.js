import React,{ Component } from 'react';
import {
    Modal,
    View,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Easing
} from 'react-native';
import {ScreenSize,PlatformTypeIOS,IsIphoneX} from "../constants/AppConfigure";

const sharedTypes = [
    {
        name: 'QQ',
        icon:require('../resource/ic_account_qq.png')
    },
    {
        name: '微信',
        icon:require('../resource/ic_account_wechat.png')
    },
    {
        name: '微博',
        icon:require('../resource/ic_account_weibo.png'),
    },
    {
        name: '薄荷',
        icon:require('../resource/ic_account_boohee.png')
    }
];

//创建自定义动画组件，官方提供的有：View,Image,ScrollView,
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default class SharedView extends Component {

    constructor(props){
        super(props);
        this.state = {
            bottom: new Animated.Value(-200),
        }
    }

    componentWillReceiveProps(nextProps,nextState) {

        if (nextProps.isShow === true) {
            //不能同时定义bounciness/speed和 tension/friction这两组，只能指定其中一组
            /** config
                friction: Controls "bounciness"/overshoot. Default 7.
                tension: Controls speed. Default 40.
                speed: Controls speed of the animation. Default 12.
                bounciness: Controls bounciness. Default 8.
                useNativeDriver: 使用原生动画驱动。默认不启用(false)。
            */
            /*
            Animated.spring(this.state.bottom,{
                toValue:0,
                speed:12, //
                bounciness:1
            }).start(()=>{
                console.log('animated finished')
            });*/
            Animated.timing(this.state.bottom,{
                toValue:IsIphoneX?34:0,
                duration:350,
            }).start(()=>{
                console.log('animated finished')
            });

        }else {
            //在组件隐藏后还原下一次动画前的初始位置
            this.setState({
                bottom: new Animated.Value(-200),
            })
        }

    }

    render(){
        const  { isShow, onDismiss} = this.props;
        return (
            <Modal
                animationType='fade'
                transparent={true}
                visible={isShow}
                onRequestClose={()=>alert('close')}
            >
                <TouchableOpacity activeOpacity={1} onPress={onDismiss} style={styles.container}>
                    <AnimatedTouchableOpacity activeOpacity={1} style={[styles.sharedView,{bottom:this.state.bottom}]}>
                        <View style={styles.sharedView}>
                            <View style={{flexDirection:'row',}}>
                                {
                                    sharedTypes.map((item,index)=>{
                                        return <SharedItem  key={`${item.name}-${index}`} source={item.icon} title={item.name}/>
                                    })
                                }
                            </View>
                            <TouchableOpacity activeOpacity={0.8} onPress={onDismiss} style={styles.cancelBtn}>
                                <Text>取消</Text>
                            </TouchableOpacity>
                        </View>
                    </AnimatedTouchableOpacity>
                </TouchableOpacity>

            </Modal>
        )
    }

}

const SharedItem = ({source,title}) => {
    return (
        <TouchableOpacity activeOpacity={0.8} style={styles.sharedItem} onPress={()=>{
            alert(title)
        }}>
            <Image source={source} style={{width:60,height:60}}/>
            <Text>{title}</Text>
        </TouchableOpacity>
    )
}

var styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.5)'
    },
    sharedView:{
        alignItems:'center',
        position:'absolute',
        left:0,
        bottom:0,
        width: ScreenSize.width,
        height:200,
        backgroundColor:'rgb(233,233,238)'
    },
    sharedItem:{
        alignItems:'center',
        paddingVertical:8,
        marginHorizontal:15,
    },
    cancelBtn:{
        position:'absolute',
        right:0,
        bottom:0,
        justifyContent:'center',
        alignItems:'center',
        borderTopColor:'#ccc',
        width:ScreenSize.width,
        height:46,
        backgroundColor:'white'
    }
})