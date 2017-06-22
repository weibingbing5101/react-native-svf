import {validateEmail} from '../../utils/Validate';
import _ from 'lodash';
export default {
  title: '修改邮箱', 
  label: '邮箱', 
  placeholder: '请输入邮箱', 
  valueIsValid: (val)=>{
    return validateEmail(val)
  }, 
  getValue: (props)=>{
    let {user} = props;
    return  user.baseInfo.email;
  },
  backOnly: true,
  submit: (val,props)=>{
    let userInfo = props.user.baseInfo;

    props.userBasicUpdate(_.extend({}, userInfo, {
      email: val
    }))
  }
}
