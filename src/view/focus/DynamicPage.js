import React, {Component} from 'react';
import {
    SectionList,
    Text,
    View,
    Image,
} from 'react-native';


/**
 *
 * @author by linecy.
 */

export default class DynamicPage extends Component {

    render() {
        return (<View style={styles.emptyDataStyle}>
            <Text style={styles.textStyle}>暂无动态消息</Text>
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