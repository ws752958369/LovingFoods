import React,{ Component } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';
import {ScreenSize,PlatformTypeIOS,IsIphoneX} from "../constants/AppConfigure";
import PropTypes from 'prop-types';

export default class NavigationHeader extends Component {

    static barHeight = PlatformTypeIOS?(IsIphoneX?88:64):50;

    static propTypes = {
        navigation:PropTypes.object,
        onBack:PropTypes.func,
        backItemHidden:PropTypes.bool,
        title:PropTypes.string,
        titleStyle:PropTypes.style,
        rightTitleStyle:PropTypes.style,
        rightTitle:PropTypes.string,
        rightIcon:PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
        rightRenderItem:PropTypes.func,
        onRightPress:PropTypes.func
    };

    _pop = ()=> {
        const {navigation, onBack } = this.props;
        if (navigation) {
            navigation.pop();
            onBack && onBack();
        }
    }

    render(){
        const { style,backItemHidden, title, titleStyle, rightTitle, rightTitleStyle, rightIcon, rightRenderItem, onRightPress } = this.props;
        return (
            <View style={[styles.container,style]}>
                {!backItemHidden && <LeftItem onPress={this._pop}/>}
                <Text style={[styles.title,titleStyle]}>{title}</Text>
                {rightTitle && <RightTitle title={rightTitle} onPress={onRightPress} style={rightTitleStyle}/>}
                {rightIcon && <RightIcon source={rightIcon} onPress={onRightPress} />}
                {rightRenderItem && <RightRenderItem item={rightRenderItem} onPress={onRightPress}/>}
            </View>
        )
    }

}

const LeftItem = ({onPress})=> {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.leftItem}>
            <Image source={require('../resource/ic_back_dark.png')} resizeMode='contain' style={{width:20,height:20}}/>

        </TouchableOpacity>
    );
}

const RightTitle = ({title,style,onPress}) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[styles.rightItem]}>
            <Text style={[style,{fontSize:16,color:'#666'}]}>{title}</Text>
        </TouchableOpacity>
    )
}

const RightIcon = ({source,onPress}) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.rightItem}>
            <Image source={source} resizeMode='contain' style={{width:20,height:20}}/>
        </TouchableOpacity>
    )
}

const RightRenderItem = ({item,onPress}) => {
    console.log(typeof (item)+item);
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.rightItem}>
            {item()}
        </TouchableOpacity>
    )
}

var styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        width:ScreenSize.width,
        height:PlatformTypeIOS?(IsIphoneX?88:64):50,
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderBottomColor:'#d5d5d5',
        backgroundColor:'#fff',

    },
    leftItem:{
        position:'absolute',
        bottom:0,
        left:0,
        width:60,
        height:PlatformTypeIOS?44:50,
        justifyContent:'center',
        alignItems:'flex-start',
        paddingLeft:5,
    },
    title:{
        marginTop:18+(IsIphoneX?44:0),
        textAlign: 'center',
        color: '#666',
        fontSize: 18,
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
    }
});