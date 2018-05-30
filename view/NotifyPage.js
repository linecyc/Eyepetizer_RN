import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
} from 'react-native';
import {
    createMaterialTopTabNavigator
} from 'react-navigation';
import NotifyOfficialListPage from "./NotifyOfficialListPage";
import NotifyOtherListPage from "./NotifyOtherListPage";


/**
 *This  is base notify page for navigator.
 * @author by linecy.
 */

export default class NotifyPage extends Component {

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
        screen: NotifyOfficialListPage,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '官方',
        })
    },
    Other: {
        screen: NotifyOtherListPage,
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
            fontWeight: 'bold',
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