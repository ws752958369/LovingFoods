
import {
    Dimensions,
    Platform
} from 'react-native';


const ScreenSize = {
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
};

const PlatformTypeIOS = (Platform.OS === 'ios');

const IsIphoneX = PlatformTypeIOS && (ScreenSize.height === 812);

export {
    ScreenSize,
    PlatformTypeIOS,
    IsIphoneX
}