import {AsyncStorage} from 'react-native'
import Http from './Http';

export default function(dispatch, getState){

	AsyncStorage.removeItem('gopPhone', function(){
    dispatch({
      type: 'userLogout'
    }); 
    let {routes} = getState();
    for (var i = routes.routes.length-1; i >=1; i--) {
        dispatch({
          type: 'pop'
        });
    }
    
    dispatch({
      type:'clearUserCode',
      data:'true'
    });
    dispatch({
      type: 'push',
      key: 'login'
    });
      
    Http.get('logout', ()=>{});

  });

}