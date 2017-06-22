import { combineReducers } from 'redux';
import counter from './counter';
import routes from './routes';
import card from './card';
import gop from './gop';
import user from './user';
import signWithholdProtocol from './signWithholdProtocol';
import accountTransfer from './accountTransfer';
import charge from './charge';
import accountBill from './accountBill';

export default combineReducers({
  counter,
  routes,
  card,
  gop,
  user,
  signWithholdProtocol,
  accountTransfer,
  charge,
  accountBill,
});
