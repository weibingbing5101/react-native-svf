export function fetchThemeDailyList() {
  return dispatch => {
    Http.get('themes').then(function (d) {
      let items = d.others.slice(0,5);
      let userSetting = [
        /*'密码修改',
        '资料修改',*/
        '我的邀请码',
        '联系我们',
        '公司地址',
        '在线客服',
        '关于Gplus Card'
      ]
      items.forEach(function(item, index){
        item.name = userSetting[index];
      });
      dispatch({
        type: 'fetchThemeDailyList',
        themeList: items
      });
    })
  }
}