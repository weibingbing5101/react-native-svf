import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform,Animated} from 'react-native';
import Touch from '../../../utils/Touch';
import {allCenter} from '../../../utils/Style';
import _ from 'lodash';
import { Select } from '../../Form';
import {
  MONEY_USD, 
  MONEY_EUR, 
  MONEY_GBP, 
  MONEY_FLAG, 
  MONEY_TEXT
} from '../../../config/currencyType';

const cardTypeImage = {
  visa: require('../image/visa.png'),
  master: require('../image/master.png'),
  shiti:require('../image/shiti_bg.png'),
  xuni: require('../image/xuni_bg.png'),
  shiti_g: require('../../Common/image/g.png'),
  xuni_g: require('../../Common/image/white_g.png'),
}

let marginTopSize = {marginTop:13};

if(Platform.OS === 'android'){
  marginTopSize = {marginTop:2};
}

const filterCardNo = (cardNo)=>{
  //cardNo.replace(/[^\d]/g, '*').replace(/.{4}/g, ($0)=>$0+' ')
  let hideNo = '**** **** **** '; 
  let lastNo = cardNo.match(/.{3,4}$/)[0];
  return (
    <View style={styles.cardText}>
      <Text style={styles.hideNoText}>{hideNo}</Text>
      <Text style={styles.cardNoText}>{lastNo}</Text>
    </View>
  );
}

export default class CardSnap extends Component {

  state = {
    defaultSelected:0
  }
  componentWillReceiveProps(nextProps){
    if (nextProps.card.userMaterialInfo) {
      this.setState({defaultSelected:nextProps.defaultSelected});
    }
  }

  componentDidMount(){ 
    // console.log(this.props.data);
  }

  renderSelected = (index) => {
    let typeObj = this.props.cardType[index];
    this.props.onChange(typeObj.value);
    return <Text>{typeObj.title}</Text>
  }
  _renderOption = (data, index) => {
  	return  (
      <View>
        <Text>{data.title}</Text>
      </View>
    )
  }


  render(){
    let {type, style, onPress,data} = this.props;

    let cardtype = data.cardtype===0?'shiti':'xuni';
    let text = data.cardtype===0?'实体卡':'虚拟卡';
    let color = data.cardtype===0?'#a994b5':'#9cd1fd';
    let backgroundColor = data.cardtype===0?'#a532e5':'#2acdde';
    let flag = MONEY_FLAG[data.currency]||'';
        
    let textContent = (
      <View style={[styles.cardNo]}>
        <View style={{flexDirection:'row'}}>
        <Text style={[styles.gplusCardText,{color:color}]}></Text>
        <View style={{backgroundColor:backgroundColor,borderRadius:3,height:18,width:45,marginTop : 15,marginLeft: 5,alignItems:'center',justifyContent: 'center',}}>
          <Text style={[styles.cardTypeText,{}]}>{text}</Text>
        </View>
        </View>
        { filterCardNo(data.cardNo) }
        <View style={{flexDirection:'row',backgroundColor:'transparent',marginTop:12,marginLeft:20}}>
          
          <View style={{flexDirection:'row'}}>
            <Text style={{color:color,fontSize:12,height:30, lineHeight:30}}>卡余额 </Text>
            <Text style={{color:'white',fontSize:12,height:30, lineHeight:30}}>{flag+ ' '+data.balance}</Text>
            <Text style={{color:'white',fontSize:12,height:30,lineHeight:30,marginLeft:5}} 
              onPress={ ()=>{this.props.goPage('card_detail',{curID: data.id})}}
            >
              卡详情查看
            </Text>
          </View>



        </View>
        <View style={[{flexDirection:'row',backgroundColor:'transparent'},marginTopSize]}>
          <Text style={{width:145,height:43,marginLeft:5,fontSize:14,color:'white',textAlign:'center',marginTop:20, justifyContent: 'center'}} 
              onPress={()=>{ this.props.goPage('card_transfer',{curCardNo: data.cardNo}) }}
            >转出</Text>
          <Text style={{width:145,height:43,fontSize:14,color:'white',textAlign:'center',marginTop:20,justifyContent: 'center'}} 
            onPress={()=>this.props.goPage('bill',{curCardNo: data.cardNo})}>进入账单</Text>
        </View>
      </View>
    );

    return (
      <Image {...this.props}
        style={[styles.size, style]}
        source={cardTypeImage[cardtype]}>
          <View style={styles.size}>
            {textContent}
          </View>
      </Image>
    )
  }

}

const styles = StyleSheet.create({
  size: {
    width:311,   //300
    height:207,  //184 
    position: 'relative',
    alignSelf:'center'
  },
  cardNo: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  cardText:{
    marginTop:21,
    marginLeft:10,
    flexDirection:'row'
  },
  cardNoText: {
    fontSize: 18,
    fontWeight:'bold',
    color: 'white',
    backgroundColor: 'transparent',
    letterSpacing:3,
  },
  hideNoText:  {
    fontSize: 20,
    fontWeight:'bold',
    color: 'white',
    height: 24,
    backgroundColor: 'transparent',
    marginLeft:10,
    letterSpacing:3,

  },
  gplusCardText: {
    backgroundColor:'transparent',
    marginTop:20,
    marginLeft:50,
    fontSize:12,
  },
  cardTypeText:{
    
    fontSize:12,
    color:'white',
    
    
  },
  storeText:{
    backgroundColor :'transparent',
    marginTop :22,
    marginLeft :69,
    fontSize:12,

  },
  cardTermText: {
    fontSize: 10,
    color: 'white',
    marginTop: 5,
    marginLeft:10,
    backgroundColor: 'transparent'
  }
});

/*
borderWidth:1, borderColor:'red'
// 进入账单 按钮左侧
<Text style={{width:145,height:43,marginLeft:5,fontSize:14,color:'white',textAlign:'center',paddingTop:12}} onPress={()=>{ this.props.goPage('card_transfer') }}>转账</Text>


98行代码 



          <View style={{position:'absolute',right:7,alignItems:'flex-end'}}>
            <View style={{flexDirection:'row',justifyContent:'center'}}>
              <Text style={{color:color,fontSize:12,marginBottom:5}}>剩余GOP</Text>
              <Image style={{width:10,height:16,marginTop:2}} source={cardTypeImage[cardType+'_g']} />
              <Text style={{color:'white',fontSize:16,marginLeft:5}}>{data.gopNum}</Text>  
            </View>
          </View>



*/















