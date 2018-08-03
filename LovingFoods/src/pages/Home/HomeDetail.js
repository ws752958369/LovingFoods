import React,{ Component } from 'react';
import {
    View,
    Image,
    StatusBar,
    WebView,
    StyleSheet,
    ScrollView,
    Text,
    TouchableOpacity
} from 'react-native';
import {connect} from "react-redux";
import * as BarStyleActions from "../../actions/BarStyleActions";
import Header from '../../comopnents/NavigationHeader';
import {ScreenSize,PlatformTypeIOS,IsIphoneX} from "../../constants/AppConfigure";
import SharedView from '../../comopnents/SharedView';

export default class HomeDetail extends Component {

    constructor(props){
        super(props);
        this.state = {
            isShow: false
        }
    }

    componentDidMount() {
        const { params } = this.props.navigation.state;
        console.log(JSON.stringify(params.feed));
    }




    _rightBarItemClick = () => {
        // alert('123')
        this.setState({
            isShow: !this.state.isShow
        })
    }

    _sharedViewOnDismiss = () =>{
        this.setState({
            isShow: false
        })
    }

    render(){

        const { params } = this.props.navigation.state;
        let feed = params.feed;
        const param1 = {
            navigation: this.props.navigation,
            url: feed.link,
            sharedPress: this._rightBarItemClick,
        };
        const param2 = {
            navigation: this.props.navigation,
            feed: feed,
            onPress: this._rightBarItemClick,
        }
        return (
            <View style={{flex:1}}>
                {
                    feed.content_type === 6 ?  <WebViewComopnent {...param1}/>:
                        (feed.type === 'food_card'?<FoodCardComopnent {...param2}/>:<FoodNewsComopnent {...param1}/>)
                }
                <SharedView isShow={this.state.isShow} onDismiss={this._sharedViewOnDismiss}/>
            </View>
        )
    }

}


const WebViewComopnent = ({navigation,url}) => {
    return (
        <View style={{flex:1}}>
            <Header navigation={navigation} title='资讯详情'/>
            <WebView
                source={{uri:url}}
                startInLoadingState={true}
                bounces={false}
                scalesPageToFit={true}
                style={styles.webView}
            />
        </View>
    )
}

const FoodCardComopnent = ({navigation,feed, onPress}) => {
    return (
        <View style={{flex:1}}>
            <Header
                navigation={navigation}
                title='查看详情'
                rightIcon={require('../../resource/ic_photo_share.png')}
                onRightPress={onPress}
            />
            <ScrollView
                removeClippedSubviews
                bounces={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{backgroundColor: 'white'}}
            >
                <View style={{flexDirection:'row',paddingHorizontal:10,paddingVertical:10,alignItems:'center'}}>
                    <Image source={{uri:feed.publisher_avatar}} style={{width:40,height:40,borderRadius:20,marginRight:5}}/>
                    <Text>{feed.publisher}</Text>
                </View>
                <Image source={{uri:feed.card_image}} defaultSource={require('../../resource/img_horizontal_default.png')} style={{width:ScreenSize.width,height:ScreenSize.width}}/>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Text>{feed.description}</Text>
                </View>
            </ScrollView>
            <TouchableOpacity activeOpacity={0.8} onPress={()=>{
                alert('1')
            }} style={styles.bottomView}>
                <View style={{flexDirection:'row'}}>
                    <Image source={require('../../resource/ic_feed_like.png')} style={{width:18,height:18}}/>
                    <Text>{feed.like_ct}</Text>
                </View>
            </TouchableOpacity>
            {
                IsIphoneX && <View style={{height:34,width:ScreenSize.width,backgroundColor:'white'}}></View>
            }
        </View>
    );
}

const FoodNewsComopnent = ({navigation,url,sharedPress}) => {
    return (
        <View style={{flex:1}}>
            <Header
                navigation={navigation}
                title='查看详情'
            />
            <WebView
                scalesPageToFit={true}
                startInLoadingState={true}
                source={{uri:url}}
                bounces={false}
                automaticallyAdjustContentInsets={false}
                style={[styles.webView, {height: ScreenSize.height - 44 - Header.barHeight}]}
            />
            <View style={styles.bottomView1}>
                <TouchableOpacity activeOpacity={0.8} style={styles.collection} onPress={sharedPress}>
                    <Image source={require('../../resource/ic_share_black.png')} style={{width:14,height:14,marginRight:2}}
                           resizeMode='contain'/>
                    <Text>分享</Text>
                </TouchableOpacity>
                <View style={{backgroundColor:'#ccc',marginVertical:6,width:1}}></View>
                <TouchableOpacity activeOpacity={0.8} style={styles.collection} onPress={()=>{
                    alert('收藏')
                }}>
                    <Image source={require('../../resource/ic_article_collect.png')} style={{width:18,height:18}}
                           resizeMode='contain'/>
                    <Text>收藏</Text>
                </TouchableOpacity>
            </View>
            {
                IsIphoneX && <View style={{height:34,width:ScreenSize.width,backgroundColor:'white'}}></View>
            }
        </View>
    );
}

var styles = StyleSheet.create({
    webView:{
        width: ScreenSize.width,
        height: ScreenSize.height - Header.barHeight
    },
    bottomView:{
        justifyContent:'center',
        alignItems:'center',
        height:49,
        width:ScreenSize.width,
        borderTopColor:'#ccc',
        backgroundColor:'white'
    },
    bottomView1:{
        flexDirection:'row',
        height:49,
        borderTopColor:'#ccc',
        borderTopWidth:StyleSheet.hairlineWidth,
        backgroundColor:'#fff'
    },
    collection:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width:(ScreenSize.width-1)/2.0
    }
});
