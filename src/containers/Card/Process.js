import React, { Component, PropTypes } from 'react';
import {CardProcess} from '../../components/Card';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CardActions from '../../actions/card';

@connect(
  state => ({
    card: state.card
  }),
  dispatch => bindActionCreators(CardActions, dispatch)
)
export default class CardProcessContainer extends Component {

  render() {
    return (
      <CardProcess {...this.props}/>
    );
  }
  
}