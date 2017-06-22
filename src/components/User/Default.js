import React, {Component} from 'react';
import {Text,View,StyleSheet,Platform,Dimensions,Alert, Keyboard, ScrollView} from 'react-native';
import {Input, Button,LabelInput,RowButton} from '../Form';
import CustomBackTitle from '../CustomBackTitle';
import Http from '../../utils/Http';
import Touch from '../../utils/Touch';
import Theme from '../../utils/Theme';
import CardBirthday from '../Card/parts/CardBirthday';
import DateUtil from '../../utils/DateUtil';

import {validatePhoneDisplay} from '../../utils/Validate';

import DateTimePicker from 'react-native-modal-datetime-picker';


import {InfoInput, Select,LineButton,InfoShow} from '../Form';
import gop from '../../utils/Gop';
import _ from 'lodash';

const width = Dimensions.get('window').width;

const substr = (val)=>{
  return val&&((val=val+'').length) ? '后四位 ' + val.substr(val.length-4, 4) : '';
}


// 个人账户页面
export default class User extends Component {

  constructor(props){
    super(props);

    this.state = {
      showDateTimePicker:false
    }
  }

  componentDidMount(){
    let props = this.props;
    // 获取用户信息
    // props.getUserBase();
  }

  _goUpdate=(key)=>{
    this.props.goPage('input_update', key);  
    // 更新用户信息的页面在common/inputUpdate.js  策略模式简单实现
  }

  _handleLogout=()=>{
    Alert.alert(
      '退出登录',
      '请确认是否退出登录', 
      [
        {
          text: '取消', 
          onPress: () => {}
        },{
          text: '确定', 
          onPress: () => this.props.userLogout()
        }
      ]
    )
  }

  // 更新性别
  _updateGender=(index, gender)=>{
    let userInfo = this.props.user.baseInfo;

    this.props.userBasicUpdate(_.extend({}, userInfo, {
      gender: gender.key
    }), true)
  }

  // 更新证件类型 禁止用户选择 证件类型
  _updateIDType=(index, gender)=>{
    // let userInfo = this.props.user.baseInfo;

    // this.props.userBasicUpdate(_.extend({}, userInfo, {
    //   gender: gender.key
    // }), true)
  }

  // 显示生日组件
  onChangeBirthDay = (val) =>{
    this.setState({showDateTimePicker:true});
  }

  _hideDateTimePicker=()=>{
    this.setState({showDateTimePicker:false});
  }

  _handleDatePicked=(date)=>{
    if (date) {
      let props = this.props;
      let userInfo = props.user.baseInfo;

      this.setState({showDateTimePicker:false});

      let timestamp = date.getTime();
      let time = DateUtil.getTimeTextWithTimestamp(timestamp);
      time = time.substr(0,10);


      props.userBasicUpdate(_.extend({}, userInfo, {
        birthday: time
      }),true);
    }
  }




  render() {
    let {user, card} = this.props;
    let theme = new Theme(card.theme);
    let userInfo = user.baseInfo;

    // console.log('default页面');
    // console.log(userInfo);


    return (
      <View style={{flex:1}}>
        <CustomBackTitle title="个人资料" left={-width/2+30} {...this.props}/> 

        <ScrollView 
          style={{marginBottom:0}} 
          ref="scroller" 
          onScroll={ this._onScroll } 
          scrollEventThrottle={10} 
          keyboardDismissMode='none' // ios此处是on-drag 导致得焦时 键盘出现  滑动  又消失
          keyboardShouldPersistTaps = {'handled'}
        >
          <Text style={styles.infoTitle}>基本信息</Text>

          <InfoInput {...this.props} 
            style={ styles.paddingL15 }
            label="真实姓名" 
            placeholder={userInfo.realName} 
            onPress={()=>this._goUpdate('userName')}
            theme={theme} />

          <Select {...this.props} 
            style={ styles.paddingL15 }
            label="性别" 
            leftSize={74}
            placeholder="选择性别"
            defaultSelected={userInfo.gender==1?0:1}
            dataSource={ [{key: 1, title: '男'},{key: 2, title: '女'}] }
            renderSelected={ (index, data)=> <Text style={{color:theme.colors.primaryColor,position:'absolute',top:0,right:40}}>{data.title}</Text> } 
            onChange={ this._updateGender } 
            theme={theme} />

          <CardBirthday {...this.props}
          // add
          defaultValue = {userInfo.birthday}
          placeholder = {userInfo.birthday ? userInfo.birthday : "请选择出生日期"}
          onPress = {this.onChangeBirthDay} />


          <InfoInput {...this.props} 
            // add
            style={styles.paddingL15 }
            label="地址" 
            placeholder={userInfo.address} 
            onPress={()=>this._goUpdate('userAddress')}
            theme={theme} />

          <InfoInput {...this.props} 
            style={ styles.paddingL15 }
            label="电话号码" 
            placeholder={validatePhoneDisplay(userInfo.telephone)} 
            // onPress={()=>this._goUpdate('userPhone')}
            theme={theme} />

          <Text style={styles.infoTitle}>认证信息</Text>

          <Select {...this.props} 
            style={ styles.paddingL15 }
            label="证件类型" 
            leftSize={74}
            placeholder="选择证件类型"
            defaultSelected={0}
            dataSource={ [{key: 1, title:'香港特别行政区'}] }
            renderSelected={ (index, data)=> <Text style={{color:theme.colors.primaryColor,position:'absolute',top:0,right:40}}>{data.title}</Text> } 
            onChange={ this._updateIDType } 
            theme={theme} /> 

          <InfoInput {...this.props} 
            style={styles.paddingL15 }
            label="证件号码" 
            placeholder={substr(userInfo.idNo)} 
            onPress={()=>this._goUpdate('userIc')}
            theme={theme} />

          <Text style={styles.infoTitle}>账户信息</Text>

          <InfoInput {...this.props} 
            style={ styles.paddingL15 }
            label="账户状态" 
            placeholder={userInfo.userStatus} 
            theme={theme} />

          <RowButton onPress={this._handleLogout}>退出登录</RowButton>
          <DateTimePicker
            // add
            isVisible={this.state.showDateTimePicker}
            mode='date'
            titleIOS = "请选择出生日期"
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker} />

        </ScrollView>
      </View>
    );
  }

}

User.defaultProps = {
  genders: [{key: 1, title: '男'},{key: 2, title: '女'}]
}
// styles.infoTitle
const styles = StyleSheet.create({
  paddingL15 :{
    paddingLeft:15
  },
  infoTitle:{
    paddingTop: 15, 
    paddingBottom:10,
    paddingLeft: 10,
    color:'#9b9b9b'
  }
});
