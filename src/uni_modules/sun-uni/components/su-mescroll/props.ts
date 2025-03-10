import type { PropType } from 'vue'
import type { SuUni } from '../../types/uni'
import { makeNumericProp, makeStringProp } from '../../libs/vue'
import { onPageScroll, onReachBottom } from '@dcloudio/uni-app'

export const mescrollProps = {
  /** 下拉加载的事件 */
  queryCallback: {
    type: Function as PropType<(mescroll: SuUni.MeScroll) => Promise<SuUni.Recordable>>,
    default: null
  },
  /** uniapp的onReachBottom事件 */
  onReachBottom: {
    type: Function as PropType<SuUni.onReachBottom>,
    default: () => onReachBottom
  },
  /** uniapp的onPageScroll事件 */
  onPageScroll: {
    type: Function as PropType<SuUni.onPageScroll>,
    default: () => onPageScroll
  },
  /** 列表数据字段名 */
  dataField: makeStringProp('data.list'),
  /** 分页数据字段名 */
  totalField: makeStringProp('data.total'),
  /** 分页大小 */
  pageSize: makeNumericProp(10)
}
