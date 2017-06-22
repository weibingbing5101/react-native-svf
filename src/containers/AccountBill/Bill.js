import React, { Component, PropTypes } from 'react';
import Bill from '../../components/AccountBill'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CardActions from '../../actions/card';
import * as AccountBill from '../../actions/accountBill';
import _ from 'lodash';

const MixActions = _.extend({}, CardActions, AccountBill);

@connect(
  state => ({
    card: state.card,
    accountBill:state.accountBill,
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