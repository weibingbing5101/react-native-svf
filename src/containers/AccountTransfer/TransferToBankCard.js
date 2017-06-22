import React, {Component} from 'react';
import {View,StatusBar} from 'react-native';
import {TransferToBankCard} from '../../components/AccountTransfer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CardActions from '../../actions/card';
import * as AccountTransfer from '../../actions/accountTransfer';
import _ from 'lodash';

const MixActions = _.extend({}, CardActions, AccountTransfer);

@connect(
  state => ({
    card: state.card,
    accountTransfer:state.accountTransfer,
  }),
  dispatch => bindActionCreators(MixActions, dispatch)
)
export default class TransferToBankCardContainer extends Component {

  render() {
    return (
      <TransferToBankCard  {...this.props}/>
    );
  }

}