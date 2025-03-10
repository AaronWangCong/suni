
/**
 * MeScroll 组件的配置选项
 */
export interface MeScrollOptions {
  /**
   * 下拉刷新的配置选项
   */
  down?: MeScrollDownOptions
  /**
   * 上拉加载的配置选项
   */
  up?: MeScrollUpOptions
  /**
   * i18n 国际化配置
   */
  i18n?: {
    [key: string]: any
  }
}

/**
 * 下拉刷新的配置选项
 */
export interface MeScrollDownOptions {
  /**
   * 是否使用下拉刷新功能
   */
  use?: boolean;
  /**
   * 是否在初始化完毕之后自动执行下拉刷新的回调
   */
  auto?: boolean;
  /**
   * 是否使用系统自带的下拉刷新
   */
  native?: boolean;
  /**
   * 如果设置 auto=true，那么是否显示下拉刷新的进度
   */
  autoShowLoading?: boolean;
  /**
   * 是否锁定下拉刷新
   */
  isLock?: boolean;
  /**
   * 在列表顶部，下拉大于 offset 像素，松手即可触发下拉刷新的回调
   */
  offset?: number;
  /**
   * scroll-view 快速滚动到顶部时，此时的 scroll-top 可能大于 0，此值用于控制最大的误差
   */
  startTop?: number;
  /**
   * 在列表顶部，下拉的距离小于 offset 时，改变下拉区域高度比例
   */
  inOffsetRate?: number;
  /**
   * 在列表顶部，下拉的距离大于 offset 时，改变下拉区域高度比例
   */
  outOffsetRate?: number;
  /**
   * 当手指 touchmove 位置在距离 body 底部 bottomOffset 像素范围内的时候结束上拉刷新
   */
  bottomOffset?: number;
  /**
   * 向下滑动最少偏移的角度，取值区间 [0,90]
   */
  minAngle?: number;
  /**
   * 下拉的距离在 offset 范围内的提示文本
   */
  textInOffset?: string;
  /**
   * 下拉的距离大于 offset 范围的提示文本
   */
  textOutOffset?: string;
  /**
   * 加载中的提示文本
   */
  textLoading?: string;
  /**
   * 加载成功的文本
   */
  textSuccess?: string;
  /**
   * 加载失败的文本
   */
  textErr?: string;
  /**
   * 延时结束的时长
   */
  beforeEndDelay?: number;
  /**
   * 背景颜色
   */
  bgColor?: string;
  /**
   * 文本颜色
   */
  textColor?: string;
  /**
   * 下拉刷新初始化完成后的回调函数
   */
  inited?: (mescroll: MeScroll) => void;
  /**
   * 下拉的距离在 offset 范围内的回调函数
   */
  inOffset?: (mescroll: MeScroll) => void;
  /**
   * 下拉的距离大于 offset 范围的回调函数
   */
  outOffset?: (mescroll: MeScroll) => void;
  /**
   * 下拉过程中的回调函数
   */
  onMoving?: (mescroll: MeScroll, rate: number, downHight: number) => void;
  /**
   * 下拉刷新开始前的回调函数，返回 false 可阻止下拉刷新
   */
  beforeLoading?: (mescroll: MeScroll) => boolean;
  /**
   * 显示下拉刷新进度的回调函数
   */
  showLoading?: (mescroll: MeScroll, downHight: number) => void;
  /**
   * 下拉刷新结束后的回调函数
   */
  afterLoading?: (mescroll: MeScroll, downHight: number) => void;
  /**
   * 下拉刷新结束前的回调函数，返回值为结束延时的时长
   */
  beforeEndDownScroll?: (mescroll: MeScroll) => number;
  /**
   * 下拉刷新结束时的回调函数
   */
  endDownScroll?: (mescroll: MeScroll) => void;
  /**
   * 下拉刷新结束后的回调函数
   */
  afterEndDownScroll?: (mescroll: MeScroll) => void;
  /**
   * 下拉刷新的回调函数
   */
  callback?: (mescroll: MeScroll) => void;
}

/**
 * 上拉加载的配置选项
 */
export interface MeScrollUpOptions {
  /**
   * 是否使用上拉加载功能
   */
  use?: boolean;
  /**
   * 是否在初始化完毕之后自动执行上拉加载的回调
   */
  auto?: boolean;
  /**
   * 是否锁定上拉加载
   */
  isLock?: boolean;
  /**
   * 是否同时支持上拉加载和下拉刷新
   */
  isBoth?: boolean;
  /**
   * 是否还有更多数据
   */
  hasNext?: boolean;
  /**
   * 上拉加载的回调函数
   */
  callback?: (page: MeScrollPage, mescroll: MeScroll) => void;
  /**
   * 页码对象
   */
  page?: MeScrollPage;
  /**
   * 没有更多数据时的阈值
   */
  noMoreSize?: number;
  /**
   * 上拉加载的偏移量
   */
  offset?: number;
  /**
   * 加载中的提示文本
   */
  textLoading?: string;
  /**
   * 没有更多数据的提示文本
   */
  textNoMore?: string;
  /**
   * 背景颜色
   */
  bgColor?: string;
  /**
   * 文本颜色
   */
  textColor?: string;
  /**
   * 上拉加载初始化完成后的回调函数
   */
  inited?: (mescroll: MeScroll) => void;
  /**
   * 显示上拉加载进度的回调函数
   */
  showLoading?: (mescroll: MeScroll) => void;
  /**
   * 显示没有更多数据的回调函数
   */
  showNoMore?: (mescroll: MeScroll) => void;
  /**
   * 隐藏上拉加载的回调函数
   */
  hideUpScroll?: (mescroll: MeScroll) => void;
  /**
   * 上拉加载错误的距离阈值
   */
  errDistance?: number;
  /**
   * 返回顶部的配置选项
   */
  toTop?: ToTopOptions;
  /**
   * 空数据的配置选项
   */
  empty?: EmptyOptions;
  /**
   * 是否在滚动时触发回调
   */
  onScroll?: boolean;
}

/**
 * 页码对象
 */
export interface MeScrollPage {
  /**
   * 当前页码
   */
  num: number;
  /**
   * 每页数据条数
   */
  size: number;
  /**
   * 时间戳
   */
  time?: number;
}

/**
 * 返回顶部的配置选项
 */
export interface ToTopOptions {
  /**
   * 图标路径
   */
  src?: string;
  /**
   * 偏移量
   */
  offset?: number;
  /**
   * 动画时长
   */
  duration?: number;
  /**
   * 点击按钮时的回调函数
   */
  btnClick?: (mescroll: MeScroll) => void;
  /**
   * 显示或隐藏时的回调函数
   */
  onShow?: (show: boolean) => void;
  /**
   * 层级
   */
  zIndex?: number;
  /**
   * 左边距
   */
  left?: string | number;
  /**
   * 右边距
   */
  right?: string | number;
  /**
   * 底部边距
   */
  bottom?: string | number;
  /**
   * 是否使用安全区域
   */
  safearea?: boolean;
  /**
   * 宽度
   */
  width?: string | number;
  /**
   * 圆角半径
   */
  radius?: string | number;
}


/**
 * 定义一个接口，用于配置空数据时的显示选项
 */
export interface EmptyOptions {
  /**
   * 是否使用空数据显示功能
   */
  use?: boolean;
  /**
   * 空数据时显示的图标
   */
  icon?: string;
  /**
   * 空数据时显示的提示文本
   */
  tip?: string;
  /**
   * 空数据时显示的按钮文本
   */
  btnText?: string;
  /**
   * 点击按钮时的回调函数
   */
  btnClick?: (mescroll: MeScroll) => void;
  /**
   * 显示或隐藏空数据显示时的回调函数
   */
  onShow?: (show: boolean) => void;
  /**
   * 是否将空数据显示固定在页面上
   */
  fixed?: boolean;
  /**
   * 空数据显示距离页面顶部的距离
   */
  top?: string;
  /**
   * 空数据显示的层级
   */
  zIndex?: number;
}

