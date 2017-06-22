import React, {Component} from 'react';
import {Text,WebView,View,ListView,Image,StyleSheet,Platform,Modal} from 'react-native';
import _ from 'lodash';
import { LabelArrow, CenterCenter } from '../Layout';

export default class Select extends Component {

  state = {
    optionVisible: false
  }

  renderLeft = () => {
    return <Text>{this.props.label}</Text>
  }

  renderRight = () => {
    return (
      <View>
        <Text style={ {color: this.props.theme.colors.primaryColor} }>{this.props.renderSelected()}</Text>
      </View>
    )
  }

  _getOption = ()=>{
    let renderOption = this.props.renderOption;
    let dataSource = this.props.dataSource;
    return dataSource.map(function(data, index){
      return (
        <View style={styles.optionItem}>
          <View style={styles.optionItemRender}>
            {renderOption(data, index)}
          </View>
          <Image style={styles.optionSelected} source={require('./images/selected.png')} >
        </View>
      )
    });
  }

  _getOptionClose = ()=>{
    return <Image style={ styles.optionClose } source={require('./images/close.png')} />
  }

  _getOptionTitle = ()=>{
    return <Text style={styles.optionTitleText}>{this.props.placeholder}</Text>
  }

  render(){
    return (
      <View>
        <LabelArrow 
            {...this.props} 
            renderLeft={ this.renderLeft } 
            renderRight={ this.renderRight } 
            onPress={ ()=>{this.setState({optionVisible: true})} }
        />
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.optionVisible}
        >
          <View style={styles.modalPanel}>
            <View style={styles.optionPanel}>
              <CenterCenter 
                leftSize={20} 
                rightSize={20}
                renderLeft={ this._getOptionClose }
                renderCenter={ this._getOptionTitle }
                style={styles.optionTitle}
              />
              <ListView style={styles.optionContent}>
                {this._getOption()}
              </ListView>
            </View>
          </View>
        </Modal>
      </View>

    ) 
  }

}


const styles = StyleSheet.create({
  modalPanel: {
    backgroundColor: 'rgba(0,0,0,.3)'
    marginTop: 30,
    justifyContent: 'flex-end'
  },
  optionTitle: {
    borderColor: '#999',
    borderBottomWidth: 1
  },
  optionItem: {
    borderColor: '#999',
    borderBottomWidth: 1,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row'
  },
  optionSelected: {
    width: 15,
    marginRight: 5
  },
  optionItemRender: {
    flex: 1
  }
});
