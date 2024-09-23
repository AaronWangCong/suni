import type { ExtractPropTypes } from 'vue'
import { baseProps, makeStringProp } from '../common/props'
import type { LoadingType } from '../su-loading/types'

export type ToastIconType = 'success' | 'error' | 'warning' | 'loading' | 'info' // 图标类型

export type ToastPositionType = 'top' | 'middle' | 'bottom' // 提示信息框的位置类型

export type ToastLoadingType = LoadingType // 提示信息加载状态类型

export type ToastOptions = {
  msg?: string
  duration?: number
  iconName?: ToastIconType
  iconSize?: number
  loadingType?: ToastLoadingType
  loadingColor?: string
  loadingSize?: number
  iconColor?: string
  position?: ToastPositionType
  show?: boolean
  zIndex?: number
  /**
   * 是否存在遮罩层
   */
  cover?: boolean
  /**
   * 图标类名
   */
  iconClass?: string
  /**
   * 类名前缀，用于使用自定义图标
   */
  classPrefix?: string
  /**
   * 完全展示后的回调函数
   */
  opened?: () => void
  /**
   * 完全关闭时的回调函数
   */
  closed?: () => void
}

export interface Toast {
  // 打开Toast
  show(toastOptions: ToastOptions | string): void
  // 成功提示
  success(toastOptions: ToastOptions | string): void
  // 关闭提示
  error(toastOptions: ToastOptions | string): void
  // 常规提示
  info(toastOptions: ToastOptions | string): void
  // 警告提示
  warning(toastOptions: ToastOptions | string): void
  // 加载提示
  loading(toastOptions: ToastOptions | string): void
  // 关闭Toast
  close(): void
}

export const toastProps = {
  ...baseProps,
  selector: makeStringProp('')
}

export type ToastProps = ExtractPropTypes<typeof toastProps>
