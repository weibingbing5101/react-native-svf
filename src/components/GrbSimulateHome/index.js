import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Text,
  Image,
  ListView,
  RefreshControl,
  Platform
} from 'react-native';
import SliderBar from '../SliderBar'
import DrawerLayout from 'react-native-drawer-layout';
import {Input, Button2,LabelInput,RowButton,Select} from '../Form';
import Carousel from '../Carousel';
import {Grid,Col,Row} from 'react-native-easy-grid';
import Touch from '../../utils/Touch';
import DateUtil from '../../utils/DateUtil';
import Theme from '../../utils/Theme';
import { allCenter } from '../../utils/Style';
import gop from '../../utils/Gop';



const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


export default class GrbSimulateHome extends Component {



  constructor(props) {
    super(props);
    

  }

  componentWillReceiveProps(nextProps){
      }

  componentDidMount(){
    
  }

 

  goPage=()=> {
    this.props.goPage('login_gop');
  }



  render() {

    let {card} = this.props;
    let theme = new Theme(card.theme);

    let hasCard = card.baseInfo&&card.baseInfo.length;

    return (
      <View style={{width: width, height: 660,alignItems: 'center',justifyContent: 'center'}}>
        <RowButton {...this.props}
          onPress={ this.goPage }
          
          >GPlusCard</RowButton>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  
  carouselBg:{
    marginTop:0,
    flex:1,
  }
});