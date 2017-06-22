import mock from '../mock/';
import {
  AsyncStorage,
  NetInfo
} from 'react-native';
import Alert, {
  Confirm
} from '../components/Alert';
import {
  apiTimer
} from './Timer';
import {
  userLogout
} from '../actions/user';


/*
  none - 设备处于离线状态。
  wifi - 设备处于联网状态且通过wifi链接，或者是一个iOS的模拟器。
  cell - 设备是通过Edge、3G、WiMax或是LTE网络联网的。
  unknown - 发生错误，网络状况不可知
*/
let isConnected = 'wifi';

NetInfo.fetch().done((reach) => {
  isConnected = reach;
});
NetInfo.addEventListener(
  'change',
  (reach) => {
    isConnected = reach;
  }
);

var token;
AsyncStorage.getItem('token', function(err, data) {
  if (!token) {
    token = data;
  }
});

const resMock = function(url, body) {
  let content = mock(url, body);
  if (content) {
    return new Promise((resolve, reject) => {
      resolve(content);
    });
  }
  return false;
}

export default class Http {

  static HOST = 'http://svf.goopal1.com:9999/';          //dev
  //static HOST = 'http://goopalcard.xiaojian.me/';   //qa
  // static HOST = 'http://api.gpluscard.com/';


  static EXTRA_HOST = {
    gaoyu: 'http://10.23.0.128:8888/', // 高羽本地
    gpay: 'http://115.28.74.240:9012/',
    wave: 'https://wcapi.wavecrest.in/',    //qa环境
    // wave: 'https://api.wavecrest.gi/',      //prod环境
    guorenbao:'http://gopendpoint.treespaper.com/'
  }

  static get(url, body = {}, host) {
    let data = resMock(url, body);
    if (data) {
      return data;
    }
    return this.request(url, 'get', null, host)
  }

  static post(url, body = {}, host) {
    let data = resMock(url, body);
    if (data) {
      return data;
    }
    return this.request(url, 'post', body, host)
  }

  static send(url, method, body, host, resolve, reject, headers) {


    if (url === 'logout') {
      token = null;
      return;
    }
    if (url==='user/tplogin') {  //第三方登录时需要重新引入token值，所以先把token
      token = null;
    }

    if (isConnected !== 'wifi' && isConnected !== 'cell' && isConnected!=='WIFI') {
      Alert('网络错误，请稍后重试')
      reject('网络错误，请稍后重试');
      return;
    }


    let isOk;
    host = (host && this.EXTRA_HOST[host]) || this.HOST;
    //if (url=='pay-trade/AppHandle') {   //果付接口需要json格式

    /*else{
      body = Object.keys(body).map(function(key){
        return key + '=' + body[key];
      }).join('&');
    }*/

    let sendData = {
      method,
      headers: {
        "Content-Type": "application/json",
        // "gcToken": token,
        "cIp": '127.0.0.1',
        "device": 'ios',
        "dversion": '1.0.0'
      }
    }
    if (body) {
      sendData.body = JSON.stringify(body);
    }



    let timeoutTimer;

    // 构建超时timer
    if (['trade/queryOrder'].indexOf(url) < 0) {
      timeoutTimer = apiTimer.add(resolve, url);
    }
    fetch(host + url, sendData)
      .then((response) => {
        isOk = !!response.ok;
        return response.json();
      })
      .then((responseData) => {
          // 清除超时timer
        apiTimer.remove(timeoutTimer);

        // 模拟登录超时
        /*if(url==='user/uBasic'){
          responseData.code=6006;
        }*/

        setTimeout(function(){
          if (isOk) {
            resolve(responseData);
          } else {
            reject(responseData);
          }
        },500);
        // if (isOk) {

        //   resolve(responseData);
        // } else {
        //   reject(responseData);
        // }
      })
      .catch((error) => {
        console.log(error)
        apiTimer.remove(timeoutTimer);
        resolve({
          code: 444,
          msg: '请求失败'
        });
      });
  }

  static request(url, method, body, host, headers) {


    return new Promise((resolve, reject) => {

      if (token) {
        this.send(url, method, body, host, resolve, reject, headers)
      } else {
        AsyncStorage.getItem('token', (err, data) => {
          if (data) {
            token = data;
          }
          this.send(url, method, body, host, resolve, reject, headers)
        });
      }

    });
  }

  static pureRequest(url, method, body, host, headers) {

    return new Promise((resolve, reject) => {
      if (isConnected !== 'wifi' && isConnected !== 'cell'  && isConnected!=='WIFI') {
        Alert('网络错误，请稍后重试')
        reject('网络错误，请稍后重试');
        return;
      }

      let isOk;
      host = (host && this.EXTRA_HOST[host]) || this.HOST;

      let sendData = {
        method,
        headers: headers
      }
      if (body) {
        sendData.body = JSON.stringify(body);
      }

      let timeoutTimer = apiTimer.add(resolve, url);

      fetch(host + url, sendData)
        .then((response) => {
          isOk = !!response.ok;
          return response.json();
        })
        .then((responseData) => {

          // 清除超时timer
          apiTimer.remove(timeoutTimer);

          if (isOk) {

            resolve(responseData);
          } else {
            reject(responseData);
          }
        })
        .catch((error) => {
          reject(error);
        });

    });

  }



}