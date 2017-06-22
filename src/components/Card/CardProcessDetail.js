import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform,ListView,ScrollView,Dimensions,Alert} from 'react-native';
import {Input, Button,LabelInput,RowButton,InfoInput,InfoShow} from '../Form';
import CustomBackTitle from '../CustomBackTitle';
import Http from '../../utils/Http';
import Touch from '../../utils/Touch';
import Theme from '../../utils/Theme';
import {StatusTip} from '../Layout';
import CardType from './parts/CardType';
import CardCurrency from './parts/CardCurrency';
import CardMail from './parts/CardMail';
import CardCountry from './parts/CardCountry';
import CardCity from './parts/CardCity';
import {
  MONEY_USD, 
  MONEY_EUR, 
  MONEY_GBP, 
  MONEY_FLAG, 
  MONEY_TEXT
} from '../../config/currencyType';

import {
  CARD_TYPE_TEXT,
} from '../../config/cardType';

import {
  CARD_POST_TYPE_TEXT,
} from '../../config/postType';

import CardRejectApply from './parts/CardRejectApply';


const width = Dimensions.get('window').width;
export default class CardProcessDetail extends Component {

  constructor(props){
    super(props);
    this.status =[,'process','warn',,'success'];
    this.statusText = [,'审核中','审核拒绝',,'审核通过'];
    this.state = {
      itemDetailInfo:'',
      rejectApplyAgain:false,   //驳回时判断再次申请
    }
  }

  renderExtra =(reason)=>{
  	return (<Text>驳回原因：{reason}</Text>);
  }

  changeToApplyAgain=()=>{
    this.setState({rejectApplyAgain:true});
  }

  render() {
    let theme = new Theme(this.props.card.theme);

    let itemDetailInfo = this.props.card.cardMerterialSnapInfo;
    let btn;
    if (itemDetailInfo.checkstatus==2) {
      btn = (<RowButton onPress={()=>this.changeToApplyAgain()}>再次申请</RowButton>);
    }

    let list;
    if (!this.state.rejectApplyAgain) {
      list = (
        <ScrollView style={{marginTop:20,marginBottom:20}}>
          <InfoShow {...this.props} label="姓" placeholder={itemDetailInfo.firstname} theme={theme} />
          <InfoShow {...this.props} label="名" placeholder={itemDetailInfo.lastname} theme={theme} />
          <InfoShow {...this.props} label="卡签名" placeholder={itemDetailInfo.signature} theme={theme} />
          <InfoShow {...this.props} label="卡币种" placeholder={MONEY_TEXT[itemDetailInfo.currency]} theme={theme} />
          <InfoShow {...this.props} label="卡类型" placeholder={CARD_TYPE_TEXT[itemDetailInfo.cardtype]} theme={theme} />
          {itemDetailInfo.cardtype===0 ?
            <InfoShow {...this.props} label="邮递方式" placeholder={CARD_POST_TYPE_TEXT[itemDetailInfo.posttype]} theme={theme} /> 
            :false}
          <InfoShow {...this.props} label="手机号" placeholder={itemDetailInfo.phone} theme={theme} />
          <InfoShow {...this.props} label="出生日期" placeholder={itemDetailInfo.dateofbirth} theme={theme} />
          <InfoShow {...this.props} label="国家" placeholder={itemDetailInfo.country} theme={theme} />
          <InfoShow {...this.props} label="城市" placeholder={itemDetailInfo.city} theme={theme} />
          <InfoShow {...this.props} label="邮箱" placeholder={itemDetailInfo.emailid} theme={theme} />
          <InfoShow {...this.props} label="邮编" placeholder={itemDetailInfo.postcode} theme={theme} />
          <InfoShow {...this.props} 
            label="详细地址" 
            styles={stylesExt}
            placeholder={itemDetailInfo.address} 
            theme={theme} />          
          {btn}
        </ScrollView>
        );
    }else{
      list = (
        <CardRejectApply {...this.props} applyAgainInfo={itemDetailInfo}/>
        );
    }

    return (
      <View style={{flex:1}}>
        <View >
          <CustomBackTitle title="卡申请进度详情" backOnly={true} {...this.props}/> 
          <StatusTip {...this.props} 
              theme={theme}
              type={this.status[itemDetailInfo.checkstatus]} 
              renderExtra={itemDetailInfo.checkInfo?(()=>this.renderExtra(itemDetailInfo.checkInfo)):false}>
                {this.statusText[itemDetailInfo.checkstatus]}</StatusTip> 
        </View>
        {list}
      </View>
    );
  }

}


const stylesExt = StyleSheet.create({
  wrap:{
    borderBottomWidth:1,
    borderColor:'#efeff4',
    // paddingLeft:0,
    // marginLeft:15,
    height:80,
  }
});
