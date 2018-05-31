import React from "react";
import {AppRegistry, YellowBox, StyleSheet, Image} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation';
import HomePage from './view/HomePage';
import ProfilePage from './view/ProfilePage';
import Demo from "./view/Demo";
import NotifyPage from "./view/NotifyPage";
import FocusPage from "./view/FocusPage";

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

const Eyepetizer = createBottomTabNavigator({
    Home: {
        screen: HomePage,
        navigationOptions: {
            tabBarLabel: '首页',
            tabBarIcon: ({focused, tintColor}) => (
                <Image
                    source={focused ? require('./img/ic_tab_home_selected.png') : require('./img/ic_tab_home.png')}
                    style={{width: 26, height: 26, tintColor: tintColor}}
                />
            ),

        }

    },
    Focus: {
        screen: FocusPage,
        navigationOptions: {
            tabBarLabel: '关注',
            tabBarIcon: ({focused, tintColor}) => (
                <Image
                    source={focused ? require('./img/ic_tab_focus_selected.png') : require('./img/ic_tab_focus.png')}
                    style={{width: 26, height: 26, tintColor: tintColor}}
                />
            ),

        }
    },
    Notify: {
        screen: NotifyPage,
        navigationOptions: {
            tabBarLabel: '通知',
            tabBarIcon: ({focused, tintColor}) => (
                <Image
                    source={focused ? require('./img/ic_tab_notify_selected.png') : require('./img/ic_tab_notify.png')}
                    style={{width: 26, height: 26, tintColor: tintColor}}
                />
            ),

        }
    },
    My: {
        screen: ProfilePage,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({focused, tintColor}) => (
                <Image
                    source={focused ? require('./img/ic_tab_profile_selected.png') : require('./img/ic_tab_profile.png')}
                    style={{width: 26, height: 26, tintColor: tintColor}}
                />
            ),
        }
    },
}, {
    //部分属性对底部导航栏无效
    animationEnabled: false, // 切换页面时是否有动画效果
    tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled: true, // 是否可以左右滑动切换tab
    backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
    tabBarOptions: {
        activeTintColor: '#333', // 文字和图片选中颜色
        inactiveTintColor: '#999', // 文字和图片未选中颜色
        showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
        indicatorStyle: {
            height: 0  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
        },
        style: {
            backgroundColor: '#fff', // TabBar 背景色
            //margin: 5,
            // height: 44
        },
        labelStyle: {
            fontSize: 14, // 文字大小
            // flex: 1,
            // justifyContent: 'center',
        },
    },
});


//  // 在 rn 中不能 require 一个变量。uri 需要写一个网络地址，或者是 file:// 地址。
//
// function setTabStyle(page, tabName, tabNormalIcon, tabSelectorIcon) {
//     return {
//         screen: page,
//         navigationOptions: {
//             tabBarLabel: tabName,
//             tabBarIcon: ({focused, tintColor}) => (
//                 <Image
//                     source={focused ? require(tabSelectorIcon) : require(tabNormalIcon)}
//                     style={{width: 26, height: 26, tintColor: tintColor}}
//                 />
//             ),
//
//         }
//     }
// }

AppRegistry.registerComponent('Eyepetizer_RN', () => Eyepetizer);