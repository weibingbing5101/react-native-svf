import Alert from '../components/Alert';

let timersObj = {
	api: []
};

const addTimer = (type, cb, inter)=>{
	let timer = setTimeout(cb, inter);
	timersObj[type].push(timer);
	return timer;
}

const removeTimer = (type, timer)=>{
	let allTimers = timersObj[type];
	if(allTimers.length){
		allTimers.some((curTimer, index)=>{
			if(curTimer===timer){
				allTimers.splice(index, 1);
				return true;
			}
			return false;
		})
	}
	if(timer){
    clearTimeout(timer);
    timer = null;
  }
}

const removeAllTimer = (type)=>{
	let allTimers = timersObj[type];
	allTimers.forEach(function(timer){
		if(timer){
	    clearTimeout(timer);
	    timer = null;
	  }
	});
	allTimers.length = 0;
}

apiTimer = {
	add: function(resolve, url){

		let timer = addTimer('api', ()=>{
	    resolve({
	      code: 986,
	      msg: '接口请求超时'
	    });
	    clearTimeout(timer);
	    timer = null;
	    // Alert(url+'接口请求超时')
	    Alert('网络连接超时，请重试');
	  }, 20000)

		return timer;

	},

	remove: function(timer){
		removeTimer('api', timer);
	},

	removeAll: function(){
		removeAllTimer('api');
	}

}



export {apiTimer}
