import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform} from 'react-native';
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




export default class GopBalance extends Component {

  renderLeft = () => {
    return <Text style={{color: this.props.theme.colors.primaryColor,width:100,fontWeight:'bold',marginLeft:5}}>GOP数量</Text>
  }

  renderCenter = () => {
    let gopNum = this.props.card.curCardInfo && this.props.card.curCardInfo.gopNum;
    gopNum = gopNum || '---:---';
    return <View style={{flexDirection:'row',position:'absolute',top:-10,right:20}}>
            <Image style={{width:10,height:16}} source={require('../Common/image/g.png')} />
            <Text style={{marginLeft:3}}>{gopNum}</Text>
           </View>;
  }

  render(){
    let gopNum = this.props.card.curCardInfo && this.props.card.curCardInfo.gopNum;
    gopNum = gopNum || '---:---';

    // return <InfoShow {...this.props} 
    //         label="GOP数量" 
    //         styles={styles}
    //         leftStyle = {this.props.leftStyle}
    //         placeholder={'G '+gopNum} 
    //          />

    return <LeftFixed 
            {...this.props} 
            leftSize={155}
            renderLeft={ this.renderLeft } 
            renderRight={ this.renderCenter } 
          />
  }

}

const styles = StyleSheet.create({
  wrap :{
    borderBottomWidth:1,
    borderColor:'#efeff4',
    paddingLeft:0,
    marginLeft:15,
  }
});
