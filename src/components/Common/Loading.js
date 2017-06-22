import React, {Component} from 'react';
import {} from 'react-native';

export default class Loading extends Component {

  constructor(props){
    super(props);
    this.state = {
      textPoint:'.',
      show: true
    }
    this.timer = this._setTimer();
  }

  _setTimer=()=>{
    this.interval=setInterval(()=> {
      let point = this.state.textPoint;
      if (point.length>=3) {
        point = '.';
      }else{
        point +='.';
      }
      this.setState({
        textPoint: point
      });
    },300);
  }


  componentWillReceiveProps(nextProps){
    if(!nextProps.loading){
      this.setState({show: false});
      clearInterval(this.timer);
    }
  }

  render() {
    return (
      this.state.show ?
      <View style={{backgroundColor:'white',width:width,height:height,justifyContent:'center',paddingLeft:150}}>
        <Text style={{fontSize:16}}>数据加载中{this.state.textPoint}</Text>
      </View>:<View></View>
    );
  }

}
