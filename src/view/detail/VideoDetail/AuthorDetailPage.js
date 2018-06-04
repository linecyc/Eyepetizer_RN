import React, {Component} from 'react';
import {
    View,
    Text,
} from 'react-native';


/**
 *
 * @author by linecy.
 */

export default class AuthorDetailPage extends Component {

    constructor(props) {
        super(props);
        this.title = props.title;
        console.info(this.props.data)
    }

    render() {
        return (<View style={styles.container}>
            <Text style={styles.context}>哈哈哈</Text>
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