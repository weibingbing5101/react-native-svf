import React, {Component} from 'react';
import {View,StatusBar} from 'react-native';
import Simulate from '../components/GrbSimulateHome';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserActions from '../actions/user';

@connect(
  state => ({
    card: state.user
  }),
  dispatch => bindActionCreators(UserActions, dispatch)
)
export default class GrbSimulateHomeContainer extends Component {

  render() {
    return (
      <Simulate  {...this.props}/>
    );
  }

}