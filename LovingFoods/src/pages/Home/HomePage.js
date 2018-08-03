import React,{ Component } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,Image,Text,
    TouchableOpacity,
} from 'react-native';
import { ScreenSize, PlatformTypeIOS } from "../../constants/AppConfigure";
import AutoResponisve from 'autoresponsive-react-native';
import * as HomePageActions from '../../actions/HomePageActions';
import { connect } from 'react-redux';
import RefreshFooter from '../../comopnents/RefreshFooter';
import Loading from '../../comopnents/Loading';

class HomePage extends Component {

    componentDidMount() {
        this._fetchData();
    }

    _fetchData = () => {
        const { loadData, page } = this.props;
        const category = 1;
        const params = {
            page: page,
            category: category,
            per: 10
        }
        loadData(params,category);
    }

    _renderOnPress = (feed) => {
        const { navigation } = this.props;
        if (navigation) {
            navigation.navigate('HomeDetail',{
                feed:feed
            });
        }
    }


    _renderItem = (feed,index)=> {

        let itemWidth = (ScreenSize.width-15*2-10)*0.5;

        let height = itemWidth + 50;
        let titleHeight = 30;
        if (feed.description) {
            if (feed.description.length !== 0 && feed.description.length < 13) {
                titleHeight += 25;
            } else if (feed.description.length >= 13) {
                titleHeight += 40
            }
        }
        height += titleHeight;

        if (feed.content_type !== 5) {
            height = itemWidth + 30;
        }

        let style = {
            width: itemWidth,
            height:height,
            marginLeft: 15
        };

        return (
            <HomeItem
                key={`${index}`}
                titleHeight={titleHeight}
                style={style}
                item={feed}
                onPress={()=>{
                    this._renderOnPress(feed);
                }}
            />
        )
    }

    _renderFooter = ()=> {
        const { isNoMore,feedList } = this.props;
        if (!feedList) return null;
        return (
            <RefreshFooter isNoMore={isNoMore}/>
        )
    }

    _onReachEnd = (evt)=> {

        console.log(JSON.stringify(evt.nativeEvent));

        const { contentOffset, layoutMeasurement, contentSize} = evt.nativeEvent;

        let canRefresh = contentOffset.y + layoutMeasurement.height >= contentSize.height;

        const { loadData ,page ,isNoMore} = this.props;
        if (!isNoMore && canRefresh) {
            this._fetchData();
        }
    }

    render(){
        const {feedList,page,isFetching,isNoMore} = this.props;
        //console.log(`--page=${page},--feedList:${JSON.stringify(feedList)}`);
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.scroll}
                    automaticallyAdjustContentInsets={false}
                    bounces={true}
                    scrollEventThrottle={30}
                    onMomentumScrollEnd={this._onReachEnd}
                    contentContainerStyle={{backgroundColor:'#f5f5f5',paddingTop:10,paddingBottom:10}}
                >
                    {feedList &&  <AutoResponisve  itemMargin={10}>
                        {feedList.map(this._renderItem)}
                        </AutoResponisve>
                    }
                    {
                        !isFetching  && <RefreshFooter isNoMore={isNoMore}/>
                    }
                </ScrollView>
                <Loading isShow={page<=1}/>
            </View>
        )
    }

}

const HomeItem = ({item,style,titleHeight,onPress}) => {
    const display = item.content_type !== 5?{display:'none'}:{};
    const height =  item.content_type !== 5?style.height:style.width;
    return (
        <TouchableOpacity activeOpacity={0.8} style={[style,{backgroundColor:'#fff'}]} onPress={onPress}>
            <Image source={{uri: item.card_image.split('?')[0]}}
                   defaultSource={require('../../resource/img_horizontal_default.png')}
                   style={{width:style.width,height:height}}
            />
            <View style={{width:style.width,height:titleHeight,borderBottomWidth:0.5,borderBottomColor:'#ccc',paddingTop:8}}>
                <Text numberOfLines={1} style={{fontSize:14,color:'black'}}>{item.title}</Text>
                <Text numberOfLines={2} style={{marginTop:5,fontSize:13,color:'gray'}}>{item.description}</Text>
            </View>
            <View style={[display,{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height: 50,paddingHorizontal: 5}]}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Image source={item.publisher_avatar?{uri:item.publisher_avatar}:null}
                           defaultSource={require('../../resource/img_default_avatar.png')}
                           style={{width:30,height:30,borderRadius:15}}/>
                    <Text style={{fontSize: 11, color: 'gray',marginLeft:5,width:style.width*0.4}}>{item.publisher}</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Image source={require('../../resource/ic_feed_like.png')} style={{width:12,height:12}}/>
                    <Text>{item.like_ct}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

var styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f5f5f5'
    },
    scroll:{
        width: ScreenSize.width ,
        height: ScreenSize.height
    },
    renderItem:{
        width:(ScreenSize.width-15*2-10)*0.5,
        height:(ScreenSize.width-15*2-10)*0.5+120,
        //marginLeft: 15
    }
});

export default connect(
    (state) => ({
        isFetching: state.HomePage[0].isFetching,
        isNoMore: state.HomePage[0].isNoMore,
        page: state.HomePage[0].page,
        feedList: state.HomePage[0].feedList,
    }),
    (dispatch) => ({
        loadData: (params,pageIndex) => dispatch(HomePageActions.loadData(params,pageIndex))
    })
)(HomePage);