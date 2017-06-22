import {validateCardAddress} from '../../utils/Validate';
import _ from 'lodash';

export default {
  title: '修改详细地址', 
  label: '详细地址', 
  placeholder: '请输入详细地址', 
  valueIsValid: (val)=>{
    return validateCardAddress(val)
  }, 
  getValue: (props)=>{
    let {user} = props;
    return  (user.baseInfo.address||'')+'';
  },
  backOnly: true,
  submit: (val,props)=>{
    props.userBasicUpdate({
      address: val
    })
  }
}
