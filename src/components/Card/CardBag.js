import React, {Component} from 'react';
import {StyleSheet,Platform,Dimensions,View } from 'react-native';

import Carousel from '../Carousel';

import CustomBackTitle from '../CustomBackTitle';

const width = Dimensions.get('window').width;

// if(Platform.OS === 'android'){
// }

export default class CardBag extends Component {

  state = {
    
  }

  componentDidMount(){
    let props = this.props;
  }

  render(){
    return (
        <View style={{flex:1}}>
          <CustomBackTitle title="我的卡包" left={-width/2+30} {...this.props}/> 
          <Carousel style={styles.carouselBg} {...this.props} />
        </View>
    );
  }

}

const styles = StyleSheet.create({
  carouselBg:{
    marginTop:20,
    flex:1,
  }
});
