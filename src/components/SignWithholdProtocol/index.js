import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,ScrollView,Platform,ListView,Dimensions,TouchableWithoutFeedback,Keyboard} from 'react-native';
import CheckBox from 'react-native-check-box';
import dismissKeyboard from 'dismissKeyboard';
import {Input, Button2,LabelInput,RowButton,Select} from '../Form';
import {Grid,Row,Col} from 'react-native-easy-grid';
import Http from '../../utils/Http';
import Touch from '../../utils/Touch';
import Theme from '../../utils/Theme';
import Logo from '../Logo';
import CustomBackTitle from '../CustomBackTitle';
import PasswordKeyboard from './parts/PasswordKeyboard';
import gop from '../../utils/Gop';
import Alert from '../Alert';

import _ from 'lodash';


const WIN_WIDTH = Dimensions.get('window').width;
const WIN_HEIGHT = Dimensions.get('window').height;
const ITEM_HEIGHT = 28;
const VC_WIDTH = 115;
const LABEL_WIDTH = 88;
const INPUT_STYLE = {
  wrap: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    height: ITEM_HEIGHT,
    borderColor: 'rgba(255, 255, 255, .5)',
    padding: 0
  },
  label: {
    color: 'black'
  },
  input: {
    color: 'black'
  }
}

const VCODE_AGAIN_TIME = 60;
const VCODE_LABEL_READY = '获取验证码';
const VCODE_LABEL_SENDING = '正在获取...';
const VCODE_LABEL_RUNNING = 's重新获取';
export default class SignWithholdProtocol extends Component {

  constructor(props){
    super(props);
    this.state = {
      checked:true,
      vcode: '',
      vcodeIsSending: false,
      vcodeIsValid:false,
      vcodeLabel: VCODE_LABEL_READY,
      isShowPasswordView:false,
      phoneNum:gop.gopPhone,
      passwordErr:'',
      isClearPassword:false,
      confirmLoginOnce:true,
    };

  }

  componentDidMount(){
    
  }

  componentWillReceiveProps(nextProps){
    // 验证码发送状态 执行定时器
    let grbCodeSendingSuccess = nextProps.withhold.grbCodeSendingSuccess;
    if(grbCodeSendingSuccess===true){
      this._startVcodeTimer();
    }else if(grbCodeSendingSuccess===false){
      this.setState({
        vcodeLabel:  VCODE_LABEL_READY,
        vcodeIsSending: false
      });
    }

    // 清空验证码
    if (nextProps.withhold.clearGrbCode) {
      this._goReadyStatus();
      this.props.clearGrbCode(false);
      this._vcodeChange('');
    }

    // 验证码 正确  键盘显示
    if (nextProps.withhold.grbVerifyCodeStatus) {
      this.setState({
        isShowPasswordView:true
      });
    }

    // 密码 不正解 清空密码
    if (nextProps.withhold.grbVerifyPwdErr) {
      this.setState({
        passwordErr:nextProps.withhold.grbVerifyPwdErr,
        isClearPassword:true,
      });
    }

    // 取消 清除键盘密码
    if (nextProps.withhold.cancelClearPassword) {
      this.setState({
        isClearPassword:false,
      });
      this.props.clearGrbVerifyPwd();
    }

    // AJAX验证密码 成功
    if (nextProps.withhold.grbVerifyPwdStatus && this.state.confirmLoginOnce) {
      this.state.confirmLoginOnce = false;
      this.props.userLoginByGop(nextProps.withhold.grbInfo);
      this.props.clearGrbVerifyPwd(); 
    }

  }

  // 验证码定时器
  _startVcodeTimer=()=>{
    let totalTime = VCODE_AGAIN_TIME;
    if (!this.vcodeTimer) {
      this.vcodeTimer = setInterval(()=>{
        totalTime --;
        if(totalTime<=0){
          clearInterval(this.vcodeTimer);
          this.vcodeTimer=null;
          this.props.clearGrbCodeSendingSuccess();
          this.setState({
            vcodeLabel:  VCODE_LABEL_READY,
            vcodeIsSending: false
          });
          return;
        }
        this.setState({
          vcodeLabel: totalTime + VCODE_LABEL_RUNNING ,
        });
      }, 1000);
    }
  }

  // 清空 验证码 定时器
  _goReadyStatus=()=>{
    if (this.vcodeTimer) {
      clearInterval(this.vcodeTimer);
      this.vcodeTimer = null;
    }
    this.setState({
      vcodeLabel:  VCODE_LABEL_READY,
      vcodeIsSending: false
    });
  }

  // 验证码输入
  _vcodeChange=(value)=>{
    let vcodeIsValid = false;
    if(/^\d{6}$/.test(value)){
        vcodeIsValid = true;
    }
    
    this.setState({
      vcode: value,
      vcodeIsValid:vcodeIsValid,
    });
  }

  // 获取验证码
  _getVcode=()=>{
    this.props.grbSendPhoneCode();

    this.setState({
      vcodeLabel: VCODE_LABEL_SENDING,
      vcodeIsSending: true
    });
  }

  // 同意协议
  agreeProtocol=(checked)=>{
    this.setState({checked:checked});
    return;
  }

  renderCheckBox() {
    let leftText = (<View style={{flexDirection: 'row'}}>
                      <Text style={[styles.textFontSize,{fontSize:12}]}>同意签约</Text>
                    </View>);
    return  <View style={{flexDirection:'row'}}>
              <CheckBox style={styles.checkBoxStyle} 
                onClick={this.agreeProtocol} 
                isChecked={this.state.checked}
                rightTextView={leftText} />
              <Touch onPress={()=>{this.props.goPage('withhold_protocol')}}>
                <Text style={{color:'#4a90e2',fontSize:12,paddingTop:3}}>《果仁宝账户代扣协议》</Text>
              </Touch>
            </View>;
  }

  // 确定 按钮 核对验证码  正确性
  confirmIdentifyCode=()=>{
    Keyboard.dismiss();
    this.props.grbVerifyCode({
      code:this.state.vcode
    });
  }

  closePasswordWindow=()=>{
    this.setState({
      isShowPasswordView:false
    });
  }

  // 键盘输入校验合法后  AJAX验证密码
  onChangePassword=(value)=>{
    let vcodeIsValid = false;
    if(/^\d{6}$/.test(value)){
        vcodeIsValid = true;
        this.props.grbVerifyPwd({
          payPassword:value,
        });
    }
  }

  render() {
    let theme = new Theme(this.props.card.theme);
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
    
    return (
      <TouchableWithoutFeedback onPress={ dismissKeyboard }>
      <View style={{flex:1}}>
        <CustomBackTitle title="签约果仁宝账户代扣协议" backBtnIsClear={true} left={30} {...this.props}/> 
        <View style={styles.softwareDescWrap}>
          <Logo />
          <Text style={[styles.textFontSize,{marginTop:30}]}>开通该功能后</Text>
          <Text style={[styles.textFontSize,{marginBottom:30}]}>使用GPlusCard消费时将按市场汇率扣减用户果仁宝账户GOP</Text>
          {this.renderCheckBox()}
        </View>
        <View style={{marginTop: 50,paddingLeft:20}}> 
          <Text style={styles.textFontSize}>您用于签约的手机号为{this.state.phoneNum.substr(0,3)+'****'+this.state.phoneNum.substr(7,4)}</Text>
        </View>
        <View style={ styles.vcWrap }>
          <View style={  {flex: 1} }>
            <LabelInput {...this.props}
              label="验证码"
              leftSize={LABEL_WIDTH}
              keyboardType="phone-pad"
              maxLength={6}
              defaultValue={this.state.vcode}
              placeholder='输入验证码'
              styles={INPUT_STYLE}
              onChange={this._vcodeChange}
            />
          </View>
          <View style={ {width: VC_WIDTH, marginLeft: 10} }>
             <RowButton {...this.props}
                onPress={ this._getVcode }
                style={ VC_BTN_STYLE }
                disabled={ this.state.vcodeIsSending }
              >{this.state.vcodeLabel}</RowButton>
          </View>
        </View>
        <RowButton {...this.props}
          onPress={ this.confirmIdentifyCode }
          style={ CONFIRM_BTN_STYLE }
          disabled={ !this.state.vcodeIsValid || !this.state.checked }
          >确认</RowButton>
        {passwordView}
      </View>
      </TouchableWithoutFeedback>
    );
  }

}


const styles = StyleSheet.create({
  softwareDescWrap: {
    flexDirection: 'column',
    marginTop:40,
    alignItems: 'center',
  },
  textFontSize:{
    fontSize:12,
    color:'#9b9b9b'
  },
  checkBoxStyle:{
    // flex: 1, 
    // padding:10,
    // backgroundColor:'red'
  },
  vcWrap: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignItems:'center',
    marginTop:10,
    paddingLeft:20,
    paddingRight:20,
    paddingTop:20,
    paddingBottom:20,
    backgroundColor:'white'
  },
})

const BTN_STYLE =  {
  backgroundColor: '#023365', 
  fontSize: 15
}

const VC_BTN_STYLE = _.extend({}, BTN_STYLE, {
  width: VC_WIDTH, 
  height: 35, 
  letterSpacing: 0, 
  marginTop: 0,
})

const CONFIRM_BTN_STYLE = _.extend({
}, BTN_STYLE)


