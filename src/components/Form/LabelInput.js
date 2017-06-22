import React, {Component} from 'react';
import {Text,TextInput, View, StyleSheet, Image, Keyboard,Alert,Dimensions, Platform} from 'react-native';
import _ from 'lodash';
import { LeftFixed } from '../Layout';

const SCREEN_WIDTH = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
export default class RowBetween extends Component {

  constructor(props) {
    super(props);

     
  }

  componentDidMount() {
   
  }

  renderLeft = ()=>{
    let props = this.props;
    let styles = props.styles||{};
    return <Text style={[styles.label,{marginLeft:0}]}>{this.props.label}</Text>
  }

  _getTip = ()=>{
    let tip = this.props.tip ? <Image source={require('./images/tip.png')} style={ styles.tipImage } /> :<Text />;
    return tip;
  }



  _downloadLayout=(e)=>{
    // alert(e.nativeEvent.layout.y);  // 一直是0
    this.setState({
        downloadY: e.nativeEvent.layout.y,
    });
  }
  _downLoadFocus=()=>{
    let scroller = this.props.scroller;
    let defaultOffsetY = 100;
    if (width<350) {
      defaultOffsetY = 260;
    }
    
    let offsetY = this.props.offsetY || defaultOffsetY;
    this.props.onFocus && this.props.onFocus('');
    setTimeout(()=>{
      let y = this.state.downloadY - offsetY - 1/3*SCREEN_WIDTH; //Dev_height为屏幕的高度
      scroller&&scroller.scrollTo({x:0, y:-y, animated:true});
    },50);
  }

  renderRight = ()=>{
    let props = this.props;
    let instanceStyles = props.styles||{};
    let androidInput = {};
    if(Platform.OS === 'android'){
      androidInput = {marginTop:2};
    }

    return (
        <View style={ {flex:1, flexDirection: 'row'} } onLayout={this._downloadLayout}>
          <TextInput
              keyboardType={ this.props.keyboardType }
              underlineColorAndroid="transparent"
              style={ [styles.input, androidInput, instanceStyles.input,] }
              placeholder ={this.props.placeholder}
              placeholderTextColor={this.props.placeholderTextColor}
              editable ={this.props.editable}
              maxLength = {this.props.maxLength}
              minLength = {this.props.minLength}
              multiline = {true}
              autoCorrect = {false}
              autoCapitalize = "none"
              defaultValue = {this.props.defaultValue}
              onFocus = {this._downLoadFocus}
              onBlur = {()=>this.props.onBlur&&this.props.onBlur('onBlur')}
              onChangeText={ (val)=>this.props.onChange&&this.props.onChange(val) }
          />
          <View>
            {this._getTip()}
          </View>
        </View>
    )
  }

  render() {
    let props = this.props;
    let styles = props.styles||{};
    return <LeftFixed 
              {...props}
              style={ styles.wrap }
              leftSize={this.props.leftSize|| 64}
              renderLeft={ this.renderLeft } 
              renderRight={ this.renderRight }  />
  }

}

const styles = StyleSheet.create({
  input: {
    height: 26,
    flex: 1,
    fontSize: 13,
    marginLeft:10, 
    padding:2,
    color:'#9b9b9b'
  },
  tip: {
    flexDirection: 'row',
    width: 50,
    justifyContent: 'flex-end'
  },
  tipImage:{
    width: 20,
    height: 20,
    marginTop:5,
  }
});

