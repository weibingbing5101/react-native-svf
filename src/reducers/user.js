/**
 * @description  用户信息
 * @author 刘炳礼
 */
import _ from 'lodash';

const initialState = {
  isLogin: false,
  baseInfo: {},
  grbCodeSendingSuccess:false,
  grbVerifyCodeStatus:false,
};
const actionsMap = {
  // 获取用户基本信息
  // getUserBaseInfo(state, action){
  //   state.baseInfo = action.baseInfo;
  //   return {...state};
  // },
  // 用户修改密码
  setPayPwd(state, action){
    state.setPayPwdData = action.setPayPwdData;
    return {...state};
  },
  queryAccount(state, action){
    state.queryAccount = action.queryAccount;
    return {...state};
  },
  // ============================================================================================
  userChange(state,action){
    if(state.name){
      state.isLogin = true;
    }
    return {...state};
  },
  getUserBase(state, action){
    // console.log('user_reducers');
    state.baseInfo = action.baseInfo;
    return {...state};
  },
  userBasicUpdate(state, action){
    // 更新用户信息成功后合并本地
    _.extend(state.baseInfo, action.newUserInfo);
    return {...state};
  },
  userHasSignContract(state, action){
    state.userHasSignContract = action.userHasSignContract;
    return {...state};
  },
  grbSimulateSendCode(state, action){
    state.grbCodeSendingSuccess = action.sendSuccess;
    state.clearGrbSimulateSendCode = false;
    return {...state};
  },
  grbSimulateVerifyCode(state, action){
    state.grbVerifyCodeStatus = action.isVerifyCodeSuccess;
    return {...state};
  },
  clearGrbSimulateSendCode(state,action){
    state.clearGrbSimulateSendCode = action.data;
    state.grbCodeSendingSuccess = false;
    state.grbVerifyCodeStatus = false;
    return {...state}
  },

};

export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};