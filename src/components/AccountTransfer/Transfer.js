import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform} from 'react-native';
import {Input, RowButton, LabelInput} from '../Form';
import CustomBackTitle from '../CustomBackTitle';
import Theme from '../../utils/Theme';

export default class Transfer extends Component {

  constructor(props){
    super(props);
  }

  render() {
    let theme = new Theme(this.props.card.theme);
    
    return (
      <View style={{flex:1, backgroundColor: theme.colors.mainBgColor }}>
        <CustomBackTitle title="转账" left={-270} {...this.props}/>
        <View style={{marginTop:10,backgroundColor:'white'}}>
          <Text style={styles.text} onPress={()=>this.props.goPage('transfer_to_acc_ph')}>转账至其他账户</Text>
        </View>
        <View style={{marginTop:3,backgroundColor:'white'}}>
          <Text style={styles.text} onPress={()=>this.props.goPage('transfer_to_bank_card')}>转账至银行卡</Text>
        </View>
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


