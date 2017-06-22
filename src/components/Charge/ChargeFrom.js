import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform} from 'react-native';
import _ from 'lodash';
import { Select } from '../Form';
import { primaryFontSize,leftCenter } from '../../utils/Style';

export default class ChargeFrom extends Component {

  state = {
    payTypeList: [],
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.charge){
      this.setState({payTypeList:nextProps.charge.payTypeList});
    }
  }

  _renderSelected = (index) => {
    this.props.changePayType(this.state.payTypeList[index]);
    return <Text>{this.state.payTypeList[index] && this.state.payTypeList[index].desc}</Text>
  }

   _renderOption = (data, index) => {
    return (
      <View>
        <Text>{(data && data.desc)?data.desc:''}</Text>
      </View>
    )
  }

  render(){
    return <Select 
        {...this.props} 
        label="充值类型" 
        leftSize={85}
        placeholder="选择充值方式"
        dataSource = {this.state.payTypeList}
        renderSelected={ this._renderSelected }
        renderOption={this._renderOption} />
  }

}



//废弃
ChargeFrom.defaultProps = {
  chargeFromType: [
    {key: 'gop', title: '果付-GOP'},
    {key: 'weixin', title: '微信'},
    {key: 'alipay', title: '支付宝'}
  ]
}