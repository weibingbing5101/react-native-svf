import React, { Component, PropTypes } from 'react';
import {Charge} from '../components/Charge'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CardActions from '../actions/card';
import * as ChargeActions from '../actions/charge';
import _ from 'lodash';

const MixActions = _.extend({}, CardActions, ChargeActions);

@connect(
  state => ({
    card: state.card,
    charge: state.charge,
  }),
  dispatch => bindActionCreators(MixActions, dispatch)
)
export default class ChargeContainer extends Component {

  render() {
    return (
      <Charge {...this.props}/>
    );
  }
  
}