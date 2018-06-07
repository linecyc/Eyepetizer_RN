import React, {Component} from 'react';
import {ActivityIndicator, FlatList, Image, SectionList, Text, TouchableWithoutFeedback, View} from 'react-native';


/**
 *
 * @author by linecy.
 */



const followUrl = 'http://baobab.kaiyanapp.com/api/v4/tabs/follow';

export default class ProductionPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFirst: true,
            isRefreshing: false,
            error: false,
            headerArray: [],
            dataArray: [],
        }
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

    componentDidMount() {
        this._refreshData();
    }

    componentWillUnmount() {
    }

    _refreshData() {
        if (!this.state.isRefreshing) {
            this.setState({
                isRefreshing: true,
                error: false,
            });
            fetch(followUrl)
                .then((response) => response.json())
                .then((json) => {
                    let data = [
                        {data: json.itemList[0].data.itemList, key: '1'},
                        {data: json.itemList[1].data.itemList, key: '2'},
                        {data: json.itemList[2].data.itemList, key: '3'},
                        {data: json.itemList[3].data.itemList, key: '4'}];
                    this.setState({
                        isFirst: false,
                        isRefreshing: false,
                        error: false,
                        headerArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                        dataArray: data,
                    });
                })
                .catch((e) => {
                    this.setState({
                        isFirst: false,
                        isRefreshing: false,
                        error: true,
                        headerArray: [],
                        dataArray: [],
                    });
                    console.error(e);
                });
        }
    }


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
            <TouchableWithoutFeedback onPress={() => this._refreshData()}>
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

    _renderSectionHeader = (item) => {

        switch (item.section.key) {

            case '1':
                return (<View style={styles.horizontal}>
                    <FlatList
                        style={styles.container}
                        data={this.state.headerArray}
                        extraData={this.state}
                        renderItem={this._renderAvatar}
                        keyExtractor={(item, index) => index + ''}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                    />
                    <View style={[styles.horizontal, {justifyContent: 'flex-end'}, {
                        position: 'absolute',
                        left: null,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: '#fff',
                    }]}>
                        <Text style={{
                            fontWeight: 'bold',
                            color: '#4c7ee9',
                            fontSize: 13,
                            flexWrap: 'wrap',
                            width: 46,
                            paddingLeft: 16,
                            paddingTop: 16,
                            paddingBottom: 16,
                        }}>全部关注</Text>
                        <Image style={[styles.arrow, {alignSelf: 'center', marginRight: 16}]}
                               source={require('../../../img/ic_action_more_arrow_dark.png')}/>
                    </View>
                    <View style={{
                        position: 'absolute',
                        left: 0,
                        top: null,
                        right: 0,
                        bottom: 0, height: 0.5, backgroundColor: '#EAEAEA'
                    }}/>
                </View>);
            case '2':
                return (<View style={[styles.horizontal, {paddingLeft: 16}]}>
                    <Text style={{fontWeight: 'bold', color: '#333', fontSize: 16}}>关注主题更新</Text>
                    <Image style={styles.arrow} source={require('../../../img/ic_action_more_arrow_dark.png')}/>
                </View>);
            case '3':
                return (<View style={[styles.horizontal, {justifyContent: 'flex-end', paddingRight: 16}]}>
                    <Text style={{fontWeight: 'bold', color: '#333', fontSize: 12}}>查看关注主题更新</Text>
                    <Image style={styles.arrow} source={require('../../../img/ic_action_more_arrow_dark.png')}/>
                </View>);
            default:
                return null;
        }
    };

    /**
     *  Avatar
     * @returns {*}
     * @private
     */
    _renderAvatar = () => {
        return (<TouchableWithoutFeedback>
            <Image style={[styles.avatar, {marginLeft: 16, marginBottom: 8, marginTop: 8}]}
                   source={require('../../../img/account_default_avatar.png')}/>
        </TouchableWithoutFeedback>);
    };
    /**
     *  Tags for user production
     * @returns {*}
     * @private
     */
    _renderTAg = (tag) => {
        return (
            <View key={tag.id} style={{borderRadius: 3, backgroundColor: '#CAE1FF', marginLeft: 5, marginBottom: 12}}>
                <Text style={{color: '#4c7ee9', fontSize: 10, paddingLeft: 12, paddingRight: 12}}>{tag.name}</Text>
            </View>);
    };

    _renderItem = ({item}) => {
        return (<TouchableWithoutFeedback onPress={() => this._onVideoItemClick(item)}>
            <View style={{padding: 16}}>
                <View style={[styles.horizontal, {flex: 1,}]}>
                    <TouchableWithoutFeedback onPress={() => this._onAuthorItemClick(item)}>
                        <Image style={styles.avatar} source={{uri: item.data.author.icon}}/>
                    </TouchableWithoutFeedback>
                    <View style={{flex: 1, paddingLeft: 16}}>
                        <Text style={{
                            fontSize: 14,
                            fontWeight: 'bold',
                            color: '#333',
                            flexWrap: 'wrap',
                            flex: 1
                        }}>{item.data.author.name}</Text>
                        <View style={[styles.horizontal, {alignItems: 'center'}]}>
                            <Text style={{fontSize: 12, color: '#333'}}>发布：</Text>
                            <Text style={{
                                fontSize: 12,
                                fontWeight: 'bold',
                                color: '#333',
                                flexWrap: 'wrap',
                                flex: 1,
                                textAlign: 'left'
                            }} numberOfLines={1}>{item.data.title}</Text>
                        </View>
                    </View>
                    <Image style={styles.arrow} source={require('../../../img/ic_action_more_arrow_dark.png')}/>
                </View>
                <Text style={{
                    fontSize: 14,
                    color: '#666',
                    flexWrap: 'wrap',
                    flex: 1,
                    paddingTop: 16,
                    paddingBottom: 6,
                }}>{item.data.description}</Text>
                <View style={styles.horizontal}>
                    {item.data.tags.map(this._renderTAg)}
                </View>
                <Image style={styles.imageCover} source={{uri: item.data.cover.feed}}/>
                <View style={{
                    flex: 1, height: 0.5, marginTop: 16, backgroundColor: '#EAEAEA',
                }}/>
            </View>
        </TouchableWithoutFeedback>);
    };

    _dataComponent = () => {
        return (
            <SectionList
                style={styles.container}
                sections={this.state.dataArray}
                extraData={this.state}
                renderSectionHeader={this._renderSectionHeader}
                renderItem={this._renderItem.bind(this)}
                keyExtractor={(item, index) => index + ''}
                showsVerticalScrollIndicator={false}
                onRefresh={() => this._refreshData}
                refreshing={this.state.isRefreshing}
            />
        )
    };

    _onVideoItemClick(item) {
        this.props.navigation.navigate('VideoDetailPage', {data: item});
    };

    _onAuthorItemClick = (item) => {
        let {navigate} = this.props.navigation;
        navigate('AuthorDetailPage', {data: item})
    }
}

const
    styles = {
        container: {
            flex: 1,
            backgroundColor: '#fff',
        },
        horizontal: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        emptyDataStyle: {
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'center',
        },
        arrow: {
            width: 30,
            height: 30,
            alignSelf: 'flex-end',
        },
        avatar: {
            width: 35,
            height: 35,
            resizeMode: "cover",
            borderRadius: 45,
            padding: 4,
            alignSelf: 'flex-start',
        },
        imageCover: {
            height: 180,
            resizeMode: "stretch",
            borderRadius: 5,
        },
    };