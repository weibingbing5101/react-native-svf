import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform} from 'react-native';
import _ from 'lodash';
import { RowBetween } from '../../Layout';
import { leftCenter } from '../../../utils/Style';
import {
  MONEY_USD, 
  MONEY_EUR, 
  MONEY_GBP, 
  MONEY_FLAG, 
  MONEY_TEXT
} from '../../../config/currencyType';


let defaultTextStyle={
  fontSize: 12
}

const cardTypeImage = {
  master: require('../../Common/image/master_little.png'),
  visa: require('../../Common/image/visa_little.png')
}

export default class CardBrief extends Component {

  _renderLeft = () => {
    let curCardInfo = this.props.cardData;
    let textColor = this.props.theme.colors.primaryColor;
    let textStyle = _.extend({color: textColor, marginTop:2, marginBottom:2}, defaultTextStyle);

    return (
      <View style={leftCenter}>
        <View>
          <Image source={cardTypeImage[curCardInfo.type]} style={ {width: 50, height: 30, marginRight: 15} }/>
        </View>
        <View>
          <Text style={textStyle}>{MONEY_TEXT[curCardInfo.currency]+'币种'}</Text>
          <Text style={textStyle}>{'尾号 ' +  curCardInfo.cardNo.substr(-4)}</Text>
        </View>
      </View>
    )
  }

  _renderRight = () => {
    let curCardInfo = this.props.cardData;
    if (curCardInfo) {
      return (
        <View style={{flexDirection:'row',marginLeft:75}}>
          <Text>余额</Text>
          <Text style={{paddingLeft:3,paddingRight:3}}>{MONEY_FLAG[curCardInfo.currency]}</Text>
          <Text>{parseFloat(curCardInfo.balance).toFixed(2)}</Text>
        </View>
      )
    }
    
  }

  render(){

    return <RowBetween {...this.props} renderLeft={ this._renderLeft } renderRight={ this._renderRight } />
    
  }

}
