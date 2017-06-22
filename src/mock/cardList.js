var result= {
	"code": 0,

	"data": [{
		cardId: 1,
		type: 'visa',
		currency: 3,
		currencyDesc: '英镑',
		balance: 87674,
		status: 1,
		cardNo: '622587890219987',
		term: '06/38',
	}, {
		cardId: 2,
		type: 'master',
		currency: 2,
		currencyDesc: '美元',
		balance: 4474,
		status: 2,
		cardNo: '622534594555342',
		term: '07/18',
	}, {
		cardId: 3,
		type: 'visa',
		currency: 3,
		currencyDesc: '英镑',
		balance: 234,
		status: 1,
		cardNo: '622523425454900',
		term: '07/22',
	}, {
		cardId: 4,
		type: 'visa',
		currency: 3,
		currencyDesc: '英镑',
		balance: 123412,
		status: 3,
		cardNo: '622512358888099',
		term: '11/19',
	}, {
		cardId: 5,
		type: 'master',
		currency: 2,
		currencyDesc: '欧元',
		balance: 5552,
		status: 2,
		cardNo: '622534252361532',
		term: '01/30',
	}],
	"msg": "string",
	"timestamp": Date.now()
}

export default function(body){
	result.data.forEach(function(card){
		card.balance -= Math.floor(Math.random()*(card.balance*0.1));
	});
  return result;
}


