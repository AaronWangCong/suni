import { provide, ref } from 'vue'
import type { SuToastOptions } from './type'
import { deepMerge } from '../../libs/function'

/**
 * useToast 用到的key
 *
 * @internal
 */
export const toastDefaultOptionKey = '__TOAST_OPTION__'

// 默认模板
export const defaultOptions: SuToastOptions = {
  message: '', // 显示文本
  type: '', // 主题类型，primary，success，error，warning，black
  duration: 2000, // 显示的时间，毫秒
  icon: true, // 显示的图标
  position: 'center', // toast出现的位置
  complete: null, // 执行完后的回调函数
  overlay: true, // 是否防止触摸穿透
  loading: false // 是否加载中状态
}

export function useToast(selector: string = '') {
  let timer: ReturnType<typeof setTimeout> | null = null
  const toastOption = ref<SuToastOptions>(defaultOptions) // Toast选项
  const toastOptionKey = selector ? toastDefaultOptionKey + selector : toastDefaultOptionKey
  provide(toastOptionKey, toastOption)
  const createMethod = (toastOptions: SuToastOptions) => {
    return (options: SuToastOptions | string) => {
      return show(deepMerge(toastOptions, typeof options === 'string' ? { msg: options } : options) as SuToastOptions)
    }
  }

  const show = (option: SuToastOptions | string) => {
    const options = deepMerge(defaultOptions, typeof option === 'string' ? { msg: option } : option) as SuToastOptions
    toastOption.value = deepMerge(options, {
      show: true
    }) as SuToastOptions
    // 开始渲染，并在 duration ms之后执行清除
    timer && clearTimeout(timer)
    if (toastOption.value.duration && toastOption.value.duration > 0) {
      timer = setTimeout(() => {
        timer && clearTimeout(timer)
        close()
        toastOption.value.complete && toastOption.value.complete()
      }, options.duration)
    }
  }

  const loading = createMethod({
    icon: 'loading',
    duration: 0,
    overlay: true
  })

  const success = createMethod({
    icon: 'success',
    duration: 1500
  })

  const error = createMethod({ icon: 'error' })
  const warning = createMethod({ icon: 'warning' })
  const info = createMethod({ icon: 'info' })

  const close = () => {
    toastOption.value = { show: false }
  }

  return {
    show,
    loading,
    success,
    error,
    warning,
    info,
    close
  }
}
