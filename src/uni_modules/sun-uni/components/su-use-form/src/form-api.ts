import { StateHandler } from '../../../libs/shared/stateHandler'
import type { SuUseFormContext, SuUseFormProps, SuUseFormSchema } from './types/form'
import type { SuUni } from '../../../types/uni'
import { toRaw, type Ref } from 'vue'
import { isFunction } from 'lodash-es'
import { mergeWithArrayOverride } from '../../../libs/shared/merge'
import { formatDate } from '../../../libs/shared/date'
import { Store, useStore as sharedStore } from '../../../libs/shared/store'
import type { SuFormEventProvide } from '../../su-form/props'
import { toast } from '../../../libs/function'

export function bindMethods<T extends object>(instance: T): void {
  const prototype = Object.getPrototypeOf(instance)
  const propertyNames = Object.getOwnPropertyNames(prototype)

  propertyNames.forEach((propertyName) => {
    const descriptor = Object.getOwnPropertyDescriptor(prototype, propertyName)
    const propertyValue = instance[propertyName as keyof T]

    if (typeof propertyValue === 'function' && propertyName !== 'constructor' && descriptor && !descriptor.get && !descriptor.set) {
      instance[propertyName as keyof T] = propertyValue.bind(instance)
    }
  })
}

function getDefaultState(): SuUseFormProps {
  return {
    actionWrapperClass: '',
    collapsed: false,
    collapsedRows: 1,
    collapseTriggerResize: false,
    commonConfig: {
      rulesMessageJoinLabel: true,
      autoSetPlaceHolder: true
    },
    handleReset: undefined,
    handleSubmit: undefined,
    handleValuesChange: undefined,
    resetButtonOptions: {
      content: uni.$u.config.i18n('重置'),
      show: true
    },
    schemas: [],
    showCollapseButton: false,
    showDefaultActions: false,
    submitButtonOptions: {
      content: uni.$u.config.i18n('提交'),
      show: true,
      type: 'primary'
    },
    submitValidate: false
  }
}

export class SuUseFormApi {
  public form = {} as SuUseFormContext
  isMounted = false
  public state: null | SuUseFormProps = null
  stateHandler: StateHandler

  public store: Store<SuUseFormProps>

  // form表单函数
  public formEvent: null | Ref<SuFormEventProvide> = null

  // 最后一次点击提交时的表单值
  private latestSubmissionValues: null | SuUni.Recordable<any> = null

  private prevState: null | SuUseFormProps = null

  constructor(options: SuUseFormProps = {}) {
    const { ...storeState } = options
    const defaultState = getDefaultState()

    this.store = new Store<SuUseFormProps>(
      {
        ...defaultState,
        ...storeState
      },
      {
        onUpdate: () => {
          this.prevState = this.state
          this.state = this.store.state
          this.updateState()
        }
      }
    )

    this.state = this.store.state
    this.stateHandler = new StateHandler()
    bindMethods(this)
  }

  /**
   * 获取最近一次提交的表单值
   * @description 返回最近一次提交表单时的表单值，如果没有提交过，则返回一个空对象
   * @returns {SuUni.Recordable<any>} - 返回最近一次提交的表单值
   */
  getLatestSubmissionValues() {
    return this.latestSubmissionValues || {}
  }

  /**
   * 获取当前表单状态
   * @description 返回当前表单的状态对象
   * @returns {SuUseFormProps | null} - 返回当前表单的状态对象，如果表单未挂载，则返回 null
   */
  getState() {
    return this.state
  }

  /**
   * 获取表单的当前值
   * @description 返回表单的当前值，如果表单未挂载，则返回一个空对象
   * @returns {SuUni.Recordable<any>} - 返回表单的当前值
   */
  async getValues() {
    const form = await this.getForm()
    return form.values ? this.handleRangeTimeValue(form.values) : {}
  }

  // async isFieldValid(fieldName: string) {
  //   const form = await this.getForm()
  //   return form.isFieldValid(fieldName)
  // }

  /**
   * 合并多个表单API实例
   * @description 创建一个代理对象，用于合并多个表单API实例，并提供提交所有表单的方法
   * @param {SuUseFormApi} formApi - 要合并的表单API实例
   * @returns {Proxy} - 返回一个代理对象，用于合并多个表单API实例
   */
  merge(formApi: SuUseFormApi) {
    // 创建一个数组，用于存储要合并的表单API实例
    const chain = [this, formApi]
    // 创建一个代理对象，用于合并多个表单API实例
    const proxy = new Proxy(formApi, {
      /**
       * 拦截属性访问
       * @description 拦截对代理对象的属性访问，提供合并和提交所有表单的方法
       * @param {SuUseFormApi} target - 目标对象
       * @param {string} prop - 属性名
       * @returns {any} - 返回属性值
       */
      get(target: any, prop: any) {
        // 如果属性名是 'merge'，则返回一个函数，用于继续合并表单API实例
        if (prop === 'merge') {
          return (nextFormApi: SuUseFormApi) => {
            // 将新的表单API实例添加到链中
            chain.push(nextFormApi)
            // 返回代理对象，以便继续合并
            return proxy
          }
        }
        // 如果属性名是 'submitAllForm'，则返回一个异步函数，用于提交所有表单
        if (prop === 'submitAllForm') {
          return async (needMerge: boolean = true) => {
            try {
              // 使用 Promise.all 并发验证所有表单
              const results = await Promise.all(
                chain.map(async (api) => {
                  // 验证表单
                  const validateResult = await api.validate()
                  // 如果验证失败，则返回
                  if (!validateResult.valid) {
                    return
                  }
                  // 获取表单的原始值
                  const rawValues = toRaw((await api.getValues()) || {})
                  // 返回表单的原始值
                  return rawValues
                })
              )
              // 如果需要合并结果，则将所有结果合并为一个对象
              if (needMerge) {
                const mergedResults = Object.assign({}, ...results)
                // 返回合并后的结果
                return mergedResults
              }
              // 返回所有结果
              return results
            } catch (error) {
              // 如果发生错误，则输出错误信息
              console.error('Validation error:', error)
            }
          }
        }
        // 返回目标对象的属性值
        return target[prop]
      }
    })

    // 返回代理对象
    return proxy
  }

  /**
   * 挂载表单操作
   * @description 将表单操作对象挂载到当前实例，并更新状态和最新提交值
   * @param {SuUseFormContext} formActions - 表单操作对象
   */
  mount(formActions: SuUseFormContext) {
    // 如果表单未挂载
    if (!this.isMounted) {
      // 将表单操作对象的属性合并到当前实例的 form 属性中
      Object.assign(this.form, formActions)
      // 设置状态处理器的条件为真
      this.stateHandler.setConditionTrue()
      // 设置最新提交值为当前表单值的原始副本，并处理时间范围值
      this.setLatestSubmissionValues({
        ...toRaw(this.handleRangeTimeValue(this.form.values))
      })
      // 标记表单已挂载
      this.isMounted = true
    }
  }

  /**
   * 根据字段名移除表单项
   * @param fields
   */
  async removeSchemaByFields(fields: string[]) {
    const fieldSet = new Set(fields)
    const schema = this.state?.schemas ?? []

    const filterSchema = schema.filter((item) => !fieldSet.has(item.field))

    this.setState({
      schemas: filterSchema
    })
  }

  /**
   * 重置表单
   */
  async resetForm() {
    const form = await this.getForm()
    // 获取表单的原始值
    const rawValues = toRaw(await this.getValues())
    await this.state?.handleReset?.(rawValues)
    const initialValues: SuUni.Recordable = {}
    this.state?.schemas?.forEach((item) => {
      if (Reflect.has(item, 'defaultValue')) {
        initialValues[item.field] = item.defaultValue
      }
      if (Reflect.has(form.values || {}, `${item.field}_defaultValue`)) {
        const length = form.values[`${item.field}_defaultValue`].length
        initialValues[`${item.field}_defaultValue`] = Array(length).fill(0)
      }
      if (Reflect.has(form.values || {}, item.textField || `${item.field}_text`)) {
        initialValues[item.textField || `${item.field}_text`] = undefined
      }
    })
    await form.setFieldsValue(initialValues)
    return form.resetForm()
  }

  // async resetValidate() {
  //   const form = await this.getForm()
  //   const fields = Object.keys(form.errors.value)
  //   fields.forEach((field) => {
  //     form.setFieldError(field, undefined)
  //   })
  // }

  /**
   * 设置单个字段的值
   * @description 根据字段名设置表单中单个字段的值
   * @param {string} field - 字段名
   * @param {any} [value] - 字段值，可选
   */
  async setFieldValue(field: string, value?: any) {
    // 获取表单实例
    const form = await this.getForm()
    // 设置表单中指定字段的值
    form.setFieldValue(field, value)
  }

  /**
   * 设置多个字段的值
   * @description 根据传入的键值对设置表单中多个字段的值，并可选择是否清除验证信息
   * @param {SuUni.Recordable} values - 包含字段名和对应值的对象
   */
  async setFieldsValue(values: SuUni.Recordable) {
    // 获取表单实例
    const form = await this.getForm()
    // 设置表单中多个字段的值，并根据 isClearValidate 参数决定是否清除验证信息
    form.setFieldsValue(values)
  }

  /**
   * 设置最新提交的表单值
   * @description 将传入的值设置为最新提交的表单值，并使用 toRaw 函数确保值是原始数据
   * @param {null | SuUni.Recordable<any>} values - 要设置的表单值，可以为 null 或包含键值对的对象
   */
  setLatestSubmissionValues(values: null | SuUni.Recordable<any>) {
    // 将传入的值设置为最新提交的表单值，并使用 toRaw 函数确保值是原始数据
    this.latestSubmissionValues = { ...toRaw(values) }
  }

  /**
   * 设置表单状态
   * @description 根据传入的参数更新表单状态，可以是一个函数或一个对象
   * @param {((prev: SuUseFormProps) => Partial<SuUseFormProps>) | Partial<SuUseFormProps>} stateOrFn - 可以是一个函数或一个对象
   */
  setState(stateOrFn: ((prev: SuUseFormProps) => Partial<SuUseFormProps>) | Partial<SuUseFormProps>) {
    // 如果传入的是一个函数
    if (isFunction(stateOrFn)) {
      // 使用 store 的 setState 方法更新状态，传入的函数会接收当前状态作为参数，并返回一个新的状态对象
      this.store.setState((prev) => {
        // 使用 mergeWithArrayOverride 函数合并新状态和当前状态，确保数组类型的属性被正确合并
        return mergeWithArrayOverride(stateOrFn(prev), prev)
      })
    } else {
      // 如果传入的是一个对象，直接使用 store 的 setState 方法更新状态，传入的对象会与当前状态合并
      this.store.setState((prev) => mergeWithArrayOverride(stateOrFn, prev))
    }
  }

  // /**
  //  * 设置表单值
  //  * @param fields record
  //  * @param filterFields 过滤不在schema中定义的字段 默认为true
  //  * @param shouldValidate
  //  */
  // async setValues(fields: Record<string, any>, filterFields: boolean = true, shouldValidate: boolean = false) {
  //   const form = await this.getForm()
  //   if (!filterFields) {
  //     form.setValues(fields, shouldValidate)
  //     return
  //   }

  //   /**
  //    * 合并算法有待改进，目前的算法不支持object类型的值。
  //    * antd的日期时间相关组件的值类型为dayjs对象
  //    * element-plus的日期时间相关组件的值类型可能为Date对象
  //    * 以上两种类型需要排除深度合并
  //    */
  //   const fieldMergeFn = createMerge((obj, key, value) => {
  //     if (key in obj) {
  //       obj[key] =
  //         !Array.isArray(obj[key]) && isObject(obj[key]) && !isDayjsObject(obj[key]) && !isDate(obj[key]) ? fieldMergeFn(obj[key], value) : value
  //     }
  //     return true
  //   })
  //   const filteredFields = fieldMergeFn(fields, form.values)
  //   form.setValues(filteredFields, shouldValidate)
  // }

  /**
   * 提交表单
   * @description 处理表单提交事件，包括验证表单、提交表单、处理提交后的值以及执行自定义提交处理函数
   * @param {Event} [e] - 表单提交事件对象，可选
   * @returns {Promise<any>} - 返回表单提交后的值
   */
  async submitForm(e?: Event) {
    // 阻止事件的默认行为
    e?.preventDefault()
    // 阻止事件冒泡
    e?.stopPropagation()
    // 如果表单设置了提交验证，则在提交前进行验证
    this.state?.submitValidate && (await this.validate())
    // 获取表单实例
    const form = await this.getForm()
    // 提交表单
    await form.submitForm()
    // 获取表单的原始值
    const rawValues = toRaw(await this.getValues())
    // 如果表单设置了自定义提交处理函数，则执行该函数
    await this.state?.handleSubmit?.(rawValues)
    // 返回表单提交后的值
    return rawValues
  }

  unmount() {
    this.form?.resetForm?.()
    // this.state = null;
    this.latestSubmissionValues = null
    this.isMounted = false
    this.stateHandler.reset()
  }

  /**
   * 更新表单模式
   * @description 根据传入的模式数组更新表单的模式，确保每个模式项都有有效的 `field` 属性
   * @param {Partial<SuUseFormSchema>[]} schema - 包含部分表单模式的数组
   */
  updateSchema(schema: Partial<SuUseFormSchema>[]) {
    // 创建一个新的数组，包含传入的模式
    const updated: Partial<SuUseFormSchema>[] = [...schema]
    // 检查每个模式项是否都有有效的 `field` 属性
    const hasField = updated.every((item) => Reflect.has(item, 'field') && item.field)

    // 如果有任何模式项没有有效的 `field` 属性，则输出错误信息并返回
    if (!hasField) {
      console.error('All items in the schema array must have a valid `field` property to be updated')
      return
    }
    // 获取当前表单的模式
    const currentSchema = [...(this.state?.schemas ?? [])]

    // 创建一个映射对象，用于存储更新后的模式项
    const updatedMap: Record<string, any> = {}

    // 将每个模式项的 `field` 属性作为键，模式项本身作为值，存储到映射对象中
    updated.forEach((item) => {
      if (item.field) {
        updatedMap[item.field] = item
      }
    })

    // 遍历当前表单的模式，根据映射对象中的值更新模式项
    currentSchema.forEach((schema, index) => {
      const updatedData = updatedMap[schema.field]
      if (updatedData) {
        currentSchema[index] = mergeWithArrayOverride(updatedData, schema) as SuUseFormSchema
      }
    })
    // 使用 setState 方法更新表单的模式
    this.setState({ schemas: currentSchema })
  }

  /**
   * 验证表单
   * @description 验证表单并返回验证结果，如果有错误则输出错误信息
   * @param {SuUni.Arrayable<string>} [opts] - 可选的验证选项
   * @returns {Promise<{ valid: boolean; errors: Record<string, any> }>} - 返回验证结果对象，包含是否有效和错误信息
   */
  async validate(opts?: SuUni.Arrayable<string>) {
    // 获取表单实例
    const form = await this.getForm()
    // 验证表单并获取验证结果
    const validateResult = await form.validate(opts)
    // 如果验证结果中存在错误
    if (Object.keys(validateResult?.errors ?? {}).length > 0) {
      // 输出错误信息
      console.error('validate error', validateResult?.errors)
    }
    // 返回验证结果
    return validateResult
  }

  /**
   * 验证并提交表单
   * @description 验证表单的有效性，如果有效则提交表单
   * @returns {Promise<any>} - 返回表单提交后的值，如果表单验证失败则返回 undefined
   */
  async validateAndSubmitForm() {
    // 获取表单实例
    const form = await this.getForm()
    // 验证表单并获取验证结果
    const { valid } = await form.validate()
    // 如果表单验证失败，则返回 undefined
    if (!valid) {
      return
    }
    // 提交表单并返回表单提交后的值
    return await this.submitForm()
  }

  /**
   * 验证指定字段
   * @description 验证表单中的指定字段，并根据状态设置显示验证消息的方式
   * @param {SuUni.Arrayable<string>} fieldName - 要验证的字段名，可以是单个字段名或字段名数组
   * @returns {Promise<any>} - 返回验证结果
   */
  async validateField(fieldName: SuUni.Arrayable<string>) {
    // 获取表单实例
    const form = await this.getForm()
    // 验证指定字段并获取验证结果
    const validateResult = await form.validateField(fieldName)
    // 如果表单状态设置为使用 toast 显示验证消息
    if (this.state?.messageType === 'toast') {
      // 使用 toast 显示验证消息
      toast(validateResult[0].message)
    }
    // 返回验证结果
    return validateResult
  }

  /**
   * 获取表单实例
   * @description 如果表单未挂载，则等待表单挂载完成后返回表单实例，否则直接返回表单实例
   * @returns {Promise<SuUseFormContext>} - 返回表单实例
   * @throws {Error} - 如果表单未挂载，则抛出错误
   */
  private async getForm() {
    // 如果表单未挂载
    if (!this.isMounted) {
      // 等待表单挂载
      await this.stateHandler.waitForCondition()
    }
    // 如果表单实例不存在
    if (!this.form) {
      // 抛出错误
      throw new Error('<SuUseForm /> is not mounted')
    }
    // 返回表单实例
    return this.form
  }

  /**
   * 处理时间范围值
   * @description 根据配置的字段映射关系，将时间范围值转换为指定格式，并删除原始字段
   * @param {Record<string, any>} originValues - 包含原始字段值的对象
   * @returns {Record<string, any>} - 返回处理后的字段值对象
   */
  private handleRangeTimeValue = (originValues: Record<string, any>) => {
    // 创建一个新的对象，包含原始字段值
    const values = { ...originValues }
    // 获取表单状态中的字段映射时间配置
    const fieldMappingTime = this.state?.fieldMappingTime

    // 如果没有字段映射时间配置或配置不是数组，则直接返回原始值
    if (!fieldMappingTime || !Array.isArray(fieldMappingTime)) {
      return values
    }

    // 遍历字段映射时间配置
    fieldMappingTime.forEach(([field, [startTimeKey, endTimeKey], format = 'YYYY-MM-DD']) => {
      // 如果开始时间和结束时间字段存在且值为 null，则删除这两个字段
      if (startTimeKey && endTimeKey && values[field] === null) {
        Reflect.deleteProperty(values, startTimeKey)
        Reflect.deleteProperty(values, endTimeKey)
      }

      // 如果字段值不存在，则删除该字段并返回
      if (!values[field]) {
        Reflect.deleteProperty(values, field)
        return
      }

      // 获取开始时间和结束时间
      const [startTime, endTime] = values[field]
      // 如果格式为 null，则直接使用原始时间值
      if (format === null) {
        values[startTimeKey] = startTime
        values[endTimeKey] = endTime
      } else {
        // 如果格式为数组，则分别使用数组中的格式
        const [startTimeFormat, endTimeFormat] = Array.isArray(format) ? format : [format, format]
        // 将开始时间和结束时间转换为指定格式
        values[startTimeKey] = startTime ? formatDate(startTime, startTimeFormat) : undefined
        values[endTimeKey] = endTime ? formatDate(endTime, endTimeFormat) : undefined
      }
      // 删除原始字段
      Reflect.deleteProperty(values, field)
    })
    // 返回处理后的字段值对象
    return values
  }

  /**
   * 更新表单状态
   * @description 检查当前表单模式与上一次表单模式的差异，处理删除的模式项
   */
  private updateState() {
    // 获取当前表单的模式，如果没有则使用空数组
    const currentSchema = this.state?.schemas ?? []
    // 获取上一次表单的模式，如果没有则使用空数组
    const prevSchema = this.prevState?.schemas ?? []
    // 如果当前表单的模式数量少于上一次表单的模式数量，说明有模式项被删除
    if (currentSchema.length < prevSchema.length) {
      // 创建一个集合，包含当前表单中所有模式项的字段名
      const currentFields = new Set(currentSchema.map((item) => item.field))
      // 过滤出上一次表单中存在但当前表单中不存在的模式项
      const deletedSchema = prevSchema.filter((item) => !currentFields.has(item.field))

      // 遍历被删除的模式项
      for (const schema of deletedSchema) {
        // 将被删除模式项的字段值设置为 undefined
        this.form?.setFieldValue(schema.field, undefined)
      }
    }
  }

  /**
   * 使用共享存储
   * @description 使用共享存储来获取表单状态的一部分或全部
   * @param {function} selector - 一个函数，用于从表单状态中选择需要的部分
   * @returns {T} - 返回选择的表单状态部分
   */
  useStore<T = SuUseFormProps>(selector?: (state: NoInfer<SuUseFormProps>) => T) {
    // 使用共享存储来获取表单状态的一部分或全部
    return sharedStore(this.store, selector)
  }

  /**
   * 设置表单事件
   * @description 将传入的表单事件对象赋值给当前实例的 `formEvent` 属性
   * @param {Ref<SuFormEventProvide>} event - 表单事件对象的引用
   */
  setFormEvent(event: Ref<SuFormEventProvide>) {
    // 将传入的表单事件对象赋值给当前实例的 `formEvent` 属性
    this.formEvent = event
  }

  /**
   * 根据字段名追加表单项
   * @description 根据传入的模式和可选的前缀字段，将新的表单项追加到表单中
   * @param {SuUseFormSchema} schema - 要追加的表单项模式
   * @param {string} [prefixField] - 可选的前缀字段，用于生成新的字段名
   * @param {boolean} [first=false] - 是否将新的表单项追加到表单的开头，默认为 false
   */
  appendSchemaByField(schema: SuUseFormSchema, prefixField?: string, first = false) {
    // 调用表单实例的 appendSchemaByField 方法，将新的表单项追加到表单中
    this.form.appendSchemaByField(schema, prefixField, first)
  }
}
