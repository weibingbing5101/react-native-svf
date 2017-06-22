import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform} from 'react-native';
import _ from 'lodash';
import { Select } from '../../Form';
import { LabelArrow } from '../../Layout';
import { leftCenter } from '../../../utils/Style';
import {
  MONEY_USD, 
  MONEY_EUR, 
  MONEY_GBP, 
  MONEY_FLAG, 
  MONEY_TEXT
} from '../../../config/currencyType';

import {
  CARD_ENTITY, 
  CARD_FICTITIOUS, 
  CARD_TYPE_TEXT
} from '../../../config/cardType';
import DateUtil from '../../../utils/DateUtil';



export default class CardProcessItem extends Component {

  renderLeft = () =>{
    let cardProcessInfo = this.props.cardProcessInfo;
    let textColor = this.props.theme.colors.primaryColor;
    let textStyle = _.extend({color: textColor, marginTop:2, marginBottom:2,fontSize: 12,marginLeft:10});
    let name = cardProcessInfo.firstname + ' '+cardProcessInfo.lastname; 
    let desc = MONEY_TEXT[cardProcessInfo.currency]+'-'+ CARD_TYPE_TEXT[cardProcessInfo.cardtype];
    return (
      <View style={leftCenter}>
        <View>
          <Text>{DateUtil.getDayTextWithTimestamp(cardProcessInfo.createtime)}</Text>
        </View>
        <View>
          <Text style={textStyle}>{name}</Text>
          <Text style={textStyle}>{desc}</Text>
        </View>

      </View>
    )
  }

  renderRight = () =>{
    return (
      <View>
        <Text>{this.props.cardProcessInfo.checkStatusDesc}</Text>
      </View>
    )
  }


  render(){
    return  <LabelArrow {...this.props} renderLeft={ this.renderLeft } renderRight={ this.renderRight } />
  }
}

