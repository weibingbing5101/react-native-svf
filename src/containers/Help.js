import React, { Component, PropTypes } from 'react';
import Help from '../components/Help'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CardActions from '../actions/card';

@connect(
  state => ({
    card: state.card
  }),
  dispatch => bindActionCreators(CardActions, dispatch)
)
export default class HelpContainer extends Component {

  render() {
    return (
      <Help {...this.props}/>
    );
  }
  
}