import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform} from 'react-native';
import _ from 'lodash';
import { Select } from '../Form';
import { primaryFontSize,leftCenter } from '../../Style'

export default class ChargeFrom extends Component {

  _renderSelected = () => {
    return <Text>果付-GOP</Text>
  }

   _renderOption = (data, index) => {
    return (
      <View>
        <Text>{data.title}</Text>
      </View>
    )
  }

  render(){
    return <Select 
        {...this.props} 
        label="充值方式" 
        placeholder="选择充值卡"
        renderSelected={ this._renderSelected }
        renderOption={this._renderOption} />
  }

}

ChargeFrom.defaultProps = {
  chargeFromType: [
    {key: 'gop', title: '果付-GOP'},
    {key: 'weixin', title: '微信'},
    {key: 'alipay', title: '支付宝'}
  ]
}
