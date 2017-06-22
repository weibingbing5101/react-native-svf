import Http from '../utils/Http';
import gop from '../utils/Gop';
import filterResponse from '../utils/Response';
import Toast from 'react-native-root-toast';
import Alert from '../components/Alert';
import {AsyncStorage} from 'react-native';


/**
 *充值方式
 **/
export function payTypeList(params) {
  return dispatch => {
    Http.post('trade/payTypeList',params).then(function (data) {
      dispatch({
        type: 'payTypeList',
        code: data.errorCode,
        data:  data.data
      });
    })
  }
}

/**
 * 充值接口
 **/
export function createRechargeOrder(params) {
  return (dispatch, getState) => {
    console.log(params);
    Http.post('trade/recharge',params).then(function (d) {
      console.log(d);
      if (d.errorCode==0) {
        dispatch({
          type: 'createRechargeOrder',
          data:  d.data
        });
        dispatch({
          type: 'push',
          key: 'charge_apply_offline'
        });
      }
      filterResponse(d, dispatch, getState);
    })
  }
}