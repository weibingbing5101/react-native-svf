import React, {Component} from 'react';
import {StyleSheet,ToolbarAndroid, BackAndroid} from 'react-native';
import Theme from '../../utils/Theme'

export default class CustomBackTitle extends Component {

  title = '首页';

  constructor(props) {
    super(props);
  }

  _handleBack=()=>{
    // alert('back_title的物理返回');
    if (this.props.goFixedPage) {
      this.props.goFixedPage();   //跳转到指定页面
      return true;
    }else if(this.props.backOnly){
      this.props.goBack();
      return true;
    }else{
      this.props.goBack()
      this.props.fetchCardBaseInfo( this.props.card.curCardInfo );
      this.props.queryAccount&&this.props.queryAccount();
      return true;
    //this.props.grbViewGopNumAndPrice && this.props.grbViewGopNumAndPrice({cardId:this.props.card.curCardInfo.cardId});
    }

  };


  onBackAndroid = () => {

    if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
       //最近2秒内按过back键，可以退出应用。
      return false;
      // return false 调用系统 退出
    }

    this.lastBackPressed = Date.now();

    // ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
    return true;
    // return true 不退出 走自己的函数
  };


  componentWillMount(){
    // alert('addEventListener');
    BackAndroid.addEventListener('hardwareBackPress', this._handleBack);
  };

  componentWillUnmount() {
    // alert('removeEventListener');
    BackAndroid.removeEventListener('hardwareBackPress', this._handleBack);
  };




  render() {
    let theme = new Theme(this.props.card.theme);
    return (
      <ToolbarAndroid
        navIcon={require('../Common/image/ic_back_white_android.png')}
        onIconClicked={ this._handleBack }
        style={[styles.toolbar, {backgroundColor:theme.colors.titleBar}, ]}
        titleColor="black"
        subtitle={this.props.title} />
    );
  }

}

/*let toolbarActions = [
  {title: '关注', icon:require('../Common/image/ic_back_white_android.png'), showWithText:false, show: 'always'}
];*/

let styles = StyleSheet.create({
  toolbar: {
    fontSize:10,
    color: 'black',
    backgroundColor: '#00a2ed',
    height: 50
  }
});
