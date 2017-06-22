import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform,Dimensions} from 'react-native';
import _ from 'lodash';
import { CenterCenter,LeftFixed } from '../Layout';
import {LineButton,InfoShow} from '../Form';
import {
  STATUS_READY, 
  STATUS_ACTIVE, 
  STATUS_HANG, 
  STATUS_TEXT, 
  STATUS_BTN_TEXT
} from '../../config/cardStatus';

let defaultTextStyle={
  fontSize: 12
}


const width = Dimensions.get('window').width;

export default class GopCurrentValueExt extends Component {

  render(){
    return <View style={{width:width,height:35,backgroundColor:'#ffc71e',flexDirection:'row',paddingTop:10}}>
            <Text style={{color:'white',fontSize:14,marginLeft:10}}>账户未开通，请先完善个人资料信息</Text>
            <View style={{borderBottomWidth:1,borderBottomColor:'blue',marginLeft:20,height:20}}>
              <Text style={{color:'blue',}} onPress={()=>this.props.goPage('user')}>去完善</Text>
            </View>
           </View>
  }

}
