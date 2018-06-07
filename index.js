import {AppRegistry, YellowBox} from 'react-native';
import App from './App';
import VideoDetailPage from "./src/view/detail/VideoDetail/VideoDetailPage";

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);


AppRegistry.registerComponent('Eyepetizer_RN', () => App);