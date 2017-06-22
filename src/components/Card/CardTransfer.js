import React, {Component} from 'react';
import {Text,View,Image,StyleSheet,Platform,ListView,Dimensions,Alert} from 'react-native';
import {LabelInput, Select, RowButton, InfoInput} from '../Form';
import Theme from '../../utils/Theme';
import PasswordKeyboard from '../SignWithholdProtocol/parts/PasswordKeyboard';



import {Grid,Row,Col} from 'react-native-easy-grid';
import CustomBackTitle from '../CustomBackTitle';
import Http from '../../utils/Http';
import gop from '../../utils/Gop';
import _ from 'lodash';

const filterCardNo = (cardNo)=>{
  //cardNo.replace(/[^\d]/g, '*').replace(/.{4}/g, ($0)=>$0+' ')
  let hideNo = '**** **** **** '; 
  let lastNo = cardNo.match(/.{3,4}$/)[0];
  return (
    <View style={styles.cardText}>
      <Text style={styles.hideNoText}>{hideNo}</Text>
      <Text style={styles.cardNoText}>{lastNo}</Text>
    </View>
  );
}



const width = Dimensions.get('window').width;
export default class CardTransfer extends Component {

  constructor(props){
    super(props);

    this.state= {
      isNext: false,
      isShowPasswordView: false,
      passwordErr:'',
      isClearPassword: false,
      amount: 0
    }

  }

  componentDidMount(){
    
  }

  // renderSelected = (index) => {
  //   let currency = this.props.currencyType[index];
  //   this.onChangeCurrency(currency.value);
  //   return <Text style={{color:'#9b9b9b'}}>{currency.title}</Text>
  // }

  // _renderOption = (data, index) => {
  //   return  (
  //     <View>
  //       <Text>{data.title}</Text>
  //     </View>
  //   )
  // }  

  // onChangeCurrency = (val) =>{
  //   console.log(val);
  // }

  componentWillReceiveProps(nextProps){
    if (nextProps.card.card2Account) {  // 转账成功 true 
      this.closePasswordWindow();       // 转账成功后 清除 相关字段
      this.props.clearCard2Account();
      Alert.alert('转账成功',
            null,
            [
              {text: '确定', onPress: () => {}}
            ]);
    }
    if (nextProps.card.verifyPayPwdErr) {
      this.setState({
        passwordErr:nextProps.card.verifyPayPwdErr,
        isClearPassword:true,
      });
    }

    if (nextProps.card.cancelClearPassword) {
      this.setState({
        isClearPassword:false,
      });
    }
  }


  // 金额input  change事件
  onChangeMoney=(val)=>{
    let next = false;
    if(val>0){
      next = true;
    }
    this.setState({
      isNext: next,
      amount: val
    });
  }



  submitInfo(){
    console.log(this.props.navigateData.curCardNo);
    this.setState({
      isShowPasswordView: true
    });
  }

  closePasswordWindow=()=>{
    this.setState({
      isShowPasswordView:false
    });
  }

  // 键盘输入校验合法后  AJAX验证密码
  onChangePassword=(value)=>{
    this.setState({
      passwordErr:''
    });

    if(/^\d{6}$/.test(value)){
      let json = {
        amount: this.state.amount,
        payPwd:value,
        fromCardNo: this.props.navigateData.curCardNo
      };
      this.props.card2Account(json);
    }
  }

  render() {
    let theme = new Theme(this.props.card.theme);

    let props = this.props;


    let cardNo = props.navigateData.curCardNo;
    let filterCardNO = filterCardNo(props.navigateData.curCardNo);
    let lastCardNo = cardNo.substr(cardNo.length-4, cardNo.length);

    let passwordView;
    if (this.state.isShowPasswordView) {
      passwordView = <PasswordKeyboard maxLength={6} 
                        closeWindow={this.closePasswordWindow} 
                        onChange={this.onChangePassword}
                        errInfo={this.state.passwordErr}
                        isClearPassword={this.state.isClearPassword}
                        cancelClearPassword={()=>this.props.cancelClearPassword()}
                      />;
    }

    return(
      <View style={{flex:1}}>
        <CustomBackTitle title="转出" left={-width/2+30} {...this.props}/>
        <View style={ styles.contentBox }>
        </View>
        <InfoInput {...this.props} 
            style={ styles.paddingL15 }
            label="选择转账目标" 
            placeholder={ props.navigateData.curCardNo } 
            theme={theme} 
        />

        <View style={ styles.line }></View>
        <LabelInput {...this.props}
          label="转出至账户"
          leftSize={74}
          placeholder={gop.gopPhone}
          editable={false}/>
        <LabelInput {...this.props}
          label="金额" 
          leftSize = {74}
          placeholder="请输入金额" 
          minLength={1} 
          maxLength={10} 
          // defaultValue={'请输入转账金额'}//{this.state.info.firstName} 
          keyboardType="phone-pad" 
          // onBlur={this.onChangeFirstName}
          onChange = {this.onChangeMoney} 
          // onFocus = {this.onChangeFirstName}
        />
        <Text style={ styles.free }>免手续费</Text>
        <RowButton 
          disabled={ !this.state.isNext } 
          style={{marginTop:22,color:'white'}}
          onPress={this.submitInfo.bind(this)}
        >确定</RowButton>

        <View style={styles.cardInfoBox}>
          <Text style={ styles.use }>使用</Text>
          <Text style={ styles.cardLastNo }>尾号 {lastCardNo } 卡片</Text>
          <Text style={ styles.use }>付款</Text>
        </View>
        {passwordView}
      </View>
    );
  }

};

CardTransfer.defaultProps = {
  // currencyType: [
  //   {key: 'dollar', title: '美元',value:1},
  //   {key: 'euro', title: '欧元',value:2},
  //   {key: 'pound', title: '英镑',value:3}
  // ]
}

/*
        <Select 
          {...this.props} 
          leftSize={100}
          label="选择转账目标"
          placeholder="选择转账目标"
          defaultSelected = {0}
          dataSource={ this.props.currencyType }
          renderSelected={ this.renderSelected } 
          renderOption={this._renderOption}
          onChange={this.onChangeCurrency}
        />
*/

const styles = StyleSheet.create({
  contentBox:{
    paddingTop:30,
  },
  paddingL15 :{
    paddingLeft:10
  },
  line:{
    borderBottomWidth: 1,
    borderBottomColor: '#ececec'
  },
  free:{
    color: '#999',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 50
  },
  cardInfoBox:{
    paddingTop: 50,
    alignSelf:'center',
    flexDirection:'row',
  },
  use:{
    color:'#999'
  },
  cardLastNo:{
    color:'blue'
  }
})


