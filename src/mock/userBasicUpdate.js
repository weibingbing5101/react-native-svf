import userBasic from './userBasic';
import _ from 'lodash';

var result = {
  "data": {},
  "code": 0,
  "msg": "success",
  "timestamp": 1482821234
}

export default function(body){
	_.extend(userBasic, body);
	return result;
}