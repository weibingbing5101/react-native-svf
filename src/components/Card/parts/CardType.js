import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform} from 'react-native';
import _ from 'lodash';
import { Select } from '../../Form';

export default class CardType extends Component {

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
    let typeObj = this.props.cardType[index];
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
    	label="卡类型" 
    	placeholder="选择卡类型"
      defaultSelected = {this.state.defaultSelected}
    	dataSource={ this.props.cardType }
    	renderSelected={ this.renderSelected } 
    	renderOption={this._renderOption}/>
  }

}

CardType.defaultProps = {
  cardType: [
    {key:'entity', title: '实体卡',value:0},
    {key: 'fictitious', title: '虚拟卡',value:1}
  ]
}
