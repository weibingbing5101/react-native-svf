import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform} from 'react-native';
import _ from 'lodash';
import { Select } from '../../Form';

export default class CardCountry extends Component {

  state = {
    defaultSelected:0,
    countryList:[]
  }
  componentWillReceiveProps(nextProps){
    if (nextProps.defaultSelected) {
      let i=0;
      if (this.props.card.countryList) {
        for (; i < this.props.card.countryList.length; i++) {
          if(this.props.card.countryList[i].iosCode==nextProps.defaultSelected) 
          {
            break;
          }
          if(this.props.card.countryList[i].englishName==nextProps.defaultSelected) 
          {
            break;
          }
          if (this.props.card.countryList[i].name ==nextProps.defaultSelected) {
            break;
          }
        }
        this.setState({defaultSelected:i,countryList:this.props.card.countryList});
      }
    }else{
      if (this.props.card.countryList) {
        this.setState({defaultSelected:0,countryList:this.props.card.countryList});
      }
    }

  }

  renderSelected = (index) => {
    let typeObj = (this.state.countryList && this.state.countryList[index]);
    if (typeObj) {
      this.props.onChange(typeObj.iosCode);
    }
    return <Text style={{color:'#9b9b9b'}}>{typeObj&&typeObj.name}</Text>
  }

  _renderOption = (data, index) => {
  	return  (
      <View>
        <Text>{data.name}</Text>
      </View>
    )
  }

  render(){
    return <Select 
    	{...this.props} 
    	label="所在国家" 
      leftSize={85}
    	placeholder="选择国家"
      defaultSelected = {this.state.defaultSelected}
    	dataSource={ this.props.card.countryList||[] }
    	renderSelected={ this.renderSelected } 
    	renderOption={this._renderOption}/>
  }

}

CardCountry.defaultProps = {
  countryType: [
    {key: 'china', title: '中国'},
    {key: 'England', title: '英国'},
    {key: 'America', title: '美国'}
  ]
}
