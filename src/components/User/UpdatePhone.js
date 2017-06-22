import {validateUserPhone} from '../../utils/Validate';
import _ from 'lodash';

export default {
  title: '修改手机号', 
  label: '手机号', 
  placeholder: '请输入手机号', 
  valueIsValid: (val)=>{
    return validateUserPhone(val)
  }, 
  getValue: (props)=>{
    let {user} = props;
    return  (user.baseInfo.telephone||'')+'';
  },
  backOnly: true,
  submit: (val,props)=>{
    props.userBasicUpdate({
      telephone: val
    })
  }
}
