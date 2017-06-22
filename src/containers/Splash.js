import React, {Component} from 'react';
import {View,StatusBar} from 'react-native';
import Splash from '../components/Splash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CardActions from '../actions/card';

@connect(
  state => ({
    card: state.card
  }),
  dispatch => bindActionCreators(CardActions, dispatch)
)
export default class SplashContainer extends Component {

  render() {
    return (
      <Splash  {...this.props}/>
    );
  }

}