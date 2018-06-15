import React, {Component} from "react";
import {createMaterialTopTabNavigator} from "react-navigation";
import Toolbar from "../../navigation/Toolbar";
import {View} from "react-native";
import NotifyOfficialListPage from "./NotifyOfficialListPage";
import NotifyOtherListPage from "./NotifyOtherListPage";
/**
 *This  is base notify page for navigation.
 * @author by linecy.
 */


/**
 *
 * @author by linecy.
 */
const routeConfigs = {
    NotifyOfficialListPage: {
        screen: NotifyOfficialListPage,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '官方',
        })
    },
    NotifyOtherListPage: {
        screen: NotifyOtherListPage,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '互动',
        })
    }
};
const navConfigs = {
    lazy: true,
    backBehavior: 'none',
    tabBarOptions: {
        activeTintColor: '#333',
        inactiveTintColor: '#999',
        style: {
            backgroundColor: '#EAEAEA',
        },
        indicatorStyle: {
            backgroundColor: '#000',
        },
        labelStyle: {
            fontSize: 14,
            fontWeight: 'bold',
        },
    },
};

const notifyConfig = {
    title: 'Notification',
    navigationStyle: 1
};
const Nav = createMaterialTopTabNavigator(routeConfigs, navConfigs);

export default class NotifyPage extends Component {
    render() {
        return (<View style={{flex: 1}}>
            <Toolbar barConfigs={notifyConfig}/>
            <Nav navigat={this.props.navigation}/>
        </View>);
    }
}