import React, {Component} from 'react';
import {Text,WebView,View,ListView,Image,StyleSheet,Platform,Modal,TouchableOpacity} from 'react-native';
import { LabelArrow } from '../Layout';


export default class InfoInput extends Component {
	_renderLeft=()=>{
		return <Text>{this.props.label}</Text>
	}
	_renderRight=()=>{
		return <Text style={{color: this.props.theme.colors.primaryColor}}>{this.props.placeholder}</Text>
	}
	render(){
		return <LabelArrow {...this.props}
							renderLeft={this._renderLeft}
							renderRight={this._renderRight}
						/>
	}
}