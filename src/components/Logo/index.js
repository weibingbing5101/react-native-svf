/**
 * @description  logo
 * @author 刘炳礼
 */

import React, {Component} from 'react';
import {Image,StyleSheet,Dimensions,View,Animated,Text,StatusBar} from 'react-native';

export default class Splash extends Component {

  render() {
  	let imgUrl;
  	if (this.props.imgUrl==='logoWhite') {
  		imgUrl = require('./image/logoWhite.png');
  	}else{
  		imgUrl = require('./image/logo.png');
  	}
    return <Image style={styles.logo} source={imgUrl} />
  }

}


let styles = StyleSheet.create({
  logo:{
    width: 89,
    resizeMode: 'contain',
    backgroundColor: 'transparent'
  }
});