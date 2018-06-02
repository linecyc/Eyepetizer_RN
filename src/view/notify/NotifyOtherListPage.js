import React, {Component} from 'react';
import {
    View,
    Text
} from 'react-native';


/**
 *
 * @author by linecy.
 */

export default class NotifyOtherListPage extends Component {

    render() {
        return (
            <View style={styles.emptyDataStyle}>
                <Text style={styles.textStyle}>暂无互动消息</Text>
            </View>);
    }
}

const styles = {
    emptyDataStyle: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    textStyle: {
        color: '#999',
        fontSize: 13,
        textAlign: 'center'
    },
};