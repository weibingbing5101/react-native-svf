// 卡类型 0 实体卡 1 虚拟卡 
const CARD_ENTITY = 0;
const CARD_FICTITIOUS = 1;
// 币种汉语展示
const CARD_TYPE_TEXT = {};
CARD_TYPE_TEXT[CARD_ENTITY] = '实体卡';
CARD_TYPE_TEXT[CARD_FICTITIOUS] = '虚拟卡';

export {CARD_ENTITY}
export {CARD_FICTITIOUS}
export {CARD_TYPE_TEXT}