import React, {Component} from 'react';
import {Text,View,StyleSheet,Platform,Dimensions,Alert,Keyboard} from 'react-native';
import {InfoInput, RowButton, LabelInput} from '../Form';
import Theme from '../../utils/Theme';
import {validateIc,validateName} from '../../utils/Validate';
// import Alert from '../components/Alert';


import CustomBackTitle from '../CustomBackTitle';
import Http from '../../utils/Http';




const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default class Authentication extends Component {

  constructor(props){
    super(props);

    let _props = this.props;
    const baseInfo = _props.user.baseInfo;
    let isAuthentication = (baseInfo.idNo && baseInfo.realName) ? true : false;

    this.state= {
      isNext: false,
      isClearIDValue: false,
      IDValue: '',
      nameValue: '',
      isAuthentication: isAuthentication // 是否实名
    }
  }

  componentDidMount(){
  }

  componentWillReceiveProps(nextProps){
  
  } 

  submitInfo(){
    const props = this.props;
    const baseInfo = props.user.baseInfo;

    if(this.state.isAuthentication){
      if(this.state.IDValue == baseInfo.idNo){
        Keyboard.dismiss();
        this.props.goPage('pass_word_step_one');
      }else{
        Alert.alert('提示','请输入正确的身份证号码');
      }
    }else{
      props.userBasicUpdate({
        idNo: this.state.IDValue,
        realName: this.state.nameValue
      },true,(dispatch)=>{
        Alert.alert('认证成功', '确定' , ()=>{
            dispatch({
              type:'push',
              key:'pass_word_step_one'
            });
          });
      });
    }
  }

  // 身份证输入事件
  onChangeIDValue=(value)=>{
    let isNext = false;

    if(this.state.isAuthentication){
      isNext = validateIc(value);
    }else{
      isNext = validateIc(value) && validateName(this.state.nameValue);
    }
    this.setState({
      isNext: isNext,
      IDValue: value
    });
  }

  // 姓名输入事件
  onChangeName=(value)=>{
    let isNext = false;

    if(!this.state.isAuthentication){
      isNext = validateIc(this.state.IDValue) && validateName(value);
    }

    this.setState({
      isNext: isNext,
      nameValue: value
    });
  }

  render() {
    const baseInfo = this.props.user.baseInfo;
    let {card} = this.props;
    let theme = new Theme(card.theme);
    return(
      // 已经实名认证
      this.state.isAuthentication ?
        <View style={{flex:1}}>
          <CustomBackTitle title="实名认证" left={-width/2+30} {...this.props}/>
          <Text style={styles.infoTitle}>修改设置密码前，请进行实名认证</Text>
          <InfoInput 
            {...this.props} 
            style={ styles.paddingL15 } 
            label="姓名" 
            placeholder={baseInfo.realName} 
            // onPress={()=>{this.props.goPage('authentication',{isAuthentication: false})}} 
            theme={theme} 
          />
          <LabelInput 
            {...this.props}
            styles={styles.paddingL15}
            label="香港居民身份证号" 
            leftSize = {120}
            placeholder="请输入香港居民身份证号" 
            minLength={2} 
            maxLength={18} 
            defaultValue={this.state.IDValue} 
            keyboardType="phone-pad"
            onChange = { this.onChangeIDValue } 
          />
          <RowButton 
            disabled={ !this.state.isNext } 
            style={{marginTop:22,color:'white'}}
            onPress={this.submitInfo.bind(this)}>下一步
          </RowButton>
        </View>
      :
        <View style={{flex:1}}>
          <CustomBackTitle title="实名认证" left={-width/2+30} {...this.props}/>
          <LabelInput 
            {...this.props}
            styles={styles.paddingL15}
            label="姓名" 
            leftSize = {74}
            placeholder="请输入真实姓名" 
            // minLength={2} 
            // maxLength={8} 
            defaultValue={''} 
            keyboardType="name-phone-pad" 
            onChange = {this.onChangeName} 
          />
          <LabelInput 
              {...this.props}
              styles={styles.paddingL15}
              label="香港居民身份证号" 
              leftSize = {120}
              placeholder="请输入香港居民身份证号" 
              // minLength={2} 
              maxLength={18} 
              defaultValue={''} 
              keyboardType="name-phone-pad" 
              onChange = { this.onChangeIDValue } 
            />
          <RowButton 
            disabled={ !this.state.isNext } 
            style={{marginTop:22,color:'white'}}
            onPress={this.submitInfo.bind(this)}>下一步
          </RowButton>
        </View>
    );
  }

};

Authentication.defaultProps = {
  currencyType: [
    {key: 'dollar', title: '美元',value:1},
    {key: 'euro', title: '欧元',value:2},
    {key: 'pound', title: '英镑',value:3}
  ]
}

const styles = StyleSheet.create({
  loading:{backgroundColor:'white',width:width,height:height,justifyContent:'center',paddingLeft:150},
  line:{
    borderBottomWidth: 1,
    borderBottomColor: '#ececec'
  },
  infoTitle:{
    paddingTop: 15, 
    paddingBottom:10,
    paddingLeft: 10,
    color:'#9b9b9b'
  },
  paddingL15 :{
    paddingLeft:15
  }
})