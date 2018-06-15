'use strict';
import React, {Component} from 'react';
import {
    View,
    Text,
    Image,

} from 'react-native';
import {createMaterialTopTabNavigator} from "react-navigation";


/**
 *This is base top toolbar.
 * @author by linecy.
 */

const DEFAULT = 0;
const NO_CONTAINER_UP = 1;
const NO_CONTAINER_DOWN = 2;
const ONLY_TITLE = 3;

export default class Toolbar extends Component {

    constructor(props) {
        super(props);
        if (typeof props.barConfigs === 'undefined') {
            console.error('Toolbar config must be set for init at ToolBar.js');
        }
        this.navigationStyle = props.barConfigs.navigationStyle;
        this.backText = props.barConfigs.backText;
        this.title = props.barConfigs.title;
    }

    render() {
        return (<View style={styles.horizontal}>
            <View style={{position: 'absolute', left: 0, right: 0, top: 0,}}>
                <Text style={styles.title}>{this.title}</Text>
            </View>
            {this._renderUp()}
            {this._renderDown()}
        </View>);
    }

    _renderUp() {
        switch (this.navigationStyle) {
            case NO_CONTAINER_UP:
            case ONLY_TITLE:
                return null;

            default :
                const textNull = this.backText == null || typeof this.backText === "null" || !this.backText || this.backText.length === 0;
                return textNull ? <Image style={styles.back} source={require('../../img/ic_action_back.png')}/> :
                    <Text style={styles.backText} numberOfLines={1}>{this.backText}</Text>;
        }
    }

    _renderDown() {
        switch (this.navigationStyle) {
            case NO_CONTAINER_DOWN:
            case ONLY_TITLE:
                return null;

            default :
                return <Image style={styles.search} source={require('../../img/ic_action_search.png')}/>;
        }
    }

}


const styles = {
    horizontal: {
        flexDirection: 'row',
        backgroundColor: '#EAEAEA',
        height: 40,
    },
    title: {
        color: '#333',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
        height: 40,
        lineHeight: 40,
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

    },
    search: {
        width: 40,
        height: 40,
        position: 'absolute',
        right: 0,
        top: 0,
    },
};