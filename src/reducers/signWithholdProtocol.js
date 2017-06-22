/**
 * @description  用户信息
 * @author 耿
 */
import _ from 'lodash';

const initialState = {
  grbCodeSendingSuccess:false,
  clearGrbCode:true,
};
const actionsMap = {
  grbSendPhoneCode(state,action){
    state.grbCodeSendingSuccess = action.sendSuccess;
    state.clearGrbCode = false;
    return {...state};
  },
  clearGrbCode(state,action){
    state.clearGrbCode = action.data;
    return {...state}
  },
  clearGrbCodeSendingSuccess(state,action){
    state.grbCodeSendingSuccess = action.data;
    return {...state};
  },
  grbVerifyCode(state, action){
    state.grbVerifyCodeStatus = action.status;
    return {...state};
  },
  grbVerifyPwd(state, action){
    state.grbVerifyPwdStatus = action.status;
    state.grbInfo = action.data;
    return {...state};
  },
  grbVerifyPwdErr(state,action){
    state.grbVerifyPwdErr = action.data;
    return {...state};
  },
  clearGrbVerifyPwd(state,action){
    state.grbVerifyPwdStatus = action.status;
    state.grbVerifyPwdErr = action.error;
    state.cancelClearPassword = false;
    return {...state};
  },
  cancelClearPassword(state,action){
    state.cancelClearPassword = true;
    return {...state};
  },
  grbViewGopNumAndPrice(state, action){
    state.grbGopNumAndPrice = action.info;
    return {...state};
  }
};

export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};