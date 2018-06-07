import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
    StatusBar,
    Slider, BackHandler, ToastAndroid,
} from 'react-native';


import Video from 'react-native-video';
import Orientation from 'react-native-orientation';
import SystemUtils from "../../../utils/SystemUtils";

/**
 *视频播放器
 * @author by linecy.
 */


const screenW = SystemUtils.getScreenWidth();
const screenH = SystemUtils.getScreenHeight();
const defaultH = 200;

export default class VideoPlayer extends Component {

    constructor(props) {
        super(props);
        if (typeof props.data === 'undefined') {
            console.error('Navigation config must be set for init');
        }
        this.playUrl = props.data.playUrl;
        this.showCover = props.data.showCover;
        this.coverUrl = props.data.coverUrl;
        this.duration = props.data.duration;
        this.title = props.data.title;
        this.state = {
            showCover: true,        //是否显示封面
            showVideoControl: true, // 是否展示视频控件
            isPlaying: false,       // 是否正在播放
            isFullScreen: false,    // 是否全屏
            currentTime: 0,         // 当前播放时间节点
            duration: this.duration,            // 视频的总时长
            playFromStart: false, // 是否从头开始播放

        }
    }

    componentWillMount() {
        if (SystemUtils.isAndroidSystem()) {
            BackHandler.addEventListener('hardwareBackPress', this._onBackPressed.bind(this));
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        if (SystemUtils.isAndroidSystem()) {
            BackHandler.removeEventListener('hardwareBackPress', this._onBackPressed.bind(this));
        }
        this.time && clearTimeout(this.time);
    }

    render() {

        return (<View>
            <StatusBar hidden={this.state.isFullScreen}/>
            <TouchableWithoutFeedback
                onPressIn={() => {
                    this._clearTimeOut();
                    this.setState({showVideoControl: !this.state.showVideoControl});
                }}
                onPressOut={() => {
                    //onPressOut之后才会执行onPress
                    //离开之后才，如果是在显示，需要设置定时器，消失控制层
                    this._setTimeOut();
                }}
            >
                <View style={this.state.isFullScreen ? styles.containerLandscape : styles.containerPortrait}>
                    <View style={{flex: 1, backgroundColor: '#000'}}>
                        <Video
                            style={styles.video}
                            ref={(ref) => this.videoPlayer = ref}
                            source={{uri: this.playUrl}}
                            rate={1.0}
                            volume={1.0}
                            muted={false}
                            paused={!this.state.isPlaying}
                            resizeMode="contain"
                            playWhenInactive={false}
                            playInBackground={false}
                            ignoreSilentSwitch={'ignore'}
                            progressUpdateInterval={250.0}
                            onLoadStart={this._onLoadStart}
                            onLoad={this._onLoaded}
                            onProgress={this._onProgressChanged}
                            onEnd={this._onPlayEnd}
                            onError={this._onPlayError}
                            onBuffer={this._onBuffering}
                        />
                    </View>
                    {this.state.showCover ?
                        <Image style={styles.cover} source={{uri: this.coverUrl}}/> : null}
                    {this.state.showVideoControl ? <View style={[styles.playContainer, {}]}>
                        <TouchableWithoutFeedback style={{alignSelf: 'flex-start'}} onPress={() => {
                            this._onBackOrMinScreen();
                        }}>
                            <Image style={styles.imageButton35}
                                   source={this.state.isFullScreen ? require('../../../../img/ic_action_min_screen.png') : require('../../../../img/ic_action_detail_back.png')}/>
                        </TouchableWithoutFeedback>
                        {this.state.isFullScreen ? <Text style={{
                            position: 'absolute',
                            left: 35,
                            top: 8,
                            color: '#fff',
                            fontSize: 13
                        }}>{this.title}</Text> : null}
                        <View
                            style={[styles.horizontal, {position: 'absolute', right: 0, top: 5, alignItems: 'center'}]}>
                            <Image style={styles.imageButton35}
                                   source={require('../../../../img/ic_action_favorites.png')}/>
                            <Image style={styles.imageButton35}
                                   source={require('../../../../img/ic_action_share.png')}/>
                            <Image style={styles.imageButton35}
                                   source={require('../../../../img/ic_menu_more_white.png')}/>
                        </View>
                        <View style={[styles.horizontal, {
                            flex: 1,
                            alignSelf: 'center',
                            alignItems: 'center',
                        }]}>
                            <TouchableWithoutFeedback onPressIn={() => this._clearTimeOut()}
                                                      onPressOut={() => this._onPlay(!this.state.isPlaying)}>
                                <Image style={styles.imageButton60}
                                       source={this.state.isPlaying ? require('../../../../img/ic_player_pause.png') : require('../../../../img/ic_player_play.png')}/>
                            </TouchableWithoutFeedback>
                        </View>
                        {this.state.isFullScreen ? null : <TouchableWithoutFeedback onPress={() => {
                            this._onFullScreen()
                        }}>
                            <Image style={[styles.imageButton35, {alignSelf: 'flex-end'}]}
                                   source={require('../../../../img/ic_action_full_screen.png')}/>
                        </TouchableWithoutFeedback>}

                        <Slider
                            maximumTrackTintColor={'#999999'}
                            minimumTrackTintColor={'#4c7ee9'}
                            thumbTintColor={'#fff'}
                            //无效？
                            //thumbImage={require('../../../../img/ic_player_progress_handle.png')}
                            value={this.state.currentTime}
                            minimumValue={0}
                            maximumValue={this.state.duration}
                            onValueChange={(currentTime) => {
                                //滑动时回调
                                if (this.state.isPlaying) {
                                    this.setState({
                                        isPlaying: false,
                                    });
                                }
                                this._clearTimeOut();
                            }}
                            onSlidingComplete={(value) => {
                                //结束时回调
                                this.setState({
                                    currentTime: value,
                                    isPlaying: true,
                                    showCover: false,
                                });
                                this.videoPlayer.seek(value);
                                this._clearTimeOut();
                            }}
                        />
                    </View> : null}
                </View>
            </TouchableWithoutFeedback>
        </View>);
    }

    _clearTimeOut() {
        if (this.time) {
            clearTimeout(this.time);
        }

    }

    _setTimeOut() {
        if (this.state.showVideoControl) {
            this.time = setTimeout(() => {
                this.setState({
                    showVideoControl: false
                });
            }, 5000);
        }
    }

    _onFullScreen() {
        if (this.state.isFullScreen) {
            Orientation.lockToPortrait();
            this.setState({isFullScreen: false});
        } else {
            Orientation.lockToLandscape();
            this.setState({isFullScreen: true});
        }
    }

    /**
     * 点击返回图片时调用，区别于物理按键
     * @private
     */
    _onBackOrMinScreen() {
        if (this.state.isFullScreen) {
            this._onFullScreen();
        } else {
            this.props.navigation.pop();
        }

    }

    /**
     * 物理返回按按下是调用
     * @returns {boolean}
     * @private
     */
    _onBackPressed() {
        if (this.state.isFullScreen) {
            this._onFullScreen();
            //消费掉该事件，只退出全屏，不退出页面
            return true;
        } else {
            //退出当前页
            return false;
        }
    }

    /// -------Video组件回调事件-------

    _onLoadStart = () => {
        console.log('视频开始加载');
    };

    _onBuffering = () => {
        console.log('视频缓冲中...')
    };

    _onLoaded = (data) => {
        console.log('视频加载完成');
        this.setState({
            duration: data.duration,
        });
        this.videoPlayer.seek(this.state.currentTime);
    };

    _onProgressChanged = (data) => {
        console.log('视频进度更新');
        if (this.state.isPlaying) {
            this.setState({
                currentTime: data.currentTime,
            })
        }
    };

    _onPlayEnd = () => {
        console.log('视频播放结束');
        this.setState({
            currentTime: 0,
            isPlaying: false,
            playFromStart: true
        });
    };

    _onPlayError = () => {
        console.log('视频播放失败');
    };

    /**
     * 播放或者暂停
     * @param play 需要播放还是暂停
     * @private
     */
    _onPlay(play) {
        this.setState({
            isPlaying: play,
            showCover: !play,
        });
        this.videoPlayer.seek(this.state.currentTime);
        this._setTimeOut();
    }

}


const styles = {
    containerPortrait: {
        width: screenW,
        height: defaultH,
    },
    containerLandscape: {
        width: screenH,
        height: screenW,
    },
    horizontal: {
        flexDirection: 'row',
    },
    video: {
        flex: 1,
        //width: screenW,
        //height: defaultH,
    },
    playContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
    cover: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
    imageButton35: {
        width: 35,
        height: 35,
    },
    imageButton60: {
        width: 60,
        height: 60,
    }
};