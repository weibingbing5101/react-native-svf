import {Alert} from 'react-native';

export default function(title,content, onConfirm){
	Alert.alert(
    title,
    content,
    [
      {
      	text: '确定', 
      	onPress: () => {
      		onConfirm&&onConfirm();
	      	console.log(title+':'+content);
	      }
      }
    ]
  )
}