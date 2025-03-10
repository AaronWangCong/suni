import defProps from '../../libs/config/props'
import type { ExtractPropTypes, InjectionKey, Ref } from 'vue'
import type { SuGridItemProps } from '../su-grid-item/props'

export const gridProps = {
  /**
   * 分成几列
   * @default 3
   * */
  col: {
    type: [String, Number],
    default: () => defProps.grid.col
  },
  /**
   * 是否显示边框
   * @default false
   * */
  border: {
    type: Boolean,
    default: () => defProps.grid.border
  },
  /**
   * 宫格对齐方式，表现为数量少的时候，靠左，居中，还是靠右
   * @default 'left'
   * */
  align: {
    type: String,
    default: () => defProps.grid.align
  },
  /**
   * 间隔
   * @default '0px'
   * */
  gap: {
    type: String,
    default: () => defProps.grid.gap
  }
}

export type SuGridProps = ExtractPropTypes<typeof gridProps>

export type SuGridProvide = {
  col: SuGridProps['col']
  border: SuGridProps['border']
  childClick: (name: SuGridItemProps['name']) => void
  gridRef: Ref<UniApp.NodesRef | undefined>
}

export const GRID_KEY: InjectionKey<SuGridProvide> = Symbol('su-grid')
