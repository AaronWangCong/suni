import type { ExtractPropTypes } from 'vue'
import defProps from '../../libs/config/props'

export const circleProgressProps = {
  /**
   * 圆环进度百分比值，为数值类型，0-100 (默认 30 )
   * @default 30
   * */ 
  percentage: {
    type: [String, Number],
    default: () => defProps.circleProgress.percentage
  }
}


export type SuCircleProgressProps = ExtractPropTypes<typeof circleProgressProps>