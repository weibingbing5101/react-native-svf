import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform} from 'react-native';
import _ from 'lodash';
import { Select } from '../../Form';

export default class CardMail extends Component {

  // state = {
  //   defaultSelected:0
  // }
  constructor(props){
    super(props);
    this.state= {
      defaultSelected:props.defaultSelected,
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.defaultSelected) {
      this.setState({defaultSelected:nextProps.defaultSelected});
    }

    // if (nextProps.card.userMaterialInfo) {
    //   this.setState({defaultSelected:nextProps.defaultSelected});
    // }
  }

  renderSelected = (index) => {
    let typeObj = this.props.mailType[index];
    this.props.onChange(typeObj.value);
    return <Text style={{color:'#9b9b9b'}}>{typeObj.title}</Text>
  }
  _renderOption = (data, index) => {
  	return  (
      <View>
        <Text>{data.title}</Text>
      </View>
    )
  }

  render(){
    return <Select 
    	{...this.props} 
    	label="快递方式" 
      leftSize={85}
    	placeholder="选择邮递方式"
      defaultSelected = {this.state.defaultSelected}
    	dataSource={ this.props.mailType }
    	renderSelected={ this.renderSelected } 
    	renderOption={this._renderOption}/>
  }

}


CardMail.defaultProps = {
  mailType: [
    {key: 'surface', title: '平邮',value:0},
    {key: 'mail', title: '快递',value:1}
    
  ]
}