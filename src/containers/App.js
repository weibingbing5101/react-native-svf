import React, { Component } from 'react';

import Root from './Root';
import Home from './Home';
import Counter from './Counter';
import Splash from './Splash';
import Article from './Article';
import ThemeDaily from './ThemeDaily';
import Editors from './Editors';
import Editor from './Editor';
import Login from './Login';
import LoginGop from './LoginGop';
import Bill from './Bill';
import BillDetail from './BillDetail';
import Charge from './Charge';
import WebCashier from './WebCashier';
import CardApply from './Card/Apply';
import CardProcess from './Card/Process';
import CardProcessDetail from './Card/ProcessDetail';
import CardDetail from './Card/Detail';
import ChargeSuccessOnline from './ChargeSuccessOnline';
import ChargeApplyOffline from './ChargeApplyOffline';
import InputUpdate from './InputUpdate';
import CardProvision from './CardProvision';
import SignWithholdProtocol from './SignWithholdProtocol';
import WithholdProtocol from './WithholdProtocol';
import GrbLogin from './GrbLogin';
import GrbSimulateHome from './GrbSimulateHome';
import GrbAutoLogin from './GrbAutoLogin';
import About from './About';
import Help from './Help';
import AccountTransfer from './AccountTransfer/Transfer';
import TransferToAccPh from './AccountTransfer/TransferToAccPh';
import TransferToAccVal from './AccountTransfer/TransferToAccVal';
import TransferToBankCard from './AccountTransfer/TransferToBankCard';
import AccountBill from './AccountBill/Bill';
import AccountBillDetail from './AccountBill/BillDetail';



import CardTransfer from './Card/Transfer';
import CardBag from './Card/Bag';
import SecurityCenter from './User/SecurityCenter';
import User from './User/Default';
import Authentication from './User/Authentication';
import PassWordStepOne from './User/PassWordStepOne';
import PassWordStepTwo from './User/PassWordStepTwo';

// passWord_step_two

import routeReducer from '../reducers/routes';

import Theme from '../utils/Theme';
import '../utils/Storage';

storage.load({
  key: 'theme'
}).then(ret => { // 使用保存的主题
  global.theme = ret.name;
}).catch(err => { // 如果没有保存的主题，使用默认主题
  global.theme = Theme.LIGHT;
  storage.save({ // 储存默认主题
    key: 'theme',
    rawData: {
      name: Theme.LIGHT
    }
  });
});

export default class App extends Component {
  renderScene = (props) => {
    switch (props.scene.key) {
      case 'scene_home':
        return <Home onNavigate={props.onNavigate} />;
      case 'scene_counter':
        return <Counter onNavigate={props.onNavigate} />;
      case 'scene_splash':
        return <Splash onNavigate={props.onNavigate} />;
      case 'scene_article':
        return <Article onNavigate={props.onNavigate} />;
      case 'scene_theme_daily':
        return <ThemeDaily onNavigate={props.onNavigate} />;
      case 'scene_editors':
        return <Editors onNavigate={props.onNavigate} />;
      case 'scene_editor':
        return <Editor onNavigate={props.onNavigate} />;
      case 'scene_login':
        return <Login onNavigate={props.onNavigate} />;
      case 'scene_login_gop':
        return <LoginGop onNavigate={props.onNavigate} />;
      
      case 'scene_bill_detail':
        return <BillDetail onNavigate = {props.onNavigate} navigateData={props.scene.route.data} />;
      case 'scene_card_apply':
        return <CardApply onNavigate={props.onNavigate} navigateData={props.scene.route.data} />;
      case 'scene_card_process':
        return <CardProcess onNavigate={props.onNavigate}/>;

      // 卡详情
      case 'scene_card_detail':
        return <CardDetail onNavigate={props.onNavigate} navigateData={props.scene.route.data} />;
      
      // 卡包页面
      case 'scene_card_bag':
        return <CardBag onNavigate={props.onNavigate} />;

      // 卡转账
      case 'scene_card_transfer':
        return <CardTransfer onNavigate={props.onNavigate} navigateData={props.scene.route.data} />;
      // 账单
      case 'scene_bill':
        return <Bill onNavigate={props.onNavigate} navigateData={props.scene.route.data} />;
      // 安全中心
      case 'scene_security_center':
        return <SecurityCenter onNavigate={props.onNavigate} />;

      // 个人账户修改
      case 'scene_user':
        return <User onNavigate={props.onNavigate} />;

      // 实名认证 及判断页面 Authentication
      case 'scene_authentication':
        return <Authentication onNavigate={props.onNavigate} />;

      // 设置 重置 支付密码 第一步 和 第二步
      case 'scene_pass_word_step_one':
        return <PassWordStepOne onNavigate={props.onNavigate} />;
      case 'scene_pass_word_step_two':
        return <PassWordStepTwo onNavigate={props.onNavigate} navigateData={props.scene.route.data} />;
      
       

      case 'scene_charge':
        return <Charge onNavigate={props.onNavigate} />;
      case 'scene_charge_success_online':
        return <ChargeSuccessOnline onNavigate={props.onNavigate} />;
      case 'scene_charge_apply_offline':
        return <ChargeApplyOffline onNavigate={props.onNavigate} navigateData={props.scene.route.data} />;
      case 'scene_card_process_detail':
        return <CardProcessDetail onNavigate={props.onNavigate} />;
      case 'scene_input_update':
        return <InputUpdate onNavigate={props.onNavigate} navigateData={props.scene.route.data} />;
      case 'scene_web_cashier':
        return <WebCashier onNavigate={props.onNavigate} />;
      case 'scene_card_provision':
        return <CardProvision onNavigate={props.onNavigate} />;
      case 'scene_sign_withhold_protocol':
        return <SignWithholdProtocol onNavigate={props.onNavigate} />;
      case 'scene_withhold_protocol':
        return <WithholdProtocol onNavigate={props.onNavigate} />;
      case 'scene_grb_login':
        return <GrbLogin onNavigate={props.onNavigate} />;
      case 'scene_grb_simulate_home':
        return <GrbSimulateHome onNavigate={props.onNavigate} />;
      case 'scene_grb_auto_login':
        return <GrbAutoLogin onNavigate={props.onNavigate} />;
      case 'scene_about':
        return <About onNavigate={props.onNavigate} />;
      case 'scene_help':
        return <Help onNavigate={props.onNavigate} />;
      case 'scene_account_transfer':
        return <AccountTransfer onNavigate={props.onNavigate} />;
      case 'scene_transfer_to_acc_ph':
        return <TransferToAccPh onNavigate={props.onNavigate} />;
      case 'scene_transfer_to_acc_val':
        return <TransferToAccVal onNavigate={props.onNavigate} navigateData={props.scene.route.data} />
      case 'scene_transfer_to_bank_card':
        return <TransferToBankCard onNavigate={props.onNavigate} />;
      case 'scene_account_bill':
        return <AccountBill onNavigate={props.onNavigate} />;
      case 'scene_account_bill_detail':
        return <AccountBillDetail onNavigate={props.onNavigate} navigateData={props.scene.route.data} />;
      default:
        return null;
    }
  };

  render() {
    return (
      <Root
        reducer={routeReducer}
        renderScene={this.renderScene}
      />
    );
  }
}