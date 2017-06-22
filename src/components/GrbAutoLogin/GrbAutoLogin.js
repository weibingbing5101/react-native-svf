import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Text,
  Image,
  ListView,
  RefreshControl,
  Platform,
  AsyncStorage
} from 'react-native';
import gop from '../../utils/Gop';



const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


export default class GrbAutoLogin extends Component {

  constructor(props) {
    super(props);
    let that = this;
    AsyncStorage.multiGet(['gopToken', 'gopPhone'],function(err,info){
      //info为格式[['gopToken','234234'],['gopPhone','1333333']]
      if (info[0]&& info[0][1]&&info[1] && info[1][1]) {
        gop.goptoken = info[0][1];
        gop.gopPhone = info[1][1];
        gop.setGop();
        gop.setToken(info[0][1]);
        that.props.goPage('login_gop');
      }else {
        that.props.goPage('grb_login');
      }
    });
  }

  componentWillReceiveProps(nextProps){
  }

  componentDidMount(){
    
  }


  render() {

    let {card} = this.props;

    return (
      <View style={{width: width, height: 660,alignItems: 'center',justifyContent: 'center'}}>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  
  carouselBg:{
    marginTop:0,
    flex:1,
  }
});