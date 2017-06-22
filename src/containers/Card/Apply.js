import React, { Component, PropTypes } from 'react';
import {CardApply} from '../../components/Card';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CardActions from '../../actions/card';

@connect(
  state => ({
    card: state.card
  }),
  dispatch => bindActionCreators(CardActions, dispatch)
)
export default class CardApplyContainer extends Component {

  render() {
    return (
      <CardApply {...this.props}/>
    );
  }
  
}