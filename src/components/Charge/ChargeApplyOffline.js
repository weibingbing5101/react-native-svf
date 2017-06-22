import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform,Clipboard} from 'react-native';
import _ from 'lodash';
import { Select } from '../Form';
import { primaryFontSize,leftCenter,colCenter } from '../../utils/Style';
import Theme from '../../utils/Theme';
import CustomBackTitle from '../CustomBackTitle';
import { RowBetween } from '../Layout';

import DateUtil from '../../utils/DateUtil';

const cardImage = {
  master: require('../Common/image/master_little.png'),
  visa: require('../Common/image/visa_little.png')
}
export default class ChargeApplyOffline extends Component {

  setContentToClipboard=(text)=>{
    Clipboard.setString(text);
  }
  _renderBankLeft = (orderInfo)=>{
    return <View style={[leftCenter,styles.accountInfoItem]}>
            <Text>汇款银行</Text>
            <Text style={styles.marginLeftExtra}>{orderInfo.bankName}</Text>
           </View>;

  }

  _renderBankRight=(orderInfo,copyText)=>{
    return <Text style={[{marginRight:40},copyText]} 
            onPress={()=>this.setContentToClipboard(orderInfo.bankName)}>复制</Text>;

  }

  _renderNOLeft=(orderInfo)=>{
    return <View style={[leftCenter,styles.accountInfoItem]}>
            <Text>银行账号</Text>
            <Text style={styles.marginLeftExtra}>{orderInfo.bankCardNo}</Text>
          </View>;

  }

  _renderNORight=(orderInfo,copyText)=>{
    return <Text style={[{marginRight:40},copyText]} 
                 onPress={()=>this.setContentToClipboard(orderInfo.bankCardNo)} >复制</Text>;

  }

  _renderNameLeft=(orderInfo)=>{
    return <View style={[leftCenter,styles.accountInfoItem]}>
            <Text>开户名称</Text>
            <Text style={styles.marginLeftExtra}>{orderInfo.accountName}</Text>
          </View>;

  }

  _renderNameRight=(orderInfo,copyText)=>{
    return <Text style={[{marginRight:40},copyText]} 
                 onPress={()=>this.setContentToClipboard(orderInfo.accountName)} >复制</Text>;

  }

  _renderAmountLeft=(orderInfo)=>{
    return <View style={[leftCenter,styles.accountInfoItem]}>
            <Text>汇款金额</Text>
            <Text style={styles.marginLeftExtra}>港币{orderInfo.amount}元</Text>
          </View>

  }
  _renderAmountRight=(orderInfo,copyText)=>{

  }

  _renderMarkLeft=(orderInfo)=>{
    return <View style={[leftCenter,styles.accountInfoItem]}>
            <Text>备注/附言</Text>
            <Text style={styles.marginLeftExtra}>{orderInfo.remark}</Text>
          </View>;
  }

  _renderMarkRight=(orderInfo,copyText)=>{
    return <Text style={[{marginRight:40},copyText]} 
            onPress={()=>this.setContentToClipboard(orderInfo.remark)} >复制</Text>

  }

  _renderExpireTimeLeft=(orderInfo)=>{
    return <View style={[leftCenter,styles.accountInfoItem]}>
            <Text>汇款有效时间</Text>
            <Text style={styles.marginLeftExtra}>{DateUtil.getTimeTextWithTimestamp(orderInfo.validDate)}</Text>
          </View>;
  }

  _renderExpireTimeRight = (orderInfo,copyText)=>{

  }

  render(){
    let orderInfo = this.props.charge.orderInfo || this.props.navigateData;
    console.log(orderInfo);
    let theme = new Theme(this.props.card.theme);
    let textStyle = {color: theme.colors.primaryColor, marginTop:2, marginBottom:2,fontSize:12};
    let copyText = {color:theme.colors.mainColor};
    return (
    	<View style={{flex:1}}>
	      <View style={{backgroundColor: theme.colors.mainBgColor }}>
	        <CustomBackTitle title="充值申请已提交" left={-220} {...this.props}/>
	      </View>
	      <View style={styles.tips}>
	      	<Text style={textStyle}>请登录您网上银行或银行柜台向代理商银行账户汇款</Text>
          <Text style={{marginTop:10}}>代理商账户</Text>
	      </View>
        <View style={styles.accountInfo}>
          <View style={{borderBottomColor:'#EEF2F4',borderBottomWidth:1,margin:0}}>
            <RowBetween {...this.props} 
              renderLeft={ ()=>this._renderBankLeft(orderInfo) } 
              renderRight={ ()=>this._renderBankRight(orderInfo,copyText) } />  
          </View>
          <View style={{borderBottomColor:'#EEF2F4',borderBottomWidth:1,margin:0}}>
            <RowBetween {...this.props} 
              renderLeft={ ()=>this._renderNOLeft(orderInfo) } 
              renderRight={ ()=>this._renderNORight(orderInfo,copyText) } />  
          </View>

          <View style={{borderBottomColor:'#EEF2F4',borderBottomWidth:1,margin:0}}>
            <RowBetween {...this.props} 
              renderLeft={ ()=>this._renderNameLeft(orderInfo) } 
              renderRight={ ()=>this._renderNameRight(orderInfo,copyText) } />  
          </View>


          <View style={{borderBottomColor:'#EEF2F4',borderBottomWidth:1,margin:0}}>
            <RowBetween {...this.props} 
              renderLeft={ ()=>this._renderAmountLeft(orderInfo) } 
              renderRight={ ()=>this._renderAmountRight(orderInfo,copyText) } />  
          </View>

          <View style={{borderBottomColor:'#EEF2F4',borderBottomWidth:1,margin:0}}>
            <RowBetween {...this.props} 
              renderLeft={ ()=>this._renderMarkLeft(orderInfo) } 
              renderRight={ ()=>this._renderMarkRight(orderInfo,copyText) } />  
          </View>

          <View style={{borderBottomColor:'#EEF2F4',borderBottomWidth:1,margin:0}}>
            <RowBetween {...this.props} 
              renderLeft={ ()=>this._renderExpireTimeLeft(orderInfo) } 
              renderRight={ ()=>this._renderExpireTimeRight(orderInfo,copyText) } />  
          </View>

        </View>
        <View style={styles.attachInfo}>
          <Text style={textStyle}>请在汇款备注/附言中填写：<Text style={{color:'black'}}>{orderInfo.mark} </Text>不要填写其他字符</Text>
          <Text style={textStyle}>否则不能正确到账！</Text>
          <Text style={textStyle}>如汇款时间超过 <Text style={{color:'black'}}>{DateUtil.getTimeTextWithTimestamp(orderInfo.validDate)}</Text> 当前充值单将无法入账！</Text>
        </View>
      </View>
    )
  }

}

ChargeApplyOffline.defaultProps = {
  
}

const styles = StyleSheet.create({
  tips: {
    marginTop: 20,
    marginBottom:20,
    marginLeft:10
  },
  accountInfo:{
    backgroundColor:'#fff',
    // fontSize:12
  },
  accountInfoItem:{
    paddingLeft:10,
    paddingTop:10,
    paddingBottom:10,
    // borderBottomColor:'#EEF2F4',
    // borderBottomWidth:1,
  },
  attachInfo:{
    marginTop:30,
    marginLeft:10
  },
  marginLeftExtra:{
    marginLeft:30,
    // fontSize:12
  }
})