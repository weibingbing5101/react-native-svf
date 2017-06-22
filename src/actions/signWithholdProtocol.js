import Http from '../utils/Http';
import gop from '../utils/Gop';
import filterResponse from '../utils/Response';
import Toast from 'react-native-root-toast';
import Alert from '../components/Alert';
import {AsyncStorage} from 'react-native';

export function grbSendPhoneCode() {
  

  return (dispatch, getState) => {
    gop.getToken((token)=>{
      let params = {
        gopToken:token,
      }
      console.log(params);
      Http.post('grb/sendPhoneCode',params).then(function (result) {
        console.log(result);
        if(result.code == 0){
          dispatch({
            type: 'grbSendPhoneCode',
            sendSuccess: true,
          }); 
        }

        filterResponse(result, dispatch, getState, ()=>{
          dispatch({
            type: 'grbSendPhoneCode',
            sendSuccess: false,
          }); 
          Alert(result.msg)
        });

      },function () {
        dispatch({
          type: 'grbSendPhoneCode',
          sendSuccess: false,
        }); 
      })
    });
    
  }
}

export function clearGrbCodeSendingSuccess() {
  return dispatch=>{
    dispatch({
      type:'clearGrbCodeSendingSuccess',
      data:false
    });
  }
}

export function clearGrbCode(value) {
  return dispatch=>{
    dispatch({
      type:'clearGrbCode',
      data:false
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

// 确定 按钮 核对验证码  正确性
export function grbVerifyCode(params) {
  return (dispatch, getState) => {
    gop.getToken((token)=>{
      params.gopToken = token;
      console.log(params);
      Http.post('grb/verifyCode',params).then(function (result) {
        console.log(result);
        if(result.code == 0 && result.data){
        // if(result.code == 0){
          dispatch({
            type: 'grbVerifyCode',
            status: true
          });
        }else{
          Alert("验证码错误");
        }
        filterResponse(result, dispatch, getState);
      },function () {
        //Toast.show('请检查网络后重试');
      })
    });
  }
}

// 验证 密码
export function grbVerifyPwd(params) {
  return (dispatch, getState) => {
    console.log(params);
    gop.getToken((token)=>{
      params.gopToken = token;
      Http.post('grb/verifyPwd',params).then(function (result) {
        console.log(result);
        if(result.code == 0 && result.data){
          dispatch({
            type: 'grbVerifyPwd',
            data:result.data,
            status: true
          });
          dispatch({
            type:'grbVerifyPwdErr',
            data:''
          });
        }else{
          dispatch({
            type:'grbVerifyPwdErr',
            data:result.msg
          });
        }
        //filterResponse(result, dispatch, getState);
      },function () {
        //Toast.show('请检查网络后重试');
      })
    });
  }
}

export function clearGrbVerifyPwd() {
  return (dispatch,getState)=>{
    dispatch({
      type:'clearGrbVerifyPwd',
      status:false,
      error:'',
    });
  }
}

/**
 * 查看果仁数量以及当前卖出价
 */
export function grbViewGopNumAndPrice(params) {
  return (dispatch, getState) => {
    Http.post('grb/viewGopNumAndPrice',params).then(function (result) {
      if(result.code == 0){
        dispatch({
          type: 'grbViewGopNumAndPrice',
          info: result.data
        });
      }

      filterResponse(result, dispatch, getState);


    },function () {
      //Toast.show('请检查网络后重试');
    })
  }
}



