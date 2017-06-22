import Alert, {Confirm} from '../components/Alert';
import logout from './Logout';

// 统一处理和业务相关得接口响应
export default function(res, dispatch, getState, defaultCb){

	switch(res.errorCode){
		case 0:
		break;
		case 1000:
			Alert('登录信息失效，请重新登录', null, ()=>{
        		logout(dispatch, getState);
      		})
      	break;
		case 6006:
			Alert('登录超时，请重新登录', null, ()=>{
        		logout(dispatch, getState);
      		})
		break;
		case 986:
      		Alert(res.errorMsg)
		break;
		default: 
			if(defaultCb){
				defaultCb();
			}else{
				Alert(res.errorMsg);
			}
		break;
	}
}