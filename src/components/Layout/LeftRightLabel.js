import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform} from 'react-native';
import _ from 'lodash';
import {RowBetween, LeftFixed} from './';
import { colCenter, allCenter } from '../../utils/Style';

export default class LeftRightLabel extends Component {

  renderRight = () => {
    return (
      <View style={ allCenter }>
        {this.props.renderRight()}
      </View>
    )
  }

  render(){
    let item;
    let styles = this.props.styles||{};
    if(this.props.textType==='left'){
      item = <LeftFixed {...this.props} style={ styles.wrap } leftSize={0} renderRight={ this.renderRight } />
    }else{
      item = <RowBetween {...this.props} style={ styles.wrap } renderRight={ this.renderRight } />
    }
    return item;
  }

}
