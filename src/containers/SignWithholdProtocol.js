import React, { Component, PropTypes } from 'react';
import SignWithholdProtocol from '../components/SignWithholdProtocol'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as SignWithholdProtocolActions from '../actions/signWithholdProtocol';
import * as CardActions from '../actions/card';
import * as UserActions from '../actions/user';
import _ from 'lodash';

const MixActions = _.extend({}, SignWithholdProtocolActions, CardActions,UserActions)
@connect(
  state => ({
    withhold: state.signWithholdProtocol,
    card:state.card,
    user:state.user,
  }),
  dispatch => bindActionCreators(MixActions, dispatch)
)
export default class SignWithholdProtocolContainer extends Component {

  render() {
    return (
      <SignWithholdProtocol {...this.props}/>
    );
  }
  
}