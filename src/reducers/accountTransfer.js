/**
 * @description  用户信息
 * @author 耿
 */
import _ from 'lodash';

const initialState = {
  
};
const actionsMap = {
  verifyPayPwd(state, action){
    state.verifyPayPwdStatus = action.status;
    return {...state};
  },
  verifyPayPwdErr(state,action){
    state.verifyPayPwdErr = action.data;
    return {...state};
  },
  clearVerifyPayPwd(state,action){
    state.verifyPayPwdStatus = action.status;
    state.verifyPayPwdErr = action.error;
    state.cancelClearPassword = false;
    return {...state};
  },
  cancelClearPassword(state,action){
    state.cancelClearPassword = true;
    return {...state};
  },
  tradeTransfer(state,action){
    state.tradeTransfer = action.data;
    return {...state};
  },
  clearTradeTransfer(state,action){
    state.tradeTransfer = '';
    return {...state};
  },
  transferAccount2Card(state,action){
    state.transferAccount2Card = action.data;
    return {...state};
  },
  clearTransferAccount2Card(state,action){
    state.transferAccount2Card = '';
    return {...state};
  },
  
};

export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};