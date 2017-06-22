import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,ScrollView,Platform,ListView,Dimensions} from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';
import {Input, Button} from '../Form';
import {Grid,Row,Col} from 'react-native-easy-grid';
import CustomBackTitle from '../CustomBackTitle';
import Http from '../../utils/Http';
import Touch from '../../utils/Touch';
import Theme from '../../utils/Theme';
import _ from 'lodash';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class Help extends Component {

  constructor(props){
    super(props);

  }

  componentDidMount(){
  }

  render() {
    let theme = new Theme(this.props.card.theme);  
    
    let h5Url = "http://goopalcard.xiaojian.me/gc-ios/help.html?t="+Date.now();

    // let h5Url = 'http://baidu.com';7200
    h5Url =  {uri:h5Url};

    let webViewHeight = height-70;
    return (
      <View style={{flex:1}}>
        <CustomBackTitle title="帮助" left={-width/2+30} {...this.props}/>
        <ScrollView>
          <AutoHeightWebView 
            source={ h5Url }
            style={{ width:width }}
            enableAnimation={true}
            // only works on enable animation
            animationDuration={255}

            renderLoading ={ ()=>{ return <Text>页面加载中</Text> }}
            />
        </ScrollView>
      </View>
    );
  }

}

