import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform,Dimensions,AsyncStorage} from 'react-native';
import _ from 'lodash';
import {allCenter, leftCenter} from '../../../utils/Style';
import Touch from '../../../utils/Touch';


const WIN_WIDTH = Dimensions.get('window').width;
const WIN_HEIGHT = Dimensions.get('window').height;

export default class Keyboard extends Component {

  constructor(props){
    super(props);
    this.state = {
      passwordValue:''
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
      this.props.closeWindow();
    }else if (value=='delete') {
      if (passwordValue.length>0) {
        passwordValue = passwordValue.substr(0,passwordValue.length-1);
        this.setState({passwordValue:passwordValue});
        this.props.changeValue(passwordValue);
      }
    }else if (value=='confirm') {

    }else{
      if (passwordValue.length<6) {
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
                    return <Text key={value} style={styles.textStyle} onPress={()=>this.changeValue(value)}>{value}</Text>;
                  }else if (value=='.') {
                    return <Text key={value} style={styles.textStyle} onPress={()=>this.changeValue(value)}>.</Text>;
                  }else if (value=='hide') {
                    // return <Text style={[styles.textStyle,{fontSize:14}]} onPress={()=>this.changeValue(value)}>></Text>;
                    return <Touch key={value} style={styles.imageStyle} onPress={()=>this.changeValue(value)}><Image source={require('../image/arrow.png')} /></Touch>;
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
                    return <Touch key={value} style={[styles.imageStyle,{height:100,paddingTop:40}]} onPress={()=>this.changeValue(value)}><Image style={{width:23,height:17}} source={require('../image/backspace.png')}/></Touch>
                    // return <Text style={[styles.textStyle,{height:100,paddingTop:40}]} onPress={()=>this.changeValue(value)}>delete</Text>
                  }else if (value=='confirm') {
                    return <Text key={value} style={[styles.textStyle,{height:100,paddingTop:40,backgroundColor:'#023365',borderColor:'#023365',color:'white'}]} onPress={()=>this.changeValue(value)}>确定</Text>
                  }
                })
              }
            </View>);
  }

	render(){
		return (
			<View style={styles.backgroundStyle}>
        {this._renderLeft()}
        {this._renderRight()}
      </View>
    )
	}
}


const styles = StyleSheet.create({
  backgroundStyle:{
    flex:1,
    flexDirection:'row'
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
