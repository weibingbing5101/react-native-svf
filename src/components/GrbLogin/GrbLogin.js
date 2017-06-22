import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform,Dimensions,TouchableWithoutFeedback,AsyncStorage} from 'react-native';
import dismissKeyboard from 'dismissKeyboard';
import {Input, Button2,LabelInput,RowButton,Select} from '../Form';
import {Grid,Row,Col} from 'react-native-easy-grid';
import Alert from '../Alert';
import Touch from '../../utils/Touch';
import _ from 'lodash';

import Http from '../../utils/Http';
import {allCenter, leftCenter} from '../../utils/Style';
import SplashFooter, {FOOTER_HEIGHT} from '../Footer/Splash';
import Logo from '../Logo';
import CompanyRights,{RIHTS_HEIGHT} from '../Company/Rights';
import {RightFixed} from '../Layout';
import gop from '../../utils/Gop';

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
    color: 'white'
  },
  input: {
    color: 'white'
  }
}

const VCODE_AGAIN_TIME = 60;
const VCODE_LABEL_READY = '获取验证码';
const VCODE_LABEL_SENDING = '正在获取...';
const VCODE_LABEL_RUNNING = 's重新获取';

export default class GrbLogin extends Component {

  vcodeTimer = null;

  state = {
    phone: '',
    vcode: '',
    loginIsValid: false,
    phoneIsValid: false,
    vcodeIsSending: false,
    vcodeLabel: VCODE_LABEL_READY
  }

  constructor(props) {
    super(props); 
    // let that = this;
    // AsyncStorage.getItem('gopToken', function(err, token){
    //   console.log(token);
    //   if (token) {
    //     gop.gopToken = token;
    //     AsyncStorage.getItem('gopPhone',function(err,phone) {
    //       if (phone) {
    //         gop.gopPhone = phone;
    //       }
    //     });
    //     that.props.goPage('login_gop');
    //   }
    // });   
  }

  componentWillReceiveProps(nextProps){
    let grbCodeSendingSuccess = nextProps.card.grbCodeSendingSuccess;
    if(grbCodeSendingSuccess===true){
      this._startVcodeTimer();
    }else if(grbCodeSendingSuccess===false){
      this.setState({
        vcodeLabel:  VCODE_LABEL_READY,
        vcodeIsSending: false
      });
    }
    if (nextProps.card.grbVerifyCodeStatus) {
      this.props.grbSimulateUserLogin({
        phone: this.state.phone,
        code: this.state.vcode
      });
    }
    if (nextProps.card.clearGrbSimulateSendCode) {
      this._goReadyStatus();
      this.props.clearGrbSimulateSendCode(false);
      this._vcodeChange('');
    }
    
  }

  handleChangeInput(){

  }

  handleLogin=()=>{
    if(this.state.loginIsValid){
      this.props.grbSimulateVerifyCode({
        phone: this.state.phone,
        code: this.state.vcode
      });
    }
  }

  _inputCheck=()=>{
    let phone = this.state.phone,
        vcode = this.state.vcode,
        vcodeIsSending = this.state.vcodeIsSending,
        loginIsValid = false,
        phoneIsValid = false;

    if(/^\d{6,15}$/.test(phone)){
      phoneIsValid = true;
      if(/^\d{6}$/.test(vcode)){
        loginIsValid = true;
      }
    }

    this.setState({
      phoneIsValid: phoneIsValid,
      loginIsValid: loginIsValid
    })

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
          vcodeLabel: totalTime + VCODE_LABEL_RUNNING ,
        });
      }, 1000);
    }
    
  }

  _getVcode=()=>{
    if(!this.state.phoneIsValid||this.state.vcodeIsSending){
      return false;
    }
    this.props.grbSimulateSendCode({
      phone: this.state.phone,
    })

    this.setState({
      vcodeLabel: VCODE_LABEL_SENDING,
      vcodeIsSending: true
    });

  }

  render() {
    
    return (
      <TouchableWithoutFeedback onPress={ dismissKeyboard }>
        <View  style={{flex:1}}>
          <Image style={styles.bg} source={require('../Splash/image/bg.png')}>
            <View style={{flex:1, paddingRight: 20, paddingLeft: 20}}>
              <Row style={allCenter} size={1}>
                <Logo imgUrl='logoWhite' />
              </Row>
              <Row size={2}>
                <Col>
                  <LabelInput {...this.props}
                    label={"手机号"}
                    leftSize={LABEL_WIDTH}
                    keyboardType="phone-pad"
                    styles={INPUT_STYLE}
                    maxLength={15}
                    onChange={this._phoneChange}
                    />

                  <View style={ styles.vcWrap }>
                    <View style={  {flex: 1,marginTop:17} }>
                      <LabelInput {...this.props}
                        label="验证码"
                        leftSize={LABEL_WIDTH}
                        keyboardType="phone-pad"
                        maxLength={6}
                        defaultValue={this.state.vcode}
                        styles={INPUT_STYLE}
                        onChange={this._vcodeChange}
                      />
                    </View>
                    <View style={ {width: VC_WIDTH, marginLeft: 10} }>
                       <RowButton {...this.props}
                          onPress={ this._getVcode }
                          style={ VC_BTN_STYLE }
                          disabled={ !this.state.phoneIsValid||this.state.vcodeIsSending }
                        >{this.state.vcodeLabel}</RowButton>
                    </View>
                  </View>
                  
                 
                  <RowButton {...this.props}
                    onPress={ this.handleLogin }
                    style={ LOGIN_BTN_STYLE }
                    disabled={ !this.state.loginIsValid}
                    >登录</RowButton>
                </Col>
              </Row>
            </View>
            <View style={styles.rightsWrap}>
              <CompanyRights {...this.props} />
            </View>
          </Image>
          <SplashFooter {...this.props} />
          
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
  backgroundColor: '#6c56b7', 
  fontSize: 15
}

const VC_BTN_STYLE = _.extend({}, BTN_STYLE, {
  width: VC_WIDTH, 
  height: 49, 
  letterSpacing: 0, 
  marginTop: 0,
  backgroundColor:'#023365',
  borderColor:'#979797',
  borderWidth:1,
})

const LOGIN_BTN_STYLE = _.extend({
}, BTN_STYLE)

const styles = StyleSheet.create({
  vcWrap: {
    height: ITEM_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20
  },
  bg: {
    width: WIN_WIDTH,
    height: WIN_HEIGHT-FOOTER_HEIGHT,
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
  }

})
