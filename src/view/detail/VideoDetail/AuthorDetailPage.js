import React, {Component} from 'react';
import {
    View,
    Text,
} from 'react-native';

import {Video} from 'react-native-video';


/**
 *
 * @author by linecy.
 */

export default class AuthorDetailPage extends Component {

    constructor(props) {
        super(props);
        this.data = props.navigation.state.params.data;
    }

    render() {
        return (<View style={styles.container}>
            <Text style={styles.context}>作者详情</Text>
        </View>);
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    },
    context: {
        fontSize: 20,
        color: '#666',
        textAlign: 'center',
    },
};