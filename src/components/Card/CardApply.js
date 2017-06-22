import React, {Component} from 'react';
import {Text,WebView,View,Image,ScrollView,StyleSheet,Platform,Keyboard,ListView,Dimensions,Alert,Modal} from 'react-native';
import {Input, Button,LabelInput,RowButton,CheckBox,InfoShow} from '../Form';
import {Grid,Row,Col} from 'react-native-easy-grid';
import DateTimePicker from 'react-native-modal-datetime-picker';
import CustomBackTitle from '../CustomBackTitle';
import {FormPanel} from '../Common';
import Http from '../../utils/Http';
import Touch from '../../utils/Touch';
import Theme from '../../utils/Theme';
import DateUtil from '../../utils/DateUtil';
import CardType from './parts/CardType';
import CardCurrency from './parts/CardCurrency';
import CardMail from './parts/CardMail';
import CardCountry from './parts/CardCountry';
import CardCity from './parts/CardCity';
import CardApplyTips from './parts/CardApplyTips';
import CardBirthday from './parts/CardBirthday';
import gop from '../../utils/Gop';
import {validateEmail,
        validateCardFirstName,
        validateCardLastName,
        validateCardSignature,
        validateCardPhone,
        validateCardAddress,
        validateCardCity,
        validateCardPostCode,
        validateBirthday} from '../../utils/Validate';



const width = Dimensions.get('window').width;
const SCREEN_WIDTH = Dimensions.get('window').height;
export default class CardApply extends Component {

  constructor(props){
    super(props);

    // if (props.card.cardMerterialSnapInfoAgain) {
    //   let info = props.card.cardMerterialSnapInfoAgain;
    //   this.state={
    //     info : {
    //       address: info.address,
    //       cardType: info.cardType,
    //       city: info.city,
    //       country: info.country,
    //       currency: info.currency,
    //       firstName: info.firstName,
    //       lastName: info.lastName,
    //       phone: gop.gopPhone,
    //       email:info.email,
    //       postCode: info.postCode,
    //       postType: info.postType,
    //       signature: info.signature,
    //       birthDay:info.birthDay
    //     },
    //     fastNameIsValid:true,
    //     lastNameIsValid:true,
    //     signatureIsValid:true,
    //     phoneIsValid:true,
    //     birthDayIsValid:true,
    //     cityIsValid:true,
    //     emailIsValid:(info.email?true:false),
    //     postCodeIsValid:true,
    //     addressIsValid:true,
    //     applyInfoIsValid:false,
    //   };
    // }else 
    if (props.card.userMaterialInfo) {
      let info = props.card.userMaterialInfo;
      this.state = {
        info : {
          address: info.address,
          cardType: info.cardType,
          city: info.city,
          country: info.country,
          currency: info.currency,
          firstName: info.firstName,
          lastName: info.lastName,
          phone: gop.gopPhone,
          email:info.email,
          postCode: info.postCode,
          postType: info.postType,
          signature: info.signature,
          birthDay:info.birthDay
        },
        fastNameIsValid:true,
        lastNameIsValid:true,
        signatureIsValid:true,
        phoneIsValid:true,
        birthDayIsValid:true,
        cityIsValid:true,
        emailIsValid:(info.email?true:false),
        postCodeIsValid:true,
        addressIsValid:true,
        applyInfoIsValid:(info.email?true:false),
      }
    }else {
      this.state = {
        info : {
          address: "",
          cardType: 0,
          city: "",
          country: "中国香港",
          currency: 1,
          firstName: "",
          lastName: "",
          phone: gop.gopPhone&&gop.gopPhone.replace(/^(\d{3})(\d{4})(\d{4})$/,'$1 $2 $3'),
          email:"",
          postCode: "",
          postType: 0,
          signature: "",
          birthDay:""
        },
        fastNameIsValid:true,
        lastNameIsValid:true,
        signatureIsValid:true,
        phoneIsValid:true,
        birthDayIsValid:true,
        cityIsValid:true,
        emailIsValid:true,
        postCodeIsValid:true,
        addressIsValid:true,
        applyInfoIsValid:false,
      };
    }
    this.state.alertTipIsShow= false;
    this.state.scrollTop = 0;
    this.state.showDateTimePicker = false;
    this.checked = true;

    this.refobj = '';
    this.state.keyboardDismissModeVal = 'on-drag'
  }

  componentDidMount(){
    // this.props.getCountryList();
    // this.props.cardUserMaterial();

    // 此方法and无法识别
    Keyboard.addListener('keyboardWillShow', (e)=>{
      this.setState({
        beforeKeyboardTop: this.state.scrollTop
      })
    });

    if(Platform.OS === 'android'){

      this.setState({keyboardDismissModeVal: 'none'}); // AND 偏下方input得焦时键盘弹出又消失的问题

      Keyboard.addListener('keyboardDidHide', (e)=>{  // 键盘消失屏幕滚动位置的问题
        let scroller = this.refs.scroller;
        if(this.refobj){
          this[this.refobj]('onBlur');
        }
        if(scroller){
          let top = this.state.scrollTop||0;
          scroller.scrollTo({x:0, y:top, animated:true});
        }
      });      
    }else{
      Keyboard.addListener('keyboardDidHide', (e)=>{
        let scroller = this.refs.scroller;
        if(scroller){
          let top = this.state.beforeKeyboardTop||0;
          scroller.scrollTo({x:0, y:top, animated:true});
        }
      });
    }

  }

  setRefObj(val){
    this.refobj = val;
  }


  componentWillReceiveProps(nextProps){
    if(nextProps.card.merterialSubmitSuccess){
      this.setState({alertTipIsShow:true});
      // Alert.alert(
      //   '申请新卡',
      //   '申请提交成功',
      //   [
      //     {text: '确定', onPress: this.goPage.bind(this)},
      //   ]
      // );
    }

    if (nextProps.card.userMaterialInfo) {
      let info = nextProps.card.userMaterialInfo;
      this.state = {
        info : {
          address: info.address,
          cardType: info.CardType,
          city: info.city,
          country: info.country,
          currency: info.currency,
          firstName: info.firstName,
          lastName: info.lastName,
          phone: info.phone.replace(/^(\d{3})(\d{4})(\d{4})$/,'$1 $2 $3'),
          email:info.email,
          postCode: info.postCode,
          postType: info.postType,
          signature: info.signature,
          birthDay:info.birthDay
        },
        fastNameIsValid:true,
        lastNameIsValid:true,
        signatureIsValid:true,
        phoneIsValid:true,
        birthDayIsValid:true,
        cityIsValid:true,
        emailIsValid:(info.email?true:false),
        postCodeIsValid:true,
        addressIsValid:true,
        applyInfoIsValid:(info.email?true:false),
      }
      this.props.clearCardUserMaterial();
    }
  }

  componentWillUnmount(){
    this.props.clearMerterialSubmitSuccess();
  }

  goPage=()=> {
    this.state.alertTipIsShow = false;
    this.props.clearMerterialSubmitSuccess();
    this.props.goPage('card_process');    
  }

  onChangeAddress = (val) =>{
    if (val!='onBlur') {

      this.setRefObj('onChangeAddress');

      let info = this.state.info;
      info.address = val;
      this.state.addressIsValid = true;
      this.setApplyInfoIsValid(info);
      return;
    }
    let info = this.state.info;
    let isValid = validateCardAddress(info.address);
    if (isValid) {
      this.state.addressIsValid = true;
    }else{
      this.state.addressIsValid = false;
    }
    this.setApplyInfoIsValid(info);
  }
  onChangeCardType = (val) =>{
    this.state.info.cardType = val;
  }
  onChangeCity = (val) =>{
    if (val!='onBlur') {
      this.setRefObj('onChangeCity');

      let info = this.state.info;
      info.city = val;
      this.state.cityIsValid = true;
      this.setApplyInfoIsValid(info);
      return;
    }
    let info = this.state.info;
    let isValid = validateCardCity(info.city);
    if (isValid) {
      this.state.cityIsValid = true;
    }else{
      this.state.cityIsValid = false;
    }
    this.setApplyInfoIsValid(info);
  }
  onChangeCountry = (val) =>{
    this.state.info.country = val;
  }
  onChangeCurrency = (val) =>{
    this.state.info.currency = val;
  } 
  onChangeFirstName = (val) =>{
    if (val!='onBlur') {
      this.setRefObj('onChangeFirstName');
      
      let info = this.state.info;
      info.firstName = val;
      this.state.fastNameIsValid = true;
      this.setApplyInfoIsValid(info);
      return;
    }
    let info = this.state.info;
    let isValid = validateCardFirstName(info.firstName);
    if (isValid) {
      this.state.fastNameIsValid = true;
    }else{
      this.state.fastNameIsValid = false;
    }
    this.setApplyInfoIsValid(info);
  }
  onChangeLastName = (val) =>{
    if (val!='onBlur') {
      this.setRefObj('onChangeLastName');
      
      let info = this.state.info;
      info.lastName = val;
      this.state.lastNameIsValid = true;
      this.setApplyInfoIsValid(info);
      return;
    }
    let info = this.state.info;
    let isValid = validateCardLastName(info.lastName);
    if (isValid) {
      this.state.lastNameIsValid = true;
    }else{
      this.state.lastNameIsValid = false;
    }
    this.setApplyInfoIsValid(info);
  }
  onChangePhone = (val) =>{
    val = val.replace(/(\s)/g,'');
    if (val!='onBlur') {
      this.setRefObj('onChangePhone');
      
      let info = this.state.info;
      let value;
      if (val.length>7) {
        value = val.substr(0,3)+' '+val.substr(3,4)+' '+val.substr(7,val.length-7);
      }else if (val.length>3) {
        value = val.substr(0,3)+' '+val.substr(3,val.length-3);
      }else{
        value = val;
      }
      info.phone = value;
      
      this.state.phoneIsValid = true;
      this.setApplyInfoIsValid(info);
      return;
    }
    let info = this.state.info;
    let isValid = validateCardPhone(info.phone);
    if (isValid) {
      this.state.phoneIsValid = true;
    }else{
      this.state.phoneIsValid = false;
    }
    this.setApplyInfoIsValid(info);
  }

  onChangeEmail = (val)=>{
    if (val!='onBlur') {
      this.setRefObj('onChangeEmail');
      
      let info = this.state.info;
      info.email = val;
      this.state.emailIsValid = true;
      this.setApplyInfoIsValid(info);
      return;
    }
    let info = this.state.info;
    let isValid = validateEmail(info.email);
    if (isValid) {
      this.state.emailIsValid = true;
    }else{
      this.state.emailIsValid = false;
    }
    this.setApplyInfoIsValid(info);
  }

  onChangePostCode = (val) =>{
    if (val!='onBlur') {
      this.setRefObj('onChangePostCode');
      
      let info = this.state.info;
      info.postCode = val;
      this.state.postCodeIsValid = true;
      this.setApplyInfoIsValid(info);
      return;
    }
    let info = this.state.info;
    let isValid = validateCardPostCode(info.postCode);
    if (isValid) {
      this.state.postCodeIsValid = true;
    }else{
      this.state.postCodeIsValid = false;
    }
    this.setApplyInfoIsValid(info);
  }
  onChangePostType = (val) =>{
    this.state.info.postType = val;
  }

  onChangeSignature = (val) =>{
    let isValid = validateCardSignature(val);
    console.log(isValid);
    let info = this.state.info;
    info.signature = val;
    if (isValid) {
      this.state.signatureIsValid = true;
    }else{
      this.state.signatureIsValid = false;
    }
    this.setApplyInfoIsValid(info);
  }

  onChangeBirthDay = (val) =>{
    this.setState({showDateTimePicker:true});
  }

  _handleDatePicked=(date)=>{
    if (date) {
      this.setState({showDateTimePicker:false});
      let timestamp = date.getTime();
      let time = DateUtil.getTimeTextWithTimestamp(timestamp);
      time = time.substr(0,10);
      let info = this.state.info;
      info.birthDay = time ;
      this.state.birthDayIsValid = true;
      this.setApplyInfoIsValid(info);
    }
  }

  _hideDateTimePicker=()=>{
    this.setState({showDateTimePicker:false});
  }

  setApplyInfoIsValid(info){
    // this.setState({alertTipIsShow:true});
    if (this.state.fastNameIsValid
        && (this.state.info.firstName) 
        && this.state.lastNameIsValid
        && (this.state.info.lastName)
        && this.state.signatureIsValid
        && this.state.phoneIsValid
        && (this.state.info.phone)
        && this.state.birthDayIsValid
        && (this.state.info.birthDay)
        && this.state.cityIsValid 
        && (this.state.info.city)
        && this.state.emailIsValid
        && (this.state.info.email) 
        && this.state.postCodeIsValid
        && (this.state.info.postCode) 
        && this.state.addressIsValid 
        && (this.state.info.address)
        && this.checked) {
      this.setState({
        info:{
          address: info.address,
          cardType: info.cardType,
          city: info.city,
          country: info.country,
          currency: info.currency,
          firstName: info.firstName,
          lastName: info.lastName,
          phone: info.phone,
          email:info.email,
          postCode: info.postCode,
          postType: info.postType,
          signature: info.signature,
          birthDay:info.birthDay
        },
        applyInfoIsValid:true,
      });
    }else{
      this.setState({
        info:{
          address: info.address,
          cardType: info.cardType,
          city: info.city,
          country: info.country,
          currency: info.currency,
          firstName: info.firstName,
          lastName: info.lastName,
          phone: info.phone,
          email:info.email,
          postCode: info.postCode,
          postType: info.postType,
          signature: info.signature,
          birthDay:info.birthDay
        },
        applyInfoIsValid:false
      });
    }
  }


  submitInfo = () =>{
    if (!validateBirthday(this.state.info.birthDay)) {
      Alert.alert("年龄未满18岁，请核对后提交");
      return;
    }
    this.props.cardMerterialSubmit({
      address: this.state.info.address,
      cardtype: this.state.info.cardType,
      city: this.state.info.city,
      country: this.state.info.country,
      currency: this.state.info.currency,
      firstname: this.state.info.firstName,
      lastname: this.state.info.lastName,
      phone: this.state.info.phone.replace(/(\s)/g,''),   //去掉空格
      emailid: this.state.info.email,
      postcode: this.state.info.postCode,
      posttype: this.state.info.postType,
      signature: (this.state.info.firstName+this.state.info.lastName),
      dateofbirth:this.state.info.birthDay
    });
  }

  _onScroll=(e)=>{
    this.setState({
      scrollTop: e.nativeEvent.contentOffset.y
    })
  }

  agreeProtocol=(isChecked)=>{
    let info = this.state.info;
    this.checked = isChecked;
    // this.setState({checked:isChecked});
    this.setApplyInfoIsValid(info);
    return;
  }

  showProtocol = ()=>{
    let leftText = (<View style={{flexDirection: 'row'}}>
                      <Text style={{fontSize:13,marginLeft:6,color:'#888888'}}>已阅读并同意</Text>
                    </View>);
    return <View style={{flexDirection:'row',marginLeft:15,marginTop:22}}>
              <CheckBox
                onClick={this.agreeProtocol} 
                isChecked={this.checked}
                rightTextView={leftText} />
              <Touch onPress={()=>{this.props.goPage('card_provision')}}>
                <Text style={{color:'#6a7fa6',fontSize:13}}>《GoFIN用户服务协议》</Text>
              </Touch>
            </View>;
  }

  render() {
    let theme = new Theme(this.props.card.theme);
    let alert;
    let stylePos = {};
    if (this.state.alertTipIsShow) {
      stylePos = {position:'absolute',left:0,right:0};
      alert = (
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.alertTipIsShow}
        >
          <CardApplyTips {...this.props} theme={theme} state="success" content="申请提交成功" btnText="确定" onPress={()=>this.goPage()} />
        </Modal>
        );
    }

    let navigateData = this.props.navigateData;
    let title;
    if (navigateData==='entity') {
      title = '卡片申请';
      this.state.info.cardType = 0;
    }else{
      title = '虚拟卡申请';
      this.state.info.cardType = 1;  
    }
   
    return (
      <FormPanel>
        <View style={{flex:1}} ref="outViewBox">
          <CustomBackTitle title={title} left={-width/2+30} {...this.props}/> 
          <ScrollView 
            style={[stylePos,{marginBottom:0}]} 
            ref="scroller" 
            onScroll={ this._onScroll } 
            scrollEventThrottle={10} 
            keyboardDismissMode={ this.state.keyboardDismissModeVal }
            keyboardShouldPersistTaps = {'handled'}
          >
            <View style={{justifyContent: 'center',marginLeft:13,height:40}}>
              <Text style={{fontSize:14,color:'#999999'}}>持卡人姓名使用您的中文拼音或英文，如ZHANG SAN</Text>
            </View>
            <View style={{backgroundColor:'white',marginBottom:10}}>
              <LabelInput {...this.props}
                styles={this.state.fastNameIsValid?styles:stylesErr}
                label="持卡人姓" 
                leftSize = {74}
                placeholder="请输入至少2个英文字母" 
                minLength={2} 
                maxLength={10} 
                defaultValue={this.state.info.firstName} 
                keyboardType="name-phone-pad" 
                onBlur={this.onChangeFirstName}
                onChange = {this.onChangeFirstName} 
                onFocus = {this.onChangeFirstName}
                /> 
              <LabelInput {...this.props} 
                styles={this.state.lastNameIsValid?styles:stylesErr}
                label="持卡人名" 
                leftSize = {74}
                placeholder="请输入至少2个英文字母" 
                minLength={2} 
                maxLength={10} 
                defaultValue={this.state.info.lastName} 
                keyboardType="name-phone-pad" 
                onChange={this.onChangeLastName}
                onBlur={this.onChangeLastName}
                onFocus={this.onChangeLastName} 
                />
              <CardBirthday {...this.props}
                style={styles.wrap}
                defaultValue = {this.state.info.birthDay}
                placeholder = "请输入出生日期，如1900-11-11"
                onPress = {this.onChangeBirthDay}/>
            </View>
            <View style={{backgroundColor:'white'}}>
              <LabelInput {...this.props}
                label="账户币种"
                leftSize={74}
                defaultValue="港元"
                styles={this.state.cityIsValid?styles:stylesErr}
                editable={false}/> 
              {this.state.info.cardType === 0?
                <CardMail {...this.props} 
                style={styles.wrap}
                theme={theme} 
                defaultSelected={this.state.info.postType} 
                onChange={this.onChangePostType}
                />:false}
            </View>
            <View style={{justifyContent: 'center',marginLeft:13,height:40}}>
              <Text style={{fontSize:14,color:'#999999'}}>请填入常用的手机号及邮箱地址，用于接收银行通知</Text>
            </View>
            <View style={{backgroundColor:'white'}}>
              <LabelInput {...this.props}
                styles={this.state.phoneIsValid?styles:stylesErr}
                label="手机号" 
                leftSize = {74}
                minLength={6} 
                maxLength={13}
                placeholder="请输入常用手机号" 
                defaultValue={this.state.info.phone} 
                keyboardType="phone-pad" 
                onChange={this.onChangePhone}
                onBlur={this.onChangePhone} 
                onFocus={this.onChangePhone}  
                /> 
              <LabelInput {...this.props}
                styles={this.state.emailIsValid?styles:stylesErr}
                label="邮箱地址"  
                leftSize = {74}
                maxLength = {64}
                placeholder="请输入常用邮箱地址格式" 
                defaultValue={this.state.info.email} 
                keyboardType="numbers-and-punctuation"  
                onChange={this.onChangeEmail}
                onBlur={this.onChangeEmail} 
                onFocus={this.onChangeEmail} 
                 />
            </View>
            <View style={{justifyContent: 'center',marginLeft:13,height:40}}>
              <Text style={{fontSize:14,color:'#999999'}}>请准确填入个人联系信息，用于身份验证</Text>
            </View>
            <View style={{backgroundColor:'white',marginBottom:0}}>
              <LabelInput {...this.props}
                label="所在国家"
                leftSize={74}
                defaultValue="中国香港"
                styles={this.state.cityIsValid?styles:stylesErr}
                editable={false}/>
              <LabelInput {...this.props}
                styles={this.state.cityIsValid?styles:stylesErr}
                label="所在城市" 
                leftSize = {74}
                minLength={1} 
                maxLength={20} 
                placeholder="请输入所在城市拼音" 
                defaultValue={this.state.info.city} 
                keyboardType="name-phone-pad" 
                onChange={this.onChangeCity}
                onBlur={this.onChangeCity} 
                onFocus={this.onChangeCity}  
                scroller={this.refs.scroller}
                scrollerTop={this.state.scrollTop}
                 />
              <LabelInput {...this.props}
                styles={this.state.postCodeIsValid?styles:stylesErr}
                label="邮编" 
                leftSize = {74}
                minLength={3} 
                maxLength={8} 
                placeholder="请输入3位以上字母或数字的邮编" 
                defaultValue={this.state.info.postCode} 
                keyboardType="name-phone-pad"  
                onChange={this.onChangePostCode}
                onBlur={this.onChangePostCode} 
                onFocus={this.onChangePostCode} 
                scroller={this.refs.scroller}
                scrollerTop={this.state.scrollTop}
                /> 
              <LabelInput {...this.props} 
                ref={'address'}
                styles={this.state.addressIsValid?stylesExt:stylesExtErr}
                label="详细地址" 
                leftSize = {74}
                maxLength={105} 
                placeholder="请输入您的家庭或工作地址信息，支持字母、数字、空格及#/@,-.字符" 
                defaultValue={this.state.info.address} 
                keyboardType="numbers-and-punctuation" 
                onChange={this.onChangeAddress}
                onBlur={this.onChangeAddress} 
                onFocus={this.onChangeAddress}  
                scroller={this.refs.scroller}
                scrollerTop={this.state.scrollTop}
                /> 
            </View>
            {this.showProtocol()}
            <RowButton disabled={ !this.state.applyInfoIsValid } 
              style={{marginTop:22,color:'white'}}
              onPress={this.submitInfo.bind(this)}>提交</RowButton>
            <DateTimePicker
              isVisible={this.state.showDateTimePicker}
              mode='date'
              titleIOS = "请选择出生日期"
              onConfirm={this._handleDatePicked}
              onCancel={this._hideDateTimePicker}
            />
          </ScrollView>
          {alert}
        </View>
      </FormPanel>
    );
  }

}

const styles = StyleSheet.create({
  wrap :{
    borderBottomWidth:1,
    borderColor:'#efeff4',
    paddingLeft:0,
    marginLeft:10,
  }
});

const stylesErr = StyleSheet.create({
  wrap :{
    borderBottomWidth:1,
    borderColor:'red',
    paddingLeft:0,
    marginLeft:10,
  }
});


const stylesExt = StyleSheet.create({
  wrap :{
    borderBottomWidth:1,
    borderColor:'#efeff4',
    paddingLeft:0,
    marginLeft:10,
    height:75,
  },
  label :{
    marginBottom:20,
  },
  input :{
    height:65,
  }
});
const stylesExtErr = StyleSheet.create({
  wrap :{
    borderBottomWidth:1,
    borderColor:'red',
    paddingLeft:0,
    marginLeft:10,
    height:75,
  },
  label:{
    marginBottom:20,
  },
  input :{
    height:65,
  }
});

