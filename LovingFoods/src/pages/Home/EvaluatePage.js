import React,{ Component } from 'react';
import {
    View,
    StyleSheet,
    ListView,
    ImageBackground,
    TouchableOpacity,
    Text,
    Image
} from 'react-native';

import {connect} from 'react-redux';
import * as HomePageActions from '../../actions/HomePageActions';
import RefreshFooter from '../../comopnents/RefreshFooter';
import Loading from '../../comopnents/Loading';
import Toast from 'react-native-easy-toast';

class EvaluatePage extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1,r2) => r1 !== r2
            }),
        };
      }

    componentDidMount() {
       this._fetchData();
    }

    _fetchData = () => {
        const { loadData, page } = this.props;
        const category = 2;
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

    _renderRow = (item,rowId,sectionId) => {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => this._renderOnPress(item)}>
                <ImageBackground
                    style={styles.renderRow}
                    source={{uri:item.background}}
                    defaultSource={require('../../resource/img_horizontal_default.png')}
                >
                    <Text style={{color:'white',fontSize:13}}>{item.source}</Text>
                    <Text numberOfLines={2} style={{color:'white',fontSize:16,fontWeight: 'bold',textAlign:'center'}}>{item.title}</Text>
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <Image source={require('../../resource/ic_feed_read.png')} style={{width:12,height:12}}/>
                        <Text style={{color:'white',fontSize:14,marginLeft:5}}>{item.tail}</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        )
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
          const { feedList, page} = this.props;
          let dataSource = feedList? this.state.dataSource.cloneWithRows(feedList):this.state.dataSource;
        return (
            <View style={styles.container}>
                <ListView
                    enableEmptySections={true}
                    dataSource={dataSource}
                    renderRow={this._renderRow}
                    contentContainerStyle={{paddingHorizontal:15}}
                    onEndReachedThreshold={10}
                    onEndReached={this._onEndReach}
                    renderFooter={this._renderFooter}
                />
                <Loading isShow={page<=1}/>
            </View>
        )
    }

}

export default connect(
    (state) => ({
        isFetching: state.HomePage[1].isFetching,
        isNoMore: state.HomePage[1].isNoMore,
        page: state.HomePage[1].page,
        feedList: state.HomePage[1].feedList,
    }),
    (dispatch) => ({
        loadData: (params,pageIndex) => dispatch(HomePageActions.loadData(params,pageIndex))
    })
)(EvaluatePage);

var styles = StyleSheet.create({
    container:{
        flex:1,
    },
    renderRow:{
        marginTop:15,
        height:200,
        justifyContent:'space-between',
        alignItems:'center',
        paddingVertical:20,
    }
});