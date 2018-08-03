import React,{ Component } from 'react';
import {
    View,
    StyleSheet,
    ListView,
    Image,Text,TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import * as HomePageActions from '../../actions/HomePageActions'
import {ScreenSize,PlatformTypeIOS} from "../../constants/AppConfigure";
import RefreshFooter from '../../comopnents/RefreshFooter';
import Loading from "../../comopnents/Loading";

class KnowledgePage extends Component {

    constructor(props){
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1,r2) => r1 !== r2
            })
        }
    }

    componentDidMount() {
        this._fetchData();
    }

    _fetchData = () => {
        const { loadData, page } = this.props;
        const category = 3;
        const params = {
            page: page,
            category: category,
            per: 10
        }
        loadData(params,category);
    }

    _renderRowPress = (feed) => {
        const { navigation } = this.props;
        if (navigation) {
            navigation.navigate('HomeDetail',{
                feed:feed
            });
        }
    }

    _singlePicRender = (item) => {
        let source = item.images?{uri:item.images[0]}:null
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => this._renderRowPress(item)} style={styles.renderRow}>
                <View style={{justifyContent:'space-between',width:ScreenSize.width-160,}}>
                    <Text numberOfLines={2} style={{fontSize:15,width:ScreenSize.width-180}}>{item.title}</Text>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{color:'gray',fontSize:13}}>{item.source}</Text>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Image source={require('../../resource/ic_feed_watch.png')} style={{width:12,height:12}}/>
                            <Text style={{color:'gray',fontSize:13}}>{item.tail}</Text>
                        </View>
                    </View>
                </View>
                <Image source={source} defaultSource={require('../../resource/img_horizontal_default.png')} style={{width:120,height:80}}/>
            </TouchableOpacity>
        )
    }

    _mutiPicRender = (item) => {
        let images = item.images;
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => this._renderRowPress(item)} style={styles.mutiPicRenderRow}>
                <Text numberOfLines={2} style={{fontSize:15}}>{item.title}</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10,marginBottom:5}}>
                    {
                        images.map((item,index) => {
                            return <Image key={`key=${index}`} defaultSource={require('../../resource/img_horizontal_default.png')} source={{uri:item}} style={{width:(ScreenSize.width-50)/3.0,height:80}}/>
                        })
                    }
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={{color:'gray',fontSize:13}}>{item.source}</Text>
                    <View style={{flexDirection:'row',alignItems:'center',marginLeft:30}}>
                        <Image source={require('../../resource/ic_feed_watch.png')} style={{width:12,height:12}}/>
                        <Text style={{color:'gray',fontSize:13}}>{item.tail}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    _renderRow = (item) => {

        if (item.images && item.images.length > 1) {
            return this._mutiPicRender(item)
        } else {
            return this._singlePicRender(item)
        }
    }

    _renderFooter = () => {
        const { feedList, isNoMore} = this.props;
        if (feedList && feedList.length <=0) return null;
        return <RefreshFooter isNoMore={isNoMore}/>
    }

    _onEndReach = () =>{
        const { isNoMore } = this.props;
        if (!isNoMore) {
            this._fetchData();
        }
    }

    render(){
        const { feedList, page } = this.props;
        let dataSource = feedList? this.state.dataSource.cloneWithRows(feedList):this.state.dataSource;
        return (
            <View style={styles.container}>
                <ListView
                    enableEmptySections={true}
                    dataSource={dataSource}
                    renderRow={this._renderRow}
                    onEndReachedThreshold={10}
                    onEndReached={this._onEndReach}
                    renderFooter={this._renderFooter}
                />
                <Loading isShow={page<=1}/>
            </View>
        )
    }

}


var styles = StyleSheet.create({
    container:{
        flex:1,
    },
    renderRow:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:15,
        paddingHorizontal:15,
        paddingVertical:15,
        backgroundColor:'#fff'
    },
    mutiPicRenderRow:{
        marginTop:15,
        paddingHorizontal:15,
        paddingVertical:15,
        backgroundColor:'#fff'
    }
});


export default connect(
    (state) => ({
        isFetching: state.HomePage[2].isFetching,
        isNoMore: state.HomePage[2].isNoMore,
        page: state.HomePage[2].page,
        feedList: state.HomePage[2].feedList,
    }),
    (dispatch) => ({
        loadData: (params,pageIndex) => dispatch(HomePageActions.loadData(params,pageIndex))
    })
)(KnowledgePage);