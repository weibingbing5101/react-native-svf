import Http from '../utils/Http';
import gop from '../utils/Gop';
import filterResponse from '../utils/Response';
import Toast from 'react-native-root-toast';
import Alert from '../components/Alert';
import {AsyncStorage} from 'react-native';
import _ from 'lodash';

// 修改支付密码  
export function setPayPwd() {
  return (dispatch, getState) => {
    Http.post('user/setPayPwd').then(function (result) {

      if(result.errorCode == 0){
        dispatch({
          type: 'setPayPwd',
          setPayPwdData: result.data
        });
      }

      filterResponse(result, dispatch, getState);


    },function () {
      //Toast.show('请检查网络后重试');
    })
  }
}

export function queryAccount(params) {
  return (dispatch, getState) => {
    // console.log(params);
    Http.post('account/queryAccount').then(function (result) {
      // console.log(result);
      if(result.errorCode == 0){
        dispatch({
          type: 'queryAccount',
          queryAccount: result.data
        });
      }
      filterResponse(result, dispatch, getState);
    })
  }
}


// ==============================================================================================

/**
 * 获取用户基本信息
 * @return {Object} 用户基本信息
 * @return.address (string, optional),
 * @return.city (string, optional),
 * @return.country (string, optional),
 * @return.cretNo (string, optional): 证件号 ,
 * @return.cretType (integer, optional): 证件类型 1 身份证 2 护照 3 驾驶证 4 军官证 ,
 * @return.fax (string, optional),
 * @return.gender (integer, optional): 性别 1 男 2 女 ,
 * @return.headPic (string, optional),
 * @return.lastLoginTime (string, optional): 最近登录时间 ,
 * @return.openToken (string, optional): 三方token 比如果仁宝的token ,
 * @return.phone (string, optional),
 * @return.postCode (string, optional),
 * @return.privince (string, optional),
 * @return.realName (string, optional),
 * @return.token (string, optional): 系统token ,
 * @return.userSource (integer, optional)
 */
 // 'user/uBasic' 老接口
export function getUserBase() {
  return (dispatch, getState) => {
    Http.post('user/query').then(function (result) {
      // console.log('user_actions');
      // console.log(result.data.userBase);
      if(result.errorCode == 0){
        dispatch({
          type: 'getUserBase',
          baseInfo: result.data.userBase
        });
      }

      filterResponse(result, dispatch, getState);


    },function () {
      //Toast.show('请检查网络后重试');
    })
  }
}

/**
 * 果仁宝账号登陆
 * @param  {Object} params 登录信息
 * @params.token  第三方token
 * @params.type 第三方类别 1 GRB 2 weixin 3 qq 4 微博 5 其他 ,
 * @return {Object}        登录结果
 */
export function userLoginByGop(params){
    return (dispatch, getState) => {
        // console.log(gop.goptoken);
        let sendData = _.extend(params,{type:1,token:gop.goptoken});
        // console.log(sendData);
        Http.post('user/tplogin', sendData).then(function (result) {
          // console.log(result);
          if(result.errorCode == 0){
            // console.log(result);
            let data = result.data;
            AsyncStorage.setItem('token', data.token, function(){
              dispatch({
                type: 'userLogin',
                isLogin: true,
                data: data
              }); 

              dispatch({
                type:'push',
                key:'home'
              });

              // dispatch({
              //   type: 'fetchSplash',
              //   splash: {}
              // });
              
              
            });

          }

          filterResponse(result, dispatch, getState, ()=>{
            //Alert('用户登录', '登录失败')
            dispatch({
              type: 'userLogin',
              isLogin: false,
              message: result.msg
            }); 
          });

        },function () {
         // Toast.show('请检查网络后重试');
        })
    }
}

export function showInfo() {
  // body...
  // console.log(1111111111111);
}

export function userLogout(){
  return (dispatch,getState) => {
    AsyncStorage.removeItem('gopPhone');
    AsyncStorage.removeItem('token', function(){
      dispatch({
        type: 'userLogout'
      }); 
      let {routes} = getState();
      for (var i = routes.routes.length-1; i >=1; i--) {
        // if(routes.routes[i].key!='login'){
          dispatch({
            type: 'pop'
          });
        // }
      }
      // if (routes.routes.length==1) {
        dispatch({
          type:'clearUserCode',
          data:'true'
        });
        dispatch({
          type: 'push',
          key: 'login'
        });
        
      // }
      // 
      
      Http.get('logout', ()=>{});

    });
  }
}

/**
 * 果仁宝账户退出登录
 */
export function grbUserLogout(){
  return (dispatch,getState) => {
    AsyncStorage.removeItem('token', function(){
      dispatch({
        type: 'userLogout'
      }); 
      let {routes} = getState();
      for (var i = routes.routes.length-1; i >=1; i--) {
          dispatch({
            type: 'pop'
          });
      }
      dispatch({
        type:'clearGrbSimulateSendCode',
        data:'true'
      });
      AsyncStorage.multiRemove(['gopToken','gopPhone'],function(){
        dispatch({
          type: 'push',
          key: 'grb_login'
        });
      });
      Http.get('logout', ()=>{});

    });
  }
}

// 更新用户信息   /user/update    uBasicUpdate
export function userBasicUpdate(params, keepPage = false, callBack){
  return (dispatch, getState) => {
    Http.post('user/update', params).then(function (result) {
      if(result.errorCode == 0){
        dispatch({
          type: 'userBasicUpdate',
          newUserInfo: params
        });

        if(callBack){
          callBack(dispatch);
        }else{
          Alert('修改成功',null, ()=>{
            if(!keepPage){                    // 不传 或 false 返回上一页  默认
              dispatch({
                type: 'pop',
              });
            }
          });
        }
      }

      filterResponse(result, dispatch, getState);
      

    },function () {
      //Toast.show('请检查网络后重试');
    })
  }
}

export function goPage(path, data) {
  return dispatch => {
    dispatch({
      type: 'push',
      key: path,
      data: data
    })
  }
}

/**
 * 查看用户是否签约
 */
export function userHasSignContract() {
  let params = {
    phone:gop.gopPhone
  }
  return (dispatch, getState) => {
    Http.post('user/userHasSignContract',params).then(function (result) {
      // console.log(result);
      if(result.errorCode == 0){
        dispatch({
          type:'fetchSplash',
          splash: {}
        });
        if (result.data) {
          // userLoginByGop({phone:gop.gopPhone});
          let sendData = {
            type:1,
            phone:gop.gopPhone,
            token:gop.goptoken,
          };
          Http.post('user/tplogin', sendData).then(function (result) {
            // console.log(result);
            if(result.errorCode == 0){
              // console.log(result);
              let data = result.data;
              AsyncStorage.setItem('token', data.token, function(){
                dispatch({
                  type: 'userLogin',
                  isLogin: true,
                  data: data
                }); 

                dispatch({
                  type:'push',
                  key:'home'
                });
              });

            }

            filterResponse(result, dispatch, getState, ()=>{
              //Alert('用户登录', '登录失败')
              dispatch({
                type: 'userLogin',
                isLogin: false,
                message: result.msg
              }); 
            });

          },function () {
           // Toast.show('请检查网络后重试');
          })
        }else{
          dispatch({
            type: 'push',
            key: 'sign_withhold_protocol'
          });
        }
        
      }

      filterResponse(result, dispatch, getState);


    },function () {
      //Toast.show('请检查网络后重试');
    })
  }
}









export function grbSimulateSendCode(params){
  // console.log(params);
  return (dispatch, getState) => {
    Http.post('grb/sendLoginCode',params).then(function (result) {
      // console.log(result);
      gop.gopPhone = params.phone;
      if(result.errorCode===0 && result.data){
        dispatch({
          type: 'grbSimulateSendCode',
          sendSuccess: true,
        }); 
      }

      filterResponse(result, dispatch, getState, ()=>{
        dispatch({
          type: 'grbSimulateSendCode',
          sendSuccess: false,
        });
        Alert(result.msg);
      });
      
    }, function () {
      dispatch({
        type: 'grbSimulateSendCode',
        sendSuccess: false,
      }); 
    })
  }
}

export function clearGrbSimulateSendCode(value) {
  return dispatch=>{
    dispatch({
      type:'clearGrbSimulateSendCode',
      data:false
    });
  }
}

export function grbSimulateVerifyCode(params){
  // console.log(params);
  return (dispatch, getState) => {
    Http.post('grb/verifyLoginCode',params).then(function (result) {
      // console.log(result);
      gop.gopPhone = params.phone;
      if(result.errorCode==0 && result.data){
        dispatch({
          type: 'grbSimulateVerifyCode',
          isVerifyCodeSuccess: true,
        }); 
      }

      filterResponse(result, dispatch, getState, ()=>{
        dispatch({
          type: 'grbSimulateVerifyCode',
          isVerifyCodeSuccess: false,
        });
        Alert(result.msg);
      });
      
    }, function () {
      dispatch({
        type: 'grbSimulateVerifyCode',
        isVerifyCodeSuccess: false,
      }); 
    })
  }
}

export function grbSimulateUserLogin(params){

  // console.log(params);
  return (dispatch, getState) => {
    
    Http.post('grb/goopalLogin',params).then(function (result) {
      
      let data = result.data;
      // console.log(result);
      dispatch({
        type:'grbSimulateVerifyCode',
        isVerifyCodeSuccess:false,
      });
      if(result.errorCode == 0){
        gop.setToken(data.gopToken);
        gop.goptoken = data.gopToken;
        gop.setGop();
        AsyncStorage.setItem('gopToken',data.gopToken);
        AsyncStorage.setItem('gopPhone',params.phone);
        dispatch({
          type: 'push',
          key: 'login_gop'
        });
      }
      filterResponse(result, dispatch, getState, ()=>{
        dispatch({
          type: 'grbSimulateUserLogin',
          isLogin: false,
          message: result.msg
        }); 
        Alert(result.msg);
      });
      
    }, function(){
      dispatch({
        type: 'grbSimulateUserLogin',
        isLogin: false
      }); 
    })
  }
}
