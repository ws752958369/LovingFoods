import React,{ Component } from 'react';
import {
    View,
    Image,
    ListView,
    StyleSheet,
    TouchableOpacity,
    Text,
    StatusBar
} from 'react-native';
import PropTypes from 'prop-types';
import { ScreenSize } from "../../constants/AppConfigure";
import Loading from '../../comopnents/Loading';
import NavigationHeader from '../../comopnents/NavigationHeader';
import PopupMenu from '../../comopnents/PopupMenu';
import RefreshFooter from '../../comopnents/RefreshFooter';
import {connect} from 'react-redux';
import * as FeedDetailActions from '../../actions/FeedDetailActions';
import * as BarStyleActions from "../../actions/BarStyleActions";


class FeedDetail extends Component {

    static navigationOptions = ({navigation}) => {
        let params = navigation.state.params;
        return {
            title: params.name
        }
    };

    constructor(props){
        super(props);

        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1,r2) => {r1 !== r2}
            }),
            data: [],
            page: 1,
            isNoMore: false
        }
    }

    componentWillUnmount() {
        StatusBar.setBarStyle('light-content',true);
    }


    componentDidMount() {
        this._loadDetail();
    }

    _loadDetail =  () => {
        const {kind, id } = this.props.navigation.state.params;
        let page = this.state.page;
        let url = `http://food.boohee.com/fb/v1/foods?kind=${kind}&value=${id}&page=${page}`;
        fetch(url).then((resp)=>resp.json()).then((json)=>{
            if (json) {
                console.log('json:'+JSON.stringify(json));
                const {foods, page, total_pages} = json
                var array = this.state.data.concat(foods);
                if (page >= total_pages){
                    this.setState({
                        isNoMore: true
                    });
                }
                foods && this.setState({
                    data: array
                });

            }
        })
    };

    _onBack = () => {

    }

    _onRightPress = ()=>{
        const { showPopupMenu,isShowMenu} = this.props;
        console.log('ShowPopupMenu:'+showPopupMenu);
        showPopupMenu(!isShowMenu);
    }

    _rightBarItemRender = () => {
        return (
            <View
                style={{flexDirection: 'row', alignItems: 'center'}}
            >
                <Text style={{color: 'gray', fontSize: 12, marginRight: 3}}>全部</Text>
                <Image source={require('../../resource/ic_bullet_down_gray.png')} style={{width: 13, height: 16}}
                       resizeMode="contain"/>
            </View>
        )
    }

    _renderRow = (dataBlob) => {
        return <FeedDetailItem food={dataBlob} onPress={()=>{
            alert(JSON.stringify(dataBlob));
        }}/>
    };

    _renderFooter = () => {

        if (this.state.data.length<=0) return null;

        return <RefreshFooter isNoMore={this.state.isNoMore}/>
    }

    _onReachEnd = () => {

        if (!this.state.isNoMore) {
            let page = this.state.page + 1;
            this.setState({
                page: page
            });
            this._loadDetail();
        }

    }

    render(){
        const {navigation, isShowMenu, showPopupMenu} = this.props;
        return (
            <View style={styles.container}>
                <NavigationHeader style={{zIndex:3}} navigation={navigation} title='名字太长---' rightRenderItem={this._rightBarItemRender} onBack={this._onBack} onRightPress={this._onRightPress}/>
                <ListView
                    enableEmptySections={true}
                    dataSource={this.state.dataSource.cloneWithRows(this.state.data)}
                    renderRow={this._renderRow}
                    renderFooter={this._renderFooter}
                    onEndReached={this._onReachEnd}
                    onEndReachedThreshold={10}
                    contentContainerStyle={{backgroundColor:'rgba(220, 220, 220, 0.2)'}}
                />
                <PopupMenu ItemList={['item1','item2','item3','item4']} isShow={isShowMenu} touchDismiss={()=>{
                    showPopupMenu(false);
                }}/>
                <Loading isShow={!this.state.data.length} />
            </View>
        )
    }

}


class FeedDetailItem extends Component {

    static propTypes = {
        food: PropTypes.bool,
        onPress: PropTypes.func,
    };

    render(){
        const { food, onPress} = this.props;
        let style = {backgroundColor:'rgb(142, 213, 7)'};
        if (food.health_light == 2){
            style.backgroundColor = 'rgb(254, 210, 10)';
        }else if (food.health_light == 3){
            style.backgroundColor = 'rgb(251, 25, 8)';
        }
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={()=>{
                onPress()
            }} style={styles.renderRow}>
                <Image source={{uri:food.thumb_image_url}} style={styles.renderLeftImage}/>
                <View style={styles.renderRightContainer}>
                    <View style={styles.renderRightTextContainer}>
                        <Text style={{fontSize:13,color:'gray'}}>{food.name}</Text>
                        <Text style={{marginTop:8,fontSize:13,color:'red'}}>
                            {food.calory}
                            <Text style={{color:'gray'}}>{` 千卡/${food.weight}克`}</Text>
                        </Text>
                    </View>
                    <View style={[styles.renderRightDot,style]}/>
                </View>
            </TouchableOpacity>
        )
    }
}


export default connect(
    (state)=> ({
        isShowMenu: state.FeedDetailReducer.isShow
    }),(dispatch)=>({
        showPopupMenu: (isShow)=> dispatch(FeedDetailActions.showPopupMenu(isShow)),
    })
)(FeedDetail);

var styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    renderRow:{
        flexDirection:'row',
        alignItems:'center',
        height:58,
    },
    renderLeftImage:{
        marginLeft:10,
        width:38,
        height:38,
        borderRadius:6,
    },
    renderRightContainer:{
        flexDirection:'row',
        alignItems:'center',
        marginLeft:10,
        width:ScreenSize.width-58,
        height:58,
        paddingVertical:10,
        borderBottomColor:'rgb(194,194,198)',
        borderBottomWidth:0.5
    },
    renderRightTextContainer:{
        justifyContent:'center',
        width:ScreenSize.width-78,
        height:58,
    },
    renderRightDot:{
        width:10,
        height:10,
        borderRadius:5,
        backgroundColor:'red'
    }
});