import { camelCase, getPropByPath, isFunction } from '../common/util'
import Locale from '../../locale'

export const useTranslate = (name?: string) => {
  const prefix = name ? camelCase(name) + '.' : ''
  const translate = (key: string, ...args: unknown[]) => {
    const currentMessages = Locale.messages()
    const message = getPropByPath(currentMessages, prefix + key)
    return isFunction(message) ? message(...args) : message
  }

  return { translate }
}
