import React, { Component, PropTypes } from 'react';
import SecurityCenter from '../../components/User/SecurityCenter'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as UserActions from '../../actions/user';
import * as CardActions from '../../actions/card';

const MixActions = _.extend({}, UserActions, CardActions)

@connect(
  state => ({
    user: state.user,
    card: state.card
  }),
  dispatch => bindActionCreators(MixActions, dispatch)
)
export default class SecurityCenterContainer extends Component {

  render() {
    return (
      <SecurityCenter {...this.props}/>
    );
  }
  
}