import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,ScrollView,Platform,ListView,Dimensions} from 'react-native';
import {Input, Button} from '../Form';
import {Grid,Row,Col} from 'react-native-easy-grid';
import CustomBackTitle from '../CustomBackTitle';
import Http from '../../utils/Http';
import Touch from '../../utils/Touch';
import Theme from '../../utils/Theme';
import _ from 'lodash';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const IMAGE_WIDTH = width;
const IMAGE_HEIGHT = (326*width)/224;

const winHeight = Dimensions.get('window').height;
const topHeight = 75;
export default class CardProvision extends Component {

  constructor(props){
    super(props);

  }

  componentDidMount(){
  }





  render() {
    let theme = new Theme(this.props.card.theme);  
    
    let h5Url = "http://goopalcard.xiaojian.me/gc-ios/pdf.html?t="+Date.now();

    // let h5Url = 'http://baidu.com';7200
    h5Url =  {uri:h5Url};

    let webViewHeight = 7200;
    if (width>400) {
      webViewHeight = 7900;
    }
    return (
      <View style={{flex:1}}>
        <CustomBackTitle title="申请卡条款" left={-width/2+30} {...this.props}/>
        <ScrollView>
          <WebView 
            source={ h5Url }
            style={{ height : webViewHeight,width:width,}}
            scalesPageToFit = {true}

            renderLoading ={ ()=>{ return <Text>页面加载中</Text> }}
            />
        </ScrollView>
      </View>
    );
  }

}


const constStyle = StyleSheet.create({
  selectBtnStyle:{
    flex:1,
    // width:50,
    borderStyle:'solid',
    borderWidth:1,
    borderColor:'grey',
    borderLeftWidth:0,
    textAlign:'center',
    // color:'blue',
    backgroundColor:'white',
    paddingTop:10,
    fontSize:16,
  },
  selectedBtnStyle:{
    flex:1,
    // width:50,
    textAlign:'center',
    color:'white',
    // backgroundColor:'blue',
    paddingTop:10,
    fontSize:16,
 
  },
  image: {
    width:IMAGE_WIDTH, 
    height: IMAGE_HEIGHT
  }
})


