import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform,Dimensions,TouchableWithoutFeedback} from 'react-native';
import dismissKeyboard from 'dismissKeyboard';
import {Input, Button2,LabelInput,RowButton,Select} from '../Form';
import {Grid,Row,Col} from 'react-native-easy-grid';
import Alert from '../Alert';
import Touch from '../../utils/Touch';
import _ from 'lodash';
import {validatePhone} from '../../utils/Validate';

import Http from '../../utils/Http';
import {allCenter, leftCenter, allCenterVer} from '../../utils/Style';
import SplashFooter, {FOOTER_HEIGHT} from '../Footer/Splash';
import Logo from '../Logo';
import CompanyRights,{RIHTS_HEIGHT} from '../Company/Rights';
import {RightFixed} from '../Layout';

const WIN_WIDTH = Dimensions.get('window').width;
const WIN_HEIGHT = Dimensions.get('window').height;
//const ITEM_HEIGHT = 28;
const ITEM_HEIGHT = 28;
const VC_WIDTH = 135;
const LABEL_WIDTH = 88;
const PHONE_INPUT_STYLE = {
  wrap: {
    backgroundColor: 'transparent',
    height: ITEM_HEIGHT,
    width: 600,
    padding:0,
    borderBottomWidth: 1,
    borderColor: '#424869'
  },
  label: {
    color: '#7f8496',
    
  },
  input: {
    color: '#fff',
  }
}
const VC_INPUT_STYLE = {
  wrap: {
    backgroundColor: 'transparent',
    height: ITEM_HEIGHT,
    padding:0,
    borderBottomWidth: 1,
    borderColor: '#424869',
    marginTop: 10
  },
  label: {
    color: '#7f8496',
    
  },
  input: {
    color: '#fff',
  }
}
const PHONE_INPUT_STYLE_ERROR = {
  wrap: {
    backgroundColor: 'transparent',
    height: ITEM_HEIGHT,
    padding:0,
    borderBottomWidth: 1,
    borderColor: 'red'
  },
  label: {
    color: '#7f8496'
  },
  input: {
    color: '#fff'
  }
}
const VCODE_AGAIN_TIME = 60;
const VCODE_LABEL_READY = '获取验证码';
const VCODE_LABEL_SENDING = '正在获取...';
const VCODE_LABEL_RUNNING = 's重新获取';

export default class Login extends Component {

  vcodeTimer = null;

  state = {
    phonetext: '',
    phone: '',
    vcode: '',
    countryCode: '86',
    loginIsValid: false,
    phoneIsValid: false,
    vcodeIsSending: false,
    vcodeLabel: VCODE_LABEL_READY,
    phoneFormatIsValid: true
  }

  constructor(props) {
    super(props);

    // props.getCountryList();
  }

  componentWillReceiveProps(nextProps){
    let vcodeSendingSuccess = nextProps.card.vcodeSendingSuccess;
    if(vcodeSendingSuccess===true){
      this._startVcodeTimer();
    }else if(vcodeSendingSuccess===false){
      this.setState({
        vcodeLabel:  VCODE_LABEL_READY,
        vcodeIsSending: false
      });
    }
    if (nextProps.card.clearUserCode) {
      this._goReadyStatus();
      this.props.clearUserCode(false);
      this._vcodeChange('');
    }
    
  }

  handleChangeInput(){

  }

  handleLogin=()=>{
    if(this.state.loginIsValid){
      this.props.userLogin({
        telephone: this.state.phone.replace(/\s/g,""),
        verificationCode: this.state.vcode
      });
    }
  }

  _inputCheck=()=>{
    //alert(this.state.phone)
    let phone = this.state.phone,
        vcode = this.state.vcode,
        vcodeIsSending = this.state.vcodeIsSending,
        loginIsValid = false,
        phoneIsValid = false;
    if(/^.{3,4}$/.test(phone)){   
       phone=phone.replace(/\s/g,"");
       this.setState({
       phonetext: phone.substring(0, 3)+" "+phone.substring(3,7)
       })
    }
    if(/^.{8,9}$/.test(phone)){
       phone=phone.replace(/\s/g,"");
       this.setState({
       phonetext: phone.substring(0,  3)+" " +phone.substring(3,7)+" "+phone.substring(7)
       })
    }
    
    if(/^\d{3}\s\d{4}\s\d{4}$/.test(phone)){
      if(validatePhone(phone.replace(/\s/g,"")))
      { 
        this.setState({
          phoneFormatIsValid:true
        });
        phoneIsValid = true;
        if(/^\d{6}$/.test(vcode)){
          loginIsValid = true;
        }
      }
    }

    this.setState({
      phoneIsValid: phoneIsValid,
      loginIsValid: loginIsValid
    })

  }
  _phoneCheck=(value)=>{
     if(validatePhone(this.state.phone.replace(/\s/g,""))){
        this.setState({
          phoneFormatIsValid:true
        });
     }else{
        this.setState({
          phoneFormatIsValid:false
        });
     }
     
  }
  _phoneChange=(value)=>{
    this.setState({
      phone: value
    }, this._inputCheck);
  }

  _vcodeChange=(value)=>{
    this.setState({
      vcode: value
    }, this._inputCheck);
  }

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

  _startVcodeTimer=()=>{
    let totalTime = VCODE_AGAIN_TIME;

    if (!this.vcodeTimer) {
      this.vcodeTimer = setInterval(()=>{
        totalTime --;
        if(totalTime<=0){
          clearInterval(this.vcodeTimer);
          this.vcodeTimer=null;
          this.setState({
            vcodeLabel:  VCODE_LABEL_READY,
            vcodeIsSending: false
          });
          return;
        }
        this.setState({
          vcodeLabel: totalTime + VCODE_LABEL_RUNNING 
        });
      }, 1000);
    }
  }

  _getVcode=()=>{
    if(!this.state.phoneIsValid||this.state.vcodeIsSending){
      return false;
    }
    this.props.userSendCode({
      telephone: this.state.phone.replace(/\s/g,""),
    })
    //alert(this.state.phone.replace(/\s/g,""))
    this.setState({
      vcodeLabel: VCODE_LABEL_SENDING,
      vcodeIsSending: true
    });

  }

  _getCountryList=()=>{
    let countryList = this.props.card.countryList;
    if(!countryList||!countryList.length){
      this.props.getCountryList();
    }
  }

  render() {
    let countryList = this.props.card.countryList||[];
    let cardState = this.props.card;
    let defaultCountry = 0;
    let countryCode = '86';
    countryList.some(function(country, index){
      if(country&&country.code==countryCode){
        defaultCountry = index;
        return true;
      }
      return false;
    })
    return (
      <TouchableWithoutFeedback onPress={ dismissKeyboard }>
        <View  style={{flex:1, backgroundColor:'#fff'}}>
          <Image style={styles.bg} source={require('../Common/image/bg.png')}>
            <View style={{flex:1, paddingRight: 20, paddingLeft: 20, paddingTop:100}}> 
              <Row style={{...allCenterVer, height:100}}>
                  <View style={styles.logoContainer}>
                      <Image  style={styles.dl} source={require('../Common/image/dl_logo.png')}>
                      </Image>
                      <Text style={styles.appName}>GoFIN</Text>
                  </View>
                 
              </Row>
              <Row style={styles.loginInput} size={2}>
                <Col>
                  <LabelInput {...this.props}
                    label={"账号 (+86)"}
                    leftSize={LABEL_WIDTH}
                    keyboardType="phone-pad"
                    styles={this.state.phoneFormatIsValid?PHONE_INPUT_STYLE:PHONE_INPUT_STYLE_ERROR}
                    maxLength={13}
                    defaultValue={this.state.phonetext}
                    placeholder={"请输入手机号"}
                    placeholderTextColor='#424869'
                    onBlur={this._phoneCheck}
                    onChange={this._phoneChange}
                    />
                  <View style={ styles.vcWrap }>
                    <View style={  {flex: 1} }>
                      <LabelInput {...this.props}
                        label="验证码"
                        leftSize={LABEL_WIDTH - 30}
                        keyboardType="phone-pad"
                        maxLength={6}
                        defaultValue={this.state.vcode}
                        styles={VC_INPUT_STYLE}
                        placeholder={"6位数字"}
                        placeholderTextColor='#424869'
                        onChange={this._vcodeChange}
                      />
                    </View>
                    <View style={ {width: VC_WIDTH, marginLeft: 10} }>
                       <RowButton {...this.props }
                          disabledBackgroundColor={'#1c2345'}
                          onPress={ this._getVcode }
                          style={ VC_BTN_STYLE }
                          disabled={ !this.state.phoneIsValid||this.state.vcodeIsSending }
                        >{this.state.vcodeLabel}</RowButton>
                    </View>
                  </View> 
                  <RowButton {...this.props}
                    onPress={ this.handleLogin }
                    disabledBackgroundColor={'#1c2345'}
                    style={ LOGIN_BTN_STYLE }
                    disabled={ !this.state.loginIsValid||cardState.userLogining }
                    >{ cardState.userLogining ? '登录中' : '手机号快捷登录' }</RowButton>
                </Col>
              </Row>
            </View>
            <View style={{marginBottom:20}}>
              <View style={[styles.bottomPic,{backgroundColor:'transparent'}]}>
                <Text style={{color:'white'}}>我已阅读并接受</Text>
                <Text style={{color:'blue'}}>《GoFIN服务协议》</Text>
              </View>
            </View>
          </Image>
        </View>
      </TouchableWithoutFeedback>
    );
  }    
}

function getPlatformValue(os, value, valueDefault){
    if(Platform.OS === os) return value;
    return valueDefault
}

const BTN_STYLE =  {
  //backgroundColor: '#171e3b',
  fontSize: 15,
  borderColor: '#70778d',
  borderWidth: 1,
  borderRadius:35  
}

const VC_BTN_STYLE = _.extend({}, BTN_STYLE, {
  width: VC_WIDTH, 
  height: 42, 
  letterSpacing: 0, 
  marginTop: 0,
  backgroundColor:'#2b3458',
  borderColor:'#70778d',
  borderWidth:1,
  color: 'white',
  borderRadius:35
})

const LOGIN_BTN_STYLE = _.extend({
}, BTN_STYLE,{
  backgroundColor:'#2b3458',
  borderColor:'#70778d',
  color:'white'
})

const styles = StyleSheet.create({
  dvideLineVerticle: {
    height:10,
    width: 1.5,
    backgroundColor: '#32384e',
    margin: 5
  },
  vcWrap: {
    height: ITEM_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  bg: {
    width: WIN_WIDTH,
    height: WIN_HEIGHT,
  },
  dl: {
    height: 52,
    width: 68.5,
    resizeMode:'contain'
  },
  rightsWrap: {
    height: RIHTS_HEIGHT
  },
  codeSelect: {
    position: 'absolute',
    top: -14,
    left: 0,
    width: LABEL_WIDTH - 10,
    opacity: 0
  },
  logoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  appName: {
    marginTop: 10,
    backgroundColor: 'transparent',
    color:'#a9aebf',
    fontSize:20
  },
  loginInput: {
    marginTop: 50
  },
  bottoms: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  visa: {
    width:32,
    height:10.5,
    borderRightWidth:2,
    borderColor:'red'
  },
  wave: {
    width:63,
    height:10.5
  },
  bottomPic: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ihaveRead: {
    color: '#243350',
    backgroundColor: 'transparent',
    margin: 10
  },
  serviceAgreement: {
    color: '#576b98', 
    backgroundColor: 'transparent'
  },
  fanfan:{
    backgroundColor:'#fff'
  }


})
