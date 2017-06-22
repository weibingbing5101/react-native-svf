import { NavigationExperimental, NetInfo } from 'react-native';
import gop from '../utils/Gop';
import Alert from '../components/Alert';
import {apiTimer} from '../utils/Timer';

const initialPage = gop.isGop ? 'login_gop' : 'splash';
// const initialPage = 'grb_auto_login';


const { StateUtils } = NavigationExperimental;


const initialState = {
  index: 0,
  key: initialPage,
  routes: [{ key: initialPage }],
};


let isConnected = true;

NetInfo.fetch().done((reach) => {
  isConnected = (reach==='wifi'||reach==='cell');
});
NetInfo.addEventListener(
  'change',
  (reach)=>{
    isConnected = (reach==='wifi'||reach==='cell');
  }
);

const beforeGo=()=>{
  /*if(!isConnected){
    Alert('网络错误，请稍后重试')
    return false;
  } 
  return true;*/
  apiTimer.removeAll();
}

const actionsMap = {
  push(state, action) {
    /*if(!beforeGo()){
      return false
    }*/
    beforeGo();
    return StateUtils.push(state, { key: action.key, data: action.data });
  },
  back(state/*, action*/) {
    /*if(!check()){
      return false
    }*/
    beforeGo();
    return state.index > 0 ? StateUtils.pop(state) : state;
  },
  pop(state/*, action*/) {
    /*if(!check()){
      return false
    }*/
    beforeGo();
    return state.index > 0 ? StateUtils.pop(state) : state;
  }
};

export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};
