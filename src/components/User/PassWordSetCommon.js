import React, {Component} from 'react';
import {Text,View,StyleSheet,Platform,Dimensions,TouchableOpacity} from 'react-native';

import {InfoInput, RowButton, LabelInput, Keyboard} from '../Form';
import Theme from '../../utils/Theme';
import dismissKeyboard from 'dismissKeyboard';



// import {Grid,Row,Col} from 'react-native-easy-grid';
import CustomBackTitle from '../CustomBackTitle';
import Http from '../../utils/Http';
import _ from 'lodash';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class PassWordSetCommon extends Component {

  constructor(props){
    super(props);

    this.state= {
      isNext: false,
      isShowPasswordView: true,
      passwordErr:'',
      isClearPassword:false,
      passWordValue: ''
    }

  }

  componentDidMount(){
    dismissKeyboard();
  }

  // 下一步 已经没有问题
  next=()=>{
    this.props.next(this.state.passWordValue,()=>{
      this.setState({
        isNext: false,
        isClearPassword: true,
        passWordValue:'',
      })
    });
  }


  onChangePassword=(value)=>{
    let isNext = value.length===6 ? true : false;
    this.setState({
      passWordValue: value,
      isNext: isNext,
      isShowPasswordView: !isNext
    });
  }

  closePasswordWindow=(value)=>{
    console.log(value);
    console.log(this.state.passWordValue);
   
    this.setState({
      isShowPasswordView:false
    });
  }

  cancelClearPassword=()=>{
    this.setState({
      passWordValue: '',
      isClearPassword:false,
    });
  }


  // 密码 圆点  盒子
  passwordValView=()=>{
      let maxArr = [0,1,2,3,4,5];
      return (<TouchableOpacity style={styles.passwordViewStyle} onPress={()=>{this.setState({isShowPasswordView:true})}}>
                {
                  maxArr.map((value,index)=>{
                    if (index<this.state.passWordValue.length) {
                      return <View key={value} style={styles.passwordTextStyle}>
                                <Text key={value} style={styles.passwordPointStyle}></Text>
                             </View>;
                    }else{
                      return <View key={value} style={styles.passwordTextStyle}></View>;
                    }
                  })
                }
              </TouchableOpacity>);
  }


  render() {
    let props = this.props;
    let passwordView;
    if(this.state.isShowPasswordView){
      passwordView = 
                    <TouchableOpacity style={styles.warpBox} onPress={ function(){this.closePasswordWindow() }.bind(this)}>
                      <Keyboard 
                        KeyboardStyle={ styles.KeyboardStyle}
                        maxLength={6}
                        title = {''}
                        preValue = {this.state.passWordValue}
                        // keyVals = {[1,2,3,4,5,6,7,8,9,'.',0,'hide','delete','confirm']}
                        closeWindow={this.closePasswordWindow} 
                        changeValue={this.onChangePassword}
                        errInfo={this.state.passwordErr}
                        isClearPassword={ this.state.isClearPassword }
                        cancelClearPassword={ this.cancelClearPassword }
                      />
                    </TouchableOpacity>
    }

    return(
      <View style={{flex:1}}>
        <CustomBackTitle title={props.cusomBackTitleText} left={-width/2+30} {...this.props}/>
        <Text style={styles.infoTitle}>{props.titleText}</Text>

        {this.passwordValView()}

        <RowButton 
          disabled={ !this.state.isNext } 
          style={{marginTop:22,color:'white'}}
          onPress={this.next}
        >
          { props.nextText }
        </RowButton>
        { passwordView }
      </View>
    );
  }

};

PassWordSetCommon.defaultProps = {

}

const styles = StyleSheet.create({
  warpBox:{
    position:'absolute',
    top: 0,
    left: 0,
    height: height,
    width: width,
  },
  KeyboardStyle:{
    position:'absolute',
    bottom: 0,
    left: 0,
  },
  infoTitle:{
    paddingTop: 15, 
    paddingBottom:15,
    paddingLeft: 10,
    color:'#9b9b9b'
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


