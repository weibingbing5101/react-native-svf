import React, {Component} from 'react';
import {Text,WebView,View,Image,StyleSheet,Platform} from 'react-native';
import _ from 'lodash';
import { betweenCenter } from '../../utils/Style';
import Item from './Item';

export default class RowBetween extends Component {

  render() {
    return (
      <Item {...this.props}>
        <View style={styles.wrap}>
          <View>
            {this.props.renderLeft()}
          </View>
          <View>
            {this.props.renderRight()}
          </View>
        </View>
      </Item>
    );
  }

}
const styles = StyleSheet.create({
  wrap: _.extend({}, betweenCenter)
})
