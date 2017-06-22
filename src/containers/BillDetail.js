import React, { Component, PropTypes } from 'react';
import BillDetail from '../components/Bill/BillDetail'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CardActions from '../actions/card';

@connect(
  state => ({
    card: state.card
  }),
  dispatch => bindActionCreators(CardActions, dispatch)
)
export default class BillDetailContainer extends Component {

  render() {
    return (
      <BillDetail {...this.props}/>
    );
  }
  
}