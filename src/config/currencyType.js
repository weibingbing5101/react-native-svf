// 卡币种 1 美元 0 港元 3 英镑 4人民币 5直布罗陀镑 6新加坡元 7日元 8韩元 9欧元 10新台币
const MONEY_USD = 2;
const MONEY_HKD = 1;
const MONEY_GBP = 3;
const MONEY_CNY = 4;
const MONEY_GIP = 5; 
const MONEY_SGD = 6;
const MONEY_JPY = 7;
const MONEY_KRW = 8;
const MONEY_EUR = 9;
const MONEY_TWD = 10;

// 币种符号
const MONEY_FLAG = {};
MONEY_FLAG[MONEY_USD] = '$';
MONEY_FLAG[MONEY_EUR] = '€';
MONEY_FLAG[MONEY_GBP] = '￡';
MONEY_FLAG[MONEY_CNY] = '¥';
MONEY_FLAG[MONEY_GIP] = '£';
MONEY_FLAG[MONEY_SGD] = 'S$';
MONEY_FLAG[MONEY_JPY] = '¥';
MONEY_FLAG[MONEY_KRW] = '₩';
MONEY_FLAG[MONEY_HKD] = 'HK$';
MONEY_FLAG[MONEY_TWD] = 'NT$';

// 币种汉语展示
const MONEY_TEXT = {};
MONEY_TEXT[MONEY_USD] = '美元';
MONEY_TEXT[MONEY_EUR] = '欧元';
MONEY_TEXT[MONEY_GBP] = '英镑';
MONEY_TEXT[MONEY_CNY] = '人民币';
MONEY_TEXT[MONEY_GIP] = '直布罗陀镑';
MONEY_TEXT[MONEY_SGD] = '新加坡元';
MONEY_TEXT[MONEY_JPY] = '日元';
MONEY_TEXT[MONEY_KRW] = '韩元';
MONEY_TEXT[MONEY_HKD] = '港元';
MONEY_TEXT[MONEY_TWD] = '新台币';

const MONEY_CODE = {};
MONEY_CODE[MONEY_USD] = 'USD';
MONEY_CODE[MONEY_EUR] = 'EUR';
MONEY_CODE[MONEY_GBP] = 'GBP';
MONEY_CODE[MONEY_CNY] = 'CNY';
MONEY_CODE[MONEY_GIP] = 'GIP';
MONEY_CODE[MONEY_SGD] = 'SGD';
MONEY_CODE[MONEY_JPY] = 'JPY';
MONEY_CODE[MONEY_KRW] = 'KRW';
MONEY_CODE[MONEY_HKD] = 'HKD';
MONEY_CODE[MONEY_TWD] = 'TWD';


const CURRENCY_USD = 'USD';
const CURRENCY_EUR = 'EUR';
const CURRENCY_GBP = 'GBP';
const CURRENCY_CNY = 'CNY';
const CURRENCY_GIP = 'GIP';
const CURRENCY_SGD = 'SGD';
const CURRENCY_JPY = 'JPY';
const CURRENCY_KRW = 'KRW';
const CURRENCY_HKD = 'HKD';
const CURRENCY_TWD = 'TWD';

const CURRENCY_TEXT = {};
CURRENCY_TEXT[CURRENCY_USD] = '美元';
CURRENCY_TEXT[CURRENCY_EUR] = '欧元';
CURRENCY_TEXT[CURRENCY_GBP] = '英镑';
CURRENCY_TEXT[CURRENCY_CNY] = '人民币';
CURRENCY_TEXT[CURRENCY_GIP] = '直布罗陀镑';
CURRENCY_TEXT[CURRENCY_SGD] = '新加坡元';
CURRENCY_TEXT[CURRENCY_JPY] = '日元';
CURRENCY_TEXT[CURRENCY_KRW] = '韩元';
CURRENCY_TEXT[MONEY_HKD] = '港元';
CURRENCY_TEXT[CURRENCY_TWD] = '新台币';

export {MONEY_USD}
export {MONEY_EUR}
export {MONEY_GBP}
export {MONEY_FLAG}
export {MONEY_TEXT}
export {MONEY_CODE}
export {CURRENCY_USD}
export {CURRENCY_EUR}
export {CURRENCY_GBP}
export {CURRENCY_CNY}
export {CURRENCY_TEXT}