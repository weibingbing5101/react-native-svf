import React, {Component} from 'react';
import {Text,WebView,View,Image,ScrollView,StyleSheet,Keyboard,Platform,ListView,Dimensions,Alert,Modal} from 'react-native';
import {Input, Button,LabelInput,RowButton} from '../../Form';
import {Grid,Row,Col} from 'react-native-easy-grid';
import Http from '../../../utils/Http';
import Touch from '../../../utils/Touch';
import Theme from '../../../utils/Theme';
import CardType from './CardType';
import CardCurrency from './CardCurrency';
import CardMail from './CardMail';
import CardCountry from './CardCountry';
import CardCity from './CardCity';
import CardApplyTips from './CardApplyTips';
import {validateEmail,
        validateCardFirstName,
        validateCardLastName,
        validateCardSignature,
        validateCardPhone,
        validateCardAddress,
        validateCardCity,
        validateCardPostCode} from '../../../utils/Validate';



const width = Dimensions.get('window').width;
export default class CardApply extends Component {

  constructor(props){
    super(props);
    this.submitMark = false;
    if (props.card.cardMerterialSnapInfoAgain) {
      let info = props.card.cardMerterialSnapInfoAgain;
      this.state={
        info : {
          address: info.address,
          cardType: info.cardType,
          city: info.city,
          country: info.country,
          currency: 0,
          firstName: info.firstName,
          lastName: info.lastName,
          phone: info.phone,
          email:info.emailId,
          postCode: info.postCode,
          postType: info.postType,
          signature: info.signature,
          birthDay:info.birthDay,
          snapshotId:info.snapshotId
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
        applyInfoIsValid:true,
      };
      this.state.alertTipIsShow= false;
      this.state.scrollTop = 0;
    }
  }

  componentDidMount(){
    // let cardMerterialSnapInfoAgain = this.props.card.cardMerterialSnapInfoAgain;
    // if (cardMerterialSnapInfoAgain) {

    // }else {
    //   this.props.cardUserMaterial();
    // }
    this.props.getCountryList();
    this.props.clearCardMerterialSnapInfo();

    Keyboard.addListener('keyboardDidHide', (e)=>{
      let scroller = this.refs.scroller;
      if(scroller){
        let top = this.state.scrollTop||0;
        scroller.scrollTo({x:0, y:top, animated:true});
      }
    });

    // Keyboard.addListener('keyboardWillShow', (e)=>{
    //   this.setState({
    //     beforeKeyboardTop: this.state.scrollTop
    //   })
    // });

  }


  componentWillReceiveProps(nextProps){
    if(nextProps.card.merterialSubmitSuccess && !this.submitMark){
      this.submitMark = true;
      this.setState({alertTipIsShow:true});
      // Alert.alert(
      //   '申请新卡',
      //   '申请提交成功',
      //   [
      //     {text: '确定', onPress: this.goPage.bind(this)},
      //   ]
      // );
    }
  }

  componentWillUnmount(){
    this.props.clearMerterialSubmitSuccess();
  }

  goPage() {
    this.state.alertTipIsShow = false;
    this.props.clearMerterialSubmitSuccess();
    this.props.cardMerterialSnapList();
    this.props.backToCardProcessInCardRejectApply();    
  }

  onChangeAddress = (val) =>{
    let isValid = validateCardAddress(val);
    let info = this.state.info;
    info.address = val;
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
    let isValid = validateCardCity(val);
    let info = this.state.info;
    info.city = val;
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
    let isValid = validateCardFirstName(val);
    let info = this.state.info;
    info.firstName = val;
    if (isValid) {
      this.state.fastNameIsValid = true;
    }else{
      this.state.fastNameIsValid = false;
    }
    this.setApplyInfoIsValid(info);
  }
  onChangeLastName = (val) =>{
    let isValid = validateCardLastName(val);
    let info = this.state.info;
    info.lastName = val;
    if (isValid) {
      this.state.lastNameIsValid = true;
    }else{
      this.state.lastNameIsValid = false;
    }
    this.setApplyInfoIsValid(info);
  }
  onChangePhone = (val) =>{
    let isValid = validateCardPhone(val);
    let info = this.state.info;
    info.phone = val;
    if (isValid) {
      this.state.phoneIsValid = true;
    }else{
      this.state.phoneIsValid = false;
    }
    this.setApplyInfoIsValid(info);
  }
  onChangeEmail = (val)=>{
    let isValid = validateEmail(val);
    let info = this.state.info;
    info.email = val;
    if (isValid) {
      this.state.emailIsValid = true;
    }else{
      this.state.emailIsValid = false;
    }
    this.setApplyInfoIsValid(info);
  }

  onChangePostCode = (val) =>{
    let isValid = validateCardPostCode(val);
    let info = this.state.info;
    info.postCode = val;
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
    let info = this.state.info;
    info.birthDay = val;
    if (val.length==10) {
      this.state.birthDayIsValid = true;
    }else{
      this.state.birthDayIsValid = false;
    }
    this.setApplyInfoIsValid(info);
  }

  setApplyInfoIsValid(info){
    // this.setState({alertTipIsShow:true});
    if (this.state.fastNameIsValid && this.state.lastNameIsValid&& this.state.signatureIsValid&& this.state.phoneIsValid&& this.state.birthDayIsValid&& this.state.cityIsValid && this.state.emailIsValid&& this.state.postCodeIsValid && this.state.addressIsValid) {
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
          birthDay:info.birthDay,
          snapshotId:info.snapshotId
        },
        applyInfoIsValid:true
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
          birthDay:info.birthDay,
          snapshotId:info.snapshotId
        },
        applyInfoIsValid:false
      });
    }
  }


  submitInfo = () =>{
    this.submitMark = false;
    this.props.cardMerterialReSubmit({
      address: this.state.info.address,
      cardtype: this.state.info.cardType,
      city: this.state.info.city,
      country: this.state.info.country,
      currency: this.state.info.currency,
      firstname: this.state.info.firstName,
      lastname: this.state.info.lastName,
      phone: this.state.info.phone,
      emailid: this.state.info.email,
      postcode: this.state.info.postCode,
      posttype: this.state.info.postType,
      signature: this.state.info.signature,
      dateofbirth:this.state.info.birthDay,
      snapshotid:this.state.info.snapshotId
    });
  }

  _onScroll=(e)=>{
    this.setState({
      scrollTop: e.nativeEvent.contentOffset.y
    })
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

    return (
      
        <ScrollView 
          style={stylePos} 
          ref="scroller" 
          onScroll={ this._onScroll } 
          scrollEventThrottle={10} 
          keyboardDismissMode='none'
          keyboardShouldPersistTaps = {'handled'}
        >
          <LabelInput label="姓" placeholder="输入英文字母" minLength={2} maxLength={20} defaultValue={this.state.info.firstName} keyboardType="name-phone-pad" onChange={this.onChangeFirstName} tip={!this.state.fastNameIsValid}/> 
          <LabelInput label="名" placeholder="输入英文字母" minLength={2} maxLength={20} defaultValue={this.state.info.lastName} keyboardType="name-phone-pad" onChange={this.onChangeLastName} tip={!this.state.lastNameIsValid} />
          <LabelInput label="卡签名" placeholder="输入英文字母" minLength={2} maxLength={20} defaultValue={this.state.info.signature} keyboardType="name-phone-pad" onChange={this.onChangeSignature} tip={!this.state.signatureIsValid}/> 
          <LabelInput {...this.props}
            label="账户币种"
            leftSize = {74}
            defaultValue="港元" 
            editable={false}/>  
          {this.state.info.cardType===0?
            <CardMail {...this.props}
              theme={theme} 
              defaultSelected={this.state.info.postType} 
              onChange={this.onChangePostType}/> 
            :false} 
          <LabelInput 
              label="手机号" 
              minLength={6} 
              placeholder="输入项" 
              defaultValue={this.state.info.phone} 
              keyboardType="phone-pad" 
              onChange={this.onChangePhone} 
              tip={!this.state.phoneIsValid} /> 
          <LabelInput 
            label="出生日期" 
            placeholder="YYYY-MM-DD" 
            maxLength={10} 
            defaultValue={this.state.info.birthDay} 
            keyboardType="numbers-and-punctuation" 
            onChange={this.onChangeBirthDay} 
            scroller={this.refs.scroller}
            scrollerTop={this.state.scrollTop}
            offsetY={10}
            tip={!this.state.birthDayIsValid} />
          <LabelInput {...this.props}
            label="所在国家"
            leftSize = {74}
            defaultValue="中国香港" 
            editable={false}/>
          <LabelInput {...this.props} 
              label="城市" 
              minLength={1} 
              maxLength={20} 
              placeholder="输入城市名称" 
              defaultValue={this.state.info.city} 
              keyboardType="name-phone-pad" 
              onChange={this.onChangeCity} 
              scroller={this.refs.scroller}
              scrollerTop={this.state.scrollTop}
              tip={!this.state.cityIsValid} />
          <LabelInput {...this.props}
                label="邮箱"  
                placeholder="输入邮箱" 
                defaultValue={this.state.info.email} 
                keyboardType="numbers-and-punctuation"  
                onChange={this.onChangeEmail} 
                scroller={this.refs.scroller}
                scrollerTop={this.state.scrollTop}
                offsetY={150}
                tip={!this.state.emailIsValid} />
          <LabelInput {...this.props} 
              label="邮编" 
              minLength={3} 
              maxLength={8} 
              placeholder="输入项" 
              defaultValue={this.state.info.postCode} 
              keyboardType="name-phone-pad"  
              onChange={this.onChangePostCode} 
              scroller={this.refs.scroller}
              scrollerTop={this.state.scrollTop}
              offsetY={180}
              tip={!this.state.postCodeIsValid} /> 
          <LabelInput 
              label="详细地址" 
              maxLength={96} 
              placeholder="" 
              defaultValue={this.state.info.address} 
              keyboardType="numbers-and-punctuation" 
              onChange={this.onChangeAddress}
              scroller={this.refs.scroller}
              scrollerTop={this.state.scrollTop} 
              offsetY={230}
              tip={!this.state.addressIsValid} /> 
          <RowButton disabled={ !this.state.applyInfoIsValid } onPress={this.submitInfo.bind(this)}>提交</RowButton>
          {alert}
        </ScrollView>
      
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
