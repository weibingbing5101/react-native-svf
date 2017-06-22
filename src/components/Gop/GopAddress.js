import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform,Clipboard,Alert} from 'react-native';
import Toast from 'react-native-root-toast';
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




export default class GopAddress extends Component {

  constructor(props){
    super(props);
    this.state = {
      isShowGopAddressTip:false,
    }
    this.toast = null;
  }

  _showGopAddressTip=()=>{
    if (this.state.isShowGopAddressTip) {
      // return  <View style={{width:240,position:'absolute',left:70,top:-100,backgroundColor:'white',borderWidth:1,borderColor:'#979797',borderRadius:5}}>
      //           <View style={{padding:20,borderBottomWidth:1,borderBottomColor:'#979797'}}>
      //             <Text style={{color:'#4a4a4a'}}>每张卡片有唯一的区块链地址将该地址粘贴至转账目标处，即可转入GOP至该卡账户</Text>
      //           </View>
      //           <View style={{alignSelf:'center',padding:10}}>
      //             <Text style={{color:'#4a4a4a'}} onPress={()=>this.setIsShowGopAddressTip(false)}>知道了</Text>
      //           </View>
      //         </View>;
      Alert.alert(
        '卡地址说明',
        '每张卡片有唯一的区块链地址，将该地址粘贴至转账目标处，即可转入GOP至该卡账户',
        [
          {text: '知道了', onPress: this.setIsShowGopAddressTip(false)},
        ]);
    }else{
      return false;
    }
  }

  setIsShowGopAddressTip=(value)=>{
    this.setState({
      isShowGopAddressTip:value,
    });
  }

  setGopAddressToClipboard=()=>{
    Clipboard.setString(this.props.card.curCardInfo&&this.props.card.curCardInfo.cardAddress);
    if (!this.toast) {
      this.toast =  Toast.show('复制成功',{position: Toast.positions.CENTER,duration:2000});
      let that = this;
      setTimeout(function () {
        that.toast = null;
      },2500);
    }
  }

  renderLeft = () => {
    let address = (this.props.card.curCardInfo&&this.props.card.curCardInfo.cardAddress)||'--';
    address = address.length>30?address.substr(0,8)+'******'+address.substr(address.length-4,4):address;
    let color = this.props.leftStyle;
    return <View style={{flexDirection:'column'}}>
            <Text style={[{color: '#353535',marginBottom:8},color]}>我的卡地址</Text>
            <Text style={{color: '#353535',fontSize:15,width:200}}>{address}</Text>
           </View>
  }

  renderRight = () => {
    return  <View style={{flexDirection:'row',position:'absolute',right:20}}>
              <Image style={{width:13,height:15}} source={require('./img/copy.png')}/>
              <Text style={{alignSelf:'center',color: '#576b98',marginLeft:5}} 
                onPress={()=>this.setGopAddressToClipboard()}>复制</Text>
            </View>;
  }

  render(){
    return  <View style={{backgroundColor: 'white',paddingBottom:10}}>
              <LeftFixed 
                {...this.props}
                leftSize={155}
                style={{paddingLeft:15,paddingTop:18}}
                renderLeft={ this.renderLeft } 
                renderRight={ this.renderRight }  />
              <Text style={styles.questionMark} 
                onPress={()=>this.setIsShowGopAddressTip(true)}>?</Text>
              {this._showGopAddressTip()}
            </View>
  }

}

const styles = StyleSheet.create({
  questionMark:{
    position:'absolute',
    top:29,
    left:173,
    color: '#4f9ded',
    width:18,
    height:18,
    fontSize:13,
    // fontWeight:'bold',
    paddingLeft:6,
    paddingTop:1,
    borderWidth:1,
    borderColor:'#e6e6e6',
    borderRadius:9,
  }
});
