
/**
 * @description  欢迎页面具体内容
 * @author 刘炳礼
 */

import React, {Component} from 'react';
import {Image,StyleSheet,Dimensions,View,Animated,Text,StatusBar, BackAndroid,Platform} from 'react-native';
import {Grid,Row,Col} from 'react-native-easy-grid';
import _ from 'lodash';
import SplashFooter from '../Footer/Splash';
import Logo from '../Logo';
import CompanyRights,{RIHTS_HEIGHT} from '../Company/Rights';

const WIN_WIDTH = Dimensions.get('window').width;
const WIN_HEIGHT = Dimensions.get('window').height;

export default class Splash extends Component {

  bounceValue = new Animated.Value(1.5);

  constructor(props) {
    super(props);
    props.fetchSplash();
    
  }


  _handleBack = ()=>{
    // console.log(this.props.goBack);
    // console.log(this.props.navigator);
    // alert('home页面的物理返回');
    // alert(this.lastBackPressed && (this.lastBackPressed + 2000) >= Date.parse(new Date()))
    // if (this.lastBackPressed && (this.lastBackPressed + 2000) >= Date.parse(new Date())) {
    //   alert(2222);
      //最近2秒内按过back键，可以退出应用。
      // this.props.goBack();
      // alert(222);
      // BackAndroid.exitApp();
      return false;
      // return false;
      // return false 调用系统 退出
    // }

    // this.lastBackPressed = Date.parse(new Date());
    // ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
    // return true;
    // return true 不退出 走自己的函数
  };


  componentWillUnmount() {
    if(Platform.OS === 'android'){
      BackAndroid.removeEventListener('hardwareBackPress', this._handleBack);
    }
  };


  componentDidMount() {
    if(Platform.OS === 'android'){
      BackAndroid.addEventListener('hardwareBackPress', this._handleBack);
    }

    this.bounceValue.setValue(1.5);
    Animated.timing(
      this.bounceValue,
      {
        toValue: 1,
        duration: 3000
      }
    ).start();
  };

  render() {
    const { splash } = this.props.card;
    return (
      <View style={styles.container}>
        <Image style={{width:WIN_WIDTH,height:WIN_HEIGHT,alignItems:'center'}} source={require('../Common/image/shanping_bg.png')}>
          <Image style={{width:68,height:52,marginTop:113}} source={require('../Common/image/dl_logo.png')} />
          <Text style={styles.bottom}>Go FIN V1.0.0</Text>
        </Image>
      </View>
    );
  }

}



let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    fontSize:20,
    // fontWeight:'600',
    color:'#a9aebf',
    backgroundColor:'transparent',
    marginTop: 10
  },
  bottom: {
    position:'absolute',
    bottom:50,
    width:WIN_WIDTH,
    textAlign:'center',
    backgroundColor: 'transparent',
    color:'#243350'
  }
 
  
});