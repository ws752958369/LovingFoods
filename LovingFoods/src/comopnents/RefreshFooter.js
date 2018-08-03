import React,{ Component } from 'react';
import {
    View,
    ActivityIndicator,
    Text,
    StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';

export default class RefreshFooter extends Component {

    static propTypes = {
        isNoMore: PropTypes.bool
    };

    render(){
        const { isNoMore } = this.props;
        const title = isNoMore?"- 没有更多数据了 -":"正在加载更多数据...";

        return (
            <View style={styles.container}>
                { !isNoMore && <ActivityIndicator /> }
                <Text style={styles.title}>{title}</Text>
            </View>
        )
    }

}

var styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40
    },
    title:{
        fontSize: 14,
        marginLeft: 5,
        color: 'gray'
    }
});