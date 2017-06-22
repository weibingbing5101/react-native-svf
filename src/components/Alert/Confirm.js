import {Alert} from 'react-native';

export default function(arg){
  let {title,content, onConfirm} = arg;
	Alert.alert(
    title,
    content,
    [
      {
        text: '取消', 
        onPress: () => {
        }
      },{
      	text: '确定', 
      	onPress: () => {
      		onConfirm&&onConfirm();
	      }
      }
    ]
  )
}