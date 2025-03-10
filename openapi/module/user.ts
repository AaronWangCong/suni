// 用户中心
export default {
  prefix: 'userApi',
  namespace: 'UserApi',
  url: `https://centerapi.$1.shijizhongyun.com`,
  list: {
    // 'user-menu': {
    //   json: '/swagger/目录页面/swagger.json',
    //   routes: [],
    // },
    'user-oAuth': {
      json: '/swagger/身份认证/swagger.json',
      routes: [],
    },
    // 'user-auth': {
    //   json: '/swagger/权限项/swagger.json',
    //   routes: [],
    // },
    // 'user-user': {
    //   json: '/swagger/用户/swagger.json',
    //   routes: [],
    // },
  },
}
