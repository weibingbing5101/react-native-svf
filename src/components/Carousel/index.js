import React, { Component } from 'react';
import {
  Animated,
  Text,
  StyleSheet,
  Image,
  View,
  Dimensions,
  ScrollView
} from 'react-native';
import Carousel from 'gn-react-native-carousel-control';
import Touch from '../../utils/Touch';
import {CardSnap} from '../Card';

const { width, height } = Dimensions.get('window');

export default class CarouselExample extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){  
  }

  //  获取 每个卡
  _getItems = () => {
    let baseInfo = this.props.card.baseInfo||[];
    return baseInfo.map(function(item, index){
      return (
        <CardSnap {...this.props}
          data={item}
          key={index}
        />  // 卡详情查看 点击事件
      )
    }.bind(this));
  }

  render() {
    return (
      <ScrollView style={{flex: 1}}>      
          {this._getItems()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  size: {
    width:311, 
    height:207,
    position: 'relative',
  }
});