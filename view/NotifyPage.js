import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
} from 'react-native';
import {
    createMaterialTopTabNavigator
} from 'react-navigation';
import Demo from "./Demo";


/**
 *
 * @author by linecy.
 */

export default class  extends Component {

    render() {
        return (<View style={styles.container}>
            <View style={styles.horizontal}>
                <Text style={styles.title}>Notification</Text>
                <Image style={styles.search} source={require('./img/ic_action_search.png')}/>
            </View>
            <Navigator/>
        </View>);
    }
}


const routeConfigs = {
    Official: {
        screen: Demo,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '官方',
        })
    },
    Other: {
        screen: Demo,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '互动',
        })
    }
};
const navConfigs = {
    initialRouteName: 'Official',
    lazy: true,
    tabBarOptions: {
        activeTintColor: '#333',
        inactiveTintColor: '#999',
        style: {
            backgroundColor: '#EAEAEA',
        },
        indicatorStyle: {
            //修改width其实是indicator（其实是一个View），导致没有办法居中
            backgroundColor: '#000',
        },
        labelStyle: {
            fontSize: 14,
        },
    },
};
const Navigator = createMaterialTopTabNavigator(routeConfigs, navConfigs);

const styles = {
    container: {
        flex: 1,
    },
    horizontal: {
        flexDirection: 'row',
        backgroundColor: '#EAEAEA',
    },
    title: {
        flexDirection: 'column',
        color: '#333',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 5,
        textAlign: 'center',
        flex: 1,
        marginLeft: 40,
    },
    search: {
        width: 40,
        height: 40,
        alignSelf: 'flex-end',
    },
};