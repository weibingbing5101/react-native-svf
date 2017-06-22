import { NativeModules } from 'react-native';


let GRBKeyChain = NativeModules.GRBKeyChain;
let isGop = GRBKeyChain!==undefined;
let goptoken = '';
let gopPhone = '';
// let isGop = true;
// let goptoken = "652a0caf416c4547aac658ca2e7ae3b2";   //耿芒芒 dev goptoken
// let gopPhone = '13366037306';

if(isGop&&GRBKeyChain.getGopToken){
	GRBKeyChain.getGopToken((error, gopToken, gopPhone) => {
		if(!error){
			goptoken = gopToken;
			gopPhone = gopPhone;
		}
	});
}

function setToken(token) {
	console.log(token);
	goptoken = token;
}

function setGop() {
	isGop = true;
}

export default {
	isGop: isGop,
	gopPhone:gopPhone,
	goptoken:goptoken,
	setToken: setToken,
	setGop:setGop,
	getToken: (cb)=>{
		if(isGop){
			if(goptoken){
				cb(goptoken);
			}else{
				GRBKeyChain.getGopToken((error, gopToken) => {
					if(!error){
						cb(gopToken);
						goptoken = gopToken;
					}
				});
			}
		}
	},
	userTag: '26665af1fefe516ae57b3e53785a9a08'
}