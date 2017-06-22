import React, {Component} from 'react';
import {Text,View,StyleSheet,Platform,Dimensions,Alert} from 'react-native';
import {InfoInput, RowButton, LabelInput} from '../Form';
import Theme from '../../utils/Theme';

import PassWordSetCommon from './PassWordSetCommon';

// import {Grid,Row,Col} from 'react-native-easy-grid';
import CustomBackTitle from '../CustomBackTitle';
import Http from '../../utils/Http';
import _ from 'lodash';




const width = Dimensions.get('window').width;
export default class PassWordStepTwo extends Component {

  constructor(props){
    super(props);

    this.state= {
      isNext: false
    }

  }

  componentDidMount(){
  }


  componentWillReceiveProps(nextProps){
    if (nextProps.user.baseInfo.securePassword) {
        let that = this;  
        Alert.alert('提示', '密码设置成功' , function(){
          that.props.backToHome();
        });
    }
  }

  // value, callback 键盘东组件传来的值
  nextFn=(value, callback)=>{
    let props = this.props;


    if(this.props.navigateData.stepOnePWD === value){
      props.userBasicUpdate({
        securePassword: value,
      },true,(dispatch)=>{
        callback && callback();  // 清空page的密码  和 keybord组件的密码
      });
    }else{
      Alert.alert('提示','两次密码不一致',()=>{
        callback && callback();  // 清空page的密码  和 keybord组件的密码
      });
    }
    // this.props.goPage('pass_word_step_two');
  }


  render() {
    // const baseInfo = this.props.user.baseInfo;
    // const isPassWordStepOne = baseInfo.cretNo && baseInfo.realName;

    let {card} = this.props;
    let theme = new Theme(card.theme);
    return(
      <PassWordSetCommon 
        {...this.props}
        cusomBackTitleText = {'设置支付密码'}
        titleText = {'请设置密码'}
        next={ this.nextFn }
        nextText = {'完成'}
      />
    );
  }

};

PassWordStepTwo.defaultProps = {

}

const styles = StyleSheet.create({
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


