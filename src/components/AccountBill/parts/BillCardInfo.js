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
  MONEY_TEXT,
  MONEY_CODE,
  CURRENCY_TEXT
} from '../../../config/currencyType';


let defaultTextStyle={
  fontSize: 12
}

const cardTypeImage = {
  master: require('../../Common/image/master_little.png'),
  visa: require('../../Common/image/visa_little.png')
}

export default class BillCardInfo extends Component {

  _renderLeft = () => {
    let billCardInfo = this.props.billCardInfo;
    let textColor = this.props.theme.colors.primaryColor;
    let textStyle = _.extend({color: textColor,}, defaultTextStyle);
    return (
      <View style={leftCenter}>
        <View>
          <Text style={ { marginRight: 15} }>账户</Text>
        </View>
        <View>
          <Text style={textStyle}>{'尾号 ' +  billCardInfo.phone.substr(-4)}</Text>
        </View>
      </View>
    )
  }

  _renderRight = () => {
    return (
      <View>
      </View>
    )
  }

  render(){

    return <RowBetween {...this.props} renderLeft={ this._renderLeft } renderRight={ this._renderRight } />
    
  }

}
