import React, {Component} from 'react';
import {View,TouchableOpacity} from 'react-native';
import _ from 'lodash';

export default class Item extends Component {

  render() {
    let content = (
      <View style={[{ height: 50, backgroundColor: 'white', padding: 10 }, this.props.style]} >
        {this.props.children}
      </View>
    )
    // 使用了TouchableOpacity不管有没有设置事件，都会当做事件节点处理。
    // 所有得事件都会被拦截，如果是基于此组件的组件发生嵌套时，就会造成父组件事件不被触发的问题
    // 所以做个判断，提供opPress时使用TouchableOpacity，没有时使用普通View
    if(this.props.onPress){
      return (
        <TouchableOpacity onPress={ this.props.onPress }>
          {content}
        </TouchableOpacity>
      );
    }else{
      return (
        <View>
          {content}
        </View>
      );
    }
    
  }

}
