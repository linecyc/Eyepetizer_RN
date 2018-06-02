'use strict';
import React, {Component} from 'react';
import {
    View,
    Text,
    Image,

} from 'react-native';
import {createMaterialTopTabNavigator} from "react-navigation";


/**
 *This is Navigation for most page.
 * @author by linecy.
 */

const NavigatorStyle = {
    DEFAULT: 0,
    NO_CONTAINER_UP: 1,
    NO_CONTAINER_DOWN: 2,
    ONLY_TITLE: 3
};

export default class Navigate extends Component {

    constructor(props) {
        super(props);
        if (typeof props.navConfig === 'undefined') {
            console.error('Navigation config must be set for init');
        }
        this.navigatorStyle = props.navConfig.navigatorStyle;
        this.backText = props.navConfig.backText;
        this.title = props.navConfig.title;
        this.labArray = props.navConfig.labArray;
        this.labNameArray = props.navConfig.labNameArray;
        if (typeof props.initialRoute === 'undefined') {
            this.initialRoute = "First";
        } else {
            this.initialRoute = props.navConfig.initialRoute;
        }

        if (props.navConfig.labArray.length !== 2 || props.navConfig.labArray.length !== props.navConfig.labNameArray.length) {
            console.error('The same length as labNameArray and labArray,and length equals 2');
        }

        this.routeConfigs = {
            First: {
                screen: this.labArray[0],
                navigationOptions: ({navigation}) => ({
                    tabBarLabel: this.labNameArray[0],
                })
            },
            Second: {
                screen: this.labArray[1],
                navigationOptions: ({navigation}) => ({
                    tabBarLabel: this.labNameArray[1],
                })
            }
        };
        this.navConfigs = {
            initialRouteName: this.initialRoute,
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
    }

    _renderDefaultNavigator = () => {
        let Up = null;
        let Down = null;
        switch (this.navigatorStyle) {
            case NavigatorStyle.NO_CONTAINER_UP:
                Up = null;
                Down = () => {
                    return (<Image style={styles.search} source={require('../../img/ic_action_search.png')}/>);
                };
                break;

            case NavigatorStyle.NO_CONTAINER_DOWN:
                const textNull = this.backText == null || typeof this.backText === "null" || !this.backText || this.backText.length === 0;

                Up = () => {
                    return (textNull ?
                        <Image style={styles.back} source={require('../../img/ic_action_back.png')}/> :
                        <Text style={styles.backText} numberOfLines={1}>{this.backText}</Text>);
                };
                Down = null;
                break;

            case NavigatorStyle.ONLY_TITLE:
                Up = null;
                Down = null;
                break;

            default:
                const textNull2 = this.backText == null || typeof this.backText === "null" || !this.backText || this.backText.length === 0;

                Up = () => {
                    return (textNull2 ?
                        <Image style={styles.back} source={require('../../img/ic_action_back.png')}/> :
                        <Text style={styles.backText} numberOfLines={1}>{this.backText}</Text>);
                };
                Down = () => {
                    return (<Image style={styles.search} source={require('../../img/ic_action_search.png')}/>);
                };

                break;
        }

        let Nav = createMaterialTopTabNavigator(this.routeConfigs, this.navConfigs);
        return (<View style={styles.container}>
            <View style={styles.horizontal}>
                <Up/>
                <View style={styles.container}>
                    <Text style={styles.title}>{this.title}</Text>
                </View>
                <Down/>
            </View>
            <Nav/>
        </View>);
    };

    render() {
        return this._renderDefaultNavigator();
    }


}


const styles = {
    container: {
        flex: 1,
    },
    horizontal: {
        flexDirection: 'row',
        backgroundColor: '#EAEAEA',
    },
    title: {
        color: '#333',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 5,
        textAlign: 'center',
        alignSelf: 'center',
    },
    back: {
        width: 40,
        height: 40,
        alignSelf: 'flex-start',
    },
    backText: {
        height: 40,
        lineHeight: 40,
        alignSelf: 'flex-start',
        fontSize: 12,
        color: '#666',
        marginLeft: 10,
        //verticalAlign: 'middle',

    },
    search: {
        width: 40,
        height: 40,
        alignSelf: 'flex-end',
    },
};