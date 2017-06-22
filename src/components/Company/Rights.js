/**
 * @description  公司版权
 * @author 刘炳礼
 */

import React, {Component} from 'react';
import {Image,StyleSheet,Dimensions,View,Animated,Text,StatusBar} from 'react-native';
import {Grid,Row,Col} from 'react-native-easy-grid';

const RIHTS_HEIGHT = 60;

export { RIHTS_HEIGHT }

export default class Rights extends Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <View style={styles.companyDesc}>
        <Text style={styles.companyText}>
          ©2016-2017 GPlusCard. All rights reserved
        </Text>
      </View>
    );
  }

}

let textBaseStyle = {
  color: 'white'
};

let styles = StyleSheet.create({
  companyDesc: {
    height: RIHTS_HEIGHT,
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  companyText: {
    fontSize: 12,
    color: 'white'
  }
});