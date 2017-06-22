import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform,ListView,Dimensions,Alert} from 'react-native';
import CustomBackTitle from '../CustomBackTitle';
import {Input, Button,LabelInput,RowButton} from '../Form';

import {UpdateName, UpdateIc, UpdatePhone,UpdateEmail, UpdateAddress} from '../User';

import FormPanel from './FormPanel';

const UPDATE_MAP = {
  'userName': UpdateName,
  'userIc': UpdateIc,
  'userPhone': UpdatePhone,
  'userEmail':UpdateEmail,
  'userAddress': UpdateAddress
}

const width = Dimensions.get('window').width;

export default class InputUpdate extends Component {


  state={
    value: '',
    valueIsValid: true
  }

  constructor(props){
    super(props);
     
  }

  /*componentWillReceiveProps(nextProps){
    if(nextProps.){
      this.setState({
        selectdIndex: nextProps.defaultSelected
      });
    }
  }*/

  _valueChange=(val)=>{
    this.setState({
      value: val
    }, this._valueCheck)
  }

  _valueCheck=()=>{
    this.setState({
      valueIsValid: this._selfValueIsValid(this.state.value)
    })
  }


  componentDidMount(){

    this._valueChange( this._selfGetValue(this.props) )
  }

  render() {
    console.log(this.props.navigateData);
    let curInputObj = UPDATE_MAP[this.props.navigateData]||{};
    
    let {title, goFixedPage, backOnly, label, placeholder, valueIsValid, getValue, submit} = curInputObj;
    this._selfValueIsValid = valueIsValid;
    this._selfGetValue = getValue;

    // let value = this._selfGetValue(this.props);

    return (
      <FormPanel>
        <View style={{flex:1}}>
          <CustomBackTitle
            title={title} 
            goFixedPage = {goFixedPage} 
            left={-width/2+30} 
            {...this.props}
            backOnly = { backOnly }
          /> 
          <LabelInput {...this.props} 
            label={label}
            placeholder={placeholder} 
            defaultValue={this.state.value} 
            onChange={this._valueChange}
            theme={theme} />
          <RowButton {...this.props} 
              onPress={ ()=>submit(this.state.value, this.props) }
              style={{color:'white'}}
              disabled={ !this.state.valueIsValid }>
            修改
          </RowButton>
        </View>
      </FormPanel>
    );
  }

}
