import type { ExtractPropTypes, PropType } from 'vue'
import type { SuUni } from '../../types/uni'
import defProps from '../../libs/config/props'
import type { SuListProps } from '../su-list/props'
import type { SuSearchProps } from '../su-search/props'
import type { SuApiListPageConfigProps } from './types'

export const apiListProps = {
  /** api请求方法 */
  api: {
    type: Function as PropType<(...arg: any[]) => Promise<any>>,
    default: null
  },
  /**
   * 是否初始化加载数据
   * @default true
   */
  immediate: {
    type: Boolean,
    default: () => defProps.apiList.immediate
  },
  /**
   * 是否加载中
   * @default false
   */
  loading: {
    type: Boolean,
    default: () => defProps.apiList.loading
  },
  /** 请求后的回调 */
  afterFetch: {
    type: Function as PropType<SuUni.Fn>,
    default: null
  },
  /** 请求前的回调 */
  beforeFetch: {
    type: Function as PropType<SuUni.Fn>,
    default: null
  },
  /** 请求携带的参数 */
  params: {
    type: Object,
    default: () => ({})
  },
  /** label 字段 */
  labelField: {
    type: String,
    default: () => defProps.apiList.labelField
  },
  /** value 字段 */
  valueField: {
    type: String,
    default: () => defProps.apiList.valueField
  },
  /**
   * 当前页数 field
   * @default pageIndex
   */
  currentPageField: {
    type: String,
    default: () => defProps.apiList.currentPageField
  },
  /**
   *  当前页的大小 field
   * @default pageSize
   */
  pageSizeField: {
    type: String,
    default: () => defProps.apiList.pageSizeField
  },
  /**
   * 总数 field
   * @default data.pagination.total
   */
  totalField: {
    type: String,
    default: () => defProps.apiList.totalField
  },
  /**
   * 数据的 field
   * @default data.list
   */
  dataField: {
    type: String,
    default: () => defProps.apiList.dataField
  },
  /**
   * 是否开启搜索
   * @default true
   *  */
  showSearch: {
    type: Boolean,
    default: () => defProps.apiList.showSearch
  },
  /** 搜索的 field */
  searchField: {
    type: String,
    default: () => defProps.apiList.searchField
  },
  /** su-list的props配置 */
  listProps: {
    type: Object as PropType<SuListProps>,
    default: () => ({})
  },
  /** su-search的props配置 */
  searchProps: {
    type: Object as PropType<SuSearchProps>,
    default: () => ({})
  },
  /**
   * 是否开启分页
   * @default false
   */
  showPager: {
    type: Boolean,
    default: () => defProps.apiList.showPager
  },
  /**
   * 分页设置
   * @default { currentPage: 1, pageSize: 50, total: 0 }
   */
  pagerConfig: {
    type: Object as PropType<SuApiListPageConfigProps>,
    default: () => defProps.apiList.pagerConfig
  },
  /** 当前选中的值 */
  modelValue: {
    type: [String, Number, Array],
    default: null
  },
  /**
   * 是否多选
   * @default false
   */
  multiple: {
    type: Boolean,
    default: false
  },
  /**
   * 是否显示加载更多状态
   * @default false
   */
  showLoadmore: {
    type: Boolean,
    default: false
  },
  /** 加载更多的props */
  loadmoreProps: {
    type: Object,
    default: () => ({})
  },
  /**
   * 是否远程搜索/本地搜索, 默认false本地搜索, true 远程搜索
   * @description 远程搜索时, 会在搜索时调用api方法
   * @default false
   */
  remoteSearch: {
    type: Boolean,
    default: false
  },
  /** 数据 */
  list: {
    type: Array as PropType<SuUni.Recordable[]>,
    default: () => ([])
  }
}

export type SuApiListProps = ExtractPropTypes<typeof apiListProps>
