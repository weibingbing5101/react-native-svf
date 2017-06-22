import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform,Dimensions,AsyncStorage,TouchableOpacity} from 'react-native';
import _ from 'lodash';
import {allCenter, leftCenter} from '../../../utils/Style';
import Keyboard from './Keyboard';

const WIN_WIDTH = Dimensions.get('window').width;
const WIN_HEIGHT = Dimensions.get('window').height;

export default class PasswordKeyboard extends Component {

  constructor(props){
    super(props);
    this.state={
      value:''
    };
  }

	componentDidMount(){
    let props = this.props;
    
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.isClearPassword) {
      this.setState({value:''});
    }
  }

  changeValue=(value)=>{
    this.setState({
      value:value
    });
    this.props.onChange && this.props.onChange(value);
  }

  passwordView=()=>{
    let maxLength = this.props.maxLength || 6;  //默认6位
    let maxArr = [];
    for(let i=0;i<maxLength;i++) maxArr.push(i);
    return (<View style={styles.passwordViewStyle}>
              {
                maxArr.map((value,index)=>{
                  if (index<this.state.value.length) {
                    return <View key={value} style={styles.passwordTextStyle}><Text key={value} style={styles.passwordPointStyle}></Text></View>;
                  }else{
                    return <Text key={value} style={styles.passwordTextStyle}></Text>;
                  }
                })
              }
            </View>);
  }

  errShow=()=>{
    return <View style={styles.errInfoStyle}><Text style={{color:'#F24E4E'}}>{this.props.errInfo}</Text></View>;
  }

  closeWindow=()=>{
    this.props.closeWindow();
  }

	render(){
		return (
			<TouchableOpacity style={styles.backgroundStyle} onPress={this.closeWindow}>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>{this.props.title}</Text>
          {this.passwordView()}
          {this.errShow()}
          <Keyboard keyVals={this.props.keyVals} 
            changeValue={this.changeValue} 
            closeWindow={()=>this.props.closeWindow()}
            isClearPassword={this.props.isClearPassword}
            cancelClearPassword={()=>this.props.cancelClearPassword()}
            />
        </View>
      </TouchableOpacity>
    )
	}
}

PasswordKeyboard.defaultProps = {
  title:'输入果仁宝支付密码，确认身份',
  keyVals:[1,2,3,4,5,6,7,8,9,'.',0,'hide','delete','confirm']
}

const styles = StyleSheet.create({
  backgroundStyle:{
    flex:1,
    // backgroundColor:'grey',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    width:WIN_WIDTH,
    height:WIN_HEIGHT,
    position:'absolute',
    top:0
  },
  viewStyle:{
    backgroundColor: 'white', 
    width:WIN_WIDTH,
    position:'absolute',
    bottom:0,
    paddingTop:10,
    alignItems:'center',
  },
  titleStyle:{
    backgroundColor: 'transparent', 
    color: 'black', 
    fontSize: 14,
    marginTop:20,
    marginBottom:20,
    paddingLeft:10
  },
  passwordViewStyle:{
    flexDirection:'row',
    alignSelf:'center',
    marginBottom:10,
  },
  errInfoStyle:{
    marginBottom:10,
    height:15,
    marginLeft:-198,  //因为居中，所以设置负值，让其靠左
  },
  passwordTextStyle:{
    borderWidth:1,
    borderColor:'#ccc',
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
  passwordPointStyle:{
    borderWidth:5,
    borderColor:'black',
    borderRadius:5,
    height:0,
  }

});
