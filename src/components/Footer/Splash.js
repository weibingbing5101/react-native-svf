/**
 * @description  欢迎页面foote
 * @author 刘炳礼
 */

import React, {Component} from 'react';
import {Image,StyleSheet,Dimensions,View,Animated,Text,StatusBar} from 'react-native';

const FOOTER_HEIGHT = 60;

export {FOOTER_HEIGHT}

export default class SplashFooter extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.bottom}>
        <View style={styles.bottomContent}>
          <View>
             <Image style={styles.logo} source={require('./image/logo.png')}/>
          </View>
          <View>
            <Text style={styles.text}>
              GPlusCard
            </Text>
          </View>
        </View>
      </View>
    );
  }

}

let textBaseStyle = {
  color: 'white'
};

let styles = StyleSheet.create({
  bottom: {
    height: FOOTER_HEIGHT,
    backgroundColor: '#EEF2F4'
  },
  bottomContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 30
  },
  logo: {
    width: 33,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 14,
    color: '#022D61',
    paddingLeft: 10,
  }
});