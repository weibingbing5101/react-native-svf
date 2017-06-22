import React, {Component} from 'react';
import {Text,View,Image,StyleSheet} from 'react-native';
import {allCenter,colCenter} from '../../../utils/Style';

const icons = {
  warn: require('../../Common/image/ic_warn.png'),
  success: require('../../Common/image/ic_success.png'),
  process: require('../../Common/image/ic_process.png'),
  "error": require('../../Common/image/ic_error.png'),
}
export default class CardApplyTips extends Component {

  constructor(props){
    super(props);
  }

  render(){
  	return (
      <View style={[allCenter,{backgroundColor: 'rgba(0,0,0,.3)',}]}>
        <View style={styles.wrap}>
          <Image style={styles.icon} source={ icons[this.props.state] || 'success' } />
          <Text style={{color:this.props.theme.colors.primaryColor}}>{this.props.content}</Text>
          <Text style={styles.br}/>
          <Text style={[styles.btn,{color:this.props.theme.colors.mainColor}]} onPress={()=>this.props.onPress()}>{this.props.btnText||'确定'}</Text>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor:'white',
    width:240,
    alignItems:'center',
    borderRadius:10,
    opacity:1
  },
  icon: {
    width: 30, 
    height: 30,
    marginBottom: 15,
    marginTop:15
  },
  br:{
    width:240,
    height:1,
    borderStyle:'solid',
    borderWidth:0.5,
    borderColor:'grey',
    marginTop:15,
    marginBottom:15
  },
  btn: {
    fontSize: 16,
    marginBottom:15
  }
  
})
