import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform} from 'react-native';
import _ from 'lodash';
import { allCenter,leftCenter } from '../../utils/Style';
import Item from './Item';

export default class CenterCenter extends Component {

  render() {
    let props = this.props;
    return (
      <Item {...this.props}>
        <View style={ leftCenter }>
          <View style={ {width: this.props.leftSize||60} }>
            {(this.props.renderLeft&&this.props.renderLeft()) }
          </View>
          <View style={ allCenter }>
            { (this.props.renderCenter&&this.props.renderCenter()) }
          </View>
          <View style={ {width: this.props.rightSize||60} }>
            { (this.props.renderRight&&this.props.renderRight()) }
          </View>
        </View>
      </Item>
    );
  }

}
