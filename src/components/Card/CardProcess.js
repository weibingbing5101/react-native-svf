import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform,ListView,Dimensions,Alert} from 'react-native';
import {Input, Button,LabelInput,RowButton} from '../Form';
import {Grid,Row,Col} from 'react-native-easy-grid';
import CustomBackTitle from '../CustomBackTitle';
import Http from '../../utils/Http';
import Touch from '../../utils/Touch';
import Theme from '../../utils/Theme';
import {allCenter} from '../../utils/Style';
import CardProcessItem from './parts/CardProcessItem';
import Blank from '../Blank';

const width = Dimensions.get('window').width;
export default class CardProcess extends Component {

  constructor(props){
    super(props);
    this.listView = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    
  }

  componentDidMount(){
    let id = this.props.card.curCardInfo.id;
    this.props.cardMerterialSnapList();
  }

  _renderRow = row => {
    let name;
    let theme = new Theme(this.props.card.theme);
    if (row.subtitle) {
      return null;
    }
    
    let multipicShadow = null;
    if (row.multipic) multipicShadow = <View style={{marginTop:60,marginLeft:55,width:30,height:15,backgroundColor:'#000',opacity:0.5,justifyContent:'center'}}><Text style={{color:'white',fontSize:12,textAlign:'center'}}>多图</Text></View>;
    return(
      <Touch onPress={() => {this.props.cardMerterialSnapInfo({snapshotid:row.snapshotid}) }}>
        <View style={[{backgroundColor:theme.colors.listBg,borderColor:theme.colors.listBorder}]}>
          <CardProcessItem theme={theme} cardProcessInfo={row}></CardProcessItem>
        </View>
      </Touch>
    )
  };


  render() {
    let theme = new Theme(this.props.card.theme);
    let CardProcessInfo = this.props.card.cardMerterialSnapList;
    let list;
    if (CardProcessInfo&&CardProcessInfo.length) {
      this.listView = this.listView.cloneWithRows(JSON.parse(JSON.stringify(CardProcessInfo)));
      list = (
        <ListView
          dataSource={this.listView}
          renderRow={this._renderRow}
          style={{marginBottom:6,backgroundColor:theme.colors.background}}
        />
      )
    }else{
      list = <Blank {...this.props}>无卡申请进度信息</Blank>
    }
    return (
      <View style={{flex:1}}>
        <CustomBackTitle title="卡申请进度" left={-width/2+30} {...this.props}/> 
        {list}
      </View>
    );
  }

}
