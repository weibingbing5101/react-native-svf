import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform} from 'react-native';
import _ from 'lodash';
import { leftCenter } from '../../utils/Style';
import Item from './Item';

export default class RowBetween extends Component {

  render() {
    let props = this.props;
    return (
      <Item>
        <View style={ leftCenter }>
          <View style={ {width: this.props.leftSize} }>
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
