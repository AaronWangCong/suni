import defProps from '../../libs/config/props'
import type { ExtractPropTypes } from 'vue'

export const countToProps = {
  /**
   * 开始的数值，默认从0增长到某一个数
   * @default 0
   * */ 
  startVal: {
    type: [String, Number],
    default: () => defProps.countTo.startVal
  },
  /**
   * 要滚动的目标数值，必须
   * @default 0
   * */ 
  endVal: {
    type: [String, Number],
    default: () => defProps.countTo.endVal
  },
  /**
   * 滚动到目标数值的动画持续时间，单位为毫秒（ms）
   * @default 2000
   * */ 
  duration: {
    type: [String, Number],
    default: () => defProps.countTo.duration
  },
  /**
   * 设置数值后是否自动开始滚动
   * @default true
   * */ 
  autoplay: {
    type: Boolean,
    default: () => defProps.countTo.autoplay
  },
  /**
   * 要显示的小数位数
   * @default 0
   * */ 
  decimals: {
    type: [String, Number],
    default: () => defProps.countTo.decimals
  },
  /**
   * 是否在即将到达目标数值的时候，使用缓慢滚动的效果
   * @default true
   * */ 
  useEasing: {
    type: Boolean,
    default: () => defProps.countTo.useEasing
  },
  /**
   * 十进制分割
   * @default '.'
   * */ 
  decimal: {
    type: [String, Number],
    default: () => defProps.countTo.decimal
  },
  /**
   * 字体颜色
   * @default '#606266'
   * */ 
  color: {
    type: String,
    default: () => defProps.countTo.color
  },
  /**
   * 字体大小
   * @default 22
   * */ 
  fontSize: {
    type: [String, Number],
    default: () => defProps.countTo.fontSize
  },
  /**
   * 是否加粗字体
   * @default false
   * */ 
  bold: {
    type: Boolean,
    default: () => defProps.countTo.bold
  },
  /**
   * 千位分隔符，类似金额的分割(￥23,321.05中的",")
   * */ 
  separator: {
    type: String,
    default: () => defProps.countTo.separator
  }
}

export type SuCountToProps = ExtractPropTypes<typeof countToProps>