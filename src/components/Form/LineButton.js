import React, {Component, PropTypes} from 'react';
import {View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import CommonButton from './CommonButton';

const winWidth = Dimensions.get('window').width;

export default class RowButton extends CommonButton {
    

    constructor(props) {
      super(props);
      this.baseStyles = {
          wrap: {
          },
          container: {
            width: 80,
            marginRight:10,
            paddingTop: 7,
            paddingBottom: 7,
            paddingLeft: 12,
            paddingRight: 12,
            backgroundColor: '#023365',
            alignItems: "stretch"
          },
          text: {
             
          }
        }
    }

}


