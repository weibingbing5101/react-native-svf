import React, { Component, PropTypes } from 'react';
import Home from '../components/Home'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CardActions from '../actions/card';
import * as UserActions from '../actions/user';
import * as SignWithholdProtocolActions from '../actions/signWithholdProtocol';
import _ from 'lodash';


const MixActions = _.extend({}, SignWithholdProtocolActions, CardActions, UserActions)
@connect(
  state => ({
    card: state.card,
    user: state.user,
    withhold: state.signWithholdProtocol,
  }),
  dispatch => bindActionCreators(MixActions, dispatch)
)
export default class HomeContainer extends Component {

  render() {
    return (
      <Home {...this.props}/>
    );
  }
  
}