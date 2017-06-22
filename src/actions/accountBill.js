import Http from '../utils/Http';
import gop from '../utils/Gop';
import filterResponse from '../utils/Response';
import Toast from 'react-native-root-toast';
import Alert from '../components/Alert';
import {AsyncStorage} from 'react-native';

/**
 *账单：充值
 */
export function queryRechargeList(params){
  return (dispatch, getState) =>{
    Http.post('trade/queryRechargeList',params).then(function(data){
      console.log(data);
      if (data.errorCode==0) {
        dispatch({
          type:'queryRechargeList',
          rechargeList:data.data
        });
      }

      filterResponse(data, dispatch, getState);

    });
  }
}

/**
 *账单：转账
 */
export function getAccountTransferList(params){
  return (dispatch,getState)=>{
    Http.post('trade/getAccountTransferList',params).then(function(data){
      console.log(data);
      if (data.errorCode==0) {
        dispatch({
          type:'getAccountTransferList',
          accountTransferList:data.data
        });
      }
      filterResponse(data,dispatch,getState);
    });
  }
}