import type { HttpRequestConfig } from '@/uni_modules/sun-uni/libs/luch-request/index.d'

const httpCache = new Map()

function getValue(config: HttpRequestConfig) {
  return {
    key: [
      config.method,
      JSON.stringify(config.data || config.params),
      config.url,
    ].join('&'),
    value: {
      baseURL: config.baseURL,
      method: config.method,
      data: config.data || config.params,
      url: config.url,
    },
  }
}

export function getCache(config: HttpRequestConfig) {
  const { key } = getValue(config)
  return httpCache.get(key)
}

export function setCache(config: HttpRequestConfig) {
  const { key, value } = getValue(config)
  httpCache.set(key, value)
}

export function isCache(config: HttpRequestConfig) {
  const { key } = getValue(config)
  return httpCache.has(key)
}

export function clearCache(config: HttpRequestConfig) {
  const { key } = getValue(config)
  httpCache.delete(key)
}
