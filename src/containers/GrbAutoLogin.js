import React, {Component} from 'react';
import {View,StatusBar} from 'react-native';
import GrbAutoLogin from '../components/GrbAutoLogin/GrbAutoLogin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserActions from '../actions/user';
import * as CardActions from '../actions/card';
import _ from 'lodash';


const MixActions = _.extend({}, UserActions, CardActions)

@connect(
  state => ({
    card: state.user
  }),
  dispatch => bindActionCreators(MixActions, dispatch)
)
export default class GrbAutoLoginContainer extends Component {

  render() {
    return (
      <GrbAutoLogin  {...this.props}/>
    );
  }

}