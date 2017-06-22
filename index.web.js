
//import './src';
import { AppRegistry,View,Text,TouchableOpacity,Alert } from 'react-native';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//import ChargeFrom from './src/components/Charge/ChargeFrom';


const GoopalCard = () => (
	<TouchableOpacity onPress={ ()=>{ Alert.alert(
      'GoopalCard充值',
      '充值成功',
      [
        {text: '确定', onPress: () => console.log('OK Pressed')},
      ]
    ) } }>
	  <View>
	  	<Text>hello</Text>
	  </View>
  </TouchableOpacity>
);


AppRegistry.registerComponent('GoopalCard', () => GoopalCard);

let app = document.createElement('div');
document.body.appendChild(app);
AppRegistry.runApplication('GoopalCard', {
    rootTag: app
});