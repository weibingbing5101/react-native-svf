import React, {Component} from 'react';
import {StyleSheet,Image,ActionSheetIOS,Dimensions,View,Text} from 'react-native';
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
    console.log(path);
    this.props.goPage(path);
  }

  render() {
    // console.log(this.props.card); // light

    let theme = new Theme(this.props.card.theme);
    let color = 'black';
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
        marginTop:34,
        color:color,
        fontSize:18
      },
      about:{
        position:'absolute',
        top:34,
        right:13,
        color:color
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
        <Text style={styles.about} onPress={()=>this.props.goPage('about')}>关于</Text>
      </View>
      );
  }

}
