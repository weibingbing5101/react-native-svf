import React, {Component} from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import dismissKeyboard from 'dismissKeyboard';

export default class FormPanel extends Component {

  constructor(props){
    super(props);
     
  }

  render() {

    return (
      <TouchableWithoutFeedback onPress={ dismissKeyboard }>
        {this.props.children}
      </TouchableWithoutFeedback>
    );
  }

}
