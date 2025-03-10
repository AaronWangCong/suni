import { nextTick, onMounted, ref, watch } from 'vue'
import type { SuUseFormRenderProps } from '../types/form'
import type { SuUni } from '../../../../types/uni'
import { useDependencies } from './useDependencies'

// 定义一个常量，表示一行的跨度为12
const ROW_SPAN = 12

/**
 * 用于处理表单的展开和收起功能的自定义 Hook
 * @param {SuUseFormRenderProps} props - 表单渲染的属性
 * @returns {Object} - 返回一个包含 collapseFormItemIndex 和 showExpandButton 的对象
 */
export function useExpandable(props: SuUseFormRenderProps, formModel: SuUni.Recordable) {
  // 收起显示的formItem索引
  const collapseFormItemIndex = ref(1)
  // 是否显示展开收起按钮
  const showExpandButton = ref(props.showCollapseButton)
  // 是否已经计算过一次
  const isCalculated = ref(false)

  /**
   * 计算表单项目的索引
   * @returns {Promise<void>} - 返回一个 Promise，当计算完成时解析
   */
  async function calculateFormItemIndex() {
    // 如果不需要显示收起按钮，则直接返回
    if (!props.showCollapseButton) {
      collapseFormItemIndex.value = 1
      showExpandButton.value = props.showCollapseButton
      return
    }
    // 等待下一个 DOM 更新周期
    await nextTick()
    // 当前行数
    let currentIndex = 0
    // 当前计算的span
    let calculateSpan = 0

    // 遍历表单的每个项目
    props.schemas?.forEach((schema, index) => {
      const { isIfShow } = useDependencies(() => schema.dependencies, formModel, props.form)
      if (!isIfShow) return
      // 获取项目的跨度，如果没有设置，则默认为12
      let span = schema.colProps ? (Number(schema.colProps.span) ?? 12) : 12
      // 获取项目的偏移量，如果没有设置，则默认为0
      const offsetSpan = schema.colProps ? (Number(schema.colProps.offset) ?? 0) : 0
      // 如果有偏移量
      if (offsetSpan) {
        // 如果偏移量大于一行的跨度
        if (offsetSpan > ROW_SPAN) {
          // 如果offsetSpan 大于12, 则判断要加多少行, 向下取整
          // 计算需要增加的行数
          currentIndex += Math.floor(offsetSpan / ROW_SPAN)
        }

        // 如果偏移量不是一行跨度的倍数
        if (offsetSpan % ROW_SPAN !== 0) {
          // 计算剩余的偏移量
          const oSpan = offsetSpan % ROW_SPAN
          // 如果剩余的偏移量加上项目的跨度大于一行的跨度
          if (ROW_SPAN - oSpan <= span) {
            // 增加一行
            currentIndex += 1
          }
        }
        // 累加剩余的偏移量
        calculateSpan += offsetSpan % ROW_SPAN
      }
      // 累加项目的跨度
      calculateSpan += span
      // 如果累加的跨度大于等于一行的跨度
      if (calculateSpan / ROW_SPAN >= 1) {
        // 增加一行
        currentIndex += 1
        // 重置累加的跨度
        calculateSpan = calculateSpan % ROW_SPAN
      }

      // 如果当前行数等于收起的行数，并且还没有计算过
      if (currentIndex === props.collapsedRows && !isCalculated.value) {
        // 标记为已经计算过
        isCalculated.value = true
        // 如果累加的跨度大于0
        if (calculateSpan > 0) {
          // 设置收起的项目索引为当前项目索引减1
          collapseFormItemIndex.value = index - 1
        } else {
          // 设置收起的项目索引为当前项目索引
          collapseFormItemIndex.value = index + 1
        }
        // 显示展开按钮
        showExpandButton.value = true
      }
    })

    // 如果累加的跨度大于0
    if (calculateSpan > 0) {
      // 增加一行
      currentIndex += 1
    }

    // 如果当前行数小于等于收起的行数
    if (currentIndex <= props.collapsedRows!) {
      // 不显示展开按钮
      showExpandButton.value = false
    }
  }

  /**
   * 监听 showCollapseButton 和 schemas.length 的变化，重新计算表单项目的索引
   */
  watch([() => props.showCollapseButton, () => props.schemas?.length, () => props.collapsed], () => {
    // 重置计算状态
    isCalculated.value = false
    // 重新计算表单项目的索引
    calculateFormItemIndex()
  })

  // 在组件挂载时计算表单项目的索引
  onMounted(() => {
    calculateFormItemIndex()
  })

  return {
    collapseFormItemIndex,
    showExpandButton
  }
}
