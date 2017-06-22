import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image
} from 'react-native';

const winWidth = Dimensions.get('window').width;
const winHeight = Dimensions.get('window').height;

const linkImages = {
  shiti: require('../image/s_peitu.png'),
  xuni: require('../image/x_peitu.png'),
}

export default class HomeApplyItemExt extends Component {

	render(){
		let text;
		let textDesc;
    let imageSrc;
    let size;
    let marginLeft;
    if (this.props.type==='entity') {
    	text = '快速申请卡片';
      textDesc = '免工本费';
      imageSrc = linkImages['shiti'];
      size = {width:49,height:35,};
      marginLeft = 42;
    }else if (this.props.type==='virtual') {
    	text = '快速申请卡片';
     	textDesc = '秒速获卡';
      imageSrc = linkImages['xuni'];
      size = {width:40,height:41,};  
      marginLeft = 30;   
    }

    let style = {};
    if (this.props.style) {
      style = this.props.style;
    }
    return (
      <View style={[{height:50,width:winWidth/2,backgroundColor:'rgba(255, 255, 255, .1)',alignItems: 'center',justifyContent: 'center'},style]}>
        <Image style={[size,{position:'absolute',top:8,left:15}]} source={imageSrc}/>
        <View style={{marginLeft:marginLeft}}>
          <Text style={{fontSize:16,color:'#353535',marginBottom:4}}>{text}</Text>
        </View>
      </View>
    )
  }

}