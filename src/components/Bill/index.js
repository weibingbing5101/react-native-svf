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
import gop from '../../utils/Gop';
import _ from 'lodash';

const width = Dimensions.get('window').width;
export default class Bill extends Component {

  constructor(props){
    super(props);
    // this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.dsExtra = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.dsTransfer = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});

    this.state = {
      selectedBtn : 'cost',
    }

    this.type = 2; //1充值，2消费 3转账
    this.curCardIndexInBill = this.getCurCardBaseInfoIndex(this.props.navigateData.curCardNo);//this.props.card.curCardIndex;  //在账单页选择的卡
  }
  // 通过 卡号获取 index
  getCurCardBaseInfoIndex=(cardNo)=>{
    let arr = this.props.card.baseInfo;
    for(var i=0,l=arr.length; i<l; i++){
      if(arr[i].cardNo == cardNo){
        return i;
      }
    }
  }

  componentDidMount(){
    let props = this.props;
    // 第一版  只有转账   
    props.tradeBillListExtra({
      cardNo: this.props.navigateData.curCardNo
    });
    // props.tradeTransferList({
    //   cardId:props.card.curCardInfo.cardId,
    //   pageNo:1,
    //   pageSize:1000
    // });
  }

  // 转帐 交易按钮  废弃一半
  _renderBtn = (theme) => {
    // let rechargeBtnStyle = this.state.selectedBtn=='recharge'?[constStyle.selectedBtnStyle,{backgroundColor:theme.colors.mainColor}:constStyle.selectBtnStyle;
    // let costBtnStyle = this.state.selectedBtn=='cost'?constStyle.selectedBtnStyle:[constStyle.selectBtnStyle,{color:theme.colors.mainColor}];
    
        // 转账的  
    return (
      <View style={{flexDirection: 'row', height: 48,width:width,backgroundColor:'white'}}>
          <View style={[this.state.selectedBtn=='cost'?constStyle.selectedBtnStyle:constStyle.selectBtnStyle,{marginLeft:20}]}>
            <Text style={{fontSize:15,}} onPress={this.showContent.bind(this,'cost')}>
              交易
            </Text>
          </View>
          <View style={[this.state.selectedBtn=='transfer'?constStyle.selectedBtnStyle:constStyle.selectBtnStyle,{marginLeft:49}]}>
            <Text  style={{fontSize:15,}} onPress={this.showContent.bind(this,'transfer')} >
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
    // if (row.subtitle) {
    //   return null;
    // }
    
    // let multipicShadow = null;
    // if (row.multipic) multipicShadow = <View style={{marginTop:60,marginLeft:55,width:30,height:15,backgroundColor:'#000',opacity:0.5,justifyContent:'center'}}><Text style={{color:'white',fontSize:12,textAlign:'center'}}>多图</Text></View>;
    console.log(row);
    console.log(this.props.card.baseInfo);
    let curCardInfo = this.props.card.baseInfo[this.curCardIndexInBill];

    let data = {
      curCardInfo:curCardInfo,
      billCardInfo:row,
    }
    return(
      <Touch onPress={() => {this.props.goPage('bill_detail',data)}}>
        <View style={[{backgroundColor:theme.colors.listBg,borderColor:theme.colors.listBorder}]}>
          <BillStatus theme={theme} chargeInfo={row}></BillStatus>
        </View>
      </Touch>
    )
  };

  // 消费 渲染  废弃
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
    row.billType = 2;
    let data = {
      curCardInfo:curCardInfo,
      billCardInfo:row,
    }
    let tradeTime = DateUtil.getMonthAndDayTextWithTimestamp(row.tradetime);
    let time = this.costTime === tradeTime?false:<Text style={{height:29,marginLeft:20,paddingTop:11,fontSize:12,color:'#888888'}}>{tradeTime}</Text>
    this.costTime = tradeTime;
    return(
      <View>
      {time}
      <Touch onPress={() => {this.props.goPage('bill_detail',data)}}>
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
    // if (row.subtitle) {
    //   return null;
    // }

    // let multipicShadow = null;
    // if (row.multipic) multipicShadow = <View style={{marginTop:60,marginLeft:55,width:30,height:15,backgroundColor:'#000',opacity:0.5,justifyContent:'center'}}><Text style={{color:'white',fontSize:12,textAlign:'center'}}>多图</Text></View>;
    
    let curCardInfo = this.props.card.baseInfo[this.curCardIndexInBill];
    row.billType = 3;
    row.phone = gop.gopPhone;
    let data = {
      curCardInfo:curCardInfo,
      billCardInfo:row,
    }
    let transferTime = DateUtil.getMonthAndDayTextWithTimestamp(row.transferTime);
    let time = this.transferTime === transferTime ? false : <Text style={{height:29,marginLeft:20,paddingTop:11,fontSize:12,color:'#888888'}}>{transferTime}</Text>
    this.transferTime = transferTime;
    return(
      <View>
        {time}
        <Touch onPress={() => {this.props.goPage('bill_detail',data)}}>
          <View style={[{backgroundColor:theme.colors.listBg,borderColor:theme.colors.listBorder}]}>
            <BillStatus theme={theme} chargeInfo={row}></BillStatus>
          </View>
        </Touch>
      </View>
    )
  }

  // 转帐和交易 的按钮事件  废弃
  showContent(value){
    this.selectedBtn = value;
    if (value=='transfer') {
      this.type =3;
      this.transferTime = '';
      this.props.tradeTransferList({
        cardNo: this.props.navigateData.curCardNo
      });

    }
    else if (value=='cost') {
      this.type =2;
      this.costTime = '';
      this.props.tradeBillListExtra({
        cardNo: this.props.navigateData.curCardNo
      });
    }
    this.setState({selectedBtn:value});

  }

  // 选择卡
  changeCard = (index) =>{
    this.curCardIndexInBill = index;
    if (this.type==3) {
      this.props.tradeTransferList({
        cardNo:this.props.card.baseInfo[index].cardNo,
      });

    }
    // else if (this.type==2) {
    //   this.props.tradeBillListExtra({
    //     cardId:this.props.card.baseInfo[index].cardId,
    //     billType:this.type,  //1充值，2消费
    //     pageNo:1,
    //     pageSize:1000
    //   });
    // }
  }

  render() {
    let theme = new Theme(this.props.card.theme);
    let billInfo;
    let billConsumeInfo;
    let transferInfo;

    /*
    if (this.type==1) {
      if (this.props.card.tradeBillList && this.props.card.tradeBillList.length>0 && this.props.card.tradeBillList[0].billType==1) {
        billInfo = this.props.card.tradeBillList;
      }
    }else */
    if (this.type==2) {
      console.log(this.props.card.tradeBillListExtra);
      if (this.props.card.tradeBillListExtra && this.props.card.tradeBillListExtra.length>0) {
        billConsumeInfo = this.props.card.tradeBillListExtra;
        this.costTime = '';
      }
    }else 
    
    if (this.type==3) {
      console.log(this.props.card.tradeTransferList);
      if (this.props.card.tradeTransferList && this.props.card.tradeTransferList.length>0) {
        transferInfo = this.props.card.tradeTransferList;
        this.transferTime = '';
      }
    }
    
    let list;
    let listExtra;
    let listTransfer;
    /* 废弃
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
    }else  */
    if (this.state.selectedBtn=='cost') {
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
        <View style={{width:width,height:105,backgroundColor:'#3b7cfb',paddingTop:45}}>
          <UserCardChoice {...this.props} 
            theme={ theme } 
            curCardIndex={this.curCardIndexInBill} 
            onChange={this.changeCard}
          /> 

          <Touch style={{width:100,height:60,position:'absolute',top:45}}>
          </Touch>

          <Touch style={{position:'absolute',top:60,left:20,width:21,height:30,alignItems:'center',justifyContent:'center'}} 
                 onPress={()=>this.props.goBack()}
          >
            <View>
              <Image style={{width:11,height:20}} source={require('../Common/image/top_back.png')} resizeMode={'contain'}/>
            </View>
          </Touch>
          
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


