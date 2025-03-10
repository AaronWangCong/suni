const version = '3'

// 开发环境才提示，生产环境不会提示
if (process.env.NODE_ENV === 'development') {
  console.log(
    `\n %c sun-uni V${version} %c https://suni.pages.dev/ \n\n`,
    'color: #ffffff; background: #3c9cff; padding:5px 0;',
    'color: #3c9cff;background: #ffffff; padding:5px 0;'
  )
}

export default {
  v: version,
  version,
  // 主题名称
  type: ['primary', 'success', 'info', 'error', 'warning'],
  // 颜色部分，本来可以通过scss的:export导出供js使用，但是奈何nvue不支持
  color: {
    'su-primary': '#2979ff',
    'su-warning': '#ff9900',
    'su-success': '#19be6b',
    'su-error': '#fa3534',
    'su-info': '#909399',
    'su-main-color': '#303133',
    'su-content-color': '#606266',
    'su-tips-color': '#909399',
    'su-light-color': '#c0c4cc'
  },
  // 默认单位，可以通过配置为rpx，那么在用于传入组件大小参数为数值时，就默认为rpx
  unit: 'rpx',
  i18n: (key: string) => key,
  isCH: true
}
