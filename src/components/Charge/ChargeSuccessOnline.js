import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform} from 'react-native';
import _ from 'lodash';
import { Select } from '../Form';
import { primaryFontSize,leftCenter,colCenter } from '../../utils/Style';
import Theme from '../../utils/Theme';
import CustomBackTitle from '../CustomBackTitle';
import {StatusTip} from '../Layout';
import { RowBetween } from '../Layout';

const cardImage = {
  master: require('../Common/image/master_little.png'),
  visa: require('../Common/image/visa_little.png')
};

import {
  MONEY_USD, 
  MONEY_EUR, 
  MONEY_GBP, 
  MONEY_FLAG, 
  MONEY_TEXT,
  CURRENCY_TEXT
} from '../../config/currencyType';

export default class ChargeSuccessOnline extends Component {

  state = {
    currencyExchangeRateObj:'',
  };
  componentDidMount(){
    let props = this.props;
    props.currencyQuery({
      fromCurreny:'USD',
      toCurrency:'CNY'
    });
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.card){
      this.setState({currencyExchangeRateObj:nextProps.card.currencyExchangeRate});
    }
  }

	_renderExtra =(theme)=>{
  	return (
  		<View style={colCenter}>
  			<Text style={{fontSize: 14,color:theme.colors.mainColor,marginTop:20}}>${this.props.card.queryOrderInfo.amount.toFixed(2)}</Text>
  		</View>);
  }

  _renderLeft = (textStyle)=>{
    let cardNo = this.props.card.curCardInfo.cardNo;
    let cardNoSub = cardNo.substring(cardNo.length-5,cardNo.length);
  	return (
   		<View style={leftCenter}>
        <View>
          <Image source={cardImage['master']} style={ {width: 50, height: 30, marginRight: 15} }/>
        </View>
        <View>
          <Text style={textStyle}>{'入账卡'+'（'+'尾号'+cardNoSub+'）'}</Text>
        </View>
      </View>
      );
  }

	_renderRight = (textStyle) =>{
    let balance = this.props.card.curCardInfo.balance+this.props.card.queryOrderInfo.amount;
		return ( 
			<View>
				<Text style={textStyle}>{'余额'+'$'+balance.toFixed(2)}</Text>
			</View>
			);
	}

  goPage=()=>{
    // this.props.goPage('home');
    this.props.backToHomeInChargeSuccess();
  }

  render(){
    let theme = new Theme(this.props.card.theme);
    let textStyle = {color: theme.colors.primaryColor, marginTop:2, marginBottom:2,fontSize:12};
    let currencyExchangeText;
    let val = this.state.currencyExchangeRateObj;
    if (val) {
      currencyExchangeText = '当前汇率 '+val.fromAmount+' '+CURRENCY_TEXT[val.fromCurrency]+' = '+val.toAmount+' '+CURRENCY_TEXT[val.toCurrency];
    }
    return (
    	<View>
	      <View style={{flex:1, backgroundColor: theme.colors.mainBgColor }}>
	        <CustomBackTitle title="卡充值" left={-270} goFixedPage={()=>this.goPage()} {...this.props}/>
	        <StatusTip {...this.props} theme={theme} type="success" renderExtra={()=>this._renderExtra(theme)}>充值成功</StatusTip>
	      </View>
	      <View style={styles.exchangeRate}>
	      	<Text style={[textStyle,{marginLeft:10}]}>{currencyExchangeText}</Text>
	      </View>
	      <View>
	      	<RowBetween {...this.props} renderLeft={ ()=>this._renderLeft(textStyle) } renderRight={ ()=>this._renderRight(textStyle) } />
	      </View>
      </View>
    )
  }

}

ChargeSuccessOnline.defaultProps = {
  
}

const styles = StyleSheet.create({
  exchangeRate: {
    marginTop: 20,
    marginBottom:20
  },
})