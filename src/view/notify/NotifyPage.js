import {createMaterialTopTabNavigator} from "react-navigation";
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