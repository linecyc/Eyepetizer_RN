import React, {Component} from 'react';
import {
    Dimensions,
    Platform,
} from 'react-native';


/**
 *
 * @author by linecy.
 */

export default class SystemUtils extends Component {


    static getScreenWidth() {
        return Dimensions.get('window').width;
    }

    static getScreenHeight() {
        return Dimensions.get('window').height;
    }

    static isAndroidSystem() {
        return Platform.OS === 'android';
    }
}


