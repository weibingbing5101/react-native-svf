// import React, {Component} from 'react';
// import {Text,StyleSheet,PixelRatio} from 'react-native';

// let oldRender = Text.prototype.render;
// Text.prototype.render = function (...args) {
//     let origin = oldRender.call(this, ...args);
//     let style = StyleSheet.flatten(origin.props.style)||{};
//     console.log(111111);
//     console.log(style);
//     let fontSize = style.fontSize||14;
//     let ratio = PixelRatio.get();
//     let scale = PixelRatio.getFontScale();
//     let newFontSize = fontSize*ratio/scale;
//     console.log(newFontSize);
//     return React.cloneElement(origin, {
//         style: [origin.props.style, {fontSize:newFontSize}]
//     });
// };



import { Text } from 'react-native';

let originalGetDefaultProps = Text.getDefaultProps;
Text.getDefaultProps = function() {
  return {
    ...originalGetDefaultProps(),
    allowFontScaling: false,
  };
};