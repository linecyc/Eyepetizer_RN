import ProductionPage from "./ProductionPage";
import DynamicPage from "./DynamicPage";
import {createMaterialTopTabNavigator} from "react-navigation";

/**
 *
 * @author by linecy.
 */
const routeConfigs = {
    ProductionPage: {
        screen: ProductionPage,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '作品',
            title: "我的ddd",
        })
    },
    DynamicPage: {
        screen: DynamicPage,
        navigationOptions: ({navigation}) => ({
            tabBarLabel: '动态',
            title: "我的",
        })
    }
};

const navConfigs = {
    lazy: true,
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


export default createMaterialTopTabNavigator(routeConfigs, navConfigs);