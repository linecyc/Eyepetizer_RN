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

    static isAndroidStytem() {
        return Platform.OS === 'android';
    }
}


