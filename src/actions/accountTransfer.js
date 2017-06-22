import Http from '../utils/Http';
import gop from '../utils/Gop';
import filterResponse from '../utils/Response';
import Toast from 'react-native-root-toast';
import Alert from '../components/Alert';
import {AsyncStorage} from 'react-native';

//验证支付密码
export function verifyPayPwd(params) {
  return (dispatch, getState) => {
    console.log(params);
    Http.post('grb/verifyPwd',params).then(function (result) {
    	console.log(result);
      if(result.code == 0 && result.data){
        dispatch({
          type: 'verifyPayPwd',
          status: true
        });
        dispatch({
          type:'verifyPayPwdErr',
          data:''
        });
      }else{
        dispatch({
          type:'verifyPayPwdErr',
          data:result.msg
        });
      }
    })
  }
}

export function clearVerifyPayPwd() {
  return (dispatch,getState)=>{
    dispatch({
      type:'clearVerifyPayPwd',
      status:false,
      error:'',
    });
  }
}

export function cancelClearPassword() {
  return dispatch=>{
    dispatch({
      type:'cancelClearPassword',
      data:'true',
    });
  }
}

//根据手机号获取账户信息
export function getUserByPhone(params){
  return (dispatch,getState)=>{
    Http.post('user/getUserByPhone',params).then(function(data){
      console.log(data);
      if (data.errorCode==0) {
        dispatch({
          type:'push',
          key:'transfer_to_acc_val',
          data:data.data
        });
        dispatch({
          type:'getUserByPhone',
          data:data.data,
        });
      }
      filterResponse(data, dispatch, getState);
    });
  }
}

//通过手机号码转账
export function tradeTransfer(params) {
  return (dispatch, getState) => {
    Http.post('trade/transfer',params).then(function (result) {
      console.log(result);
      if(result.errorCode == 0){
        dispatch({
          type: 'tradeTransfer',
          data: result.data,
        }); 
        dispatch({
          type:'verifyPayPwdErr',
          data:''
        });
      }else{
        dispatch({
          type:'verifyPayPwdErr',
          data:result.errorMsg
        });
      }
      // filterResponse(result, dispatch, getState);
    })
  }
}

export function clearTradeTransfer(){
  return (dispatch,getState) =>{
    dispatch({
      type:'clearTradeTransfer',
    });
  }
}

//账户转至卡请求
export function transferAccount2Card(params) {
  return (dispatch, getState) => {
    console.log(params);
    Http.post('trade/transferAccount2Card',params).then(function (result) {
      console.log(result);
      if(result.errorCode == 0){
        dispatch({
          type: 'transferAccount2Card',
          data: result.data,
        }); 
        dispatch({
          type:'verifyPayPwdErr',
          data:''
        });
      }else{
        dispatch({
          type:'verifyPayPwdErr',
          data:result.errorMsg
        });
      }
    })
  }
}

export function clearTransferAccount2Card(){
  return (dispatch,getState) =>{
    dispatch({
      type:'clearTransferAccount2Card',
    });
  }
}
// export function clearGrbCodeSendingSuccess() {
//   return dispatch=>{
//     dispatch({
//       type:'clearGrbCodeSendingSuccess',
//       data:false
//     });
//   }
// }