import React, {Component} from 'react'
import {
    Text,
    View,
    Image,
    FlatList,
    TouchableWithoutFeedback,
    ViewPagerAndroid,
} from 'react-native'
import SystemUtils from '../../utils/SystemUtils';
import HomeEmptyPage from "./HomeEmptyPage";
import RecommendPage from "./RecommendPage";


const homeTopTabs = ['发现', '推荐', '日报', '广告', '生活', '动画', '搞笑', '开胃', '创意', '运动', '音乐', '萌宠'];
const baseOffset = 1 / homeTopTabs.length;

const styles = {
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flex: 1
    },

    horizontalTopTab: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EAEAEA',
    },

    category: {
        width: 30,
        height: 30,
        marginTop: 3,
    },
    search: {
        width: 30,
        height: 30,
        marginTop: 3,
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


    constructor(props) {
        super(props);

        this.state = {
            currentPage: 1,//顶部导航栏默认选中第二个（0开始）
        };
    }

    _renderTopTabItem = ({item, index}) => {
        return (
            <TouchableWithoutFeedback onPress={() => this._onTopTabItemClick(item, index)}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 3,
                }}>
                    < Text style={[{
                        marginTop: 16,
                        marginLeft: 16,
                        marginRight: 16,
                        marginBottom: 5,
                        color: '#000',
                        textAlign: 'center'
                    }, this.state.currentPage === index ? {fontWeight: 'bold'} : {}]}>{item}</Text>
                    <View style={[{
                        width: 8,
                        height: 2,
                    }, this.state.currentPage === index ? {backgroundColor: '#000'} : {backgroundColor: 'transparent'}]}/>
                </View>
            </TouchableWithoutFeedback>
        );
    };
    //点击事件必须是Touchable系列才能生效？？

    _onTopTabItemClick = (item, pos) => {
        this.setState({currentPage: pos});
        this.fatList.scrollToIndex({viewPosition: 0.5, index: pos});
        this.viewPager.setPage(pos);
        console.info('click:' + pos + "---item:" + item);
    };


    //scrollToIndex 将位于指定位置的元素滚动到可视区的指定位置，
    // 当 viewPosition 为 0 时将它滚动到屏幕顶部，为 1 时将它滚动到屏幕底部，为 0.5 时将它滚动到屏幕中央。
    //如果不设置getItemLayout属性的话，无法跳转到当前可视区域以外的位置。

    _onPageSelected = (e) => {
        const p = e.nativeEvent.position;
        this.setState({currentPage: p});
        this.fatList.scrollToIndex({viewPosition: 0.5, index: p});
        console.info('_onPageSelected-->>' + p);
    };

    /**
     * ViewPagerAndroid的子View 需要是<View/>
     * @returns {*}
     */
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.horizontalTopTab}>
                    <Image style={styles.category} source={require('../../../img/all_category.png')}/>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        data={homeTopTabs}
                        extraData={this.state}
                        renderItem={this._renderTopTabItem}
                        keyExtractor={(item, index) => index + ''}
                        ref={fatList => {
                            this.fatList = fatList;
                        }}
                    />
                    <Image style={styles.search} source={require('../../../img/ic_action_search.png')}/>
                </View>
                <ViewPagerAndroid
                    style={{flex: 1}}
                    initialPage={1}
                    onPageSelected={this._onPageSelected}
                    ref={viewPager => {
                        this.viewPager = viewPager;
                    }}>
                    <View>
                        <HomeEmptyPage title={homeTopTabs[0]}/>
                    </View>
                    <View>
                        <RecommendPage/>
                    </View>
                    <View>
                        <HomeEmptyPage title={homeTopTabs[2]}/>
                    </View>
                    <View>
                        <HomeEmptyPage title={homeTopTabs[3]}/>
                    </View>
                    <View>
                        <HomeEmptyPage title={homeTopTabs[4]}/>
                    </View>
                    <View>
                        <HomeEmptyPage title={homeTopTabs[5]}/>
                    </View>
                    <View>
                        <HomeEmptyPage title={homeTopTabs[6]}/>
                    </View>
                    <View>
                        <HomeEmptyPage title={homeTopTabs[7]}/>
                    </View>
                    <View>
                        <HomeEmptyPage title={homeTopTabs[8]}/>
                    </View>
                    <View>
                        <HomeEmptyPage title={homeTopTabs[9]}/>
                    </View>
                    <View>
                        <HomeEmptyPage title={homeTopTabs[10]}/>
                    </View>
                    <View>
                        <HomeEmptyPage title={homeTopTabs[11]}/>
                    </View>
                </ViewPagerAndroid>
            </View>
        )
    }
}
