import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform,AsyncStorage} from 'react-native';
import _ from 'lodash';
import { LabelArrow } from '../Layout';
import Touch from '../../utils/Touch';
import {
  MONEY_USD, 
  MONEY_EUR, 
  MONEY_GBP, 
  MONEY_FLAG, 
  MONEY_TEXT,
  MONEY_CODE
} from '../../config/currencyType';

const img = {
  zhuanzhang:require('./image/zhuanzhang.png'),
  ATM : require('./image/atm.png'),
  SHOP : require('./image/pos.png'),
  ONLINE:require('./image/xianshang.png'),
  tuikuan:require('./image/tuikuan.png'),
}


export default class BillStatus extends Component {

  constructor(props){
    super(props);
  }

  renderLeft = (chargeInfo) => {
    let merchant = '';
    let text= '';
    let src = '';
    if (chargeInfo.billType==1) {
      merchant = '充值至尾号'+chargeInfo.telephone.substr(-4,4);
      text = '充值';
    }else if (chargeInfo.billType==2 || chargeInfo.billType==4) {
      merchant = chargeInfo.merchant;
      merchant = merchant.length>30?merchant.substr(0,30)+'...':merchant;
      text = chargeInfo.bizTypeDesc;
      let tmp = text;
      if (tmp==='退款') {
        tmp = 'tuikuan';
      }
      src = img[tmp];
    }else if (chargeInfo.billType==3) {
      /* transferDirection
        ACCOUNT2ACCOUNT(0,"账户到账户"),
        ACCOUNT2CARD(1, "账户至卡"),
        CARD2CARD(2, "卡至卡"),
        CARDTOACCOUNT(3, "卡至账户");
      */
      text = '';
      if (chargeInfo.transferDirection==0) {
        if (chargeInfo.from==chargeInfo.phone) {
          text='转出';
          merchant = '转账至尾号'+chargeInfo.to.substr(-4,4)+'-转账';
        }else if(chargeInfo.to==chargeInfo.phone){
          text = '转入';
          merchant = '收到尾号'+chargeInfo.from.substr(-4,4)+'-转账';
        }
      }else if (chargeInfo.transferDirection==1) {
        if (chargeInfo.from==chargeInfo.phone) {
          text='转出';
          merchant = '转账至尾号'+chargeInfo.to.substr(-4,4)+'-转账';
        }
      }else if (chargeInfo.transferDirection==3) {
        if(chargeInfo.to==chargeInfo.phone){
          text = '转入';
          merchant = '收到尾号'+chargeInfo.from.substr(-4,4)+'-转账';
        }
      }
      src = img['zhuanzhang'];
    }
    return (
      <View style={{flexDirection:'row'}}>
        {src?<Image style={{width:40,height:40}} source={src}/>:false}
        <View style={{marginLeft:10,paddingTop:4}}>
          <Text style={{fontSize:15,color:'#353535',marginBottom:3}}>{text}</Text>
          <Text style={{fontSize:12,color:'#aaa'}}>{merchant}</Text>
        </View>
      </View>
    )
  }

  renderRight = (chargeInfo) => {
    let rightValue;
    let rightCurrency;
    if (chargeInfo.billType==2) {
      if (chargeInfo.transType==='CONSUMSUCCES') {   //消费
        rightValue ='-' + chargeInfo.amount;
      }else if (chargeInfo.transType==='REFUND'){   //消费撤销
        rightValue = chargeInfo.amount;
      }
      rightCurrency = MONEY_CODE[chargeInfo.tradeCurrency];
    }else if (chargeInfo.billType==1) {  //充值
      rightValue = chargeInfo.amount;
      rightCurrency = chargeInfo.currency;
    }else if (chargeInfo.billType==3) {  //转账
      rightValue = chargeInfo.amount;
      rightCurrency = chargeInfo.currency;
    }


    return (
        <View>
          <Text style={{fontSize:16,color:'#353535',marginBottom:3} }>{rightValue}</Text>
          <Text style={{fontSize:12,color:'#aaa',textAlign:'right'}}>{rightCurrency}</Text>
        </View>
    )
  }

  render(){
    let chargeInfo = this.props.chargeInfo;
    return <LabelArrow {...this.props} 
            renderLeft={()=> this.renderLeft(chargeInfo) } 
            renderRight={ ()=>this.renderRight(chargeInfo) } 
            style={styles.wrap}/>
  }

}

const styles = StyleSheet.create({
  wrap :{
    borderBottomWidth:1,
    borderColor:'#efeff4',
    paddingLeft:0,
    marginLeft:10,
    height:68,
  }

  
});
