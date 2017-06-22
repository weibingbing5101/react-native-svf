import React, {Component} from 'react';
import {Text,WebView,View,ListView,Image,StyleSheet,Platform,Modal,TouchableOpacity} from 'react-native';
import { LeftRightLabel } from '../Layout';


export default class InfoShow extends Component {
	_renderLeft=()=>{
		let color = this.props.leftStyle;
		return <Text style={[{color:'#d3d3d3'},color]}>{this.props.label}</Text>
	}
	_renderRight=()=>{
		let rightStyle = this.props.rightStyle || {};
		//详细地址长度是105个字符，最多可以显示3行
		let text = this.props.placeholder||' ';
		let text1;
		let text2;
		let text3;

		if (text && text.length && text.length>70) {
			text1=text.substr(0,35);
			text2=text.substr(35,35);
			text3=text.substr(70,text.length-70);
		}else if (text && text.length && text.length>35) {
			text1=text.substr(0,35);
			text2=text.substr(35,text.length-35);
		}else{
			text1=text;
		}

		if (text1) {
			text1=<Text style={[{marginRight:20},rightStyle]}>
					{text1}
				  </Text>;
		}
		if (text2) {
			text2= <Text style={{marginRight:20}}>
					{text2}
				   </Text>;
		}
		if (text3) {
			text3 = <Text style={{marginRight:20}}>
					 {text3}
				    </Text>;
		}

		return(
			<View>
				{text1}
				{text2}
				{text3}
			</View>);
	}
	render(){
		return <LeftRightLabel {...this.props}
							renderLeft={this._renderLeft}
							renderRight={this._renderRight}
						/>
	}
}