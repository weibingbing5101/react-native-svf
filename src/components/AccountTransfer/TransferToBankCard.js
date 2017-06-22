import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform,Alert} from 'react-native';
import {Input, RowButton, LabelInput,PasswordKeyboard} from '../Form';
import CustomBackTitle from '../CustomBackTitle';
import {UserCardChoice} from '../Card';
import Theme from '../../utils/Theme';

export default class TransferToBankCard extends Component {

  constructor(props){
    super(props);
    this.state = {
      value : '',
      valueIsValid:false,
      password:'',
      isShowPasswordView:false,
      passwordErr:'',
      isClearPassword:false,
    }
    this.curCardIndex = this.props.card.curCardIndex;
  }

  componentDidMount(){
    
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.accountTransfer.transferAccount2Card) {
      this.closePasswordWindow();
      this.props.clearTransferAccount2Card();
      Alert.alert('转账成功',
            null,
            [
              {text: '确定', onPress: () => this.props.backToPage('account_transfer')}
            ]);
    }
    if (nextProps.accountTransfer.verifyPayPwdErr) {
      this.setState({
        passwordErr:nextProps.accountTransfer.verifyPayPwdErr,
        isClearPassword:true,
      });
    }

    if (nextProps.accountTransfer.cancelClearPassword) {
      this.setState({
        isClearPassword:false,
      });
      this.props.clearVerifyPayPwd();
    }
  }

  componentWillUnmount(){
    
  }

  // 选择卡
  changeCard = (index) =>{
    this.curCardIndex = index;
  }

  onChangeValue = (val)=>{
    if(val>0){
      this.setState({value:val,valueIsValid:true});
    }else{
      this.setState({value:val,valueIsValid:false});
    }
  }

  showPasswordView=()=>{
    this.setState({
      isShowPasswordView:true
    });
  }

  closePasswordWindow=()=>{
    this.setState({
      isShowPasswordView:false
    });
  }

  onChangePassword=(value)=>{
    let vcodeIsValid = false;
    if(/^\d{6}$/.test(value)){      
        vcodeIsValid = true;
        this.setState({password:value});
        this.props.transferAccount2Card({
          amount: this.state.value,
          payPwd: value,
          toCardNo: this.props.card.baseInfo[this.curCardIndex].cardNo,
        });
    }
  }

  render() {
    let theme = new Theme(this.props.card.theme);
    let passwordView;
    if(this.state.isShowPasswordView){
      passwordView = <PasswordKeyboard 
                        maxLength={6} 
                        closeWindow={this.closePasswordWindow} 
                        onChange={this.onChangePassword}
                        errInfo={this.state.passwordErr}
                        isClearPassword={this.state.isClearPassword}
                        cancelClearPassword={()=>this.props.cancelClearPassword()}
                        />;
    }
    
    return (
      <View style={{flex:1, backgroundColor: theme.colors.mainBgColor }}>
        <CustomBackTitle title="转账" left={-270} {...this.props}/>
        <UserCardChoice {...this.props} 
          theme={ theme } 
          curCardIndex={this.curCardIndex} 
          onChange={this.changeCard}/>
        <View style={{marginTop:10,backgroundColor:'white'}}>
          <LabelInput {...this.props} 
            label = "金额"
            leftSize = {74}
            placeholder="请输入转账金额"
            keyboardType="phone-pad" 
            onChange = {this.onChangeValue}/>
          <Text style={{color:'blue',position:'absolute',top:20,right:20}}>限额说明</Text>
        </View> 
        <Text style={{marginLeft:10,marginTop:10,color:'#888',fontSize:14}}>免手续费</Text>         
        <RowButton disabled={ !this.state.valueIsValid } 
          style={{marginTop:22,color:'white'}}
          onPress={this.showPasswordView.bind(this)}>确定</RowButton>
        <View style={{flexDirection:'row',marginTop:60,alignSelf:'center'}}>
          <Text style={{fontSize:12,color:'#888'}}>正在使用</Text>
          <Text style={{fontSize:12,color:'blue'}}>账户余额</Text>
          <Text style={{fontSize:12,color:'#888'}}>付款</Text>
        </View>
        {passwordView}
      </View>
    );
  }

}
const styles = StyleSheet.create({
  text :{
    borderBottomWidth:1,
    borderColor:'#efeff4',
    height:50,
    paddingLeft:10,
    paddingTop:17,
  }

})


