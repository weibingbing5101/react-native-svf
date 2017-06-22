import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform,AsyncStorage} from 'react-native';
import {Input, RowButton, LabelInput} from '../Form';
import {Grid,Row,Col} from 'react-native-easy-grid';
import CustomBackTitle from '../CustomBackTitle';
import { UserCardChoice } from '../Card';
import Alert from '../Alert';
import Theme from '../../utils/Theme';
import {ChargeFrom} from './';
import {
  MONEY_USD, 
  MONEY_EUR, 
  MONEY_GBP, 
  MONEY_FLAG, 
  MONEY_TEXT,
  MONEY_CODE,
  CURRENCY_TEXT
} from '../../config/currencyType';


export default class Charge extends Component {

  state = {
    valueIsValid:false,
  };

  constructor(props){
    super(props);
  }

  componentDidMount(){
    let props = this.props;
    props.payTypeList();
  }

  componentWillReceiveProps(nextProps){

  }

  componentWillUnmount(){

  }

  changePayType = (payTypeobj) => {
    this.payTypeobj = payTypeobj;
  }

  chargeValue = (num) =>{
    this.valueNum = num;
    let val = num>0?true:false;
    this.setState({
      valueIsValid:val,
    });
  }
  toCharge = ()=>{
    let telephone;
    let that = this;
    AsyncStorage.getItem('gopPhone',function(err,phone) {
      if (phone) {
        telephone = phone;
        if (that.state.valueIsValid) {
          that.props.createRechargeOrder({
            amount:that.valueNum,
            remark:'',
          });
        }
      }
    });
    
  }

  render() {
    let theme = new Theme(this.props.card.theme);
    let textStyle = {color: theme.colors.primaryColor, marginTop:2, marginBottom:2,fontSize:12};
    return (
      <View style={{flex:1, backgroundColor: theme.colors.mainBgColor }}>
        <CustomBackTitle title="账户充值" left={-270} {...this.props}/>
        <View style={{marginTop:10,backgroundColor:'white'}}>
          <LabelInput {...this.props}
            label="充值金额" 
            styles={styles}
            placeholder="输入充值金额" 
            keyboardType="numbers-and-punctuation" 
            onChange={this.chargeValue}/>
          <LabelInput {...this.props}
            label = "充值类型"
            styles={styles}
            placeholder="线下充值"
            editable = {false} />
        </View>
        <RowButton {...this.props}
          onPress={this.toCharge} 
          disabled={ !this.state.valueIsValid}
          >下一步</RowButton>
      </View>
    );
  }

}
const styles = StyleSheet.create({
  limitTip: {
    color: '#9B9B9B',
    fontSize: 12,
    padding: 10
  },
  exchangeRate: {
    marginTop: 20,
    // marginBottom:20
  },
  wrap :{
    borderBottomWidth:1,
    borderColor:'#efeff4',
    paddingLeft:0,
    marginLeft:10,
  }

})


