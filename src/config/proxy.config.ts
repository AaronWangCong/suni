import { config } from './url.config'

export type EnvType = 'dev' | 'test' | 'uat' | 'prod'

// 当前环境
export const buildEnv: EnvType = 'dev'

console.log(buildEnv, '当前环境')

const proxy: Record<string, string> = {}

Object.keys(config[buildEnv]).forEach((key) => {
  const value = config[buildEnv][key]
  if (value) {
    proxy[key] = value
  }
})

export default proxy
