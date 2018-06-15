import React, {Component} from 'react';
import {
    Image,
    Text,
    View,
    ScrollView,
    TouchableHighlight,
    TouchableWithoutFeedback,
    NativeModules,
    ToastAndroid,
} from 'react-native';


/**
 *
 * @author by linecy.
 */

export default class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            accountName: null,
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.navigation.isFocused();
    }

    //TouchableHighlight跳转时会报一个超时未取消的错？
    //Attempted to transition from state `RESPONDER_INACTIVE_PRESS_IN` to `RESPONDER_ACTIVE_LONG_PRESS_IN`, which is not supported.
    //This is most likely due to `Touchable.longPressDelayTimeout` not being cancelled.
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image style={styles.menu} source={require('../../../img/ic_menu_more.png')}/>
                    <TouchableWithoutFeedback onPress={() => {
                        if (!this.state.isLogin) {
                            NativeModules
                                .IntentModule
                                .startActivityForResultFromJS("com.eyepetizer_rn.ui.account.LoginRegisterActivity", null)
                                .then((data) => JSON.parse(data))
                                .then((data) => {
                                    this.setState({
                                        isLogin: true,
                                        accountName: data.accountName,
                                    });
                                })
                                .catch((e) => {
                                    console.info(e);
                                });
                        } else {
                            ToastAndroid.show('点击了跳转个人主页', ToastAndroid.SHORT);
                        }
                    }}>
                        <Image style={styles.avatar}
                               source={this.state.isLogin ? require('../../../img/ic_avatar.jpg') : require('../../../img/account_default_avatar.png')}/>
                    </TouchableWithoutFeedback>
                    {this.state.isLogin ? <View>
                        <Text style={styles.userName}>{this.state.accountName}</Text>
                        <TouchableWithoutFeedback onPress={() => {
                            ToastAndroid.show('点击了跳转个人主页', ToastAndroid.SHORT);
                        }}>
                            <View style={{justifyContent:'center'}}>
                                <Text style={{textAlign: 'center'}}>查看个人主页 ></Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View> : <Text style={{padding: 16, color: '#666', fontSize: 12,}}>点击登录后可评论</Text>}
                    <View style={styles.horizontal}>
                        <View style={styles.horizontalControl}>
                            <Image style={styles.menu} source={require('../../../img/ic_grey_heart.png')}/>
                            <Text>喜欢</Text>
                        </View>
                        <Text style={styles.divider}>|</Text>
                        <View style={styles.horizontalControl}>
                            <Image style={styles.menu} source={require('../../../img/menu_download_icon.png')}/>
                            <Text>缓存</Text>
                        </View>

                    </View>
                </View>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <Text style={styles.listItem}>我的关注</Text>
                    <Text style={styles.listItem}>观看记录</Text>
                    <Text style={styles.listItem}>功能开关</Text>
                    <Text style={styles.listItem}>成为作者</Text>
                    <Text style={styles.listItem}>意见反馈</Text>
                    <Text style={styles.listItem}>version 3.19.0 build 4309</Text>
                </ScrollView>
            </View>
        );
    }
}


const styles = {
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#EAEAEA',
        alignItems: 'center',
        paddingBottom: 16,
    },
    scrollView: {
        paddingTop: 20,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        //showsVerticalScrollIndicator: false,//不支持
    },
    menu: {
        width: 40,
        height: 40,
        alignSelf: 'flex-end',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 45,
        //borderColor:'#666',
        //borderWidth:1,
        resizeMode: 'cover',
    },
    userName: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
        margin: 16,
        textAlign: 'center'
    },
    horizontal: {
        flexDirection: 'row',
    },
    horizontalControl: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,//相当于Android控件中的weight属性
    },
    divider: {
        alignSelf: 'center',
    },
    listItem: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        margin: 16,
    }
};