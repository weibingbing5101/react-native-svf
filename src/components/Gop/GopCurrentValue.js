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




export default class GopCurrentValue extends Component {

  renderLeft = () => {
   return <Text style={ {color: this.props.theme.colors.primaryColor,width:110,fontWeight:'bold'} }>GOP卖出价</Text>
  }

  renderCenter = () => {
    let price = this.props.card.curCardInfo && this.props.card.curCardInfo.gopSellPrice;
    price = price || '--:----';
    return <Text style={{fontWeight:'bold'}}>{'$ '+price}</Text>
  }

  render(){
    let price = this.props.card.curCardInfo && this.props.card.curCardInfo.gopSellPrice;
    price = price || '--:----';
    return <InfoShow {...this.props} 
            label="GOP卖出价" 
            styles={styles}
            leftStyle = {this.props.leftStyle}
            placeholder={'$ '+price} 
             />
    // return <LeftFixed 
    //         {...this.props} 
    //         leftSize={155}
    //         renderLeft={ this.renderLeft } 
    //         renderRight={ this.renderCenter } 
    //       />
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

