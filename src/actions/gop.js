import Http from '../utils/Http';
import Toast from 'react-native-root-toast';

export function buy(data) {
  return dispatch => {
    Http.post('appHandle', data, 'gpay').then(function (d) {

      
      buildStories(d);

      dispatch({
        type: 'push',
        url: url
      });
    })
  }
}
