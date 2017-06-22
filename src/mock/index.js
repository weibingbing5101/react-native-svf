// 用户
import userLogin from './userLogin';
import userSendCode from './userSendCode';
import userBasic from './userBasic';
import userBasicUpdate from './userBasicUpdate';

// 卡
import cardList from './cardList';
import cardInfo from './cardInfo';
import cardUpdateStatus from './cardUpdateStatus';
import cardMerterialSubmit from './cardMerterialSubmit';
import cardUserMaterial from './cardUserMaterial';
import cardMerterialSnapList from './cardMerterialSnapList';
import cardMerterialSnapInfo from './cardMerterialSnapInfo';

// 交易
import createRechargeOrder from './createRechargeOrder';
import currenyQuery from './currenyQuery';
import payTypeList from './payTypeList';
import queryOrder from './queryOrder';
import tradeBillList from './tradeBillList';


const data = {
	// 用户
	//'user/login': userLogin,
	//'user/sendCode': userSendCode,
	//'user/uBasic': userBasic,
	//'user/uBasicUpdate': userBasicUpdate,

	// 卡
	//'card/cardList': cardList,
	//'card/cardInfo': cardInfo,
	// 'card/updateStatus': cardUpdateStatus,
	//'card/merterialSubmit':cardMerterialSubmit,
	//'card/userMaterial':cardUserMaterial,
	// 'card/cardList': cardList,
	// 'card/cardInfo': cardInfo,
	// 'card/updateStatus': cardUpdateStatus,
	// 'card/merterialSubmit':cardMerterialSubmit,
	// 'card/userMaterial':cardUserMaterial,
	// 'card/merterialSnapList':cardMerterialSnapList,
	// 'card/merterialSnapInfo':cardMerterialSnapInfo,

	// 交易
	// 'trade/createRechargeOrder':createRechargeOrder,
	//'curreny/query':currenyQuery,
	// 'trade/payTypeList':payTypeList,
	//'trade/queryOrder':queryOrder,
	// 'curreny/query':currenyQuery,
	// 'trade/payTypeList':payTypeList,
	// 'trade/queryOrder':queryOrder,
	// 'trade/billList':tradeBillList
}

export default function(url, body){
	let result = data[url];
	if(!result){
		return false;
	}
	if(result instanceof Function){
		return result(body);
	}else{
		return result;
	}
}