import React, {Component} from 'react';
import {StyleSheet,Image,Text} from 'react-native';
import NavBar, { NavGroup, NavButton, NavButtonText, NavTitle } from 'react-native-nav'
import Theme from '../../utils/Theme'

export default class ArticleNav extends Component {

  render() {
    let theme = new Theme(this.props.card.theme);
    let styles = StyleSheet.create({
      statusBar: {
        backgroundColor: theme.colors.statusBar
      },
      navBar: {
        backgroundColor: theme.colors.titleBar,
        height: 50,
        paddingLeft: 0
      },
      buttonText: {
        marginLeft:15,
        color: '#rgba(255, 255, 255, 1)'
      },
      number:{
        alignSelf:'center',fontSize:15,color:'white'
      },
      navButton:{
        marginTop: 20,
        flex: 1
      },
      icon:{
        width:30,
        height:30
      }
    });
    let {extra} = this.props.card.article;
    if (extra.comments>1000) extra.comments = (extra.comments/1000).toFixed(1)+'k';
    if (extra.popularity>1000) extra.popularity = (extra.popularity/1000).toFixed(1)+'k';
    return (
      <NavBar style={styles}>
        <NavButton style={styles.navButton} onPress={()=>{this.props.onNavigate({type:'pop'})}}>
          <NavButtonText style={styles.buttonText}>
            <Image style={styles.icon} source={require('../Common/image/ic_back_white.png')} resizeMode={'contain'}/>
          </NavButtonText>
        </NavButton>
        <NavGroup>
          <NavButton style={styles.navButton}>
            <NavButtonText style={styles.buttonText}>
              <Image style={styles.icon} source={require('../Common/image/ic_share_white.png')} resizeMode={'contain'}/>
            </NavButtonText>
          </NavButton>
          <NavButton style={styles.navButton}>
            <NavButtonText style={styles.buttonText}>
              <Image style={styles.icon} source={require('../Common/image/ic_collect_white.png')} resizeMode={'contain'}/>
            </NavButtonText>
          </NavButton>
          <NavButton style={styles.navButton}>
            <NavButtonText style={styles.buttonText}>
              <Image style={styles.icon} source={require('../Common/image/ic_comment_white.png')} resizeMode={'contain'}/>
            </NavButtonText>
          </NavButton>
          <Text style={styles.number}>{extra.comments}</Text>
          <NavButton style={styles.navButton}>
            <NavButtonText style={styles.buttonText}>
              <Image style={styles.icon} source={require('../Common/image/ic_praise_white.png')} resizeMode={'contain'}/>
            </NavButtonText>
          </NavButton>
          <Text style={styles.number}>{extra.popularity}</Text>
        </NavGroup>
      </NavBar>
    );
  }

}