import { type Slots } from 'vue'
import type { SlotSuUseFormSchema, SuUseFormComponentType, SuUseFormSchema } from '../types/form'
import { isFunction } from 'lodash-es'
import type { SuUni } from '../../../../types/uni'

/**
 * 创建占位符消息
 * @description 根据组件类型创建占位符消息
 * @param {SuUseFormSchema['component']} component - 组件类型
 * @returns {string} - 返回占位符消息
 */
export function createPlaceholderMessage(component: SuUseFormSchema['component']): string {
  const comp = component as SuUseFormComponentType
  // 如果组件类型包含 'Input'，则返回 '请输入'
  if (comp.includes('Input')) {
    return uni.$u.config.i18n('请输入')
  }
  // 如果组件类型包含 'Select' 或 'List'，则返回 '请选择'
  if (comp.includes('Select') || comp.includes('List')) {
    return uni.$u.config.i18n('请选择')
  }
  // 如果组件类型不包含 'Input'、'Select' 或 'List'，则返回空字符串
  return ''
}

/**
 * 判断是否为插槽表单模式
 * @description 判断表单模式是否为插槽表单模式
 * @param {SuUseFormSchema} schema - 表单模式
 * @returns {boolean} - 返回是否为插槽表单模式
 */
export function isSlotFormSchema(schema: SuUseFormSchema): schema is SlotSuUseFormSchema {
  // 如果表单模式中包含 'slot' 属性，则返回 true，否则返回 false
  return 'slot' in schema
}

/**
 * 判断是否为组件表单模式
 * @description 判断表单模式是否为组件表单模式
 * @param {SuUseFormSchema} schema - 表单模式
 * @returns {boolean} - 返回是否为组件表单模式
 */
export function isComponentFormSchema(schema: SuUseFormSchema): schema is SlotSuUseFormSchema {
  // 如果表单模式不是插槽表单模式，则返回 true，否则返回 false
  return !isSlotFormSchema(schema)
}

/**
 * 获取插槽内容
 * @description 根据插槽名称获取插槽内容
 * @param {Slots} slots - 插槽对象
 * @param {string} [slot='default'] - 插槽名称，默认为 'default'
 * @param {any} [data] - 传递给插槽的数据
 * @param {SuUni.Recordable} [opts] - 传递给插槽的选项
 * @returns {any} - 返回插槽内容
 */
export function getSlot(slots: Slots, slot = 'default', data?: any, opts?: SuUni.Recordable) {
  // 如果插槽对象不存在或不包含指定的插槽名称，则返回 null
  if (!slots || !Reflect.has(slots, slot)) {
    return null
  }

  // 如果指定的插槽不是函数，则输出错误信息并返回 null
  if (!isFunction(slots[slot])) {
    console.error(`${slot} is not a function!`)
    return null
  }
  const slotFn = slots[slot]
  if (!slotFn) return null
  const params = { ...data, ...opts }
  // 调用插槽函数并返回结果
  return slotFn(params)
}
