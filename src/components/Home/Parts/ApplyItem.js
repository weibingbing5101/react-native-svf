import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image
} from 'react-native';

const linkImages = {
  miangongben: require('../image/miangongben.png'),
  miaosu: require('../image/miaosu.png'),
}

const winWidth = Dimensions.get('window').width;
const winHeight = Dimensions.get('window').height;

export default class HomeApplyItem extends Component {

	render(){
		let text;
		let imageSrc;
    if (this.props.type==='entity') {
    	text = '+ 实体卡申请';
    	imageSrc = linkImages['miangongben'];
    }else if (this.props.type==='virtual') {
    	text = '+ 虚拟卡申请';
    	imageSrc = linkImages['miaosu'];  	
    }
    return (
      <View style={styles.viewStyle}>
        <Text style={{fontSize:18,color:'white'}}>{text}</Text>
        <Image style={{width:52,height:52,position:'absolute',top:0,right:0}} source={imageSrc}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewStyle:{
    height:80,
    width:winWidth-20,
    backgroundColor:'rgba(255, 255, 255, .05)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:1,
    borderStyle:'dashed',
    borderColor:'#7d818e',
    borderRadius:5
  }
});