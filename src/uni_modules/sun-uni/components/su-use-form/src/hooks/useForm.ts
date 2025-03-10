import type { SuUni } from '../../../../types/uni'
import type { BaseEmitsType, SuUseFormContext, SuUseFormSchema } from '../types/form'
import { cloneDeep, isArray, isObject, isString, set } from 'lodash-es'
import { createContext } from '../../../../libs/shared/createContext'
import type { SuFormEventProvide } from '../../../su-form/props'
import { unref } from 'vue'
import type { SuUseFormApi } from '../form-api'

/**
 * 创建并提供表单事件属性的上下文。
 * @returns 一个包含注入和提供函数的数组。
 */
export const [injectFormEventProps, provideFormEventProps] = createContext<SuFormEventProvide>('SuFormEvent')

/**
 * 用于处理表单操作的自定义Hook。
 *
 * @param formModel - 表单模型对象。
 * @param formApi - 表单API对象。
 * @param emit - 事件发射器。
 * @returns 一个包含表单操作方法的对象。
 */
export function useForm(formModel: SuUni.Recordable, formApi: SuUseFormApi, emit: BaseEmitsType): SuUseFormContext {
  /**
   * 提交表单。
   * @returns 一个Promise，在表单提交后解析。
   */
  async function submitForm() {
    emit('submit', formModel)
  }

  /**
   * 重置表单。
   * @returns 一个Promise，在表单重置后解析。
   */
  async function resetForm() {
    resetFields()
    emit('reset')
  }

  /**
   * 设置表单字段的值。
   *
   * @param field - 字段名称。
   * @param value - 字段值。
   */
  function setFieldValue(field: string, value?: SuUni.Recordable) {
    // 使用Lodash的set函数设置表单模型中的字段值
    set(formModel, field, value)
  }

  /**
   * 设置多个表单字段的值。
   *
   * @param values - 包含字段名称和值的对象。
   * @returns 一个Promise，在字段值设置后解析。
   */
  async function setFieldsValue(values: SuUni.Recordable) {
    Object.keys(values).forEach((key) => {
      set(formModel, key, values[key])
    })
  }

  /**
   * 重置表单字段。
   *
   * @returns 一个Promise，在字段重置后解析。
   */
  async function resetFields() {
    // 清除验证状态
    clearValidate()
    // 调用表单事件的resetFields方法
    unref(formApi.formEvent)?.resetFields()
  }

  /**
   * 获取表单字段的值。
   *
   * @returns 表单字段的值。
   */
  function getFieldsValue() {
    return formModel
  }

  /**
   * 清除表单验证状态。
   *
   * @returns 一个Promise，在验证状态清除后解析。
   */
  async function clearValidate() {
    // 调用表单事件的clearValidate方法
    unref(formApi.formEvent)?.clearValidate()
  }

  /**
   * 更新表单模式。
   *
   * @param schemas - 包含部分表单模式的数组。
   * @returns 一个Promise，在模式更新后解析。
   */
  async function updateSchema(schemas: Partial<SuUseFormSchema>[]) {
    // 调用表单API的updateSchema方法
    unref(formApi).updateSchema(schemas)
  }

  /**
   * 重置表单模式。
   *
   * @param data - 表单模式或模式数组。
   * @returns 一个Promise，在模式重置后解析。
   */
  async function resetSchema(data: SuUseFormSchema | SuUseFormSchema[]) {
    let updateData: SuUseFormSchema[] = []
    // 如果data是一个对象，则将其转换为数组
    if (isObject(data)) updateData.push(data as SuUseFormSchema)

    // 如果data是一个数组，则直接使用它
    if (isArray(data)) updateData = [...data]

    // 调用表单API的setState方法，更新模式
    unref(formApi).setState({ schemas: updateData })
  }

  /**
   * 根据字段名称移除表单模式。
   *
   * @param fields - 字段名称或名称数组。
   * @returns 一个Promise，在模式移除后解析。
   */
  async function removeSchemaByField(fields: string | string[]) {
    if (!fields) return
    const schemaList = cloneDeep(unref(formApi).state?.schemas || [])
    let fieldList: string[] = isString(fields) ? [fields] : fields
    if (isString(fields)) fieldList = [fields]
    // 遍历字段列表，移除每个字段对应的模式
    for (const field of fieldList) _removeSchemaByFiled(field, schemaList)
    // 调用表单API的setState方法，更新模式列表
    unref(formApi).setState({ schemas: schemaList })
  }

  /**
   * 根据字段名称移除表单模式的辅助函数。
   *
   * @param field - 字段名称。
   * @param schemaList - 表单模式列表。
   */
  const _removeSchemaByFiled = (field: string, schemaList: SuUseFormSchema[]): void => {
    if (isString(field)) {
      // 查找字段对应的模式索引
      const index = schemaList.findIndex((schema) => schema.field === field)
      if (index !== -1) {
        delete formModel[field]
        // 从模式列表中移除模式
        schemaList.splice(index, 1)
      }
    }
  }

  /**
   * 根据字段名称追加表单模式。
   *
   * @param schema - 要追加的表单模式。
   * @param prefixField - 前缀字段名称。
   * @param first - 是否将模式追加到列表的开头。
   * @returns 一个Promise，在模式追加后解析。
   */

  async function appendSchemaByField(schema: SuUseFormSchema, prefixField?: string, first = false) {
    const schemaList = cloneDeep(unref(formApi).state?.schemas || [])
    const index = schemaList.findIndex((schema) => schema.field === prefixField)
    const hasInList = schemaList.some((item) => item.field === prefixField || schema.field)
    if (!hasInList) return
    if (!prefixField || index === -1 || first) {
      // 如果没有前缀字段或前缀字段不存在，或者first为true，则将模式追加到列表的开头或结尾
      first ? schemaList.unshift(schema) : schemaList.push(schema)
      unref(formApi).setState({ schemas: schemaList })
      return
    }
    if (index !== -1) schemaList.splice(index + 1, 0, schema)
    unref(formApi).setState({ schemas: schemaList })
  }

  /**
   * 验证表单字段。
   *
   * @param fields - 要验证的字段名称或名称数组。
   * @returns 一个Promise，在字段验证后解析。
   */
  async function validateField(fields?: SuUni.Arrayable<string>) {
    return new Promise((resolve, reject) => {
      if (!fields) {
        resolve([])
      } else {
        unref(formApi.formEvent)?.validateField(fields, (errors: SuUni.Recordable) => {
          if (errors.length) {
            reject(errors)
          } else {
            resolve([])
          }
        })
      }
    })

    // 调用表单事件的validate方法，验证指定字段
    // return await unref(formApi.formEvent)?.validate(fields)
  }

  /**
   * 验证整个表单。
   * @returns 一个Promise，在表单验证后解析。
   */
  async function validate() {
    return await unref(formApi.formEvent)?.validate()
  }

  /**
   * 获取表单的模式。
   *
   * @returns 表单的模式数组。
   */
  function getFormSchema() {
    // 返回表单API的状态中的模式数组，如果不存在则返回空数组
    return unref(formApi).state?.schemas || []
  }

  return {
    values: formModel,
    submitForm,
    resetForm,
    setFieldValue,
    setFieldsValue,
    resetFields,
    getFieldsValue,
    clearValidate,
    updateSchema,
    resetSchema,
    removeSchemaByField,
    appendSchemaByField,
    validateField,
    validate,
    getFormSchema
  }
}
