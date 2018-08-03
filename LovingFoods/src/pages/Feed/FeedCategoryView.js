import React,{ Component } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import {ScreenSize} from "../../constants/AppConfigure";

export default class FeedCategoryView extends Component {

    static propTypes = {
        mapList: PropTypes.object,
        onPress: PropTypes.func
    };

    _handleItem = (item)=> {
        const { mapList, onPress } = this.props;
        onPress({
            ...item,
            kind:mapList.kind
        });
    }

    render(){
        const { mapList } = this.props;
        let title = '食物分类';
        if (mapList.kind === 'brand') {
            title = '热门品牌';
        } else if (mapList.kind === 'restaurant') {
            title = '连锁餐饮';
        }
        return (
            <View style={[this.props.style,{backgroundColor:'white'}]}>
                <View style={styles.FeedCategoryViewHeader}>
                    <Text style={{marginTop:3,color:'gray'}}>{title}</Text>
                    <View style={{width:ScreenSize.width-15*2,height:14,backgroundColor:'rgb(233,233,238)'}}>
                        <Image source={require('../../resource/img_home_list_bg.png')} style={{width:ScreenSize.width-15*2,height:14}}/>
                    </View>
                </View>
                <View style={{backgroundColor:'white',flexDirection:'row',flexWrap:'wrap'}}>
                    { mapList.categories.map((item)=>{
                        return <FeedCategoryItem item={item} onPress={this._handleItem}/>
                    })
                    }
                </View>
            </View>
        );
    }

}

class FeedCategoryItem extends Component {

    static propTypes = {
        item: PropTypes.object,
        onPress: PropTypes.func
    };

    render(){
        const {item, onPress} = this.props;
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={()=>{
                onPress(item);
            }} style={styles.categoryItem}>
                <Image source={{uri:item.image_url}} resizeMode='contain' style={{marginTop: 5,width:40,height:40}}/>
                <Text style={{marginTop:6,fontSize:13,color:'gray'}}>{item.name}</Text>
            </TouchableOpacity>
        );
    }

}

var styles = StyleSheet.create({
    categoryItem:{
        alignItems:'center',
        marginBottom:25,
        width: (ScreenSize.width - 15*2)/3.0,
        height: 65
    },
    FeedCategoryViewHeader:{
        justifyContent:'center',
        alignItems:'center',
        height:40
    }
});