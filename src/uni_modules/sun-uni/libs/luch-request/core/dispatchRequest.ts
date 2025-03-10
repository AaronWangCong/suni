import adapter from '../adapters/index'
import type { HttpRequestConfig } from '../index.d'

export default (config: HttpRequestConfig) => adapter(config)
