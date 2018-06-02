import React, {Component} from 'react'
import {
    Text,
    View,
    Image,
    FlatList,
    ActivityIndicator,
    SectionList,
} from 'react-native'
import Swiper from 'react-native-swiper'
import SystemUtils from '../../utils/SystemUtils';


const styles = {
    container: {
        flex: 1
    },
    horizontal: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    horizontalTopTab: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EAEAEA',
        justifyContent: 'center'
    },
    wrapper: {
        height: 230,
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
    emptyDataStyle: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    imageCover: {
        height: 180,
        resizeMode: "stretch",
        borderRadius: 5,
    },
    avatar: {
        width: 35,
        height: 35,
        resizeMode: "cover",
        borderRadius: 45,
        padding: 10,
        alignSelf: 'flex-start',
    },


};

const baseUrl = 'http://baobab.kaiyanapp.com/api/v4/tabs/selected';

export default class RecommendPage extends Component {


    constructor(props) {
        super(props);

        this.state = {
            selected: 1,//顶部导航栏默认选中第二个（0开始）
            isFirst: true,
            isRefreshing: false,
            error: false,
            headerArray: [],
            dataArray: [],
        }
        ;
    }

    _renderHeader = () => {
        return (
            <View>
                <View style={styles.header}>
                    <Text style={styles.headerDay}>MONDAY. MAY 28</Text>
                    <View style={styles.horizontal}>
                        <Text style={styles.headerRecommend}>开眼今日编辑精选</Text>
                        <Image style={styles.arrow} source={require('../../../img/ic_action_more_arrow_dark.png')}/>
                    </View>
                </View>
                <Swiper style={styles.wrapper}
                    /*onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}*/
                        dot={<View style={styles.dotStyle}/>}
                        activeDot={<View style={styles.activityDotStyle}/>}
                        paginationStyle={{
                            top: 180, bottom: null,
                        }} autoplay={true} loop={true}>
                    {this.state.headerArray.map(this._renderBannerItem)}
                </Swiper>
                <View{{flex: 1, height: 1, paddingTop: 16, backgroundColor: '#999'}}/>
            </View>
        );

    };

    _renderBannerItem(item, index) {
        return (
            <View key={index} style={{backgroundColor: '#fff', flex: 1, justifyContent: 'center', padding: 16}}>
                <Image style={styles.imageCover} source={{uri: item.data.cover.feed}}/>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: 8,
                }}>
                    <Image style={styles.avatar} source={{uri: item.data.author.icon}}/>
                    <View style={{alignItems: 'flex-start', flex: 1, paddingLeft: 6,}}>
                        <Text style={{
                            fontSize: 13,
                            color: '#333',
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}>{item.data.title}</Text>
                        <Text style={{fontSize: 10, color: '#999', textAlign: 'center'}}>{item.data.slogan}</Text>
                    </View>
                    <Image style={{
                        width: 30,
                        height: 30,
                        alignSelf: 'flex-end',
                    }} source={require('../../../img/ic_action_share_grey.png')}/>
                </View>
            </View>
        );
    }

    _renderSectionHeader(item) {
        console.info(item);
        return (
            <View style={{backgroundColor: '#fff', flex: 1, justifyContent: 'center', padding: 16}}>
                <View style={[styles.horizontal, {paddingBottom: 16}]}>
                    <Text style={{
                        fontSize: 16,
                        color: '#333',
                        fontWeight: 'bold',
                    }}>{item.data.category}</Text>
                    <Image style={{
                        width: 30,
                        height: 30,
                    }} source={require('../../../img/ic_action_more_arrow_dark.png')}/>
                </View>
                <Image style={styles.imageCover} source={{uri: item.data.cover.feed}}/>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: 8,
                }}>
                    <Image style={styles.avatar} source={{uri: item.data.author.icon}}/>
                    <View style={{alignItems: 'flex-start', flex: 1, paddingLeft: 6,}}>
                        <Text style={{
                            fontSize: 13,
                            color: '#333',
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}>{item.data.title}</Text>
                        <Text style={{
                            fontSize: 10,
                            color: '#999',
                            textAlign: 'center'
                        }}>{item.data.author.name + ' / # ' + item.data.category}</Text>
                    </View>
                    <Image style={{
                        width: 30,
                        height: 30,
                        alignSelf: 'flex-end',
                    }} source={require('../../../img/ic_action_share_grey.png')}/>
                </View>
            </View>
        );
    }

    _keyExtractor = (item, index) => index + '';

    _loadingComponent = () => {
        return (
            <View style={styles.emptyDataStyle}>
                <ActivityIndicator
                    animating={true}
                    color='red'
                    size="large"
                />
                <Text style={{
                    padding: 20,
                    fontWeight: 'bold',
                    color: '#333',
                    fontSize: 13,
                    textAlign: 'center',
                    alignSelf: 'center'
                }}>加载中...</Text>
            </View>
        );
    };

    _errorComponent = () => {
        return (
            <View style={styles.emptyDataStyle}>
                <Text>数据加载异常</Text>
            </View>);
    };
    _dataComponent = () => {
        return (
            <SectionList
                style={styles.container}
                sections={this.state.dataArray}
                extraData={this.state}
                renderSectionHeader={(item) => this._renderSectionHeader(item.section.data[0])}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
                ListHeaderComponent={this._renderHeader}
                showsVerticalScrollIndicator={false}
                onRefresh={() => this._fetchData}
                refreshing={this.state.isRefreshing}
            />
        )
    };
    /**
     * item 需要加{}，不然undefined.
     * @param item
     * @returns {*}
     * @private
     */
    _renderItem = ({item}) => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    flex: 1,
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingTop: 6,
                    paddingBottom: 6,
                }}>
                <Image style={{
                    width: 130,
                    height: 70,
                    resizeMode: "stretch",
                    borderRadius: 8,
                }} source={{uri: item.data.cover.feed}}/>
                <View style={{
                    paddingTop: 8,
                    paddingLeft: 8,
                    flex: 1,
                }}>
                    <Text numberOfLines={2}
                          style={{
                              flexWrap: 'wrap',
                              fontSize: 13,
                              color: '#333',
                              fontWeight: 'bold',
                              flex:1,
                              alignSelf:'flex-start'
                          }}>{item.data.title}</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        flex: 1,
                        paddingLeft: 6,
                    }}>
                        <Text numberOfLines={1}
                              style={{
                                  fontSize: 10,
                                  color: '#999',
                                  flex: 1,
                              }}>{'#' + item.data.category + ' / ' + item.data.author.name}</Text>
                        <Image style={{
                            width: 30,
                            height: 30,
                            alignSelf: 'flex-end',
                        }} source={require('../../../img/ic_action_share_grey.png')}/>
                    </View>

                </View>
            </View>
        );
    };


    _fetchData() {
        this.setState({
            refreshing: true,
            error: false,
        });
        fetch(baseUrl)
            .then((response) => response.json())
            .then((json) => {
                let array = json.itemList.filter(function (item) {
                    //过滤掉不是video的类别
                    return item.type === 'video';
                });
                //SectionList数据源结构[{key:'',data[]}]，重新封装下
                // let sectionArray = [
                //     {data: [array[1], array[2]], key: array[0]},
                //     {data: [array[4], array[5]], key: array[3]},
                //     {data: [array[7], array[8]], key: array[6]}];
                let sectionArray = [
                    {data: [array[0], array[1], array[2]], key: '1'},
                    {data: [array[3], array[4], array[5]], key: '2'},
                    {data: [array[6], array[7], array[8]], key: '3'}];

                this.setState({
                    isFirst: false,
                    isRefreshing: false,
                    error: false,
                    headerArray: array.slice(0, array.length / 2),
                    dataArray: sectionArray,
                });
                console.info(json);
            }).catch((e) => {
            this.setState({
                isFirst: false,
                isRefreshing: false,
                error: true,
                headerArray: [],
                dataArray: [],
            });
            console.error(e);
        });

    };

    componentDidMount() {
        this._fetchData();
    }

    render() {
        if (this.state.isFirst) {
            return this._loadingComponent();
        } else if (this.state.error) {
            return this._errorComponent();
        } else {
            return this._dataComponent();
        }
    }
}