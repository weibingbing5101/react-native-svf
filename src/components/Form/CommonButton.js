import React, {Component, PropTypes} from 'react';
import {View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import {getStyleFromProps} from '../../utils/Style';
import {TextFont} from '../Text';
import _ from 'lodash';

const winWidth = Dimensions.get('window').width;

const defaultTextStyle = {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: "600",
        textAlign: "center"
    }

const TEXT_STYLE_KEYS= ['fontSize','lineHeight','letterSpacing','color'];

const DISABLED_BG_COLOR = 'rgba(162, 166, 178, .4)';
//const DISABLED_BG_COLOR = 'transparent';
//const DISABLED_TEXT_COLOR = 'rgba(0, 0, 0, .4)';
const DISABLED_TEXT_COLOR = '#5a5e71';
const DISABLED_BDR_COLOR = '#434b68';

export default class CommonButton extends Component {
    _handlePress = ()=>{
      if(!this.props.disabled){
        this.props.onPress()
      }
    }
    render() {
        const baseStyles = this.baseStyles;
        let selfStyles = _.extend({}, this.props.style);
        let selfTextStyles = {};


        TEXT_STYLE_KEYS.forEach(function(key){
            if(selfStyles[key]!==undefined){
                selfTextStyles[key] = selfStyles[key];
                delete selfStyles[key];
            }
        });

        let disabledStyle={};
        if(this.props.disabled){
          disabledStyle.backgroundColor = this.props.disabledBackgroundColor || DISABLED_BG_COLOR;
          //disabledStyle.backgroundColor = DISABLED_BG_COLOR;
          disabledStyle.borderColor = DISABLED_BDR_COLOR;
          selfTextStyles.color = DISABLED_TEXT_COLOR;
        }

        let Container = this.props.disabled ? View : TouchableOpacity;

        return <View style={[{alignItems: 'center'}, baseStyles.wrap ] }>
            <Container style={[baseStyles.container, selfStyles, disabledStyle]} onPress={ this._handlePress }>
                <TextFont style={ _.extend(defaultTextStyle, baseStyles.text, selfTextStyles) }>{this.props.children}</TextFont>
            </Container>
        </View>
    }
}

CommonButton.propTypes = {
    onPress: PropTypes.func
}