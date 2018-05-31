import React, {Component} from 'react';
import NotifyOfficialListPage from "./NotifyOfficialListPage";
import NotifyOtherListPage from "./NotifyOtherListPage";
import Navigation from './navigation/Navigation';

/**
 *This  is base notify page for navigation.
 * @author by linecy.
 */

export default class NotifyPage extends Component {
    render() {
        return (<Navigation navConfig={notifyConfig}/>);
    }
}

const notifyConfig = {
    title: 'Notification',
    labArray: [NotifyOfficialListPage, NotifyOtherListPage],
    labNameArray: ['官方', '互动'],
    navigationStyle: 1
};