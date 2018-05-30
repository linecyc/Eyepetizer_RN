import React, {Component, PureComponent} from 'react';
import {
    Text,
    View,
    Image,
    TouchableHighlight,
    FlatList,
    ActivityIndicator
} from 'react-native';

import officialData from '../mock_data_source/official';
import officialData2 from '../mock_data_source/official2';

/**
 *
 * @author by linecy.
 */

export default class NotifyListPage extends PureComponent {


    constructor(props) {
        super(props);
        this.state = {
            //网络请求状态
            isLoading: true,//第一次时加载loading
            isRefreshing: false,//是否在更新数据
            error: false,//是否加载失败
            currentPage: 0,
            totalPage: 1,
            dataArray: [],//数据
        }
    }

    _footer = () => {

        if (this.state.dataArray.length === 0) {
            return null;
        } else {
            let detail;
            if (this.state.currentPage >= this.state.totalPage) {
                detail = '-The End-';
            } else {
                detail = '数据加载中';
            }
            return <Text style={styles.footerStyle}>{detail}</Text>;
        }
    };
    _emptyComponent = () => {
        return (
            <View style={styles.emptyDataStyle}>
                <Text style={styles.footerStyle}>暂无数据</Text>
            </View>
        );
    };
    _errorComponent = () => {
        return (
            <View style={styles.emptyDataStyle}>
                <Text>数据加载异常</Text>
            </View>);
    };

    /**
     * 给FlatList指定extraData={this.state}属性，是为了保证state.selected变化时，能够正确触发FlatList的更新。
     * 如果不指定此属性，则FlatList不会触发更新，因为它是一个PureComponent，其props在===比较中没有变化则不会触发更新。
     * @returns {*}
     */
    _dataComponent = () => {
        return (<FlatList
            data={this.state.dataArray}
            extraData={this.state}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            ListFooterComponent={this._footer}
            ListEmptyComponent={this._emptyComponent}
            onRefresh={() => this._refreshData(0)}
            refreshing={this.state.isRefreshing}
            onEndReached={() => this._refreshData(this.state.currentPage + 1)}
            onEndReachedThreshold={0.1}
        />);
    };
    _loadingComponent = () => {
        return (
            <View style={styles.emptyDataStyle}>
                <ActivityIndicator
                    animating={true}
                    color='red'
                    size="large"
                />
                <Text style={styles.footerStyle}>加载中...</Text>
            </View>
        );
    };
    /**
     * keyExtractor属性指定使用id作为列表每一项的key。
     * @returns {*}
     */
    _keyExtractor = (item, index) => item.userId;

    // _onPressItem = (userId: string) => {
    //     this.setState((state) => {
    //         const selected = new Map(state.selected);
    //         selected.set(userId, !selected.get(userId));
    //         return {selected};
    //     });
    // };
    _renderItem = ({item}) => (
        <OfficialItem
            data={item}
            id={item.userId}
            //onPressItem={this._onPressItem}
            //selected={!!this.state.selected.get(item.userId)}
        />
    );

    /**
     * 刷新数据，第一页是0
     * @param pageNumber 加载哪一页数据
     * @private
     */
    _refreshData(pageNumber) {
        if (pageNumber > 0 && pageNumber >= this.state.totalPage) {
            //console.error('pageNumber:' + pageNumber + '超过总分页数');
            this.setState({
                isLoading: false,
                isRefreshing: false,
                error: false,
                currentPage: this.state.totalPage,
            });
            return;
        }
        if (!this.state.isRefreshing) {
            this.state.isRefreshing = true;

            this.timer = setTimeout(() => {

                //mock数据暂时不需要判空officialData
                if (pageNumber === 0) {
                    this.setState({
                        isLoading: false,
                        isRefreshing: false,
                        error: false,
                        currentPage: 0,
                        totalPage: officialData.totalPage,
                        dataArray: officialData.data,
                    });
                } else {
                    this.setState({
                        isLoading: false,
                        isRefreshing: false,
                        error: false,
                        currentPage: officialData2.currentPage,
                        totalPage: officialData2.totalPage,
                        dataArray: this.state.dataArray.concat(officialData2.data),
                    });
                }
            }, 3000);

        }
    };

    /**
     * 在初始化render之后只执行一次，在这个方法内，可以访问任何组件，componentDidMount()方法中的子组件在父组件之前执行
     * 从这个函数开始，就可以和 JS 其他框架交互了，例如设置计时 setTimeout 或者 setInterval，或者发起网络请求
     */
    componentDidMount() {
        this._refreshData(0);
    }

    /**
     * 当组件要被从界面上移除的时候，就会调用componentWillUnmount(),
     * 在这个函数中，可以做一些组件相关的清理工作，例如取消计时器、网络请求等
     */
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        if (this.state.isLoading) {
            return this._loadingComponent();

        } else if (this.state.error) {
            return this._errorComponent();
        } else {
            return this._dataComponent();
        }
    }
}


class OfficialItem extends PureComponent {

    constructor(props) {
        super(props);
        this.offItem = this.props.data;
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.horizontal}>
                    <Image style={styles.avatarStyle} source={require('./img/ic_eyepetizer.png')}/>
                    <View style={styles.titleBarStyle}>
                        <Text style={styles.titleStyle}>{this.offItem.name}</Text>
                        <Text style={styles.timeStyle}>{this.offItem.pushTime}</Text>
                    </View>
                    <Image style={styles.arrowStyle} source={require('./img/ic_action_more_arrow_dark.png')}/>
                </View>
                <Text
                    style={styles.detailStyle}>{this.offItem.details}</Text>
                <View style={styles.dividerStyle}/>
            </View>
        );
    }
}


const styles = {
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 16,
    },
    horizontal: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarStyle: {
        width: 55,
        height: 55,
    },
    arrowStyle: {
        width: 30,
        height: 30,
    },
    titleBarStyle: {
        flex: 1,
    },
    titleStyle: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#333',
    },
    timeStyle: {
        fontSize: 12,
        color: '#999',
    },

    detailStyle: {
        marginLeft: 55,
        marginRight: 30,
        fontSize: 13,
        color: '#666'
    },
    dividerStyle: {
        marginLeft: 55,
        marginTop: 16,
        height: 0.5,
        backgroundColor: '#EAEAEA',
    },
    footerStyle: {
        backgroundColor: '#fff',
        padding: 20,
        fontWeight: 'bold',
        color: '#333',
        fontSize: 13,
        textAlign: 'center'
    },
    emptyDataStyle: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    }
};
