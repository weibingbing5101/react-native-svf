import React, { Component, PropTypes } from 'react';
import PassWordStepTwo from '../../components/User/PassWordStepTwo'
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
export default class pass_word_step_twoContainer extends Component {

  render() {
    return (
      <PassWordStepTwo {...this.props}/>
    );
  }
  
}