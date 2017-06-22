import React, {Component} from 'react';
import {StyleSheet,Image,Text,Dimensions,Alert,View} from 'react-native';
import NavBar, { NavGroup, NavButton, NavButtonText, NavTitle } from 'react-native-nav'
import Theme from '../../utils/Theme';
import Touch from '../../utils/Touch';
import gop from '../../utils/Gop';

const WINDOW_WIDTH = Dimensions.get('window').width;

export default class CustomBackTitle extends Component {

  _handleBack=()=>{

    if (this.props.goFixedPage) {
      this.props.goFixedPage();   //跳转到指定页面
    }else if(this.props.backOnly){
      this.props.goBack();
    }else{

      this.props.goBack()

      this.props.fetchCardBaseInfo( this.props.card.curCardInfo );
      this.props.queryAccount&&this.props.queryAccount();
      //this.props.grbViewGopNumAndPrice && this.props.grbViewGopNumAndPrice({cardId:this.props.card.curCardInfo.cardId});
      
    }
    
  }


  render() {
    let theme = new Theme(this.props.card.theme);
    let propsStyle = this.props.styles||{};
    let backBtnIsClear = this.props.backBtnIsClear || false;

    let styles = StyleSheet.create({
      statusBar: {
        backgroundColor: (propsStyle.statusBar && propsStyle.statusBar.backgroundColor)|| theme.colors.statusBar,
      },
      navBar: {
        backgroundColor: (propsStyle.navBar&&propsStyle.navBar.backgroundColor)||theme.colors.titleBar,
        height: 50,
        position: 'relative',
        borderBottomWidth: 0
      },
      buttonText: {
        
      },
      navButton:{
        position: 'absolute',
        left: 0,
        top: 0,
        paddingLeft: 10,
        width: 50,
        height: 50,
      },
      icon:{
        width:11,
        height:20,
        marginTop:10
      }
    });
    let title = {
      color: 'black',
      fontWeight:'bold',
      flex: 1,
      textAlign: 'center'
    };
    
    return (
      <NavBar style={styles}>
        <NavTitle style={title}>{this.props.title}</NavTitle>
        {backBtnIsClear?false:
          <Touch style={styles.navButton} onPress={this._handleBack}>
            <View style={styles.buttonText}>
              <Image style={styles.icon} source={require('../Common/image/top_back.png')} resizeMode={'contain'}/>
            </View>
          </Touch>}
      </NavBar>);
  }

}