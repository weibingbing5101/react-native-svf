import React, { Component } from 'react';
import { View, WebView,Text,Dimensions } from 'react-native';
import CustomBackTitle from '../CustomBackTitle';

const winHeight = Dimensions.get('window').height;
const topHeight = 75;

export default class WebCashier extends Component {
	constructor(props){
		super(props);
		if (props.card.orderInfo && props.card.orderInfo.redirectUrl) {
			let h5Url = props.card.orderInfo.redirectUrl;
			// this.h5Url = h5Url.replace(/home_login/,'is_pay_enough');
			this.h5Url = {uri:h5Url};
		}
	}
	componentDidMount(){
		this.props.clearPayOrderId();
	}
  render() {
    return (
    	<View>
	    	<CustomBackTitle title="果仁充值" left={-270} {...this.props} />
	      <WebView
	        source={ this.h5Url }
	        style={{ height : winHeight - topHeight }}
	        renderLoading ={ ()=>{ return <Text>页面加载中</Text> }}
	      />
      </View>
    );
  }
}