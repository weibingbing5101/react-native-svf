import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform} from 'react-native';
import _ from 'lodash';
import { colCenter } from '../../utils/Style';
import Item from './Item';

const icons = {
  warn: require('../Common/image/ic_warn.png'),
  success: require('../Common/image/ic_success.png'),
  process: require('../Common/image/ic_process.png'),
  "error": require('../Common/image/ic_error.png'),
}

export default class StatusTip extends Component {

  render() {
    let props = this.props;
    let propsStyles = props.styles||{};
    return (
      <View style={[ styles.wrap, propsStyles.wrap ]}>
        <View style={ {alignItems: 'center',justifyContent: 'center'}}>
          <Image style={ [styles.icon, propsStyles.icon]} 
            source={ icons[this.props.type||'success']} />
          <Text style={ [styles.text, {color:props.theme.colors.mainColor}, propsStyles.text] }>{props.children}</Text>
        </View>
        { props.renderExtra ? (
        <View style={{marginLeft:10}}>
          {props.renderExtra&&props.renderExtra()}
        </View>
        ) : false }
        
      </View>
      
    );
  }

}

const styles = StyleSheet.create({
  wrap: {
    // flex:1,
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom:0,
    backgroundColor: 'white',

  },
  icon: {
    width: 30, 
    height: 30,
    marginBottom: 20,
  },
  text: {
    fontSize: 14
  }
  
})

