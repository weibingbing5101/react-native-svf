import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image
} from 'react-native';
import Alert from '../../Alert';
import Touch from '../../../utils/Touch';
import {Grid,Col,Row} from 'react-native-easy-grid';
import gop from '../../../utils/Gop';


const linkImages = {
  bill: require('../image/ic_bill.png'),
  charge: require('../image/ic_charge.png'),
  user: require('../image/ziliao.png'),
  card_process: require('../image/kaika.png'),
  help: require('../image/bangzhu.png')
}

const winWidth = Dimensions.get('window').width;
const winHeight = Dimensions.get('window').height;

export default class HomePageLink extends Component {

  _goPage=(path)=>{
    let {card} = this.props;
    let hasCard = card.baseInfo&&card.baseInfo.length;
    if(hasCard||path==='user' || path==='card_process' || path==='help'){
      if (path=='charge' && (card.curCardInfo.status==1 || card.curCardInfo.status==6)) { //1表示未激活，6表示挂起
        Alert('挂起/未激活 状态卡不允许充值');
      }else{
        this.props.goPage(path);
      }
    }else{
      Alert('您当前没有卡', '请先申请');
    }
    
  }

  _getPageLink = (page, index) => {
    
    return (
      <Col style={ styles.pageLinkItems2 } key={index} >
        <Touch  onPress={ () => this._goPage(page.path) }>
          <View style={ styles.pageLinkItems }>
            <Image style={styles.pageLinkImage} source={linkImages[page.path]} />
            <Text style={ styles.pageLinkTitle } numberOfLines={1}>{page.title}</Text>
          </View>
        </Touch>
      </Col>
    )
  }

  render = () => {
    // let pages = gop.isGop?this.props.pagesInfoGRB:this.props.pagesInfo;
    let pages = this.props.pagesInfoGRB;
    let cols = pages.map( function(page, index){
      return this._getPageLink(page, index)
    }.bind(this) )
    return (
      <View style={{backgroundColor:'white',alignItems: 'center',marginTop:9}}>
        <Text style={{fontSize:14,paddingTop:21}}>GoFIN专享</Text>

        <View style={styles.pageLinkWrap}>
          <Touch  onPress={ () => this._goPage('card_bag') }>
            <View style={ styles.pageLinkItems }>
              <Image style={[styles.pageLinkImage,{width:24,height:18}]} source={linkImages['card_process']} />
              <Text style={ styles.pageLinkTitle } numberOfLines={1}>我的卡包</Text>
            </View>
          </Touch>
          <Touch  onPress={ () => this._goPage('card_process') }>
            <View style={ [styles.pageLinkItems,] }>
              <Image style={[styles.pageLinkImage,{width:24,height:18}]} source={linkImages['card_process']} />
              <Text style={ styles.pageLinkTitle } numberOfLines={1}>卡申请进度</Text>
            </View>
          </Touch>
          <Touch  onPress={ () => this._goPage('user') }>
            <View style={ [styles.pageLinkItems,] }>
              <Image style={[styles.pageLinkImage,{width:24,height:18}]} source={linkImages['user']} />
              <Text style={ styles.pageLinkTitle } numberOfLines={1}>个人账户</Text>
            </View>
          </Touch>
          <Touch  onPress={ () => this._goPage('security_center') }>
            <View style={ [styles.pageLinkItems] }>
              <Image style={[styles.pageLinkImage,{width:20,height:20}]} source={linkImages['help']} />
              <Text style={ styles.pageLinkTitle } numberOfLines={1}>安全中心</Text>
            </View>
          </Touch>
        </View>
      </View>
    )
  }
}

HomePageLink.defaultProps = {
  pagesInfoGRB: [{
    title: '我的卡包',
    path: 'card_bag'
  },{
    title: '卡申请进度',
    path: 'card_process'
  },{
    title: '个人账户',
    path: 'user'
  },{
    title: '安全中心',
    path: 'help'
  }],
}

const styles = StyleSheet.create({
  pageLinkWrap: {
    height: 50,
    marginTop: 34,
    marginBottom:32,
    flexDirection: 'row',
    borderRadius:5,
    backgroundColor:'white',
    width:winWidth-88,
    justifyContent:'space-between',
    alignItems:'center',
  },
  pageLinkItems2: {
    flex:1,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pageLinkItems: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pageLinkTitle: {
    marginTop: 10,
    color: '#000000',
    fontSize: 14,
    textAlign: 'center'
  },
  pageLinkImage: {
    width: (winWidth-42)/8,
    height: (winWidth-42)/8,
    resizeMode: 'contain'
  }
})


