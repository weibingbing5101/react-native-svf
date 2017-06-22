/**
 * @description  果仁卡信息
 * @author 刘炳礼
 */
import { NavigationExperimental } from 'react-native';

import _ from 'lodash';

const initialState = {
  splash: { 
    text: 'V1.0.0'
  },
  isDrawerOpened:false,
  latest:[],
  title:'账户总览',
  refreshing:false,
  username: '',
  password: '',
  isLogin: false,
  curCardInfo: {},
  curCardIndex: null,
  vcodeSendingSuccess: false
};

const filterCard = function(base){
  return _.extend({
    id: base.cardId,
    type: 'visa',
    cardType: base.cardType,
    moneyType: base.currency,
    moneyTypeName: base.currencyDesc,
    current: base.balance,
    status: base.status,
    cardNo: base.cardNo
  }, base)
}

const actionsMap = {
  fetchSplash(state,action){
    action.splash.text = 'V1.0.0';
    state.splash = action.splash;
    state.theme = global.theme; 
    return {...state};
  },
  fetchLatestArticles(state,action){
    state.latest = action.latest;
    action.latest.stories.unshift({subtitle:'今日热闻'});
    return {...state};
  },
  refreshArticles(state,action){
    state.latest = action.latest;
    action.latest.stories.unshift({subtitle:'今日热闻'});
    state.refreshing = false;
    return {...state};
  },
  fetchArticleBefore(state,action){
    state.latest.stories.push({subtitle:action.dateText});
    state.latest.stories = state.latest.stories.concat(action.stories);
    return {...state};
  },
  fetchThemeDailyList(state,action){
    state.themeList = action.themeList;
    return {...state}
  },
  resetSideBar(state){
    state.themeList.map(function (i) {
      i.active = false;
    });
    return {...state}
  },
  fetchArticlesByTheme(state,action){
    state.themeDaily = action.themeDaily;
    state.themeDaily.id = action.themeId;
    state.themeList.map(function (i) {
      i.active = action.themeId==i.id;
    });
    return {...state};
  },
  refreshThemeArticles(state,action){
    state.themeDaily = action.themeDaily;
    state.themeDaily.id = action.themeId;
    state.refreshing = false;
    return {...state};
  },
  showEditorHome(state,action){
    state.editorId = action.id;
    return {...state}
  },
  fetchArticleContentAndExtra(state,action){
    state.article = action.article;
    return {...state}
  },
  fetchCardBaseInfo(state,action){

    if(action.baseInfo&&action.baseInfo.length){
      let cards = action.baseInfo.map(filterCard);


      state.baseInfo = cards;
      if(state.curCardIndex===null){

        state.curCardIndex = 0;
        state.curCardInfo = cards[0];
      }
    
    }else{
      state.baseInfo = [];
    }
    
    return {...state}
  },
  hasUpToDateVersion(state,action){
    state.appVersionInfo = action.data;
    return {...state}
  },
  changeCurCardBefore(state,action){
    state.curCardIndex = action.index;
    let curCardInfo = state.baseInfo[action.index]
    state.curCardInfo = curCardInfo;
    return {...state}
  },
  changeCurCard(state, action){
    let curCardInfo = state.baseInfo[action.index]
    _.extend(curCardInfo, filterCard(action.cardDetail));

    // state.curCardIndex = action.index;
    // state.curCardInfo = curCardInfo;
    if (state.curCardIndex==action.index) {
      state.curCardInfo = curCardInfo;
    }
    return {...state}
  },
  getCardSecretInfo(state, action){


    let curCardInfo = state.baseInfo[action.index]
    _.extend(curCardInfo, action.data);

    //state.curCardInfo = curCardInfo
    return {...state}
  },
  changeCardStatus(state, action){
    let cards = state.baseInfo;
    let curCard = cards[action.index];
    if(curCard){
      curCard.cardStatus = action.status;
    }
    return {...state}
  },
  beforeChangeCardStatus(state, action){
    state.cardStatusIsChanging = true;
    return {...state}
  },
  afterChangeCardStatus(state, action){
    state.cardStatusIsChanging = false;
    return {...state}
  },
  onRefresh(state){
    state.refreshing = true;
    return {...state}
  },
  setTitle(state,action){
    state.title = action.title;
    return {...state}
  },
  switchTheme(state,action){
    state.theme = action.theme;
    global.theme = action.theme;
    storage.save({
      key: 'theme',
      rawData: {
        name: action.theme
      }
    });
    return {...state}
  },
  userSendCode(state, action){
    state.vcodeSendingSuccess = action.sendSuccess;
    state.clearUserCode = false;
    return {...state};
  },
  userLogin(state, action){
    state.isLogin = action.isLogin;
    state.userLogining = false;
    return {...state};
  },
  userLogout(state, action){
    state.isLogin = false;
    return {...state};
  },
  cardMerterialSubmit(state, action){
    state.merterialSubmitSuccess = action.merterialSubmitSuccess;
    return {...state};
  },
  cardMerterialReSubmit(state,action){
    state.merterialSubmitSuccess = action.merterialSubmitSuccess;
    return {...state};
  },
  clearMerterialSubmitSuccess(state,action){
    state.merterialSubmitSuccess = false;
    return {...state};
  },
  cardUserMaterial(state, action){
    state.userMaterialInfo = action.userMaterialInfo;
    return {...state};
  },
  getCountryList(state, action){
    state.countryList = action.data;
    return {...state};
  },
  cardMerterialSnapList(state, action){
    state.cardMerterialSnapList = action.cardMerterialSnapList;
    return {...state};
  },
  cardMerterialSnapInfo(state, action){
    state.cardMerterialSnapInfo = action.cardMerterialSnapInfo;
    state.cardMerterialSnapInfoAgain = action.cardMerterialSnapInfo;
    return {...state};
  },
  clearCardMerterialSnapInfo(state, action){
    state.cardMerterialSnapInfoAgain = action.cardMerterialSnapInfoAgain;
    return {...state};
  },

  tradeBillList(state, action){
    state.tradeBillList = action.tradeBillList;
    return {...state};
  },
  beforeTradeBillListExtra(state,action){
    state.tradeBillListExtra = '';
    return {...state};
  },
  tradeBillListExtra(state, action){
    state.tradeBillListExtra = action.tradeBillListExtra;
    return {...state};
  },
  // 账单 转账相关
  beforeTradeTransferList(state,action){
    state.tradeTransferList = '';
    return {...state};
  },
  // 账单 转账相关
  tradeTransferList(state, action){
    state.tradeTransferList = action.tradeTransferList;
    return {...state};
  },

  beforeUserLogin(state, action){
    state.userLogining = true;
    state.vcodeSendingSuccess = false;
    return {...state};
  },
  clearUserCode(state,action){
    state.clearUserCode = action.data;
    return {...state}
  },
  push(state,action){
    state.scenePath = action.key;
    return {...state}
  },

  // 卡 转  账户  的转账
  card2Account(state,action){
    state.card2Account = action.data;
    return {...state};
  },
  // 取消 清除 密码
  cancelClearPassword(state,action){
    state.cancelClearPassword = true;
    return {...state};
  },
  // 密码错误提示
  verifyPayPwdErr(state,action){
    state.verifyPayPwdErr = action.data;
    return {...state};
  },
  // 转账成功后 清除 成功标记  防止错位情况
  clearCard2Account(state,action){
    state.card2Account = '';
    return {...state};
  },
};

export default (state = initialState, action) => {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
};