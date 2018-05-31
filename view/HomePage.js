import React, {Component} from 'react'
import {
    Text,
    View,
    Image,
    Dimensions,
    FlatList,
} from 'react-native'
import Swiper from 'react-native-swiper'
import dataList from '../mock_data_source/official';

const {width} = Dimensions.get('window');

const styles = {
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flex: 1
    },
    horizontal: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    wrapper: {
        height: 200,
    },

    slide: {
        height: 200,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },


    text: {
        color: '#000',
        fontSize: 30,
        fontWeight: 'bold'
    },

    image: {
        width,
        flex: 1
    },
    header: {
        backgroundColor: '#fff',
        paddingLeft: 16,
        paddingTop: 32,
        paddingBottom: 16,
    },
    headerDay: {
        fontSize: 16,
        color: '#777',
        fontWeight: 'bold',
    },
    headerRecommend: {
        fontSize: 22,
        color: '#333',
        fontWeight: 'bold'
    },
    arrow: {
        width: 30,
        height: 30,
    },
    dotStyle: {
        backgroundColor: 'rgba(0,0,0,.2)',
        width: 5,
        height: 5,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3
    },
    activityDotStyle: {
        backgroundColor: '#92BBD9',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3
    },
};

export default class HomePage extends Component {


    _renderHeader = () => {
        return (
            <View>
                <View style={styles.header}>
                    <Text style={styles.headerDay}>MONDAY. MAY 28</Text>
                    <View style={styles.horizontal}>
                        <Text style={styles.headerRecommend}>开眼今日编辑精选</Text>
                        <Image style={styles.arrow} source={require('./img/ic_action_more_arrow_dark.png')}/>
                    </View>
                </View>
                <Swiper style={styles.wrapper}
                    /*onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}*/
                        dot={<View style={styles.dotStyle}/>}
                        activeDot={<View style={styles.activityDotStyle}/>}
                        paginationStyle={{
                            top: 180, bottom: null,
                        }} autoplay>
                    <View style={styles.slide}>
                        <Image resizeMode='cover' style={styles.image} source={require('./img/1.jpg')}/>
                    </View>
                    <View style={styles.slide}>
                        <Image resizeMode='contain' style={styles.image} source={require('./img/2.jpg')}/>
                    </View>
                    <View style={styles.slide}>
                        <Image resizeMode='stretch' style={styles.image} source={require('./img/3.jpg')}/>
                    </View>
                    <View style={styles.slide}>
                        <Image resizeMode='center' style={styles.image} source={require('./img/4.jpg')}/>
                    </View>
                </Swiper>
            </View>
        );
    };

    _keyExtractor = (item, index) => index + '';

    /**
     * item 需要加{}，不然undefined.
     * @param item
     * @returns {*}
     * @private
     */
    _renderItem = ({item}) => {
        return (
            <View style={{backgroundColor: '#fff', flex: 1, justifyContent: 'center'}}>
                <Text style={{margin: 16, color: '#000', textAlign: 'center'}}>{item.userId}</Text>
            </View>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text>头部导航栏</Text>
                </View>
                <FlatList
                    data={dataList.data}
                    extraData={this.state}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                    ListHeaderComponent={this._renderHeader}
                />
            </View>
        )
    }
}
