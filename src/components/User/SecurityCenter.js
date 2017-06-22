import React, {Component} from 'react';
import {Text,View,StyleSheet,Platform,Dimensions} from 'react-native';
import {InfoInput, LabelInput} from '../Form';
import Theme from '../../utils/Theme';


// import {Grid,Row,Col} from 'react-native-easy-grid';
import CustomBackTitle from '../CustomBackTitle';
import Http from '../../utils/Http';
import _ from 'lodash';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default class SecurityCenter extends Component {

  constructor(props){
    super(props);

    this.state= {
      
    }

  }

  componentDidMount(){
  }

  render() {
    let {card} = this.props;
    const baseInfo = this.props.user.baseInfo;
    let theme = new Theme(card.theme);
    return(
        <View style={{flex:1}}>
          <CustomBackTitle title="安全中心" left={-width/2+30} {...this.props}/>
          <Text style={styles.infoTitle}>为了保障您的账号安全，请务必设置支付密码</Text>
          <View>
            <InfoInput 
              {...this.props} 
              style={ styles.paddingL15 } 
              label="支付密码" 
              placeholder={baseInfo.securePassword ==='' ? '设置' : '修改'} 
              onPress={()=>{this.props.goPage('authentication')}} 
              theme={theme} 
            />
          </View>
        </View>
    );
  }

};

SecurityCenter.defaultProps = {
}

const styles = StyleSheet.create({
  line:{
    borderBottomWidth: 1,
    borderBottomColor: '#ececec'
  },
  infoTitle:{
    paddingTop: 15, 
    paddingBottom:10,
    paddingLeft: 10,
    color:'#9b9b9b'
  },
  paddingL15 :{
    paddingLeft:15
  },
  loading:{backgroundColor:'white',width:width,height:height,justifyContent:'center',paddingLeft:150}
})


