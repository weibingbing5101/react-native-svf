import React, {Component} from 'react';
import {Text,WebView,View,ListView,Image,StyleSheet,Platform,Modal,TouchableOpacity} from 'react-native';
import { LeftRightLabel } from '../../Layout';


export default class BillDetailItem extends Component {
	_renderLeft=()=>{
		return <Text style={{color: this.props.theme.colors.primaryColor}}>{this.props.label}</Text>
	}
	_renderRight=()=>{
		let image;
		if (this.props.imageG) {
			image = <Image style={{width:10,height:16,opacity:0.5}} source={require('../../Common/image/g.png')}/>
		}
		return <View style={{flexDirection:'row'}}>
						{image}
				 		<Text style={{color: this.props.theme.colors.primaryColor,marginRight:20,marginLeft:3}}>{this.props.placeholder}</Text>
				 	 </View>
	}
	render(){
		return <LeftRightLabel {...this.props}
							renderLeft={this._renderLeft}
							renderRight={this._renderRight}
						/>
	}
}