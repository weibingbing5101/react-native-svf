import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform} from 'react-native';
import {Input, RowButton, LabelInput} from '../Form';
import CustomBackTitle from '../CustomBackTitle';
import Theme from '../../utils/Theme';

export default class TransferToAccPh extends Component {

  constructor(props){
    super(props);
    this.state = {
      PhoneIsValid : false,
      phoneNum:'',
    }
  }

  componentDidMount(){
    
  }

  componentWillReceiveProps(nextProps){
    
  }

  componentWillUnmount(){
    
  }

  onChangePhone = (val)=>{
    if (val.length===11) {
      this.setState({phoneNum:val,PhoneIsValid:true});
    }else{
      this.setState({phoneNum:val,PhoneIsValid:false});
    }
  }

  nextstep = ()=>{
    // this.props.goPage('transfer_to_acc_val',{phoneNum:this.state.phoneNum});
    this.props.getUserByPhone({
      telephone:this.state.phoneNum
    });
  }

  render() {
    let theme = new Theme(this.props.card.theme);
    
    return (
      <View style={{flex:1, backgroundColor: theme.colors.mainBgColor }}>
        <CustomBackTitle title="转账" left={-270} {...this.props}/>
        <View style={{marginTop:10,backgroundColor:'white'}}>
          <LabelInput {...this.props} 
            label = "手机号码"
            leftSize = {74}
            placeholder="请输入账号的手机号码" 
            minLength={8} 
            maxLength={11}
            keyboardType="phone-pad" 
            onChange = {this.onChangePhone}/>
        </View>          
        <RowButton disabled={ !this.state.PhoneIsValid } 
          style={{marginTop:22,color:'white'}}
          onPress={this.nextstep.bind(this)}>下一步</RowButton>
      </View>
    );
  }

}
const styles = StyleSheet.create({
  text :{
    borderBottomWidth:1,
    borderColor:'#efeff4',
    height:50,
    paddingLeft:10,
    paddingTop:17,
  }

})


