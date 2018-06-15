import React, {Component} from "react";
import ProductionPage from "./ProductionPage";
import DynamicPage from "./DynamicPage";
import {createMaterialTopTabNavigator} from "react-navigation";
import {View} from "react-native";
import Toolbar from "../../navigation/Toolbar";


const routeConfigs = {
    ProductionPage: {
        screen: ProductionPage,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '作品',
        })
    },
    DynamicPage: {
        screen: DynamicPage,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '动态',
        })
    }
};
const focusConfig = {
    title: 'Subscription',
    backText: '发布作品',
    navigationStyle: 0
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

export default class FocusPage extends Component {
    render() {
        return (<View style={{flex: 1}}>
            <Toolbar barConfigs={focusConfig}/>
            <Nav/>
        </View>);
    }
}
const Nav = createMaterialTopTabNavigator(routeConfigs, navConfigs);