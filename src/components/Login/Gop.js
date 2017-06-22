import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform,Dimensions,AsyncStorage} from 'react-native';
import _ from 'lodash';
import {allCenter, leftCenter} from '../../utils/Style';
import gop from '../../utils/Gop';

const WIN_WIDTH = Dimensions.get('window').width;
const WIN_HEIGHT = Dimensions.get('window').height;

export default class LoginGop extends Component {

	componentDidMount(){
    let props = this.props;
    props.userHasSignContract();
  }

	render(){
		return (
			<View style={{flex:1}}>
        <Image style={[allCenter, { width: null, height: null}]} source={require('../Splash/image/bg.png')}>
        	<Text style={{backgroundColor: 'transparent', color: 'white', fontSize: 18}}>数据加载中...</Text>
        </Image>
      </View>
    )
	}
}