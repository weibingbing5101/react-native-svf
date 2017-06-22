import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform} from 'react-native';
import _ from 'lodash';
import { Select } from '../../Form';

export default class CardCity extends Component {

  renderSelected = (index) => {
    return <Text>{this.props.cityType[index].title}</Text>
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
    	label="城市" 
    	placeholder="选择城市"
    	dataSource={ this.props.cityType }
    	renderSelected={ this.renderSelected } 
    	renderOption={this._renderOption}/>
  }

}

CardCity.defaultProps = {
  cityType: [
    {key: 'beijing', title: '北京'},
    {key: 'nanjing', title: '南京'},
    {key: 'London', title: '伦敦'}
  ]
}