import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform} from 'react-native';
import _ from 'lodash';
import {RowBetween, LeftFixed} from './';
import { colCenter, allCenter } from '../../utils/Style';

export default class LabelArrow extends Component {

  renderRight = () => {
    return (
      <View style={ allCenter }>
        {this.props.renderRight()}
        <Text style={ { paddingLeft: 10 ,color:'#9b9b9b'} }>></Text>
      </View>
    )
  }

  renderArrow = () => {
    return (
        <View style={ [allCenter] }>
          <Text style={ { paddingLeft: 10 ,color:'#9b9b9b'} }>></Text>
      </View>
    );
  }

  render(){
    let item;
    if(this.props.textType==='left'){
      item = <RowBetween {...this.props}
        renderLeft= {this.props.renderRight}
        renderRight={ this.renderArrow} />
    }else{
      item = <RowBetween {...this.props} renderRight={ this.renderRight } />
    }
    return item;
  }

}
