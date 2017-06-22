import React, { Component, PropTypes } from 'react';
import ThemeDaily from '../components/ThemeDaily'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CardActions from '../actions/card';

@connect(
  state => ({
    card: state.card
  }),
  dispatch => bindActionCreators(CardActions, dispatch)
)
export default class ThemeDailyContainer extends Component {

  render() {
    return (
      <ThemeDaily {...this.props}/>
    );
  }
  
}