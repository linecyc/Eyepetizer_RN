import React, {Component} from 'react';
import {
    View,
    Image,
    ImageBackground,
    BackHandler,
    Text,
    Animated,
    Dimensions
} from 'react-native';

import SystemUtils from '../../../src/utils/SystemUtils';

/**
 *
 * @author by linecy.
 */


let navigator;

export default class Splash extends Component {

    constructor(props) {
        super(props);
        navigator = this.props.navigator;
        this.state = {
            //opacity: new Animated.Value(1),
            scale: new Animated.Value(1),
        }
    }


    componentWillMount() {
        if (SystemUtils.isAndroidSystem()) {
            BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    componentWillUnMount() {
        if (SystemUtils.isAndroidSystem()) {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
        this.jump && clearTimeout(this.jump);
    }

    onBackAndroid() {
        if (navigator) {
            let routes = navigator.getCurrentRoutes();
            if (routes.length > 3) {
                navigator.pop();
                return true;
            }
        }
        return false;
    }

    componentDidMount() {
        this.jump = setTimeout(() => {
            console.info(this.props);
            const {navigate} = this.props.navigation;
            navigate('Home')
        }, 2000);
        // Animated.timing(
        //     this.state.scale,
        //     {
        //         toValue: 1.2,
        //         duration: 2000, // 动画时间
        //     }
        // ).start();
    }

    render() {
        return (
            <Animated.View style={{flex: 1, transform: [{scaleX: this.state.scale}, {scaleY: this.state.scale}]}}>
                <ImageBackground
                    style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
                    source={require('../../../img/landing_background.jpg')}>
                    <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
                        <Image style={{width: 120, height: 40}}
                               source={require('../../../img/eye_loading_icon.png')}/>
                    </View>
                    <View style={{flex: 1, justifyContent: 'flex-end', paddingBottom: 40}}>
                        <Text style={styles.chinese}>每日精彩视频推荐，让你打开眼界。</Text>
                        <Text style={styles.english}>Daily appetizers for you eyes. Bon eyepétit.</Text>
                    </View>
                </ImageBackground>
            </Animated.View>
        );
    }
}


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
    }
};