import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform,ListView,Dimensions,StatusBar} from 'react-native';
import {Input, Button} from '../Form';
import {Grid,Row,Col} from 'react-native-easy-grid';
import CustomBackTitle from '../CustomBackTitle';
import Http from '../../utils/Http';
import BillStatus from './BillStatus';
import {UserCardChoice} from '../Card';
import Touch from '../../utils/Touch';
import Theme from '../../utils/Theme';
import DateUtil from '../../utils/DateUtil';
import _ from 'lodash';




const width = Dimensions.get('window').width;
export default class Bill extends Component {

  constructor(props){
    super(props);
    // this.selectedBtn = 'recharge';
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.dsExtra = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.dsTransfer = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});

    this.state = {
      selectedBtn : 'recharge',
    }

    this.type = 1; //1充值，2消费 3转账
    this.curCardIndexInBill = this.props.card.curCardIndex;  //在账单页选择的卡
  }

  componentDidMount(){
    let props = this.props;
    props.queryRechargeList();
    // props.tradeTransferList({
    //   cardId:props.card.curCardInfo.cardId,
    //   pageNo:1,
    //   pageSize:1000
    // });
  }

  componentWillReceiveProps(nextProps){

  }

  // 转帐 交易按钮
  _renderBtn = (theme) => {
    // let rechargeBtnStyle = this.state.selectedBtn=='recharge'?[constStyle.selectedBtnStyle,{backgroundColor:theme.colors.mainColor}:constStyle.selectBtnStyle;
    // let costBtnStyle = this.state.selectedBtn=='cost'?constStyle.selectedBtnStyle:[constStyle.selectBtnStyle,{color:theme.colors.mainColor}];
    return (
      <View style={{flexDirection: 'row', height: 48,width:width,backgroundColor:'white'}}>
          <View style={[this.state.selectedBtn=='recharge'?constStyle.selectedBtnStyle:constStyle.selectBtnStyle,{marginLeft:20}]}>
            <Text style={{fontSize:15,}} onPress={this.showContent.bind(this,'recharge')}>
              充值
            </Text>
          </View>
          <View style={[this.state.selectedBtn=='transfer'?constStyle.selectedBtnStyle:constStyle.selectBtnStyle,{marginLeft:49}]}>
            <Text  style={{fontSize:15,}} onPress={this.showContent.bind(this,'transfer')}>
              转账
            </Text>
          </View>
      </View>
    )
  };


  // 账单详情  items
  _renderRow = row => {
    let name;
    let theme = new Theme(this.props.card.theme);
    if (row.subtitle) {
      return null;
    }
    
    let multipicShadow = null;
    if (row.multipic) multipicShadow = <View style={{marginTop:60,marginLeft:55,width:30,height:15,backgroundColor:'#000',opacity:0.5,justifyContent:'center'}}><Text style={{color:'white',fontSize:12,textAlign:'center'}}>多图</Text></View>;
    
    let curCardInfo = this.props.card.baseInfo[this.curCardIndexInBill];
    row.billType = 1;
    row.phone = curCardInfo.phone;
    let data = {
      curCardInfo:curCardInfo,
      billCardInfo:row,
    }
    let tradeTime = DateUtil.getMonthAndDayTextWithTimestamp(row.createTime);
    let time = this.rechargeTime === tradeTime?false:<Text style={{height:29,marginLeft:20,paddingTop:11,fontSize:12,color:'#888888'}}>{tradeTime}</Text>
    this.rechargeTime = tradeTime;
    return(
      <View>
      {time}
      <Touch onPress={() => {this.props.goPage('account_bill_detail',data)}}>
        <View style={[{backgroundColor:theme.colors.listBg,borderColor:theme.colors.listBorder}]}>
          <BillStatus theme={theme} chargeInfo={row}></BillStatus>
        </View>
      </Touch>
      </View>
    )
  };

  _renderRowExtra = row => {
    let name;
    let theme = new Theme(this.props.card.theme);
    if (row.subtitle) {
      return null;
    }
    
    let multipicShadow = null;
    if (row.multipic) {
      multipicShadow = (<View style={{marginTop:60,marginLeft:55,width:30,height:15,backgroundColor:'#000',opacity:0.5,justifyContent:'center'}}>
                          <Text style={{color:'white',fontSize:12,textAlign:'center'}}>
                            多图
                          </Text>
                        </View>);
    }
    
    let curCardInfo = this.props.card.baseInfo[this.curCardIndexInBill];
    let data = {
      curCardInfo:curCardInfo,
      billCardInfo:row,
    }
    let tradeTime = DateUtil.getMonthAndDayTextWithTimestamp(row.tradeTime);
    let time = this.costTime === tradeTime?false:<Text style={{height:29,marginLeft:20,paddingTop:11,fontSize:12,color:'#888888'}}>{tradeTime}</Text>
    this.costTime = tradeTime;
    return(
      <View>
      {time}
      <Touch onPress={() => {this.props.goPage('account_bill_detail',data)}}>
        <View style={[{backgroundColor:theme.colors.listBg,borderColor:theme.colors.listBorder}]}>
          <BillStatus theme={theme} chargeInfo={row}></BillStatus>
        </View>
      </Touch>
      </View>
    )
  };

  _renderRowTransfer = row => {
    let name;
    let theme = new Theme(this.props.card.theme);
    if (row.subtitle) {
      return null;
    }
    
    let multipicShadow = null;
    if (row.multipic) multipicShadow = <View style={{marginTop:60,marginLeft:55,width:30,height:15,backgroundColor:'#000',opacity:0.5,justifyContent:'center'}}><Text style={{color:'white',fontSize:12,textAlign:'center'}}>多图</Text></View>;
    
    let curCardInfo = this.props.card.baseInfo[this.curCardIndexInBill];
    row.billType = 3;
    row.phone = curCardInfo.phone;
    let data = {
      curCardInfo:curCardInfo,
      billCardInfo:row,
    }
    let createTime = DateUtil.getMonthAndDayTextWithTimestamp(row.transferTime);
    let time = this.transferTime === createTime ? false : <Text style={{height:29,marginLeft:20,paddingTop:11,fontSize:12,color:'#888888'}}>{createTime}</Text>
    this.transferTime = createTime;
    return(
      <View>
      {time}
      <Touch onPress={() => {this.props.goPage('account_bill_detail',data)}}>
        <View style={[{backgroundColor:theme.colors.listBg,borderColor:theme.colors.listBorder}]}>
          <BillStatus theme={theme} chargeInfo={row}></BillStatus>
        </View>
      </Touch>
      </View>
    )
  }

  // 转帐和交易 的按钮事件
  showContent(value){
    // this.selectedBtn = value;
    if (value=='transfer') {
      this.type =3;
      this.transferTime = '';
      this.props.getAccountTransferList();

    }
    else if (value=='recharge') {
      this.type =1;
      this.rechargeTime = '';
      this.props.queryRechargeList();
    }
    this.setState({selectedBtn:value});

  }

  // 选择卡
  changeCard = (index) =>{
    this.curCardIndexInBill = index;
    if (this.type==3) {
      this.props.getAccountTransferList();

    }else if (this.type==1) {
      this.props.queryRechargeList();
    }
  }

  render() {
    let theme = new Theme(this.props.card.theme);
    let billInfo;
    let billConsumeInfo;
    let transferInfo;
    if (this.type==1) {
      if (this.props.accountBill&& this.props.accountBill.rechargeList && this.props.accountBill.rechargeList.length>0) {
        billInfo = this.props.accountBill.rechargeList;
        this.rechargeTime = '';
      }
    }else if (this.type==2) {
      if (this.props.accountBill&&this.props.accountBill.tradeBillListExtra && this.props.accountBill.tradeBillListExtra.length>0) {
        billConsumeInfo = this.props.accountBill.tradeBillListExtra;
        this.costTime = '';
      }
    }else if (this.type==3) {
      if (this.props.accountBill&&this.props.accountBill.accountTransferList && this.props.accountBill.accountTransferList.length>0) {
        transferInfo = this.props.accountBill.accountTransferList;
        this.transferTime = '';
      }
    }
    
    let list;
    let listExtra;
    let listTransfer;
    if (this.state.selectedBtn=='recharge') {
        if (billInfo) {
          this.ds = this.ds.cloneWithRows(JSON.parse(JSON.stringify(billInfo)));
          list = (
            <ListView
              dataSource={this.ds}
              renderRow={this._renderRow}
              style={{marginBottom:6,backgroundColor:theme.colors.background}}
            />
          )
        }
    }else if (this.state.selectedBtn=='cost') {
      if (billConsumeInfo) {
        this.dsExtra = this.dsExtra.cloneWithRows(JSON.parse(JSON.stringify(billConsumeInfo)));
        listExtra = (
          <ListView
            dataSource={this.dsExtra}
            renderRow={this._renderRowExtra}
            style={{marginBottom:6,backgroundColor:theme.colors.background}}
          />
        )
      }
    }else if (this.state.selectedBtn=='transfer') {
      if (transferInfo) {
        this.dsTransfer = this.dsTransfer.cloneWithRows(JSON.parse(JSON.stringify(transferInfo)));
        listTransfer = (
          <ListView
            dataSource={this.dsTransfer}
            renderRow={this._renderRowTransfer}
            style={{marginBottom:6,backgroundColor:theme.colors.background}}
          />
        )
      }
    }

    let style = {
      statusBar: {
        backgroundColor: '#3b7cfb',
      },
      navBar:{
        backgroundColor:'#3b7cfb'
      }
    }
    return (

      <View style={{flex:1}}>
        <View>
          <CustomBackTitle title="我的账户" left={-270} {...this.props} />          
        </View>
        {this._renderBtn(theme)}
        {list}
        {listExtra}
        {listTransfer}
      </View>
    );
  }

}


const constStyle = StyleSheet.create({
  selectBtnStyle:{
    // flex:1,
    // width:100,
    paddingTop:15,
    

  },
  selectedBtnStyle:{
    // flex:1,
    // width:100,
    paddingTop:15,
    borderBottomWidth:3,
    borderBottomColor:'black',
  }
})


