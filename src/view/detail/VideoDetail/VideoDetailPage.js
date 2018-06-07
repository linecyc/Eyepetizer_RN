import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    FlatList,
} from 'react-native';
import VideoPlayer from "./VideoPlayer";

import Orientation from 'react-native-orientation';

/**
 *
 * @author by linecy.
 */

export default class VideoDetailPage extends Component {

    constructor(props) {
        super(props);
        this.itemData = props.navigation.state.params.data;
        this.state = {
            isFullScreen: false,
        }
    }

    componentDidMount() {
        Orientation.addOrientationListener(this._orientationDidChange);
    }

    _orientationDidChange = (orientation) => {
        this.setState({
            isFullScreen: orientation === 'LANDSCAPE',
        });
    };

    componentWillUnmount() {
        Orientation.removeOrientationListener(this._orientationDidChange);
    }

    _renderTAg = (tag) => {
        return (
            <ImageBackground
                key={tag.id}
                style={{borderRadius: 5, flex: 1, marginLeft: 4, marginRight: 4,}}
                source={{uri: tag.headerImage}}>
                <Text style={{
                    color: '#fff',
                    fontSize: 10,
                    paddingTop: 8,
                    paddingBottom: 8,
                    textAlign: 'center'
                }}>{'#' + tag.name + '#'}</Text>
            </ImageBackground>);
    };

    render() {
        return (<View style={styles.container}>
            <VideoPlayer data={{
                title: this.itemData.data.title,
                playUrl: this.itemData.data.playUrl,
                showCover: true,
                coverUrl: this.itemData.data.cover.feed,
                duration: this.itemData.data.duration,
            }}{...this.props}/>
            {this.state.isFullScreen ? null : <ImageBackground style={[styles.container, {padding: 16}]}
                                                               source={{uri: this.itemData.data.cover.blurred}}>
                <Text style={{
                    color: '#fff',
                    fontSize: 15,
                    fontWeight: 'bold',
                    flexWrap: 'wrap'
                }}>{this.itemData.data.title}</Text>

                <Text style={{
                    color: '#fff',
                    fontSize: 12,
                }}
                      numberOfLines={1}>{'# ' + this.itemData.data.category + ' / ' + this.itemData.data.duration}</Text>
                <Text style={{
                    color: '#fff',
                    fontSize: 13,
                    flexWrap: 'wrap',
                    paddingTop: 16,
                    paddingBottom: 16
                }}>{this.itemData.data.description}</Text>
                <View style={[styles.horizontal, {alignItems: 'center',}]}>
                    <View style={[styles.horizontal, {alignItems: 'center', paddingRight: 20,}]}>
                        <Image style={styles.consumptionImage}
                               source={require('../../../../img/ic_action_favorites_without_padding.png')}/>
                        <Text style={{
                            color: '#fff',
                            fontSize: 12,
                            flexWrap: 'wrap',
                            textAlign: 'center',
                            paddingLeft: 8,
                        }}>{this.itemData.data.consumption.collectionCount}</Text>
                    </View>
                    <View style={[styles.horizontal, {alignItems: 'center', paddingRight: 20,}]}>
                        <Image style={styles.consumptionImage}
                               source={require('../../../../img/ic_action_share_without_padding.png')}/>
                        <Text style={{
                            color: '#fff',
                            fontSize: 12,
                            flexWrap: 'wrap',
                            textAlign: 'center',
                            paddingLeft: 8,
                        }}>{this.itemData.data.consumption.shareCount}</Text>
                    </View>
                    <View style={[styles.horizontal, {alignItems: 'center', paddingRight: 20,}]}>
                        <Image style={styles.consumptionImage}
                               source={require('../../../../img/ic_action_reply_without_padding.png')}/>
                        <Text style={{
                            color: '#fff',
                            fontSize: 12,
                            flexWrap: 'wrap',
                            textAlign: 'center',
                            paddingLeft: 8,
                        }}>{this.itemData.data.consumption.replyCount}</Text>
                    </View>
                    <View style={[styles.horizontal, {alignItems: 'center', paddingRight: 20,}]}>
                        <Image style={styles.consumptionImage}
                               source={require('../../../../img/ic_action_offline_without_padding.png')}/>
                        <Text style={{
                            color: '#fff',
                            fontSize: 12,
                            flexWrap: 'wrap',
                            textAlign: 'center',
                            paddingLeft: 8,
                        }}>缓存</Text>
                    </View>
                </View>
                <View style={{height: 0.5, backgroundColor: '#999', marginTop: 16, marginBottom: 16}}/>
                <View
                    style={[styles.horizontal, {justifyContent: 'space-between',}]}>
                    {this.itemData.data.tags.map(this._renderTAg)}
                </View>
                <View style={{height: 0.5, backgroundColor: '#999', marginTop: 16, marginBottom: 16}}/>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: 8,
                }}>
                    <Image style={styles.avatar} source={{uri: this.itemData.data.author.icon}}/>
                    <View style={{alignItems: 'flex-start', flex: 1, paddingLeft: 6,}}>
                        <Text style={{
                            fontSize: 13,
                            color: '#fff',
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}>{this.itemData.data.author.name}</Text>
                        <Text style={{
                            fontSize: 10,
                            color: '#fff',
                            flexWrap: 'wrap',
                        }}>{this.itemData.data.author.description}</Text>
                    </View>
                    <View style={{
                        alignSelf: 'flex-end',
                        borderRadius: 3,
                        borderWidth: 1,
                        borderColor: '#fff',
                        marginLeft: 5,
                        marginBottom: 12
                    }}>
                        <Text style={{
                            color: '#fff',
                            fontSize: 10,
                            paddingLeft: 6,
                            paddingRight: 6,
                            paddingTop: 3,
                            paddingBottom: 3,
                        }}>{'+关注'}</Text>
                    </View>
                </View>
                <View style={{height: 0.5, backgroundColor: '#999', marginTop: 16, marginBottom: 16}}/>
            </ImageBackground>}
        </View>);
    }
}

const styles = {
    container: {
        flex: 1,
    },

    horizontal: {
        flexDirection: 'row',
    },

    consumptionImage: {
        width: 20,
        height: 20,
    },
    context: {
        fontSize: 20,
        color: '#666',
        textAlign: 'center',
    },
    avatar: {
        width: 35,
        height: 35,
        resizeMode: "cover",
        borderRadius: 45,
    },
};