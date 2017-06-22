import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform} from 'react-native';
import _ from 'lodash';
import { CenterCenter,LeftFixed } from '../Layout';
import {LineButton} from '../Form';
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




export default class CardStatus extends Component {

  changeCardStatus = () => {
    let card = this.props.card.curCardInfo;
    let newStatus;
    switch(card.cardStatus){
      case STATUS_READY:
      case STATUS_HANG:
        newStatus=STATUS_ACTIVE;
      break;
      case STATUS_ACTIVE:
        newStatus=STATUS_HANG;
      break;
    }
    this.props.changeCardStatus({
      id: card.id,
      status: newStatus,
      index: this.props.card.curCardIndex
    });
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps)
  }

  renderLeft = () => {
    let text = STATUS_TEXT[this.props.card.curCardInfo.cardStatus]||'未知';
    let color = this.props.leftStyle; 
    return <View style={{flexDirection:'row',paddingTop:0}}>
            <Text style={ [{color: '#353535'},color] }>卡片状态</Text>
            <Text style={{marginLeft:20,borderWidth:1,borderColor:'#e6e6e6',borderRadius:10,paddingTop:2,paddingBottom:2,paddingLeft:5,paddingRight:5,color:'#888888',fontSize:12}}>{text}</Text>
          </View>
  }

  renderRight = () => {
    let btnText = STATUS_BTN_TEXT[this.props.card.curCardInfo.cardStatus];
    if(btnText){
      return <LineButton style={{fontSize:13,marginRight:38,width:60,backgroundColor:'#576b98',color:'white',borderRadius:5}} disabled={this.props.card.cardStatusIsChanging} onPress={this.changeCardStatus}>{btnText}</LineButton>
    }else{
      return false;
    }
    
  }

  render(){
    return <CenterCenter 
            {...this.props} 
            leftSize={74}
            style={{paddingLeft:15,height:44}}
            renderLeft={ this.renderLeft } 
            renderRight={ this.renderRight } 
          />
  }

}
