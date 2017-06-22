// 邮递方式 0 平邮 1 快递 
const CARD_MAIL = 0;
const CARD_DELIVER = 1;
// 币种汉语展示
const CARD_POST_TYPE_TEXT = {};
CARD_POST_TYPE_TEXT[CARD_DELIVER] = '快递';
CARD_POST_TYPE_TEXT[CARD_MAIL] = '平邮';

export {CARD_DELIVER}
export {CARD_MAIL}
export {CARD_POST_TYPE_TEXT}