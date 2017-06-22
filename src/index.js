import React from 'react';
import { AppRegistry,View,Alert } from 'react-native';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './configureStore';
// import ReactNativeSetting from './utils/ReactNativeSetting';

//Alert.alert('err');
/*require('ErrorUtils').setGlobalHandler(function (err) {
 	Alert.alert(err);
});

*/

const store = configureStore();

const SVF = () => (
  <Provider store={store}>
    <App />
  </Provider>
);




AppRegistry.registerComponent('SVF', () => SVF);
