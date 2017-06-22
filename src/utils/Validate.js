const validatePhone = (val) =>{
	return /^(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/.test(val)
}

const validatePhoneDisplay = (val)=>{
  return val.substr(0,2) + '****' +val.substr(val.length-2,val.length);
}

const validateUserPhone = (val) =>{
	return /^(8613[0-9]|8615[012356789]|8617[0-9]|8618[0-9]|8614[57])[0-9]{8}$/.test(val);
}
const validateIc = (val) =>{
	return /^\d{15}$/.test(val)||/^\d{17}[0-9|x]$/.test(val)
}


const validateName = (val) =>{
	return !!val;
}

const validateEmail = (val) =>{
	return /^\w+([.-]\w+)*@[a-z0-9\-]+(\.[a-z]{2,6}){1,2}$/.test(val);
}

const validateCardFirstName =(val)=>{
	return /^[a-zA-Z]{2,20}$/.test(val);
} 

const validateCardLastName =(val)=>{
	return /^[a-zA-Z]{2,20}$/.test(val);
}

const validateCardSignature = (val)=>{
	return /^[a-zA-Z0-9-./ ]{2,21}$/.test(val);
}

const validateCardPhone = (val) =>{
	return /^(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[\s]{1}[0-9]{4}[\s]{1}[0-9]{4}$/.test(val);
}

const validateCardAddress = (val) =>{
	return /^[a-zA-Z0-9#/@,-.， ]{3,105}$/.test(val);
}

const validateCardPostCode = (val)=>{
	return /^[a-zA-Z0-9]{3,8}$/.test(val);
}

const validateCardCity = (val) =>{
	return /^[a-zA-Z0-9]{1,20}$/.test(val);
}

const validateBirthday = (val)=>{
	//验证是否满足18岁
	//val 格式为2017-01-01,
	let date = new Date();
	date.setFullYear(date.getFullYear()-18);
	let latestYear = date.getFullYear();
	let latestMonth = date.getMonth()+1;
	let latestDay = date.getDate();
	let year = parseInt(val.substr(0,4));
	let month = parseInt(val.substr(5,2));
	let day = parseInt(val.substr(8,2));
	if (year< latestYear|| 
		(year===latestYear&&month<latestMonth)||
		(year===latestYear && month===latestMonth && day<=latestDay) ) {
			return true;
	}
	return false;
}

export {validatePhone}

export {validatePhoneDisplay}

export {validateUserPhone}
export {validateIc}
export {validateName}
export {validateEmail}
export {validateCardFirstName}
export {validateCardLastName}
export {validateCardSignature}
export {validateCardPhone}
export {validateCardAddress}
export {validateCardPostCode}
export {validateCardCity}
export {validateBirthday}