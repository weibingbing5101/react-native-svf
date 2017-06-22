import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform,Alert} from 'react-native';
import {Input, RowButton, LabelInput, PasswordKeyboard} from '../Form';
import CustomBackTitle from '../CustomBackTitle';
import Theme from '../../utils/Theme';

export default class TransferToAccVal extends Component {

  constructor(props){
    super(props);
    let phone;
    let name;
    let navigateData = this.props.navigateData;
    if (navigateData && navigateData.userBase&&navigateData.userBase.telephone) {
      phone = navigateData.userBase.telephone;
      name = navigateData.userBase.realName;
    }
    this.state = {
      phone : phone,
      name : name,
      value:'',
      valueIsValid : false,
      password:'',
      isShowPasswordView:false,
      passwordErr:'',
      isClearPassword:false,
    }
  }

  componentDidMount(){
    
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.accountTransfer.tradeTransfer) {
      this.closePasswordWindow();
      this.props.clearTradeTransfer();
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

  onChangeValue = (val)=>{
    if (val.length>0) {
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
        this.props.tradeTransfer({
          amount: this.state.value,
          payPwd: value,
          telephone: this.state.phone,
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
        <View style={{marginTop:20,marginLeft:10}}>
          <Text style={{marginBottom:10}}>账户姓名：{this.state.name||'暂未实名'}</Text>
          <Text>确定转账至{this.state.phone.replace(/(\d{2})\d{4}(\d{2})/,'$1****$2')}</Text>
        </View>
        <View style={{marginTop:10,backgroundColor:'white'}}>
          <LabelInput {...this.props} 
            label = "金额"
            leftSize = {74}
            placeholder="请输入转账金额"
            keyboardType="phone-pad" 
            onChange = {this.onChangeValue}/>
        </View>          
        <RowButton disabled={ !this.state.valueIsValid } 
          style={{marginTop:22,color:'white'}}
          onPress={this.showPasswordView.bind(this)}>确定</RowButton>
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


