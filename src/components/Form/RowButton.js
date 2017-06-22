import React, {Component, PropTypes} from 'react';
import {View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import CommonButton from './CommonButton';

const winWidth = Dimensions.get('window').width;

export default class RowButton extends CommonButton {
    

    constructor(props) {
      super(props);
      this.baseStyles = {
          wrap: {
            borderRadius: 35,
          },
          
          container: {
            width: winWidth-40,
            height:45,
            padding: 10,
            marginTop: 40,
            backgroundColor: '#023365',
            //backgroundColor: props.disableColor,
            //backgroundColor: 'tranparent',
            
            borderRadius: 5,
            justifyContent: 'center',
            // shadowOpacity: 0.5,
            // shadowRadius: 2,
            // shadowOffset: {
            //     height: 2,
            //     width: 1
            // }
          },
          text: {
            letterSpacing: 3,
            fontSize:15,
          }
        }
    }

}