import React, { Component, PropTypes } from 'react';
import Bill from '../components/Bill'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CardActions from '../actions/card';
import * as SignWithholdProtocolActions from '../actions/signWithholdProtocol';
import _ from 'lodash';


const MixActions = _.extend({}, SignWithholdProtocolActions, CardActions);

@connect(
  state => ({
    card: state.card,
    withhold: state.signWithholdProtocol,
  }),
  dispatch => bindActionCreators(MixActions, dispatch)
)
export default class BillContainer extends Component {

  render() {
    return (
      <Bill {...this.props}/>
    );
  }
  
}