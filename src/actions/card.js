import Http from '../utils/Http';
import Toast from 'react-native-root-toast';
import {AsyncStorage} from 'react-native';
import Alert from '../components/Alert';
import _ from 'lodash';
import filterResponse from '../utils/Response';
import gop from '../utils/Gop';


export function fetchSplash() {
  return (dispatch,getState) => {

    let {routes} = getState();
    let i = routes.routes.length-1;


    // console.log(routes.routes);


    //Http.get('start-image/1080*1776').then(function (d) {
      d = {}
      d.img = {uri: ''};
      //展示1秒黑屏
      setTimeout(function () {
        dispatch({
          type: 'fetchSplash',
          splash: d
        });
      },1000);
      //停顿2秒后进入首页
      setTimeout(function () {

        AsyncStorage.getItem('gopPhone', function(err, phone){
            //info为格式[['token','234234'],['gopPhone','1333333']]
            gop.gopPhone=phone;

            // alert(routes.routes[i].key);

            let path = '';
            if(phone && routes.routes[i].key !='home'){  // 已经登陆
              dispatch({
                type: 'push',
                key:  'home'//'pass_word_step_one'   home
              });
            }

            if(!phone && routes.routes[i].key !='login'){ // 未登陆
              dispatch({
                type: 'push',
                key:  'login'
              });
            }

            // dispatch({
            //   type: 'push',
            //   key:  phone ? 'home' : 'login'
            // });

        });

        
      },3000)
 
  }
}


export function changeCardStatus(params) {
  let sendData = {
    id: params.id,
    operation: params.status // 要改变的状态
  }
  return (dispatch, getState) => {
    dispatch({
      type: 'beforeChangeCardStatus'
    }); 
    Http.post('trade/operation',sendData).then(function (result) {
      dispatch({
        type: 'afterChangeCardStatus'
      });
      if(result.errorCode==0){
        Alert('卡状态修改成功', '');
        dispatch({
          type: 'changeCardStatus',
          status: params.status,
          index: params.index
        }); 
      }

      filterResponse(result, dispatch, getState);
      

    })
  }
}

/**
 * 获取卡列表
 * @return {Object} 卡数组[card, card1, card2......]
 * @card.avalableAmount (integer, optional): 可用额度 ,
 * @card.balance (integer, optional): 卡余额 ,
 * @card.cardId (string, optional),
 * @card.cardNo (string, optional),
 * @card.cardType (integer, optional): 卡类型 1 实体卡 2 虚拟卡 ,
 * @card.cardTypeDesc (string, optional): 卡类型描述 ,
 * @card.channel (integer, optional): 开卡渠道 1 wave crest ,
 * @card.channelDesc (string, optional): 开卡渠道描述 ,
 * @card.currency (integer, optional): 卡币种 1 美元 2 欧元 3 英镑 ,
 * @card.currencyDesc (string, optional): 卡币种描述 ,
 * @card.frozenAmount (integer, optional): 冻结额度 ,
 * @card.signature (string, optional): 卡签名 ,
 * @card.status (integer, optional): 卡状态 1 未激活 2 激活 3 挂失 ,
 * @card.statusDesc (string, optional): 卡状态描述 ,
 * @card.term (string, optional): 卡有效期
 */
export function fetchCardBaseInfo(curCard) {
  let sendData = {
    pageSize: 100
  }
  return (dispatch, getState) => {

    // dispatch({
    //   type: 'beforeFetchCardBaseInfo'
    // }); 

    Http.post('trade/getCardList',sendData).then(function (result) {
      // console.log(result);
      // console.log('获取卡列表');
      filterResponse(result, dispatch, getState); 
      dispatch({
        type: 'fetchCardBaseInfo',
        baseInfo: result.data
      }); 
      // dispatch({
      //   type: 'afterFetchCardBaseInfo'
      // }); 

      let cardInfo = result.data;

      if(cardInfo.length){
        var curCardIndex = 0;

        if(curCard){
          let curCardId = curCard.id; 
          cardInfo.some(function(card, index){
            if(card.id===curCardId){
              curCardIndex=index;
              return true;
            }
            return false;
          })
        }


        let sendData = {
          id: cardInfo[curCardIndex].id
        }
        dispatch({
          type:'changeCurCardBefore',
          index:curCardIndex
        });

        Http.post('trade/queryCard',sendData).then(function (result) {
          // console.log('卡列表 里面 查询卡详情');
          // console.log(result);
          dispatch({
            type: 'changeCurCard',
            index: curCardIndex,
            cardDetail: result.data
          }); 

        })
        // console.log('fetchCardBaseInfo');
        // console.log(curCardIndex);
        // Http.post('grb/viewGopNumAndPrice',sendData).then(function (result) {
        //   if(result.code == 0){
        //     dispatch({
        //       type: 'grbViewGopNumAndPrice',
        //       index:curCardIndex,
        //       info: result.data
        //     });
        //   }

        //   filterResponse(result, dispatch, getState);


        // },function () {
        //   //Toast.show('请检查网络后重试');
        // })
      }


    })
  }
}

export function hasUpToDateVersion(params) {
  return (dispatch, getState) => {
    Http.post('user/hasUpToDateVersion',params).then(function (result) {
      // console.log(result);
      if(result.code==0){
        dispatch({
          type: 'hasUpToDateVersion',
          data: result.data,
        }); 
      }

      filterResponse(result, dispatch, getState);
      

    })
  }
}

export function resetSideBar() {
  return {
    type:'resetSideBar'
  }
}

export function switchTheme(theme) {
  return {
    type:'switchTheme',
    theme:theme
  }
}

export function setTitle(title) {
  return {
    type:'setTitle',
    title:title
  }
}

/**
 * 查询卡详情
 * @param  {Int} index 第几张卡
 * @param  {[type]} cardInfo 卡的基本信息
 * @return {Object}          卡详情
 * @return.avalableAmount (integer, optional): 可用额度 ,
 * @return.balance (integer, optional): 卡余额 ,
 * @return.cardId (string, optional),
 * @return.cardNo (string, optional),
 * @return.cardType (integer, optional): 卡类型 1 实体卡 2 虚拟卡 ,
 * @return.cardTypeDesc (string, optional): 卡类型描述 ,
 * @return.channel (integer, optional): 开卡渠道 1 wave crest ,
 * @return.channelDesc (string, optional): 开卡渠道描述 ,
 * @return.currency (integer, optional): 卡币种 1 美元 2 欧元 3 英镑 ,
 * @return.currencyDesc (string, optional): 卡币种描述 ,
 * @return.frozenAmount (integer, optional): 冻结额度 ,
 * @return.signature (string, optional): 卡签名 ,
 * @return.status (integer, optional): 卡状态 1 未激活 2 激活 3 挂失 ,
 * @return.statusDesc (string, optional): 卡状态描述 ,
 * @return.term (string, optional): 卡有效期
 */
export function changeCurCard(index, cardInfo) {
  let sendData = {
    cardId: cardInfo.cardId
  }
  return (dispatch, getState) => {
    dispatch({
      type:'changeCurCardBefore',
      index:index
    });
    Http.post('card/cardInfo',sendData).then(function (result) {
      dispatch({
        type: 'changeCurCard',
        index: index,
        cardDetail: result.data
      }); 
      filterResponse(result, dispatch, getState);
    })
    // Http.post('grb/viewGopNumAndPrice',sendData).then(function (result) {
    //   if(result.code == 0){
    //     dispatch({
    //       type: 'grbViewGopNumAndPrice',
    //       index: index,
    //       info: result.data
    //     });
    //   }
    //   filterResponse(result, dispatch, getState);
    // },function () {
    //   //Toast.show('请检查网络后重试');
    // })
    
  }
}

export function goPage(path, data) {

  return (dispatch,getState) => {
    let {routes} = getState();
    let i = routes.routes.length-1;
    if (routes.routes[i].key===path) {
      return;
    }
    dispatch({
      type: 'push',
      key: path,
      data: data
    })
  }
}

export function goBack(path, data) {
  return (dispatch,getState) => {
    let {routes} = getState();
    let i = routes.routes.length-1;
    if (routes.routes[i].key==='home') {
      return false;
    }
      dispatch({
        type: 'pop'
      });
  }
}

export function backToHome() {
  return (dispatch,getState) => {
    let {routes} = getState();
    for (var i = routes.routes.length-1; i >=0; i--) {
      if(routes.routes[i].key!='home'){
        dispatch({
          type: 'pop'
        });
      }else{
        break;
      }
    }
  }
}

export function backToPage(key) {
  return (dispatch,getState) => {
    let {routes} = getState();
    for (var i = routes.routes.length-1; i >=0; i--) {
      if(routes.routes[i].key!=key){
        dispatch({
          type: 'pop'
        });
      }else{
        break;
      }
    }
  }
}

export function backToHomeInChargeSuccess(){
  return (dispatch,getState) => {
    let {routes} = getState();
    for (var i = routes.routes.length-1; i >=0; i--) {
      if(routes.routes[i].key=='charge' || routes.routes[i].key=='web_cashier'|| routes.routes[i].key=='charge_success_online'){
        dispatch({
          type: 'pop'
        });
      }
    }
  }
}
export function backToCardProcessInCardRejectApply(){
  return (dispatch,getState) => {
    let {routes} = getState();
    for (var i = routes.routes.length-1; i >=0; i--) {
      if(routes.routes[i].key!='card_process'){
        dispatch({
          type: 'pop'
        });
      }else{
        break;
      }

    }
  }
}

/**
  卡申请资料提交
  @param
  @param."address": "string",
  @param."cardType": 0,
  @param."city": "string",
  @param."country": "string",
  @param."currency": 0,
  @param."firstName": "string",
  @param."lastName": "string",
  @param."phone": "string",
  @param."postCode": "string",
  @param."postType": 0,
  @param."signature": "string"
**/
export function cardMerterialSubmit(params){
  return (dispatch, getState) =>{
    Http.post('cardApply/submitCardMaterial',params).then(function(data){
      dispatch({
        type:'cardMerterialSubmit',
        merterialSubmitSuccess:data.errorCode==0
      });
      filterResponse(data, dispatch, getState);
    });
  }
}

export function cardMerterialReSubmit(params) {
  // console.log(params);
  return (dispatch, getState)=>{
    Http.post('cardApply/reSubmitCardMaterial',params).then(function(data) {
      // console.log(data);
      dispatch({
        type:'cardMerterialReSubmit',
        merterialSubmitSuccess:data.errorCode==0
      });
      filterResponse(data, dispatch, getState);
    });
  }
}

export function clearMerterialSubmitSuccess() {
  return dispatch=>{
    dispatch({
      type:'clearMerterialSubmitSuccess',
    });
  }
}

export function cardUserMaterial(params){
  return (dispatch, getState) =>{
    Http.post('card/userMaterial',params).then(function(data){
      // console.log(data);
      if (data.errorCode==0 && data.data) {
        dispatch({
          type:'cardUserMaterial',
          userMaterialInfo:data.data
        });
        // dispatch({
        //   type:'push',
        //   key:'card_apply'
        // });
      }

      filterResponse(data, dispatch, getState);
      
    });
  }
}

export function clearCardUserMaterial(){
  return dispatch =>{
    dispatch({
      type:'cardUserMaterial',
      userMaterialInfo:''
    });
  }
}
/*
export function getCountryList(){
  console.log(1111);
  return dispatch => {
    Http.post('user/pcountrys').then(function (result) {
      console.log(result);
      if(result.code==0){
        dispatch({
          type: 'getCountryList',
          data: result.data,
        }); 
      }
      
    })
  }
}*/

export function cardMerterialSnapList(params){
  // console.log(params);
  return (dispatch, getState) =>{
    Http.post('cardApply/merterialSnapList').then(function(data){
      // console.log(data);
      dispatch({
        type:'cardMerterialSnapList',
        cardMerterialSnapList:data.data
      });

      filterResponse(data, dispatch, getState);

    });
  }
}

export function cardMerterialSnapInfo(params){
  return dispatch =>{
    Http.post('cardApply/merterialSnapInfo',params).then(function(data){
      dispatch({
        type:'cardMerterialSnapInfo',
        cardMerterialSnapInfo:data.data
      });
      if (data.errorCode==0) {
        dispatch({
          type:'push',
          key:'card_process_detail'
        });
      }
    });
  }
}

export function clearCardMerterialSnapInfo(){
  return dispatch =>{
    dispatch({
      type:'cardMerterialSnapInfoAgain',
      cardMerterialSnapInfoAgain:''
    });
  }
}

/**
 *账单：充值
 */
export function tradeBillList(params){
  return (dispatch, getState) =>{
    Http.post('trade/billList',params).then(function(data){
      // console.log(data);
      if (data.code==0) {
        dispatch({
          type:'tradeBillList',
          tradeBillList:data.data
        });
      }

      filterResponse(data, dispatch, getState);

    });
  }
}

/**
 *账单：消费
 */
export function tradeBillListExtra(params){
  return (dispatch, getState) =>{
    dispatch({
      type:'beforeTradeBillListExtra'
    });
    Http.post('trade/getConsumeList',params).then(function(data){
      console.log(data);
      if (data.errorCode==0) {
        dispatch({
          type:'tradeBillListExtra',
          tradeBillListExtra:data.data
        });
      }

      filterResponse(data, dispatch, getState);

    });
  }
}

/**
 *账单：转账   在用
 */
export function tradeTransferList(params){
  return (dispatch,getState)=>{
    dispatch({
      type:'beforeTradeTransferList'
    });
    Http.post('trade/getCardTransferList',params).then(function(data){
      console.log(data);
      if (data.errorCode==0) {
        dispatch({
          type:'tradeTransferList',
          tradeTransferList:data.data
        });
      }
      filterResponse(data,dispatch,getState);
    });
  }
}

/**
 * [userLogin description]
 * @param 
 * @param.code (string, optional),
 * @param.loginType (integer, optional): 登录方式 1 手机 2 邮箱 ,
 * @param.phoneOrMail (string, optional): 用户名 loginType 1表示手机 2表示邮箱 ,
 * @param.pwd (string, optional),
 * @param.pwdLogin (boolean, optional)
 * @return {[type]}        [description]
 */
export function userLogin(params){


  return (dispatch, getState) => {

    dispatch({
      type: 'beforeUserLogin'
    });
    Http.post('user/login',params).then(function (result) {
      
      let data = result.data;
      if(result.errorCode == 0){
        gop.gopPhone = params.phone;
        AsyncStorage.setItem('gopPhone',params.telephone);
        // AsyncStorage.setItem('token', data.token, function(){
          dispatch({
            type: 'userLogin',
            isLogin: true,
            data: data
          }); 

          dispatch({
            type: 'push',
            key: 'home'
          });

        // });

      }
      filterResponse(result, dispatch, getState, ()=>{
        dispatch({
          type: 'userLogin',
          isLogin: false,
          message: result.msg
        }); 
        Alert(result.errorMsg)
      });
      
    }, function(){
      dispatch({
        type: 'userLogin',
        isLogin: false
      }); 
    })
  }
}


export function userSendCode(params){
  // console.log(params);
  return (dispatch, getState) => {
    Http.post('sms/sendVerificationCode',params).then(function (result) {
      // console.log(result);
      if(result.errorCode==0){
        dispatch({
          type: 'userSendCode',
          sendSuccess: true,
        }); 
      }

      filterResponse(result, dispatch, getState, ()=>{
        dispatch({
          type: 'userSendCode',
          sendSuccess: false,
        }); 
        Alert(result.errorMsg)
      });
      
    }, function () {
      dispatch({
        type: 'userSendCode',
        sendSuccess: false,
      }); 
    })
  }
}

export function clearUserCode(value) {
  return dispatch=>{
    dispatch({
      type:'clearUserCode',
      data:false
    });
  }
}

/**
 * 获取国家列表信息
 * @return {Array}        国家信息列表[country1, country2, country3....]
 * @country
 * @country.code (string, optional): 国家区号 ,
 * @country.englishName (string, optional): 英文名称 ,
 * @country.name (string, optional): 国家名称
}
 */
export function getCountryList(){

  return (dispatch, getState) => {
    Http.post('user/pcountrys').then(function (result) {
      if(result.code==0){
        dispatch({
          type: 'getCountryList',
          data: result.data,
        }); 
      }

      filterResponse(result, dispatch, getState);
      
    })
  }
}

export function getCardSecretInfo(cardIndex, cardInfo){
  let sendData = {
    cardId: cardInfo.cardId
  }
  return (dispatch, getState) => {
    Http.post('card/cardToken', sendData).then(function (result) {

      if(result.code==0){

        Http.pureRequest('v3/services/cards/carddatavalidate', 'get', null, 'wave', {
          'Accept': '*/*',
          'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6',
          'Connection': 'keep-alive',
          "Content-Type": "application/json",
          'corstoken': result.data,
          'Host': 'wcapi.wavecrest.in',     //qa
          'Origin': 'https://cross.wavecrest.gi',
          'Referer': 'https://cross.wavecrest.gi/tezt.html',
          // 'Host': 'api.wavecrest.gi',      //prod
          // 'Origin': 'https://api.gpluscard.com',
          // 'Referer': 'https://api.gpluscard.com/getPin.html',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36'
        }).then(function(result){
          if(result.errorDetails&&result.errorDetails[0]&&result.errorDetails[0].errorCode==0){
            let data = {};
            ['pin', 'cvv', 'expiryDate', 'pan'].forEach(function(key){
              if(result[key]){
                data[key] = result[key];
              }
            });
            
            dispatch({
              type: 'getCardSecretInfo',
              index: cardIndex,
              data: data
            }); 
          }
          
        });

        
      }
   
    })
  }
}

// 卡 ==> 账户  转账
export function card2Account(params){
  return (dispatch,getState)=>{
    Http.post('trade/transferCard2Account',params).then(function(data){
      // console.log(data);
      if (data.errorCode==0) {
        dispatch({
          type:'card2Account',
          data:data.data
        });
        dispatch({
          type:'verifyPayPwdErr',
          data:''
        });
      }else{
        dispatch({
          type:'verifyPayPwdErr',
          data:data.errorMsg
        });
      }
    });
  }
}

// 取消 清除键盘密码
export function cancelClearPassword() {
  return dispatch=>{
    dispatch({
      type:'cancelClearPassword',
      data:'true',
    });
  }
}
// 转账成功后 清除 成功标记  防止错位
export function clearCard2Account(){
  return (dispatch,getState) =>{
    dispatch({
      type:'clearCard2Account'
    });
  }
}




















