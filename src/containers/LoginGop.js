import React, {Component} from 'react';
import {View,StatusBar} from 'react-native';
import LoginGop from '../components/Login/Gop';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserActions from '../actions/user';
import * as CardActions from '../actions/card';
import _ from 'lodash';


const MixActions = _.extend({}, UserActions, CardActions)

@connect(
  state => ({
    user: state.user
  }),
  dispatch => bindActionCreators(MixActions, dispatch)
)
export default class LoginGopContainer extends Component {

  render() {
    return (
      <LoginGop  {...this.props}/>
    );
  }

}