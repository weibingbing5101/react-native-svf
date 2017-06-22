import React, { Component, PropTypes } from 'react';
import Authentication from '../../components/User/Authentication'
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
export default class AuthenticationContainer extends Component {

  render() {
    return (
      <Authentication {...this.props}/>
    );
  }
  
}