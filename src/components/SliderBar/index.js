import React, {Component} from 'react';
import {View,Text,Image,StyleSheet,Dimensions,ListView,StatusBar,Platform} from 'react-native';
import Touch from '../../utils/Touch';
import Theme from '../../utils/Theme';

let _height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container:{
    marginTop: Platform.OS=='android'?0:25,
    height: _height-25,
    backgroundColor:'rgb(2, 51, 101)'
  },
  account:{
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:20,
    paddingRight:20,
    backgroundColor:'rgb(2, 51, 101)'
  },
  accountBtn:{
    flexDirection:'row',flex:.5,justifyContent:'center'
  },
  avatar:{
    width:40,
    height:40,
    borderRadius:20,
    overflow:'hidden'
  },
  homeBtn:{
    paddingTop:15,
    paddingBottom:15,
    paddingLeft:20,
    paddingRight:30,
    backgroundColor:'rgb(2, 51, 101)',
    flexDirection:'row',
    justifyContent:'center'
  },
  itemActive:{
    padding:15,
    flexDirection:'row',
    backgroundColor:'rgb(2, 51, 101)',
    justifyContent:'center'
  },
  themeItem:{
    padding:15,
    flexDirection:'row',
    justifyContent:'center'
  }
});

export default class SliderBar extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  _renderRow = (row) => {
    let theme = new Theme(this.props.card.theme);
    return(
      <Touch onPress={()=>{return true;this.props.closeDrawer()}}>
        <View style={row.active?[styles.itemActive,{backgroundColor:theme.colors.homeBtn}]:styles.themeItem}>
          <View style={{flex:.85}}><Text style={{fontSize:16,color:theme.colors.sliderBarColor}}>{row.name}</Text></View>
          <View style={{flex:.15,justifyContent:'center'}}>{/*<Image style={{width:13,height:13}} source={require('../Common/image/ic_menu_follow.png')}/>*/}</View>
        </View>
      </Touch>
    )
  };

  render() {
    let card = this.props.card;
    let {resetSideBar,backToHome,closeDrawer} = this.props;
    let theme = new Theme(card.theme);
    let list = null;
    if (card.themeList) {
      this.ds = this.ds.cloneWithRows(JSON.parse(JSON.stringify(card.themeList)));
      list = (
        <ListView
          style={{backgroundColor:theme.colors.sliderBar}}
          dataSource={this.ds}
          renderRow={this._renderRow}
        />
      )
    }
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={theme.colors.statusBar}/>
        {/*Account panel*/}
        <View style={[styles.account,{backgroundColor:theme.colors.account}]}>
          <View style={{flexDirection:'row'}}>
            <View style={{flex:.2}}>
              <Image style={styles.avatar} source={require('./image/account_avatar.png')}/>
            </View>
            <View style={{flex:.8,justifyContent:'center'}}>
              <Text style={{color:theme.colors.accountColor,fontSize:16}}>{'请登录'}</Text>
            </View>
          </View>
        </View>
        {/*Come back to home*/}
        <Touch onPress={()=>{resetSideBar();backToHome();closeDrawer()}}>
          <View style={[styles.homeBtn,{backgroundColor:theme.colors.homeBtn}]}>
            <View style={{flex:1}}><Text style={{color:'rgb(2, 51, 101)',fontSize:16}}>首页</Text></View>
          </View>
        </Touch>
        {/*Theme daily*/}
        {list}
      </View>
    );
  }

}