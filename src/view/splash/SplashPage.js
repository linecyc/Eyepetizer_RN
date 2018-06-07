import React, {Component} from 'react';
import {
    View,
    Image,
    ImageBackground,
    Text,
    Animated,
} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';

/**
 *
 * @author by linecy.
 */



export default class Splash extends Component {

    constructor(props) {
        super(props);
        this.state = {
            opacity: new Animated.Value(1),
            scale: new Animated.Value(1),
        }
    }

    /**不退回闪屏页的方法：
     * 方法一：dispatch,同时不需要navigate,不然会打开两个页面，然后销毁一个，体验不好
     * 方法二：SwitchNavigator,详见index.js.
     * @private
     */
    _goHome() {
        // const {navigate} = this.props.navigation;
        // navigate('Home');
        this.props.navigation.dispatch(resetAction);
    }

    /**
     * Animated 动画
     *
     * sequence 顺序执行
     * parallel  同时执行
     * stagger：错峰，其实就是插入了delay的parallel
     * delay：延迟
     */
    componentDidMount() {
        this.animation = Animated.sequence(
            [Animated.timing(
                this.state.opacity,
                {
                    toValue: 0,
                    duration: 3000, // 动画时间
                }
            ), Animated.timing(
                this.state.scale,
                {
                    toValue: 1.2,
                    duration: 2000,
                }
            )]);
        this.animation.start(() => this._goHome());
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Animated.View style={{
                    flex: 1,
                    transform: [{scaleX: this.state.scale}, {scaleY: this.state.scale}],
                }}>
                    <ImageBackground
                        style={{flex: 1}}
                        source={require('../../../img/landing_background.jpg')}>
                    </ImageBackground>
                </Animated.View>
                <View style={styles.absolute}>
                    <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
                        <Image style={{width: 120, height: 40}}
                               source={require('../../../img/eye_loading_icon.png')}/>
                    </View>
                    <View style={{flex: 1, justifyContent: 'flex-end', paddingBottom: 40}}>
                        <Text style={styles.chinese}>每日精彩视频推荐，让你打开眼界。</Text>
                        <Text style={styles.english}>Daily appetizers for you eyes. Bon eyepétit.</Text>
                    </View>
                </View>
                <Animated.View
                    style={[styles.absolute, {opacity: this.state.opacity, backgroundColor: '#000'}]}/>
            </View>
        );
    }
}

//设置新路由的第0个路由为Home
//StackActions替代NavigationActions

const resetAction = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({routeName: 'Home'}),
    ],
});

const styles = {
    chinese: {
        fontSize: 12,
        color: '#fff',
        textAlign: 'center',
        paddingBottom: 16
    },
    english: {
        fontSize: 13,
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    absolute: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    }
};