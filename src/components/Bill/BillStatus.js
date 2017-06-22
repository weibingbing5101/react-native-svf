import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform} from 'react-native';
import _ from 'lodash';
import { LabelArrow } from '../Layout';
import Touch from '../../utils/Touch';
import gop from '../../utils/Gop';
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
  1:require('./image/atm.png'),
  2:require('./image/xianshang.png'),
  3:require('./image/pos.png')
}

const consumeText = {
  1:'ATM提现',
  2:'线上消费',
  3:'POS刷卡消费'
};


export default class BillStatus extends Component {

  constructor(props){
    super(props);
  }

  renderLeft = (chargeInfo) => {
    // console.log(chargeInfo);
    /*
        { 
          amount:"1.00",
          billType:3,
          currency:"HKD",
          orderId: "866560296675590160", 
          from: "865384409399021569", 
          fromMask: "865384409399021569", 
          to: "18600863085", 
          toMask: "18600863085",
          transferDirection: 0,
          transferStatus:"SUCCEEDED",
          transferTime:1495438449000
        }
    */
    // console.log(chargeInfo);
    let merchant = '';
    let text= '';
    let src = '';
    if (chargeInfo.billType==1) {
      merchant = chargeInfo.status;
      text = '充值';
    }else if (chargeInfo.billType==2) {
      merchant = chargeInfo.instcode;
      merchant = merchant.length>30?merchant.substr(0,30)+'...':merchant;
      text = consumeText[chargeInfo.consumetype];
      let tmp = chargeInfo.consumetype;
      src = img[tmp];
    }else if (chargeInfo.billType==3) {
      if (chargeInfo.from ==gop.gopPhone) {
        text = '转入';
        let address = chargeInfo.from || '     ';
        merchant = '收到尾号'+address.substr(-4)+'-转账';
      }else if (chargeInfo.to==gop.gopPhone) {
        text = '转出';
        let address = chargeInfo.to || '     ';
        merchant = '转账至尾号'+address.substr(-4)+'-转账';
      }
      // merchant = '来自卡号'+address.substr(0,5)+'****'+address.substr(address.length-4,4)+'-转账';
      // text = '转账';
      src = img['zhuanzhang'];
    }
    return (
      <View style={{flexDirection:'row'}}>
        <Image style={{width:40,height:40}} source={src}/>
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
      rightValue ='-' + chargeInfo.amttxn.toFixed(2);
      rightCurrency = MONEY_CODE[1];
    }else if (chargeInfo.billType==1) {  //充值
      rightValue = chargeInfo.amtTxn.toFixed(2);
      rightCurrency = MONEY_CODE[chargeInfo.tradeCurrency];
    }else if (chargeInfo.billType==4) {  //退款
      rightValue = chargeInfo.amtTxn.toFixed(2);
      rightCurrency = MONEY_CODE[chargeInfo.tradeCurrency];
    }else if (chargeInfo.billType == 3) {
        let num = parseFloat(chargeInfo.amount).toFixed(3);
        // let flag = chargeInfo.currency;  //MONEY_FLAG[data.moneyType]||'';
        if (chargeInfo.from==gop.gopPhone) {
          rightValue = '+'+ num;
        }else{
          rightValue = '-'+ num;
        }
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
