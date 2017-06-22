import React, {Component} from 'react';
import {Text} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CardActions from '../actions/card';
import Article from '../components/Article';

@connect(
  state => ({
    card: state.card
  }),
  dispatch => bindActionCreators(CardActions, dispatch)
)
export default class ArticleContainer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Article {...this.props}/>
    );
  }

}
