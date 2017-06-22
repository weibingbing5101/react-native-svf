import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform,Dimensions,TouchableWithoutFeedback,Linking} from 'react-native';
import {Input, Button,LabelInput,RowButton,Select} from '../Form';
import {Grid,Row,Col} from 'react-native-easy-grid';
import Alert from '../Alert';
import Touch from '../../utils/Touch';
import _ from 'lodash';
import CustomBackTitle from '../CustomBackTitle';
 
import Http from '../../utils/Http';
import {allCenter, leftCenter} from '../../utils/Style';
import SplashFooter, {FOOTER_HEIGHT} from '../Footer/Splash';
import Logo from '../Logo';
import CompanyRights,{RIHTS_HEIGHT} from '../Company/Rights';
import {RightFixed} from '../Layout';

const WIN_WIDTH = Dimensions.get('window').width;
const WIN_HEIGHT = Dimensions.get('window').height;

export default class About extends Component{

  constructor(props) {
    super(props);
    let isNewApp = true;
    if (this.props.card&& this.props.card.appVersionInfo) {
      isNewApp = this.props.card.appVersionInfo.theNewVersion;
    }
    this.state = {
      isNewApp: isNewApp,
    }
    console.log(this.props.card);
  }
  componentWillReceiveProps(nextProps) {
    
  }
  _downloadApp=()=>{
    Linking.openURL(this.props.card&& this.props.card.appVersionInfo&&this.props.card.appVersionInfo.versionUrl);
  }
  _isDownloadNewApp=()=>{
    if (this.state.isNewApp) {
      return <View style={styles.uptodateVersionView}>
              <Text style={styles.uptodateVersion}>已是最新版本</Text>
             </View>;
    }else{
      return <View style={styles.uptodateVersionView}>
                <Text style={[styles.uptodateVersion,{color:'#353535'}]}
                  onPress={this._downloadApp}>去下载最新版</Text>
             </View>;
    }
  }
  render(){
    let version = this.props.card&& this.props.card.splash&&this.props.card.splash.text;
    return (
      <View style={styles.viewContainer}>
        <CustomBackTitle title="关于" {...this.props} />
        <View style={styles.logoContainer}>
          <Image style={{width:60,height:46}} source={require('./image/GPlus.png')} />
          <Text style={styles.appName}>Go FIN {version}</Text>
          {this._isDownloadNewApp()}
        </View>
        <View style={{position:'absolute',bottom:14,alignItems:'center',width:WIN_WIDTH}}>
          <Text style={styles.appCopyright}>Copyright © 2017 GPlus Card All rights reserved.</Text>
        </View>
      </View>
      );
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex:1,
  },
  topback: {
    position:'absolute',
    left:0
  },
  logoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: WIN_WIDTH,
    marginTop:31
  },
  appName: {
    fontSize:14,
    marginTop:11,
    color:'#888888'
  },
  appVersion: {
    fontSize: 14,
    marginTop:5,
    color:'#a4a5a5'
  },
  uptodateVersionView:{
    marginTop:40,
    height:44,
    width:WIN_WIDTH-30,
    backgroundColor:'#f7f6f7',
    justifyContent:'center',
    alignItems:'center',
    borderWidth:1,
    borderColor:'#ccc',
    borderRadius:5
  },
  uptodateVersion: {
    fontSize: 17,
    color:'#a4a5a5'
  },
  appCopyright: {
    fontSize:14,
    color:'#a4a5a5'
  }
})
