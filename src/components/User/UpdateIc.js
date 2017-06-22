import {validateIc} from '../../utils/Validate';
import _ from 'lodash';

export default {
  title: '修改身份证', 
  label: '身份证', 
  placeholder: '请输入身份证', 
  valueIsValid: (val)=>{
    return validateIc(val)
  }, 
  getValue: (props)=>{
    let {user} = props;
    return  user.baseInfo.idNo;
  },
  backOnly: true,
  submit: (val,props)=>{
    props.userBasicUpdate({
      idNo: val
    })

  }
}
