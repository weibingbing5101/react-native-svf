import React, { Component, PropTypes } from 'react';
import {CardProcessDetail} from '../../components/Card';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CardActions from '../../actions/card';

@connect(
  state => ({
    card: state.card
  }),
  dispatch => bindActionCreators(CardActions, dispatch)
)
export default class CardProcessDetailContainer extends Component {

  render() {
    return (
      <CardProcessDetail {...this.props}/>
    );
  }
  
}