import React, { Component, PropTypes } from 'react';
import CardProvision from '../components/CardProvision'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CardActions from '../actions/card';

@connect(
  state => ({
    card: state.card
  }),
  dispatch => bindActionCreators(CardActions, dispatch)
)
export default class CardProvisionContainer extends Component {

  render() {
    return (
      <CardProvision {...this.props}/>
    );
  }
  
}