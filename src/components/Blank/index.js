import React, {Component} from 'react';
import {Text,View} from 'react-native';
import {allCenter} from '../../utils/Style';

export default class Blank extends Component {

  constructor(props){
    super(props);
  }

  render(){

  	return (
      <View style={allCenter}>
        <Text style={{color: '#9B9B9B', fontSize: 18}}>{this.props.children||'没有数据'}</Text>
      </View>
    )
  }

}