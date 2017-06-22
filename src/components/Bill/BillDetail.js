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

  _renderAmountLeft=(theme,billType)=>{
    let text = '充值金额';
    if (billType==2) {
      text = '交易金额';
    }else if (billType==3) {
      text = '转账数量';
    }else if(billType==4){
      text = '退款金额';
    }
    return <Text style={{color: theme.colors.primaryColor}}>{text}</Text>
  }

  // 金额数量
  _renderAmountRight=(theme,billCardInfo,curCardInfo)=>{
    let text = '' ;//billCardInfo.currency+' '+(Math.abs(billCardInfo.amount)).toFixed(2);
    let image;
    if (billCardInfo.billType==3) {
      text = parseFloat(billCardInfo.amount).toFixed(3);
    }
    if (billCardInfo.billType==2) {
      text = billCardInfo.amttxn;
    }
    return <View style={{flexDirection:'row'}}>
            <Text style={{marginRight:10}}>{MONEY_CODE[1]}</Text>
            <Text style={{color: theme.colors.primaryColor,marginRight:20}}>{text}</Text>
           </View>
  }


  _renderRemitRight = (theme)=>{
    return <Text style={{color: theme.colors.mainColor,marginRight:20}} onPress={()=>{this.goPage()}}>汇款详情</Text>
  }

  // 商品金额  废弃
  _goodsValue = (theme,info)=>{
    // if (info.amtTxn) {
    //   let text = MONEY_FLAG[info.tradeCurrency]+' '+info.amtTxn.toFixed(2);
    //   return <BillDetailItem {...this.props} 
    //           label="商品金额" 
    //           placeholder={text} 
    //           theme={theme}  />;
    // }
  }

  // 转出地址   账户 
  _address = (theme,billCardInfo)=>{
    if (billCardInfo.billType==3) {
      let address = billCardInfo.to;
      let text = '转入账户';
      if (billCardInfo.from==billCardInfo.phone) {
        address = billCardInfo.from;
        text = '来自账户';
      }
      address = address.substr(0,5)+'****'+address.substr(address.length-4,4);
      return <BillDetailItem {...this.props}
              label = {text} //'转出地址'
              placeholder = {address}
              theme = {theme} />;
    }
  }

  // 手续费  废弃
  _amountFee = (theme,billCardInfo,curCardInfo)=>{
    if (billCardInfo.billType!=4&& billCardInfo.amtFee) {
      let text = MONEY_FLAG[curCardInfo.currency]+' '+billCardInfo.amtFee.toFixed(2);
      return <BillDetailItem {...this.props} 
              label="手续费" 
              placeholder={text}
              theme={theme}  />;
    }
  }

  // 果仁数  废弃
  _gopNum = (theme,info)=>{
    if (info.billType==2&&info.gopNum) {
      let text = info.gopNum.toFixed(3);
      return <BillDetailItem {...this.props} 
              label="果仁数" 
              imageG = {true}
              placeholder={text} 
              theme={theme} />;
    }
  }

  // 汇率   废弃
  _exchangeRate = (theme,info) =>{
    if (info.transactionCur2cardCur) {
      let text = info.transactionCur2cardCur.toFixed(4);
      return <BillDetailItem {...this.props} 
              label="汇率" 
              placeholder={text} 
              theme={theme} />;
    }
  }

  // 退果仁数  废弃
  _returnGopNum = (theme,info)=>{
    if (info.billType===4 && info.gopNum) {
      let text = info.gopNum.toFixed(3);
      return <BillDetailItem {...this.props} 
              label="退果仁数"
              imageG = {true} 
              placeholder={text} 
              theme={theme} />;
    }
  }

  // 业务     废弃
  _bizTypeDesc = (theme,info) =>{
    if (info.bizTypeDesc) {
      return <BillDetailItem {...this.props} 
              label="业务" 
              placeholder={info.bizTypeDesc} 
              theme={theme}  />
    }
  }

  // 商户     废弃
  _businessShop = (theme,info) =>{
    if (info.billType==2) {
      let instcode = info.instcode;
      instcode = instcode.length>30?instcode.substr(0,30)+'...':instcode;
      return <BillDetailItem {...this.props} 
              label="商户" 
              placeholder={instcode} 
              theme={theme}  />  ;
    }
  }

  // 交易时间  到账时间
  _time = (theme,info) =>{
    let text;
    let time;
    if (info.tradetime) {
      text = '交易时间';
      time = DateUtil.getTimeTextWithTimestamp(info.tradetime);
    }else if (info.transferTime) {
      text = '到账时间';
      time = DateUtil.getTimeTextWithTimestamp(info.transferTime);
    }
    return <BillDetailItem {...this.props} 
              label = {text} 
              placeholder={time} 
              theme={theme}  />
  }

  // 支付方式  废弃
  _payType = (theme,info) =>{
    if (info.billType==1) {
      return <BillDetailItem {...this.props} 
              label="支付方式" 
              placeholder={info.payTypeDesc} 
              theme={theme}  /> ;
    }
  }

  // 交易单号  废弃
  _orderId = (theme,info) =>{
    let orderId;
    if (info.orderId) {
      orderId = info.orderId;
    }else if (info.consumerid) {
      orderId = info.consumerid;
    }
    return <BillDetailItem {...this.props} 
            label="交易单号" 
            placeholder={orderId} 
            theme={theme}  />;
  }

  // 线下汇款  废弃
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
          <CustomBackTitle title="账单明细" left={-width/2+30} {...this.props}/>
        </View>
        <View>
          <BillCardInfo {...this.props} curCardInfo={curCardInfo} theme={theme}/>
        </View>
        <View style={{backgroundColor:'white',marginTop:20}}>
          <LeftRightLabel {...this.props}
              renderLeft={()=>this._renderAmountLeft(theme,billCardInfo.billType)}
              renderRight={()=>this._renderAmountRight(theme,billCardInfo,curCardInfo)}
              />
        </View>
        <View style={constStyle.mainInfo}>
          {this._goodsValue(theme,billCardInfo)}
          {this._address(theme,billCardInfo)}
          {this._amountFee(theme,billCardInfo,curCardInfo)}
          {this._gopNum(theme,billCardInfo)}
          {this._exchangeRate(theme,billCardInfo)}
          {this._returnGopNum(theme,billCardInfo)}
          {this._bizTypeDesc(theme,billCardInfo)}
          {this._businessShop(theme,billCardInfo)}
          


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

/*
<BillDetailItem {...this.props} 
  label="状态" 
  placeholder={billCardInfo.status} 
  theme={theme}  /> 
*/
