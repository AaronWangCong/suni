// 主数据中心
export default {
  // 前缀
  prefix: 'dataCenterApi',
  // 命名空间、 防止同命名空间，类型名称一样冲突
  namespace: 'DataCenterAPI',
  url: 'https://centerapi.$1.shijizhongyun.com',
  list: {
    'dc-default': {
      json: '/swagger/Default/swagger.json',
      routes: [
        // '/EnumValueInfo/GetEnumValueInfoTreeByPropertys',
        // '/EnumValueInfo/GetEnumValueInfoList',
        // '/EnumValueInfoRelevance/GetList',
        // '/AirRoute/Page',
        '/Country/Page',
        '/Currency/Page',
        // '/City/GetDropDownPageList',
      ],
    },
    // 'dc-projectConfig': {
    //   json: '/swagger/项目配置/swagger.json',
    //   // 默认全部接口
    //   routes: [],
    // },
  },
}
