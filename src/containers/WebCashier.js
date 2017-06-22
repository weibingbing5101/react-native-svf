import React, { Component, PropTypes } from 'react';
import {WebCashier} from '../components/Charge';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CardActions from '../actions/card';


@connect(
  state => ({
    card: state.card
  }),
  dispatch => bindActionCreators(CardActions, dispatch)
)
export default class WebCashierContainer extends Component {

  render() {
    return (
      <WebCashier {...this.props}/>
    );
  }
  
}