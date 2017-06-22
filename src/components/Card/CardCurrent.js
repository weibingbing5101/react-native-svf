import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform} from 'react-native';
import _ from 'lodash';
import { CenterCenter } from '../Layout';
import {LineButton} from '../Form';
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


export default class CardCurrent extends Component {

  renderLeft = () => {
   return <Text style={ {color: this.props.theme.colors.primaryColor,fontWeight:'bold',width:110} }>卡可用余额</Text>
  }

  renderCenter = () => {
    let curCardInfo = this.props.card.curCardInfo;
    let flag = MONEY_FLAG[curCardInfo.currency]||'';
    let current = curCardInfo.current && curCardInfo.current.toFixed(2);
    current = current || '--:--';
    return <Text style={{fontWeight:'bold'}}>{flag+' '+current}</Text>
  }

  render(){
    return <CenterCenter 
            {...this.props} 
            renderLeft={ this.renderLeft } 
            renderCenter={ this.renderCenter } 
          />
  }

}
