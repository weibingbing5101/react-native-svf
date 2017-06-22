import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform} from 'react-native';
import _ from 'lodash';
import { leftCenter } from '../../utils/Style';
import Item from './Item';

export default class RowBetween extends Component {

  render() {
    let props = this.props;
    let leftSize = this.props.leftSize;
    if(leftSize===undefined){
      leftSize = 60;
    }
    return (
      <Item {...this.props}>
        <View style={ leftCenter }>
          <View style={ {width: leftSize} }>
            {this.props.renderLeft()}
          </View>
          <View style={ {flex: 1} }>
            {this.props.renderRight()}
          </View>
        </View>
      </Item>
    );
  }

}
