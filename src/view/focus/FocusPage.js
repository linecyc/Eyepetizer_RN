import React, {Component} from 'react';
import Navigation from '../../navigation/Navigation';
import Demo from "../Demo";

/**
 *
 * @author by linecy.
 */

export default class FocusPage extends Component {

    render() {
        return (<Navigation navConfig={focusConfig}/>);
    }
}

const focusConfig = {
    title: 'Subscription',
    labArray: [Demo, Demo],
    labNameArray: ['作品', '动态'],
    backText: '发布作品',
    navigationStyle: 0
};