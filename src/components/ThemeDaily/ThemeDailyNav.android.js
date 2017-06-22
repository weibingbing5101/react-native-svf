import React, {Component} from 'react';
import {StyleSheet,ToolbarAndroid} from 'react-native';
import Theme from '../../utils/Theme'

export default class ThemeDailyNav extends Component {

  title = '首页';
  drawer = false;

  constructor(props) {
    super(props);
  }

  handleDrawer(props){
    this.drawer?props.closeDrawer():props.openDrawer();
    // this.drawer = !this.drawer;
  };

  render() {
    let theme = new Theme(this.props.card.theme);
    return (
      <ToolbarAndroid
        navIcon={require('../Common/image/ic_menu_white_android.png')}
        onIconClicked={() => {this.handleDrawer(this.props)}}
        actions={toolbarActions}
        style={[styles.toolbar,{backgroundColor:theme.colors.titleBar}]}
        titleColor="white"
        title={this.props.card.themeDaily.name} />
    );
  }

}

let toolbarActions = [
  {title: '返回', icon:require('./image/theme_add.png'), showWithText:false, show: 'always'}
];

let styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#00a2ed',
    height: 50
  }
});
