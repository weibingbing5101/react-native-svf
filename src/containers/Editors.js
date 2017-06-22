import React, { Component, PropTypes } from 'react';
import Editors from '../components/Editors'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CardActions from '../actions/card';

@connect(
  state => ({
    card: state.card
  }),
  dispatch => bindActionCreators(CardActions, dispatch)
)
export default class EditorsContainer extends Component {

  render() {
    return (
      <Editors {...this.props}/>
    );
  }
  
}