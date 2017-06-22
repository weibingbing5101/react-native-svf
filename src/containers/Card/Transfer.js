import React, { Component, PropTypes } from 'react';
import {CardTransfer} from '../../components/Card';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CardActions from '../../actions/card';
import * as SignWithholdProtocolActions from '../../actions/signWithholdProtocol';
import * as UserActions from '../../actions/user';
import _ from 'lodash';


const MixActions = _.extend({}, SignWithholdProtocolActions, CardActions,UserActions);

@connect(
  state => ({
    card: state.card,
    withhold: state.signWithholdProtocol,
    user:state.user,
  }),
  dispatch => bindActionCreators(MixActions, dispatch)
)
export default class CardTransferContainer extends Component {

  render() {
    return (
      <CardTransfer {...this.props}/>
    );
  }
  
}