import React, {Component} from 'react';
import {Text,WebView,View,ListView,ScrollView, Dimensions, Image,StyleSheet,Platform,Modal,TouchableOpacity,TouchableWithoutFeedback} from 'react-native';
import _ from 'lodash';
import { LabelArrow, CenterCenter,LeftFixed } from '../../Layout';
import { winHeight, allCenter } from '../../../utils/Style';

const WIN_HEIGHT = Dimensions.get('window').height;
const WIN_WIDTH = Dimensions.get('window').width;
const OPTION_MAX_HEIGHT = WIN_HEIGHT/2;


export default class Select extends Component {

  ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

  originDefaultSelected = undefined;

  state = {
    optionVisible: false,
    selectdIndex: this.props.defaultSelected||0
  }

  componentWillReceiveProps(nextProps){
    if(this.originDefaultSelected===undefined&&nextProps.defaultSelected!==undefined&&nextProps.defaultSelected!==this.state.selectdIndex){
      this.originDefaultSelected = nextProps.defaultSelected;
      this.setState({
        selectdIndex: nextProps.defaultSelected
      });
    }
  }

  renderLeft = () => {
    return this.props.label ? <Text style={{marginLeft:0}}>{this.props.label}</Text> : false;
  }

  renderRight = () => {
    let index = this.state.selectdIndex;
    let style = this.props.arrowStyle || {top:0,right:0};
    return (
      <View style={{flexDirection:'row'}}>
        {this.props.renderSelected(index, this.props.dataSource[index])}
        <Image style={[{width:18,height:9,position:'absolute'},style]} source = {require('../images/arrow_bottom.png')} />
      </View>
    );
    /*return (
      <View>
        <Text style={ {color: this.props.theme.colors.primaryColor} }>{this.props.renderSelected()}</Text>
      </View>
    )*/
  }

  _selectOption=(index)=>{
    console.log(index)
    this.setState({
      selectdIndex: index,
      optionVisible: false
    })

    this.props.onChange&&this.props.onChange(index, this.props.dataSource[index]);

  }

  _defaultRenderOption = (data)=>{
    return <Text>{data.title}</Text>
  }

  _renderOption = (data, sectionId, rowIndex) => {

    rowIndex = ~~rowIndex;

    let renderOption = this.props.renderOption||this._defaultRenderOption;
  

    let index = this.state.selectdIndex;


    return (
      <TouchableOpacity onPress={ ()=>this._selectOption(rowIndex) }>
        <View style={styles.optionItem}>
            <View style={styles.optionItemRender}>
              {renderOption(data)}
            </View>
            { index===rowIndex ?
               <Image style={styles.optionSelected} source={require('../../Common/image/ic_selected.png')} /> : 
               <View style={styles.optionSelected}></View> 
            }
        </View>
      </TouchableOpacity>
    )
  }

  _hideOption = ()=>{
    this.setState({optionVisible: false})
  }

  _getOptionClose = ()=>{
    return (
      <TouchableOpacity onPress={this._hideOption}>
        <Image style={ styles.optionClose } source={require('../../Common/image/ic_close.png')} />
      </TouchableOpacity>
    )
  }

  _getOptionTitle = ()=>{
    return <Text style={styles.optionTitleText}>{this.props.placeholder}</Text>
  }

  _getOption = ()=>{
    if(this.props.dataSource&&this.props.dataSource.length){
      this.ds = this.ds.cloneWithRows(JSON.parse(JSON.stringify(this.props.dataSource)));
      let selfOptionStyle = {};
      if(this.props.dataSource.length*50>OPTION_MAX_HEIGHT){
        selfOptionStyle.height = OPTION_MAX_HEIGHT;
      }
      return (
        <View>
          <ListView
            style={[styles.optionContent,  selfOptionStyle]}
            dataSource={ this.ds }
            renderRow = { this._renderOption }
          />
        </View>
      );
    }
    return  (<View style={{height: 50}}>
              <View style={[ allCenter, {flexGrow: 1, height: 50, width: WIN_WIDTH}]}>
                <Text>暂无数据</Text>
              </View>
            </View>);
    
  }

  render(){
    // title + 下拉选项  包裹的盒子
    let optionPanelStyle = {paddingBottom: 0, backgroundColor: '#EEF2F4'};
    if (Platform.OS === 'android'){
      optionPanelStyle.paddingBottom = 25;
      optionPanelStyle.backgroundColor = '#EEF2F4';
    }
    let style = this.props.style || {marginLeft:0};
    return (
      <View>
        <LeftFixed 
            {...this.props} 
            leftSize={this.props.leftSize||0}
            style={style}
            renderLeft={ this.renderLeft } 
            renderRight={ this.renderRight } 
            onPress={ ()=>{this.setState({optionVisible: true}) ; this.props.onPress&&this.props.onPress(); } }
        />
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.optionVisible}
        > 
          <TouchableWithoutFeedback onPress={this._hideOption}>
            <View style={ styles.modalPanel }>
              <View style={[optionPanelStyle]}>
                <CenterCenter 
                  leftSize={20} 
                  rightSize={20}
                  renderCenter={ this._getOptionTitle }
                  style={styles.optionTitle}
                />
                {this._getOption()}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>

    ) 
  }

}


const styles = StyleSheet.create({
  // 下拉框盒子  遮罩层  
  modalPanel: {
    backgroundColor: 'rgba(0,0,0,.3)',
    marginTop: 0,
    height: winHeight,
    justifyContent: 'flex-end'
  },
  optionPanel: {
    
  },
  // 标签名  选择卡币种
  optionTitle: {
    borderColor: '#d8d8d8',
    borderBottomWidth: 1,
    borderStyle:'solid',
    backgroundColor: 'transparent',
  },
  optionTitleText:{
    fontSize:15,
    fontWeight:'bold',
  },
  optionItem: {
    borderColor: '#d8d8d8',
    borderBottomWidth: 1,
    marginLeft: 15,
    marginRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50
  },
  optionContent: {
    
  },
  optionClose: {
    width: 16,
    height: 16
  },
  optionSelected: {
    width: 16,
    height: 12,
    marginRight: 5
  },
  optionItemRender: {
    flex: 1
  }
});
