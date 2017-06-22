import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform,Dimensions} from 'react-native';
import _ from 'lodash';
import { LabelArrow,LeftRightLabel } from '../Layout';
import CustomBackTitle from '../CustomBackTitle';
import BillCardInfo from './parts/BillCardInfo';
import BillDetailItem from './parts/BillDetailItem';
import Theme from '../../utils/Theme';
import {
  MONEY_USD, 
  MONEY_EUR, 
  MONEY_GBP, 
  MONEY_FLAG, 
  MONEY_TEXT,
  MONEY_CODE,
  CURRENCY_TEXT
} from '../../config/currencyType';

import DateUtil from '../../utils/DateUtil';


const width = Dimensions.get('window').width;
export default class BillDetail extends Component {

  constructor(props){
    super(props);
  }

  _renderAmountLeft=(theme,billCardInfo)=>{
    let text = '充值金额';
    let billType = billCardInfo.billType;
    if (billType==2) {
      text = '交易金额';
    }else if (billType==3) {
      text = '转入数量';
      if (billCardInfo.phone ==billCardInfo.from) {
        text = '转出数量';
      }
    }else if(billType==4){
      text = '退款金额';
    }
    return <Text style={{color: theme.colors.primaryColor}}>{text}</Text>
  }
  _renderAmountRight=(theme,billCardInfo,curCardInfo)=>{
    let text = MONEY_FLAG[curCardInfo.currency]+' '+(Math.abs(billCardInfo.amount)).toFixed(2);
    let image;
    // if (billCardInfo.billType==3) {
    //   text = billCardInfo.gopNum.toFixed(3);
    //   image = <Image style={{width:10,height:16,opacity:0.5,marginRight:3}} source={require('../Common/image/g.png')} />;
    // }
    return <View style={{flexDirection:'row'}}>
            {image}
            <Text style={{color: theme.colors.primaryColor,marginRight:20}}>{text}</Text>
           </View>
  }
  _renderRemitLeft =(theme) =>{

  }
  _renderRemitRight = (theme)=>{
    return <Text style={{color: theme.colors.mainColor,marginRight:20}} onPress={()=>{this.goPage()}}>汇款详情</Text>
  }

  _goodsValue = (theme,info)=>{
    if (info.amtTxn) {
      let text = MONEY_FLAG[info.tradeCurrency]+' '+info.amtTxn.toFixed(2);
      return <BillDetailItem {...this.props} 
              label="商品金额" 
              placeholder={text} 
              theme={theme}  />;
    }
  }

  _address = (theme,info)=>{
    if (info.billType==3) {
      let toInfo = info.to&&info.to.substr(-4);
      let address = '尾号'+ toInfo;
      let text = '转账至';
      if (info.to==info.phone) {
        text = '来自';
        let fromInfo = info.from && info.from.substr(-4);
        address = '尾号'+fromInfo;
      }
      return <BillDetailItem {...this.props}
              label = {text}
              placeholder = {address}
              theme = {theme} />;
    }
  }

  _amountFee = (theme,billCardInfo,curCardInfo)=>{
    if (billCardInfo.billType!=4&& billCardInfo.amtFee) {
      let text = MONEY_FLAG[curCardInfo.currency]+' '+billCardInfo.amtFee.toFixed(2);
      return <BillDetailItem {...this.props} 
              label="手续费" 
              placeholder={text}
              theme={theme}  />;
    }
  }

  

  _exchangeRate = (theme,info) =>{
    if (info.transactionCur2cardCur) {
      let text = info.transactionCur2cardCur.toFixed(4);
      return <BillDetailItem {...this.props} 
              label="汇率" 
              placeholder={text} 
              theme={theme} />;
    }
  }

  _bizTypeDesc = (theme,info) =>{
    if (info.bizTypeDesc) {
      return <BillDetailItem {...this.props} 
              label="业务" 
              placeholder={info.bizTypeDesc} 
              theme={theme}  />
    }
  }

  _businessShop = (theme,info) =>{
    if (info.billType==2) {
      return <BillDetailItem {...this.props} 
              label="商户" 
              placeholder={info.merchant} 
              theme={theme}  />  ;
    }
  }

  _time = (theme,info) =>{
    let text;
    let time;
    if (info.createTime) {
      text = '充值时间';
      time = DateUtil.getTimeTextWithTimestamp(info.createTime);
    }else if (info.transferTime) {
      text = '到账时间';
      time = DateUtil.getTimeTextWithTimestamp(info.transferTime);
    }
    return <BillDetailItem {...this.props} 
              label = {text} 
              placeholder={time} 
              theme={theme}  />
  }

  _payType = (theme,info) =>{
    if (info.billType==1) {
      return <BillDetailItem {...this.props} 
              label="支付方式" 
              placeholder={info.rechargeMethod} 
              theme={theme}  /> ;
    }
  }

  _orderId = (theme,info) =>{
    let orderId;
    if (info.orderId) {
      orderId = info.orderId;
    }else if (info.orderNo) {
      orderId = info.orderNo;
    }
    return <BillDetailItem {...this.props} 
            label="交易单号" 
            placeholder={orderId} 
            theme={theme}  />;
  }

  _remitDetail = (theme,info) =>{
    if (info.billType==1 && info.bizType==2) {  //线下汇款
      return <LeftRightLabel {...this.props}
              renderLeft={()=>this._renderRemitLeft(theme)}
              renderRight={()=>this._renderRemitRight(theme)} />;
    }
  }

  goPage=()=>{
    let data = this.props.navigateData;
    if (data) {
      this.props.goPage('charge_apply_offline',data);
    }
  }

  render(){
    let theme = new Theme(this.props.card.theme);
    let navigateData = this.props.navigateData;
    console.log(navigateData);
    let billCardInfo;
    let curCardInfo;
    if (navigateData) {
      billCardInfo = navigateData.billCardInfo;
      curCardInfo = navigateData.curCardInfo;
    }
    
    return (
      <View>
        <View>
          <CustomBackTitle title="账单明细" left={-width/2+30} backOnly = {true} {...this.props}/>
        </View>
        <View>
          <BillCardInfo {...this.props} billCardInfo={billCardInfo} theme={theme}/>
        </View>
        <View style={{backgroundColor:'white',marginTop:20}}>
          <LeftRightLabel {...this.props}
              renderLeft={()=>this._renderAmountLeft(theme,billCardInfo)}
              renderRight={()=>this._renderAmountRight(theme,billCardInfo,curCardInfo)}
              />
        </View>
        <View style={constStyle.mainInfo}>
          {this._goodsValue(theme,billCardInfo)}
          {this._address(theme,billCardInfo)}
          {this._amountFee(theme,billCardInfo,curCardInfo)}
          {this._exchangeRate(theme,billCardInfo)}
          {this._bizTypeDesc(theme,billCardInfo)}
          {this._businessShop(theme,billCardInfo)}
          <BillDetailItem {...this.props} 
            label="状态" 
            placeholder={billCardInfo.rechargeStatus || billCardInfo.transferStatus} 
            theme={theme}  /> 
          {this._time(theme,billCardInfo)}
          {this._payType(theme,billCardInfo)}
          {this._orderId(theme,billCardInfo)}         
          {this._remitDetail(theme,billCardInfo)}
        </View>
        <View style={{backgroundColor:'white',height:50}}>
        </View>
      </View>
      );
  }
}


const constStyle = StyleSheet.create({
  mainInfo:{
    // flex:1,
    // width:50,
    borderStyle:'solid',
    borderWidth:2,
    borderColor:'#EEF2F4',
    borderLeftWidth:0,
    borderRightWidth:0,
    backgroundColor:'white',
    paddingTop:10,
  }
})
