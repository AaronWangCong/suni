import { onPageScroll, onReachBottom, onPullDownRefresh } from '@dcloudio/uni-app'
import SuMeScroll from '../components/su-mescroll/utils/mescroll-uni'
import type { MeScrollPage } from './comps/mescroll'
import type { ComputedRef, MaybeRef } from 'vue'

declare namespace SuUni {
  /**
   * 定义 onPageScroll 事件处理函数的类型
   * @param hook - 事件处理函数的钩子
   * @param target - 事件处理函数的目标对象
   * @returns 返回处理后的事件处理函数
   */
  export type onPageScroll = (hook: Parameters<typeof onPageScroll>[0], target?: Parameters<typeof onPageScroll>[1]) => void
  /**
   * 定义 onReachBottom 事件处理函数的类型
   * @param hook - 事件处理函数的钩子
   * @param target - 事件处理函数的目标对象
   * @returns 返回处理后的事件处理函数
   */
  export type onReachBottom = (hook: Parameters<typeof onReachBottom>[0], target?: Parameters<typeof onReachBottom>[1]) => void
  /**
   * 定义 onPullDownRefresh 事件处理函数的类型
   * @param hook - 事件处理函数的钩子
   * @param target - 事件处理函数的目标对象
   * @returns 返回处理后的事件处理函数
   */
  export type onPullDownRefresh = (hook: Parameters<typeof onPullDownRefresh>[0], target?: Parameters<typeof onPullDownRefresh>[1]) => void
  /**
   * 扩展 MeScroll 组件的接口，使其包含 MeScrollPage 的属性
   */
  export interface MeScroll extends SuMeScroll, MeScrollPage { }
  /**
   * 定义一个可记录的类型，其中键是字符串，值可以是任何类型
   * @typeparam T - 记录中值的类型
   */
  export type Recordable<T = any> = Record<string, T>

  /**
   * 定义主题类型
   */
  export type Type = 'info' | 'primary' | 'success' | 'warning' | 'error'

  /**
   * 定义尺寸类型
   */
  export type Size = 'large' | 'medium' | 'mini'

  /**
   * 定义形状类型
   * @property circle 圆形
   * @property square 方形
   */
  export type Shape = 'circle' | 'square'
  /**
   * 定义位置
   */
  export type Position = 'right' | 'bottom' | 'left' | 'top'
  /**
   * 定义文本的位置
   */
  export type Align = 'left' | 'right' | 'center'

  /** 图形的尺寸 */
  export type AvatarSize = 'large' | 'default' | 'mini'

  /** 函数 */
  export type Fn<T = any, R = T> = {
    (...arg: T[]): R
  }

  export type ClassType = Array<object | string> | object | string

  /**
   * 也许它是一个计算的 ref，或者一个 getter 函数
   *
   */
  export type MaybeReadonlyRef<T> = (() => T) | ComputedRef<T>

  /**
   * 也许它是一个 ref，或者一个普通值，或者一个 getter 函数
   *
   */
  export type MaybeComputedRef<T> = MaybeReadonlyRef<T> | MaybeRef<T>

  /**
   *  T | null 包装
   */
  export type Nullable<T> = null | T

  export type Arrayable<T> = T | T[]

  export type Options = {
    label: string
    value: any
    disabled?: false
    [key: string]: any
  }
}
