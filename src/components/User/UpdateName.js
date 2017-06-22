import {validateName} from '../../utils/Validate';
import _ from 'lodash';

export default {
  title: '修改姓名', 
  label: '真实姓名', 
  placeholder: '请输入真实姓名', 
  valueIsValid: (val)=>{
    return validateName(val);
  }, 
  getValue: (props)=>{
    let {user} = props;
    return  user.baseInfo.realName;
  },
  backOnly: true,
  submit: (val,props)=>{
    props.userBasicUpdate({
      realName: val
    })

  }
}
