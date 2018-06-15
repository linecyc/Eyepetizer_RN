import React, {Component} from 'react'
import {
    Text,
    View,
    Image,
    ActivityIndicator,
    SectionList,
    TouchableWithoutFeedback,
} from 'react-native'
import Swiper from 'react-native-swiper';


const styles = {
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    horizontal: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    header: {
        backgroundColor: '#fff',
        paddingLeft: 20,
        paddingTop: 32,
        paddingBottom: 6,
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

    banner: {
        flex: 1,
        paddingLeft: 14,
        paddingRight: 14,
        //backgroundColor: '#fff',
        //justifyContent: 'center'
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

    /**
     * ViewPagerAndroid 设置pageMargin属性时，如果设置backgroundColor,justifyContent等属性会导致轮播页面被压缩？？
     *
     * @returns {*}
     * @private
     */
    _renderHeader = () => {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerDay}>MONDAY. MAY 28</Text>
                    <View style={styles.horizontal}>
                        <Text style={styles.headerRecommend}>开眼今日编辑精选</Text>
                        <Image style={styles.arrow} source={require('../../../img/ic_action_more_arrow_dark.png')}/>
                    </View>
                </View>
                <Swiper style={{height: 230, flex: 1}}
                        pageMargin={-20}
                    /*onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}*/
                        dot={<View style={styles.dotStyle}/>}
                        activeDot={<View style={styles.activityDotStyle}/>}
                        paginationStyle={{
                            top: 180, bottom: null,
                        }} autoplay={false} loop={false}>
                    {this.state.headerArray.map(this._renderBannerItem.bind(this))}
                </Swiper>
            </View>
        );

    };

    _renderBannerItem(item, index) {
        return (
            <View key={index} style={styles.banner}>
                <TouchableWithoutFeedback onPress={() => this._onVideoItemClick(item)}>
                    <Image style={styles.imageCover} source={{uri: item.data.cover.feed}}/>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => this._onAuthorItemClick(item)}>
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
                </TouchableWithoutFeedback>
            </View>
        );
    }

    _renderSectionHeader(item) {
        return (
            <View style={{backgroundColor: '#fff', flex: 1, justifyContent: 'center', padding: 20}}>
                <View style={{flex: 1, height: 0.5, marginBottom: 32, backgroundColor: '#EAEAEA'}}/>
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
                <TouchableWithoutFeedback onPress={() => this._onVideoItemClick(item)}>
                    <Image style={styles.imageCover} source={{uri: item.data.cover.feed}}/>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => this._onAuthorItemClick(item)}>
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
                </TouchableWithoutFeedback>
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
            <TouchableWithoutFeedback onPress={() => this._fetchData()}>
                <View style={styles.emptyDataStyle}>
                    <Text style={{
                        padding: 20,
                        fontWeight: 'bold',
                        color: '#333',
                        fontSize: 13,
                        textAlign: 'center',
                        alignSelf: 'center'
                    }}>数据加载异常</Text>
                </View>
            </TouchableWithoutFeedback>);
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
            <TouchableWithoutFeedback onPress={() => this._onVideoItemClick(item)}>
                <View
                    style={{
                        flexDirection: 'row',
                        backgroundColor: '#fff',
                        flex: 1,
                        paddingLeft: 20,
                        paddingRight: 20,
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
                                  flex: 1,
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
            </TouchableWithoutFeedback>
        );
    };


    _fetchData() {
        if (this.state.isRefreshing) {
            return;
        }
        // this.setState({
        //     isRefreshing: true,
        //     error: false,
        // });
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
            console.info(e);
        });

    };

    componentDidMount() {
        this._fetchData();
    }

    /**
     * 有焦点才更新？
     * 对于tabNavigator嵌套viewPagerAndroid，当滚动到有viewPagerAndroid时，滑动viewPagerAndroid不会刷新？？
     * @param nextProps 接下来的属性
     * @param nextState 接下来的状态
     * @returns {*|boolean} 是否更新
     */
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.navigator.isFocused();
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

    _onVideoItemClick(item) {
        let {navigate} = this.props.navigator;
        navigate('VideoDetailPage', {data: item})
    };

    _onAuthorItemClick(item) {
        this.props.navigator.navigate('AuthorDetailPage', {data: item})
    }
}