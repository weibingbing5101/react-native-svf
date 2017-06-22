import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform} from 'react-native';
import _ from 'lodash';
import { Select } from '../../Form';
import { LeftFixed } from '../../Layout';


export default class CardBirthday extends Component {

  renderLeft = () => {
    return <Text>出生日期</Text>
  }

  renderRight = () => {
    let text = this.props.defaultValue || this.props.placeholder;
  	return  (
      <View>
        <Text style={{color:'#9b9b9b',fontSize:13}}>{text}</Text>
      </View>
    )
  }


  render(){
    let style = this.props.style || {marginLeft:0};
    return <LeftFixed 
            {...this.props} 
            leftSize={85}
            style={style}
            renderLeft={ this.renderLeft } 
            renderRight={ this.renderRight } 
            onPress={ ()=>{this.props.onPress && this.props.onPress() } }
           />;
  }

}