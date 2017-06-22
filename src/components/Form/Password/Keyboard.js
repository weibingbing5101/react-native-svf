import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform,Dimensions,AsyncStorage,TouchableOpacity} from 'react-native';
import _ from 'lodash';
import {allCenter, leftCenter} from '../../../utils/Style';
import Touch from '../../../utils/Touch';


const WIN_WIDTH = Dimensions.get('window').width;
const WIN_HEIGHT = Dimensions.get('window').height;

/*
    maxLength       number 键盘最长
    keyVals         arr    键盘内容
    changeValue     fun    键盘点击   return    string
    closeWindow     fun    键盘消失   return    自定义


*/

export default class Keyboard extends Component {

  constructor(props){
    super(props);
    let prePassWordVal = this.props.preValue ? this.props.preValue : '' ;  // 键盘消失 显示后 是否保留之前输入的值
    this.state = {
      passwordValue: prePassWordVal
    };
  }

	componentDidMount(){
    let props = this.props;
  }
  componentWillReceiveProps(nextProps){
    if (nextProps.isClearPassword) {
      this.setState({passwordValue:''});
      this.props.cancelClearPassword&& this.props.cancelClearPassword();
    }
  }

  changeValue=(value)=>{
    let passwordValue = this.state.passwordValue;
    if (value=='hide') {
      this.props.closeWindow(passwordValue);
    }else if (value=='delete') {
      if (passwordValue.length>0) {
        passwordValue = passwordValue.substr(0,passwordValue.length-1);
        this.setState({passwordValue:passwordValue});
        this.props.changeValue(passwordValue);
      }
    }else if (value=='confirm') {

    }else{
      if (passwordValue.length < this.props.maxLength) {
        passwordValue+=value;
        this.setState({passwordValue:passwordValue});
        this.props.changeValue(passwordValue);
      }
    }
  }

  _renderLeft=()=>{
    return (<View style={{flexDirection:'row',width:WIN_WIDTH/4*3,height:null,overflow:'hidden',flexWrap:'wrap'}}>
              {
                this.props.keyVals.map((value,index)=>{
                  if (value>=0) {
                    return <Text key={value} style={styles.textStyle} onPress={()=>this.changeValue(value)}>{value}</Text>
                  }else if (value=='.') {
                    return <Text key={value} style={styles.textStyle} onPress={()=>this.changeValue(value)}>.</Text>
                  }else if (value=='hide') {
                    // return <Text style={[styles.textStyle,{fontSize:14}]} onPress={()=>this.changeValue(value)}>></Text>;
                    return <Touch key={value} style={styles.imageStyle} onPress={()=>this.changeValue(value)}><Image source={require('../images/arrow.png')} /></Touch>
                  }
                })
              }
            </View>);
  }

  _renderRight=()=>{
    return (<View style={{width:WIN_WIDTH/4,height:null,flexWrap:'wrap'}}>
              {
                this.props.keyVals.map((value,index)=>{
                  if (value=='delete') {
                    return <Touch key={value} style={[styles.imageStyle,{height:100,paddingTop:40}]} onPress={()=>this.changeValue(value)}><Image style={{width:23,height:17}} source={require('../images/backspace.png')}/></Touch>
                    // return <Text style={[styles.textStyle,{height:100,paddingTop:40}]} onPress={()=>this.changeValue(value)}>delete</Text>
                  }else if (value=='confirm') {
                    return <Text key={value} style={[styles.textStyle,{height:100,paddingTop:40,backgroundColor:'#023365',borderColor:'#023365',color:'white'}]} onPress={()=>this.changeValue(value)}>确定</Text>
                  }
                })
              }
            </View>);
  }

	render(){
    let props = this.props;
    let KeyboardStyle = props.KeyboardStyle?props.KeyboardStyle:null; // 区分键盘样式
		return (
        <View style={[styles.keyboardBox,KeyboardStyle]}>
          {this._renderLeft()}
          {this._renderRight()}
        </View>
    )
	}
}

Keyboard.defaultProps = {
  title:'请输入支付密码，确认身份',
  keyVals:[1,2,3,4,5,6,7,8,9,'.',0,'hide','delete','confirm']
}

const styles = StyleSheet.create({
  keyboardBox:{
    flexDirection:'row',
    backgroundColor:'#fff'
  },
  textStyle:{
    width:WIN_WIDTH/4,
    height:50,
    borderWidth:1,
    borderColor:'#d8d8d8',
    textAlign:'center',
    paddingTop:16,
    fontSize:16,
  },
  imageStyle:{
    width:WIN_WIDTH/4,
    height:50,
    borderWidth:1,
    borderColor:'#d8d8d8',
    alignItems:'center',
    paddingTop:20,
  }
    
});
