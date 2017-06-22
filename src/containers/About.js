import React, { Component, PropTypes } from 'react';
import About from '../components/About';
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
  dispatch => bindActionCreators(MixActions,dispatch)
)
export default class AboutContainer extends Component {

  render() {
    return (
      <About {...this.props}/>
    );
  }
  
}