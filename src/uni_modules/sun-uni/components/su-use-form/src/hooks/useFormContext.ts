import { createContext } from '../../../../libs/shared/createContext'
import { computed, unref, useSlots, type ComputedRef } from 'vue'
import type { BaseEmitsType, ExtendedSuUseFormApi, SuUseFormActions, SuUseFormProps } from '../types/form'
import { useForm } from './useForm'
import type { SuUseFormApi } from '../form-api'

/**
 * 扩展的表单属性接口
 * @description 定义了扩展的表单属性接口，继承自 SuUseFormProps，并添加了 formApi 属性
 * @template T - 表单组件类型，默认为 SuUseFormComponentType
 * @extends {SuUseFormProps<T>} - 继承自 SuUseFormProps<T>
 * @property {ExtendedSuUseFormApi} [formApi] - 扩展的表单 API
 */
interface ExtendFormProps extends SuUseFormProps {
  formApi?: ExtendedSuUseFormApi
}

/**
 * 创建表单属性上下文
 * @description 使用 createContext 函数创建一个表单属性上下文，包含表单属性和表单操作
 * @template T - 表单组件类型，默认为 SuUseFormComponentType
 * @param {string} name - 上下文的名称
 * @returns {[ComputedRef<ExtendFormProps> | ExtendFormProps, SuUseFormActions]} - 返回一个包含表单属性和表单操作的元组
 */
export const [injectFormProps, provideFormProps] = createContext<[ComputedRef<ExtendFormProps> | ExtendFormProps, SuUseFormActions]>('SuUseFormProps')

/**
 * 使用表单初始值
 * @description 使用表单初始值，包括生成初始值、创建表单实例和处理委托插槽
 * @param {ComputedRef<SuUseFormProps> | SuUseFormProps} props - 表单属性
 * @param {SuUseFormApi} formApi - 表单 API
 * @param {BaseEmitsType} emit - 事件发射器
 * @returns {Object} - 返回一个包含委托插槽和表单实例的对象
 */
export function useFormInitial(props: ComputedRef<SuUseFormProps> | SuUseFormProps, formApi: SuUseFormApi, emit: BaseEmitsType) {
  // 获取当前组件的插槽
  const slots = useSlots()
  // 生成初始值
  const initialValues = generateInitialValues()
  // 使用表单 API 和初始值创建表单实例
  const form = useForm(
    {
      // 如果初始值存在，则将其作为表单的初始值
      ...(Object.keys(initialValues)?.length ? { initialValues } : {})
    },
    formApi,
    emit
  )

  // 计算委托插槽
  const delegatedSlots = computed(() => {
    const resultSlots: string[] = []

    for (const key of Object.keys(slots)) {
      if (key !== 'default') {
        resultSlots.push(key)
      }
    }
    return resultSlots
  })

  /**
   * 生成初始值
   * @description 根据表单属性和模式生成初始值
   * @returns {Record<string, any>} - 返回一个包含初始值的对象
   */
  function generateInitialValues() {
    // 获取表单的初始值
    const initialValues: Record<string, any> = unref(props).model || {}
    // 获取表单的模式
    const schemas = unref(props).schemas || []
    // 遍历模式，将默认值添加到初始值中
    schemas.forEach((item) => {
      if (Reflect.has(item, 'defaultValue')) {
        initialValues[item.field] = item.defaultValue
      }
    })
    return initialValues
  }

  return {
    delegatedSlots,
    form
  }
}
