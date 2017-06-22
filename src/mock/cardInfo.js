import cardListFn from './cardList';

let cardList = cardListFn();

let cardMap = {};
cardList.data.forEach(function(card){
  cardMap[card.cardId] = card;
});


var result = {
  "data": {},
  "code": 0,
  "msg": "success",
  "timestamp": 1482821234
}

export default function(body){
  let data = cardMap[body.cardId];
  data.balance -= Math.floor(Math.random()*(data.balance*0.1));
  result.data = data
  return result;
}