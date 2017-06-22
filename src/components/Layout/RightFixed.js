import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform} from 'react-native';
import _ from 'lodash';
import { leftCenter } from '../../utils/Style';
import Item from './Item';

export default class RightFixed extends Component {

  render() {
    let props = this.props;
    let rightSize = this.props.rightSize;
    if(rightSize===undefined){
      rightSize  = 60;
    }
    return (
      <Item {...this.props}>
        <View style={ leftCenter }>
          <View style={ {flex: 1} }>
            {this.props.renderLeft()}
          </View>
          <View style={ {width: rightSize} }>
            {this.props.renderRight()}
          </View>
        </View>
      </Item>
    );
  }

}
