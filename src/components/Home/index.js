import React, {Component} from 'react';
import HomeNav from './HomeNav';
import PageLink from './Parts/PageLink';
import ApplyItem from './Parts/ApplyItem';
import ApplyItemExt from './Parts/ApplyItemExt';
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Text,
  Image,
  ListView,
  RefreshControl,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import SliderBar from '../SliderBar'
import DrawerLayout from 'react-native-drawer-layout';
import Carousel from '../Carousel';
import { CardStatus,CardCurrent } from '../Card';
import {Grid,Col,Row} from 'react-native-easy-grid';
import Touch from '../../utils/Touch';
import DateUtil from '../../utils/DateUtil';
import Theme from '../../utils/Theme';
import { allCenter } from '../../utils/Style';
import GopBalance from '../Gop/GopBalance';
import GopCurrentValueExt from '../Gop/GopCurrentValueExt';
import GopAddress from '../Gop/GopAddress';
import gop from '../../utils/Gop';




const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const linkImages = {
  bill: require('./image/ic_bill.png'),
  charge: require('./image/ic_charge.png'),
  user: require('./image/ic_user.png'),
  card_process: require('./image/ic_card_detail.png')
}


export default class Home extends Component {

  pos = [];
  //now = null;

  constructor(props) {
    super(props);
    // props.fetchLatestArticles();
    // props.fetchThemeDailyList();
    this.state = {
      textPoint:'.'
    }
    this._setTimer();
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
   /* let now = props.card.latest.date;
    this.now = new Date(now.substring(0,4)+'/'+now.substring(4,6)+'/'+now.substring(6,8));*/
  }

  componentWillReceiveProps(nextProps){
    //console.log(nextProps)
    /*if(nextProps.logTimeout){
      nextProps.userLogout();
    }*/
  }

  componentDidMount(){
    let props = this.props;
    props.fetchCardBaseInfo();
    props.queryAccount();
    props.getUserBase(); // 获取用户信息
    // props.hasUpToDateVersion({version:this.props.card&& this.props.card.splash&&this.props.card.splash.text});
    // props.grbViewGopNumAndPrice({
    //   phone:gop.gopPhone,
    // });
  }

  closeDrawer = () => {
    this._drawer.closeDrawer();
  };

  openDrawer = () => {
    this._drawer.openDrawer();
  };

  goPage(path) {
    this.props.goPage(path);
  }

  _setTimer=()=>{
    this.interval=setInterval(()=> {
      let point = this.state.textPoint;
      if (point.length>=3) {
        point = '.';
      }else{
        point +='.';
      }
      this.setState({
        textPoint: point
      });
    },300);
  }


  render() {

    let {card} = this.props;
    let theme = new Theme(card.theme);

    let hasCard = card.baseInfo&&card.baseInfo.length;
    let queryAccount = this.props.user.queryAccount;
    let barStyle = 'dark-content';
    if (card.baseInfo) {
      clearInterval(this.interval);
      this.interval = null;
    }
    return (card.baseInfo?
      <View style={{flex:1,width: width, height: 720}}>
        <View style={{backgroundColor:'white'}}>
        <StatusBar 
          barStyle={barStyle}/>
        <HomeNav openDrawer={this.openDrawer} closeDrawer={this.closeDrawer} {...this.props}/>
        </View>
        <GopCurrentValueExt {...this.props} theme={theme} />
        <View style={{alignItems:'center',height:150,backgroundColor:'white'}}>
          <Text style={{padding:20,fontWeight:'bold'}}>{queryAccount&&queryAccount.totalAmount}</Text>
          <Text style={{color:'#999'}}>总资产（港元）</Text>
          <Text style={{color:'#999',position:'absolute',bottom:70,right:20}} onPress={()=>this.props.goPage('account_bill')}>查看账单></Text>
          <View style={{flexDirection:'row',alignItems:'center',height:50,marginTop:20,borderTopWidth:1,borderTopColor:'#ececec',width:width,padding:15,paddingLeft:width/6}}>
            <Text style={{width:width/3,textAlign:'center',}} onPress={()=>this.props.goPage('charge')}>充值</Text>
            <View style={{borderRightWidth:1,borderRightColor:'black',height:30}}></View>
            <Text style={{width:width/3,textAlign:'center'}} onPress={()=>this.props.goPage('account_transfer')}>转账</Text>
          </View>
        </View>
        <ScrollView>
          <View style={{backgroundColor:'white',marginTop:9,marginBottom:-9,borderBottomWidth:1,borderBottomColor:'#ececec',height:135}}>
            <Text style={{alignSelf:'center',marginTop:21,marginBottom:31,fontSize:14}}>我要办卡</Text>
            <Touch style={{alignSelf:'center'}} onPress={()=>this.props.goPage('card_apply','entity')}>
              <ApplyItemExt
                type ="entity"/>
            </Touch>
          </View>
          <PageLink {...this.props} />
        </ScrollView>
      </View>
      :<View style={{backgroundColor:'white',width:width,height:height,justifyContent:'center',paddingLeft:150}}>
        <Text style={{fontSize:16}}>数据加载中{this.state.textPoint}</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  cardBg: {
    // flex: 1,
    // position:'absolute',
    // top:0,
    // left:0,
    marginTop:0,
    paddingTop:0,
    width: null,
    height: 332,
    alignSelf: 'stretch'
  },
  shadow: {
    opacity:0.5,
    backgroundColor:'#000',
    top:25,
    left:0,
    width,
    height,
    position:'absolute'
  },
  subTitle:{
    margin:12,
    color:'#1E1E1F'
  },
  subMoneyType:{
    margin:12,
    color:'#000000',
    fontSize: 20
  },
  subTitleWrap: {
    width: 85
  },
  subLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#C8C9CC',
    marginRight: 6
  },
  normalWrap: {
    paddingTop: 0,
    paddingBottom:10,
    backgroundColor:'white',
  },
  subWrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  article:{
    height:100,
    marginBottom:0,
    padding:15,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'white',
    borderRadius:5,
    borderColor:'#e3e3e3',
    borderTopWidth:1,
    borderBottomWidth:2,
    flexDirection:'row'
  },
  normalText: {
    color:'#C8C9CC'
  },
  primayText: {
    color:'#92E117',
    fontSize: 18
  },
  strongText: {
    color:'#E14617',
    fontSize: 18
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  carouselBg:{
    marginTop:0,
    flex:1,
  }
});