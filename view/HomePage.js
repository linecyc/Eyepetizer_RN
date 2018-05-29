import React, {Component} from 'react'
import {
    Text,
    View,
    Image,
    Dimensions,
    SwipeableListView
} from 'react-native'
import Swiper from 'react-native-swiper'

const {width} = Dimensions.get('window');

const styles = {
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        flex: 1
    },

    wrapper: {},

    slide: {
        flex: 1,
        justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: 'transparent'
    },


    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },

    image: {
        width,
        flex: 1
    }
};

export default class HomePage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Swiper style={styles.wrapper} height={200}
                        onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
                        dot={<View style={{
                            backgroundColor: 'rgba(0,0,0,.2)',
                            width: 5,
                            height: 5,
                            borderRadius: 4,
                            marginLeft: 3,
                            marginRight: 3,
                            marginTop: 3,
                            marginBottom: 3
                        }}/>}
                        activeDot={<View style={{
                            backgroundColor: '#92BBD9',
                            width: 8,
                            height: 8,
                            borderRadius: 4,
                            marginLeft: 3,
                            marginRight: 3,
                            marginTop: 3,
                            marginBottom: 3
                        }}/>}
                        paginationStyle={{
                            bottom: 23, left: null, right: 10
                        }} autoplay>
                    <View style={styles.slide}
                          title={<Text style={styles.text} numberOfLines={1}>Aussie tourist dies at Bali hotel</Text>}>
                        <Image resizeMode='cover' style={styles.image} source={require('./img/1.jpg')}/>
                    </View>
                    <View style={styles.slide}
                          title={<Text style={styles.text} numberOfLines={1}>Big lie behind Nine’s new show</Text>}>
                        <Image resizeMode='contain' style={styles.image} source={require('./img/2.jpg')}/>
                    </View>
                    <View style={styles.slide}
                          title={<Text style={styles.text} numberOfLines={1}>Why Stone split from Garfield</Text>}>
                        <Image resizeMode='stretch' style={styles.image} source={require('./img/3.jpg')}/>
                    </View>
                    <View style={styles.slide}
                          title={<Text style={styles.text} numberOfLines={1}>Learn from Kim K to land that job</Text>}>
                        <Image resizeMode='center' style={styles.image} source={require('./img/4.jpg')}/>
                    </View>
                </Swiper>
            </View>
        )
    }
}
