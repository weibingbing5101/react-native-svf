import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform,Dimensions,ScrollView,Clipboard} from 'react-native';
import _ from 'lodash';
import Toast from 'react-native-root-toast';
import { CenterCenter } from '../Layout';
import {LineButton,LabelInput,InfoShow} from '../Form';
import Theme from '../../utils/Theme';
import Touch from '../../utils/Touch';
import {allCenter,betweenCenter} from '../../utils/Style';
import CustomBackTitle from '../CustomBackTitle';
import { CardStatus,CardCurrent } from '../Card';
import {CardSnap} from './';
// import GopBalance from '../Gop/GopBalance';
// import GopCurrentValue from '../Gop/GopCurrentValue';
// import GopAddress from '../Gop/GopAddress';
import gop from '../../utils/Gop';
import {
  MONEY_USD, 
  MONEY_EUR, 
  MONEY_GBP, 
  MONEY_FLAG, 
  MONEY_TEXT,
  MONEY_CODE,
  CURRENCY_TEXT
} from '../../config/currencyType';

import {
  CARD_ENTITY, 
  CARD_FICTITIOUS, 
  CARD_TYPE_TEXT
} from '../../config/cardType';




let defaultTextStyle={
  fontSize: 12
}

const width = Dimensions.get('window').width;
const cardTypeImage = {
  visa: require('./image/visa.png'),
  master: require('./image/master.png'),
  yincang: require('./image/yincang.png'),
  xianshi: require('./image/xianshi.png'),
  copy: require('./image/copy.png'),
}

export default class CardDetail extends Component {

  state = {
    showSecret: false
  }

  componentDidMount(){
    let {card} = this.props;
    console.log(card); // 卡列表的集合
    // this.props.getCardSecretInfo(card.curCardIndex, card.curCardInfo);
    // this.props.changeCurCard(card.curCardIndex, card.curCardInfo);
    // this.props.grbViewGopNumAndPrice({
    //   cardId:card.curCardInfo.cardId
    // });
  }


  // componentDidMount(){
  //   let {card} = this.props;
  //   console.log('卡详情页面 请求前 组件加载好后');
  //   console.log(card);
  //   // this.props.getCardSecretInfo(card.curCardIndex, card.curCardInfo);
  //   this.props.changeCurCard(card.curCardIndex, card.curCardInfo);
  //   // this.props.grbViewGopNumAndPrice({
  //   //   cardId:card.curCardInfo.cardId
  //   // });
  // }

  componentWillReceiveProps(nextProps) {
    
  }

  // setCardNoToClipboard=()=>{
  //   Clipboard.setString(this.props.card.curCardInfo&&this.props.card.curCardInfo.pan);
  //   if (!this.toast && this.props.card.curCardInfo&&this.props.card.curCardInfo.pan) {
  //     this.toast =  Toast.show('复制成功',{position: Toast.positions.CENTER,duration:2000});
  //     let that = this;
  //     setTimeout(function () {
  //       that.toast = null;
  //     },2500);
  //   }
  // }

  // 获取卡信息  并显示隐藏相关信息
  // _getSecret=(theme)=>{
  //   let curCardInfo = this.props.card.curCardInfo;
  //   let secretInfo = false;
  //   let hasSecret = false;
  //   if (curCardInfo.pin || curCardInfo.cvv) {
  //     hasSecret = true;
  //   }
  //   if(this.state.showSecret&& curCardInfo.pin){
  //     secretInfo = <View style={{backgroundColor:'white'}}><InfoShow {...this.props} label="PIN" styles={styles} leftStyle = {{color:'#888888'}} placeholder={curCardInfo.pin} theme={theme} /></View>
  //     hasSecret = true;
  //   }else if(this.state.showSecret&&curCardInfo.cvv){
  //     let date = curCardInfo.expiryDate;
  //     date = date.substr(5,2)+'/'+date.substr(2,2);
  //     secretInfo = (
  //       <View style={{backgroundColor:'white'}}>
  //         <InfoShow {...this.props} label="卡号" styles={styles} leftStyle = {{color:'#888888'}} rightStyle={{marginRight:80}} placeholder={curCardInfo.pan.replace(/\d{4}/g, ($0)=>$0+' ')} theme={theme} />
  //         <InfoShow {...this.props} label="有效期" styles={styles} leftStyle = {{color:'#888888'}} placeholder={date} theme={theme} />
  //         <InfoShow {...this.props} label="CVV" styles={styles} leftStyle = {{color:'#888888'}} placeholder={curCardInfo.cvv} theme={theme} />
  //         <View style={{flexDirection:'row',position:'absolute',right:28,top:15}}>
  //           <Image style={{width:13,height:15}} source={cardTypeImage['copy']} />
  //           <Text style={{alignSelf:'center',color: '#576b98',marginLeft:5}} 
  //               onPress={()=>this.setCardNoToClipboard()}>复制</Text>
  //         </View>
  //       </View>
  //     )
  //     hasSecret = true;
  //   }else if (curCardInfo.cardType===0){
  //     secretInfo = <View style={{backgroundColor:'white'}}><InfoShow {...this.props} label="PIN" styles={styles} leftStyle = {{color:'#888888'}} placeholder='****' theme={theme} /></View>;
  //   }else if (curCardInfo.cardType===1){
  //     secretInfo = (
  //       <View style={{backgroundColor:'white'}}>
  //         <InfoShow {...this.props} label="卡号" styles={styles} leftStyle = {{color:'#888888'}} rightStyle={{marginRight:80}} placeholder='**** **** **** ****' theme={theme} />
  //         <InfoShow {...this.props} label="有效期" styles={styles} leftStyle = {{color:'#888888'}} placeholder='**/**' theme={theme} />
  //         <InfoShow {...this.props} label="CVV" styles={styles} leftStyle = {{color:'#888888'}} placeholder='***' theme={theme} />
  //         <View style={{flexDirection:'row',position:'absolute',right:28,top:15}}>
  //           <Image style={{width:13,height:15}} source={cardTypeImage['copy']} />
  //           <Text style={{alignSelf:'center',color: '#576b98',marginLeft:5}} 
  //               onPress={()=>this.setCardNoToClipboard()}>复制</Text>
  //         </View>
  //       </View>
  //     );
  //   }

  //   return (
  //     <View>
  //       <View style={[styles.secretTitle, betweenCenter]}>
  //         <Text style={{color:'#999999',fontSize:12,marginLeft:5}}>卡片信息</Text>
  //         <Touch onPress={()=>{this.setState({ showSecret: !this.state.showSecret })}}>
  //           {hasSecret ? <View style={{flexDirection:'row'}}>
  //                         <Image style={[!this.state.showSecret?{width:14,height:10,marginTop:3}:{width:13,height:6,marginTop:5,},{marginRight:3}]} source={!this.state.showSecret?cardTypeImage['xianshi']:cardTypeImage['yincang']}/>
  //                         <Text style={{color: theme.colors.mainColor}}>{ !this.state.showSecret ? '显示' : '隐藏' }</Text>
  //                        </View> 
  //                      : <Text style={{color: theme.colors.primaryColor}}>获取中...</Text> }
  //         </Touch>
  //       </View>
  //       {secretInfo}
        
  //     </View>
  //   )
  // }

  getCurCardBaseInfo=(id)=>{
    let arr = this.props.card.baseInfo;
    for(var i=0,l=arr.length; i<l; i++){
      if(arr[i].id == id){
        return arr[i];
      }
    }
  }

  render(){
    let theme = new Theme(this.props.card.theme);
    // let curCardInfo = this.props.card.curCardInfo;
    let curCardInfo = this.getCurCardBaseInfo(this.props.navigateData.curID); //this.props.card.baseInfo[this.props.navigateData.curID];
    console.log(this.props.card.baseInfo);
    // let backgroundColor = curCardInfo.cardType===0?'#a532e5':'#2acdde';
    let text = curCardInfo.cardtype===0?'实体卡':'虚拟卡';
    let textBackgroundColor = curCardInfo.cardType===0?'#a532e5':'#2acdde';
    let backgroundColor = curCardInfo.cardType===0?'#0e1528':'#3b7cfb';
    let currencyText = MONEY_TEXT[curCardInfo.currency]+'币种';
    let currencyTextColor = curCardInfo.cardType===0?'#a994b5':'#9cd1fd';
    let cardNoText = '尾号'+curCardInfo.cardNo.match(/.{3,4}$/)[0];
    let currencySymText = MONEY_FLAG[curCardInfo.currency]+' '+ curCardInfo.balance;
    let phone = curCardInfo.phone || '';

    return (
      <View style={{flex:1,}}>
        <CustomBackTitle {...this.props}  title="卡详情"></CustomBackTitle>
        <View style={{width: width,height:64,backgroundColor:backgroundColor,marginBottom:10}}>
          <View style={{flexDirection:'row',marginTop:17,marginLeft:20}}>
            <Image style={{width:30,height:10,marginTop:5}} source={cardTypeImage['visa']} />
            <View style={{backgroundColor:textBackgroundColor,borderRadius:3,height:18,width:45,marginLeft: 5,alignItems:'center',justifyContent: 'center',}}>
              <Text style={{fontSize:12,color:'white',}}>{text}</Text>
            </View>
          </View>
          <View style={{flexDirection:'row',marginLeft:20,marginTop:5}}>
            <Text style={{color:currencyTextColor,fontSize:16}}>{currencyText}</Text>
            <Text style={{color:'white',marginLeft:15,fontSize:16}}>{cardNoText}</Text>
            <Text style={{color:'white',fontSize:16,position:'absolute',right:30,top:0}}>{currencySymText}</Text>
          </View>
        </View>
          
        <CardStatus {...this.props} leftStyle={{color:'#888888'}} theme={theme} />
        <ScrollView style={{marginTop:10,}}>
            
            <View style={{backgroundColor:'white',}}>
              <InfoShow {...this.props} 
                label="卡签名" 
                placeholder={curCardInfo.signature} 
                styles={styles}
                leftStyle = {{color:'#888888'}}
                theme={theme} />
            </View>
            <Text style={{height:40,fontSize:12,color:'#999999',marginLeft:16,paddingTop:15}}>基本信息</Text>
            <View style={{backgroundColor:'white',}}>
            <InfoShow {...this.props} 
              label="姓名" 
              placeholder={curCardInfo.signature}
              styles={styles}
              leftStyle = {{color:'#888888'}}
              theme={theme} />
            <InfoShow {...this.props} 
              label="出生日期" 
              placeholder={curCardInfo.dateofbirth} 
              styles={styles}
              leftStyle = {{color:'#888888'}}
              theme={theme} />
            <InfoShow {...this.props} 
              label="国家" 
              placeholder={curCardInfo.country} 
              styles={styles}
              leftStyle = {{color:'#888888'}}
              theme={theme} />
            <InfoShow {...this.props} 
              label="城市" 
              placeholder={curCardInfo.city} 
              styles={styles}
              leftStyle = {{color:'#888888'}}
              theme={theme} />
            <InfoShow {...this.props} 
              label="手机号" 
              placeholder={phone.substr(0,3)+'****'+phone.substr(7,4)} 
              styles={styles}
              leftStyle = {{color:'#888888'}}
              theme={theme} />
            <InfoShow {...this.props} 
              label="邮箱" 
              placeholder={curCardInfo.emailid} 
              styles={styles}
              leftStyle = {{color:'#888888'}}
              theme={theme} />
            <InfoShow {...this.props} 
              label="邮编" 
              placeholder={curCardInfo.postcode} 
              styles={styles}
              leftStyle = {{color:'#888888'}}
              theme={theme} />
            <InfoShow {...this.props} 
              label="详细地址" 
              placeholder={curCardInfo.address} 
              styles={stylesExt}
              leftStyle = {{color:'#888888'}}
              theme={theme} />
            </View>
        </ScrollView>
      </View>
      );

  }

}


const styles = StyleSheet.create({
  cardBg: {
    // flex: 1,
    width:null,
    height: 300,
    // backgroundColor: 'transparent',

    // alignSelf: 'stretch'
    marginBottom:20
  },
  size: {
    width:220, 
    height:144,
    position: 'relative',
    marginLeft:(width-220)/2,
    marginTop:40
  },
  cardNo: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor:'transparent'
  },
  cardNoText: {
    fontSize: 18,
    color: 'white'
  },
  secretTitle: {
    height: 40,
    padding: 10,
    paddingRight: 30
  },
  wrap :{
    borderBottomWidth:1,
    borderColor:'#efeff4',
    paddingLeft:0,
    marginLeft:15,
  }
});

const stylesExt = StyleSheet.create({
  wrap:{
    borderBottomWidth:1,
    borderColor:'#efeff4',
    paddingLeft:0,
    marginLeft:15,
    height:80,
  }
});
//          <View style={{backgroundColor:'white',}}>
              // <View style={{paddingTop:5,paddingBottom:5}}>
                // <GopBalance leftStyle={{color:'#888888'}} {...this.props} theme={theme} />
                // <GopCurrentValue leftStyle={{color:'#888888'}} {...this.props} theme={theme} />
                // <GopAddress leftStyle={{color:'#888888'}} {...this.props} theme={theme} />
              // </View>
            // </View>
// 175行  {this._getSecret(theme)}




