import cardListFn from './cardList';

let cardList = cardListFn();

let cardMap = {};
cardList.data.forEach(function(card){
  cardMap[card.cardId] = card;
});

var result = {
  "data": true,
  "code": 0,
  "msg": "success",
  "timestamp": 1482827050
}

export default function(body){
	cardMap[body.cardId].status = body.status;
  return result;
}