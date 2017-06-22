import {Platform,TouchableNativeFeedback,TouchableHighlight,TouchableOpacity} from 'react-native';

let Touch = TouchableOpacity;
if (Platform.OS === 'android'){
  Touch = TouchableOpacity;
}
export default Touch;