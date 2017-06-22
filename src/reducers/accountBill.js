/**
 * @description  用户信息
 * @author 耿
 */
import _ from 'lodash';

const initialState = {
  
};
const actionsMap = {
  queryRechargeList(state, action){
    state.rechargeList = action.rechargeList;
    return {...state};
  },
  getAccountTransferList(state, action){
    state.accountTransferList = action.accountTransferList;
    return {...state};
  },


  
};

export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};