import React,{ Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    StatusBar
} from 'react-native';
import {connect} from 'react-redux';
import * as BarStyleActions from '../../actions/BarStyleActions';
import * as FeedActions from '../../actions/FeedActions';
import FeedEntryHeader from './FeedEntryHeader';
import {ScreenSize} from "../../constants/AppConfigure";
import FeedHandleView from './FeedHandleView';
import FeedCategoryView from './FeedCategoryView';
import Loading from '../../comopnents/Loading';
import FeedDetail from "./FeedDetail";

class FeedEntry extends Component {

    static navigationOptions = {

    };

    componentDidMount() {
        const { fetchData } = this.props;
        fetchData();
    }


    //工具栏点击跳转
    _feedHandleSelect = (item)=>{
        alert(JSON.stringify(item))
        //StatusBar.setBarStyle('default',true);
    };

    //分类item点击跳转
    _feedCategorySelect = (item) => {
        this.props.navigation.navigate('FeedDetail',{
            'kind': item.kind,
            'id': item.id,
            'name': item.name
        });
        StatusBar.setBarStyle('default',true);
    };


    render(){
        const { isFetching, dataSource} = this.props;
        //console.log('dataSource:'+ JSON.stringify(dataSource));
        return (
            <View style={styles.container}>
                <ScrollView
                    bounces={false}
                    contentContainerStyle={{paddingBottom: 40}}
                >
                    <FeedEntryHeader />
                    <FeedHandleView style={styles.FeedHandleView} onSelect={this._feedHandleSelect}/>
                    <View >
                        {
                            dataSource &&  dataSource.group.map((group)=>{
                                 return <FeedCategoryView mapList={group} onPress={this._feedCategorySelect} style={styles.FeedCategoryView}/>
                            })
                        }
                    </View>
                </ScrollView>
                <Loading isShow={isFetching}/>
            </View>
        )
    }

}

export default connect(
    (state)=> ({
        isFetching: state.FeedReducer.isFetching,
        dataSource: state.FeedReducer.data
    }),
    (dispatch) => ({
        fetchData: () => dispatch(FeedActions.fetchFeedList()),
    })
)(FeedEntry);

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    scroll:{
        width:ScreenSize.width,
        height:ScreenSize.height
    },
    FeedHandleView:{
        marginLeft:15,
        marginTop:10,
    },
    FeedCategoryView:{
        marginTop:10,
        marginLeft:15,
        marginRight:15
    }
});

