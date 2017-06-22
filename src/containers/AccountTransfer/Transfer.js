import React, {Component} from 'react';
import {View,StatusBar} from 'react-native';
import {Transfer} from '../../components/AccountTransfer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CardActions from '../../actions/card';
import * as UserActions from '../../actions/user';
import _ from 'lodash';

const MixActions = _.extend({}, CardActions, UserActions);

@connect(
  state => ({
    card: state.card,
    user:state.user,
  }),
  dispatch => bindActionCreators(MixActions, dispatch)
)
export default class TransferContainer extends Component {

  render() {
    return (
      <Transfer  {...this.props}/>
    );
  }

}