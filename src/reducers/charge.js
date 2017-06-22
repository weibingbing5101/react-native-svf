/**
 * @description  用户信息
 * @author 耿
 */
import _ from 'lodash';

const initialState = {
  
};
const actionsMap = {
  payTypeList(state, action){
    state.payTypeList = action.data;
    return {...state};
  },
  createRechargeOrder(state, action){
    state.orderInfo = action.data;
    return {...state};
  },  
};

export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};