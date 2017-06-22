import React, { Component, PropTypes } from 'react';
import Editor from '../components/Editor'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CardActions from '../actions/card';

@connect(
  state => ({
    card: state.card
  }),
  dispatch => bindActionCreators(CardActions, dispatch)
)
export default class EditorContainer extends Component {

  render() {
    return (
      <Editor {...this.props}/>
    );
  }
  
}