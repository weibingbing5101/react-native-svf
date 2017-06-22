import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform} from 'react-native';
import _ from 'lodash';
import { Select } from '../../Form';
import {
  MONEY_USD, 
  MONEY_EUR, 
  MONEY_GBP, 
  MONEY_FLAG, 
  MONEY_TEXT
} from '../../../config/currencyType';


export default class CardCurrency extends Component {

  // state = {
  //   defaultSelected:1
  // }
  constructor(props){
    super(props);
    this.state= {
      defaultSelected:props.defaultSelected,
    }
  }
  componentWillReceiveProps(nextProps){
    if (nextProps.defaultSelected) {
      this.setState({defaultSelected:nextProps.defaultSelected});
    }
    // if (nextProps.card.userMaterialInfo) {
    //   this.setState({defaultSelected:nextProps.defaultSelected});
    // }else{
    //   this.setState({defaultSelected:nextProps.defaultSelected});
    // }

  }

  renderSelected = (index) => {
    let currency = this.props.currencyType[index];
    this.props.onChange(currency.value);
    return <Text style={{color:'#9b9b9b'}}>{currency.title}</Text>
  }
  _renderOption = (data, index) => {
  	return  (
      <View>
        <Text>{data.title}</Text>
      </View>
    )
  }

  render(){
    return <Select 
    	{...this.props} 
      leftSize={85}
    	label="账户币种"
    	placeholder="选择卡币种"
      defaultSelected = {this.state.defaultSelected-1}
    	dataSource={ this.props.currencyType }
     	renderSelected={ this.renderSelected } 
     	renderOption={this._renderOption}/>
  }

}


CardCurrency.defaultProps = {
  currencyType: [
    {key: 'dollar', title: '美元',value:1},
    {key: 'euro', title: '欧元',value:2},
    {key: 'pound', title: '英镑',value:3}
  ]
}