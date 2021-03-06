import React, {Component} from 'react';
import {StyleSheet,Image,ActionSheetIOS,Dimensions,View,Text, BackAndroid, ToastAndroid} from 'react-native';
import NavBar, { NavGroup, NavButton, NavButtonText, NavTitle } from 'react-native-nav'
import Theme from '../../utils/Theme';
import Touch from '../../utils/Touch';

const winWidth = Dimensions.get('window').width;

let BUTTONS = ['夜间模式','设置','取消'];
let CANCEL_INDEX = 2;

export default class HomeNav extends Component {

  title = 'Card';
  drawer = false;

  constructor(props) {
    super(props);
  }

  handleDrawer(props){
    this.drawer?props.closeDrawer():props.openDrawer();
    // this.drawer = !this.drawer;
  };

  showActionSheet(props) {
    BUTTONS[0] = this.props.card.theme==Theme.DARK?'日间模式':'夜间模式';
    ActionSheetIOS.showActionSheetWithOptions({
          options: BUTTONS,
          cancelButtonIndex: CANCEL_INDEX
        },
        (index) => {if(index==0){props.switchTheme(this.props.card.theme==Theme.DARK?Theme.LIGHT:Theme.DARK)}});
  }

  goPage(path) {
    this.props.goPage(path);
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

  componentWillMount(){
    BackAndroid.addEventListener('hardwareBackPress', this._handleBack);
  };

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this._handleBack);
  };








  render() {
    // console.log(this.props.card);
    let lightORdark = this.props.card.theme || 'light';   // 夜间  白天  模式  
    let theme = new Theme(lightORdark);
    let color = 'white';
    if (this.props.card.baseInfo && this.props.card.baseInfo.length>0) {
      color = 'black';
    }
    let styles = StyleSheet.create({
      viewLevel :{
        alignItems:'center',
        backgroundColor:'transparent',
        paddingBottom:13,
      },
      title:{
        marginTop:30,
        color: color,
        fontSize:18
      },
      about:{
        position:'absolute',
        top:30,
        right:13,
        color: color
      },
      statusBar: {
        backgroundColor: theme.colors.statusBar
      }
    });
    
    let {card} = this.props;
    let hasCard = card.baseInfo&&card.baseInfo.length;

    return (
      <View style={styles.viewLevel}>
        <Text style={styles.title}>{this.props.card.title}</Text>
        <Text style={styles.about}  onPress={()=>this.props.goPage('about')}>关于</Text>
      </View>
      );
  }

}
