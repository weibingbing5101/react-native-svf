import React, { Component, PropTypes } from 'react';
import {ChargeSuccessOnline} from '../components/Charge'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CardActions from '../actions/card';
import * as GopActions from '../actions/gop';

@connect(
  state => ({
    card: state.card
  }),
  // function (dispatch) {
  // 	bindActionCreators(CardActions, dispatch);
  // 	bindActionCreators(GopActions, dispatch)

  // }

  // (dispatch) => ({  
  //   CardActions: bindActionCreators(CardActions, dispatch),  
  //   GopActions: bindActionCreators(GopActions, dispatch),  
  //   dispatch: dispatch  
  // })
  dispatch => bindActionCreators(CardActions, dispatch)
)
export default class ChargeSuccessOnlineContainer extends Component {

  render() {
    return (
      <ChargeSuccessOnline {...this.props}/>
    );
  }
  
}