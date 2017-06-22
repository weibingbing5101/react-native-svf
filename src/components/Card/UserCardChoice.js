import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform,Dimensions} from 'react-native';
import _ from 'lodash';
import { RowBetween } from '../Layout';
import {Select} from '../Form';
import { leftCenter } from '../../utils/Style';
import {CardBrief} from './';
import {
  MONEY_USD, 
  MONEY_EUR, 
  MONEY_GBP, 
  MONEY_FLAG, 
  MONEY_TEXT
} from '../../config/currencyType';

let defaultTextStyle={
  fontSize: 12
}

const cardTypeImage = {
  visa: require('./image/visa.png'),
  master: require('./image/master.png')
}

const width = Dimensions.get('window').width;

export default class UserCardChoice extends Component {

  _renderSelected=(index)=>{
    let text = this.props.card.baseInfo[index].cardtype===0?'实体卡':'虚拟卡';
    let currencyText = MONEY_TEXT[this.props.card.baseInfo[index].currency] || '';
    currencyText = currencyText + '币种';
    let cardNo = this.props.card.baseInfo[index].cardNo.match(/.{3,4}$/)[0];
    cardNo = '尾号'+cardNo;

    return <View style={{width: width,height:60,backgroundColor:'#3b7cfb',marginLeft:-10,marginTop:0,alignItems:'center'}}>
            <View style={{flexDirection:'row',marginTop:10}}>
              <Image style={{width:30,height:10,marginTop:5}} source={cardTypeImage['visa']} />
              <View style={{backgroundColor:'#2acdde',borderRadius:3,height:18,paddingLeft:5,paddingRight:5,justifyContent:'center',marginLeft: 5,}}>
                <Text style={{color:'white'}}>{text}</Text>
              </View>
            </View>
            <View style={{flexDirection:'row',marginTop:5}}>
              <Text style={{color:'#9cd1fd'}}>{currencyText}</Text>
              <Text style={{color:'white',marginLeft:10}}>{cardNo}</Text>
            </View>
           </View>;
  }

  _renderOption=(cardInfo)=>{
    return <CardBrief {...this.props} cardData={cardInfo} theme={this.props.theme} style={{backgroundColor: 'transparent'}}  />
  }

  render(){
    return <Select 
        {...this.props} 
        label=""
        arrowStyle = {{top:40,right:90}}
        placeholder="选择充值卡"
        defaultSelected={this.props.curCardIndex}
        dataSource={ this.props.card.baseInfo }
        renderSelected={ this._renderSelected }
        renderOption={this._renderOption} />

    
  }

}
