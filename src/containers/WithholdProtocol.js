import React, { Component, PropTypes } from 'react';
import WithholdProtocol from '../components/WithholdProtocol'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CardActions from '../actions/card';

@connect(
  state => ({
    card: state.card
  }),
  dispatch => bindActionCreators(CardActions, dispatch)
)
export default class WithholdProtocolContainer extends Component {

  render() {
    return (
      <WithholdProtocol {...this.props}/>
    );
  }
  
}