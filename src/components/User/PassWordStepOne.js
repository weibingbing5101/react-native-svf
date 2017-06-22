import React, {Component} from 'react';
import {Text,View,StyleSheet,Platform,Dimensions} from 'react-native';
import {InfoInput, RowButton, LabelInput, Keyboard} from '../Form';
import Theme from '../../utils/Theme';
import PassWordSetCommon from './PassWordSetCommon';

// import {Grid,Row,Col} from 'react-native-easy-grid';
import CustomBackTitle from '../CustomBackTitle';
import Http from '../../utils/Http';
import _ from 'lodash';

// 此页面 1、下一步按钮事件、文案    2、返回的title


const width = Dimensions.get('window').width;
export default class PassWordStepOne extends Component {

  constructor(props){
    super(props);

    this.state= {
    }

  }

  componentDidMount(){
    if(this.props.navigateData && this.props.navigateData.stepOnePWD){
      console.log(this.props.navigateData.stepOnePWD);
    };
  }

  nextFn=(value,callback)=>{
    console.log('下一个页面'+ value);
    callback && callback(); // 清空page的密码  和 keybord组件的密码
    this.props.goPage('pass_word_step_two',{stepOnePWD: value});
  }

  render() {
    let theme = new Theme(this.props.card.theme);

    return(
      <PassWordSetCommon 
        {...this.props}
        cusomBackTitleText = {'设置支付密码'}
        titleText = {'请设置密码'}
        next={ this.nextFn }
        nextText = {'下一步'}
      />
    )
  }

};

PassWordStepOne.defaultProps = {

}

const styles = StyleSheet.create({
  line:{
    borderBottomWidth: 1,
    borderBottomColor: '#ececec'
  },
  infoTitle:{
    paddingTop: 15, 
    paddingBottom:15,
    paddingLeft: 10,
    color:'#9b9b9b'
  },
  paddingL15 :{
    paddingLeft:15
  },
  // 密码框最外面的盒子 ul
  passwordViewStyle:{
    flexDirection:'row',
    alignSelf:'center',
    marginBottom:10,
    backgroundColor: '#fff',
    borderWidth:1,
    borderColor:'#d8d8d8',
    borderRightWidth:0,
  },
  // 密码框里面的盒子  li 
  passwordTextStyle:{
    borderRightWidth:1,
    borderColor:'#d8d8d8',
    // shadowColor:'#ccc',
    // shadowRadius:1,
    // shadowOpacity:0.8,
    alignItems:'center',
    justifyContent: 'center',
    // paddingBottom:30,
    // paddingTop:0,
    width:50,
    height:50,
  },
  // 密码框里面的盒子  li  点点
  passwordPointStyle:{
    borderWidth:5,
    borderColor:'black',
    borderRadius:5,
    height:0,
  }
})


