import type { SuUni } from '../../../../types/uni'
import type { SuUseFormItemProps } from '../props'
import { computed, h, unref } from 'vue'
import { cloneDeep, isFunction, upperFirst } from 'lodash-es'
import { useDependencies } from './useDependencies'
import type { SuUseFormComponentType, SuUseFormSchema } from '../types/form'
import { createPlaceholderMessage, isComponentFormSchema } from '../form-render/helper'
import { COMPONENT_MAP } from '../config'
import { injectRenderFormProps } from '../form-render/context'

export function useCellItemRender(props: SuUseFormItemProps) {
  const getComponentProps = computed(() => {
    const { schema, formModel } = props
    let { componentProps = {} } = schema
    if (isFunction(componentProps)) {
      componentProps = componentProps({ schema, formModel }) ?? {}
    }

    return componentProps
  })

  return {
    getComponentProps
  }
}

/**
 * 用于处理表单项渲染的自定义Hook。
 *
 * @param props - 表单组件的属性。
 * @returns 一个包含渲染函数和状态的对象。
 */
export function useFormItemRender(props: SuUseFormItemProps) {
  // 使用useDependencies自定义Hook获取表单项的依赖状态
  const {
    isIfShow,
    isShow: globIsShow,
    isReadonly,
    isDisabled,
    dynamicRules: globDynamicRules,
    isRequired,
    triggerFieldValues: globTriggerFieldValues
  } = useDependencies(() => props.schema.dependencies, props.formModel)

  // 从上下文中获取表单渲染的属性
  const formRenderProps = injectRenderFormProps()
  // 获取表单实例
  const formApi = formRenderProps.form!

  /**
   * 计算组件属性。
   * @returns 组件属性。
   */
  const getComponentProps = computed(() => {
    const { schema, formModel, formProps } = props
    const newSchema = {
      ...(formProps.commonConfig || {}),
      ...schema
    }
    let { componentProps = {} } = newSchema

    if (isFunction(componentProps)) {
      componentProps = componentProps({ schema, formModel }) ?? {}
    }

    return componentProps
  })

  /**
   * 计算表单组件的属性。
   * @returns 表单组件的属性。
   */
  const getFormComponentProps = computed(() => {
    const { formProps, schema } = props
    let { formItemProps: commonFormItemProps = {} } = formProps.commonConfig || {}
    let { formItemProps = {} } = schema
    return {
      ...commonFormItemProps,
      ...formItemProps
    }
  })

  /**
   * 处理表单项的验证规则。
   * @param schema - 可选的表单模式。
   * @returns 表单项的验证规则。
   */
  function handleItemRules(schema?: SuUseFormSchema) {
    let defRules = cloneDeep(unref(globDynamicRules))
    let newSchema = props.schema
    let required = unref(isRequired)
    let trigger = unref(globTriggerFieldValues)
    let isIf = unref(globIsShow)
    if (schema) {
      const { dynamicRules, isRequired: sIsRequired, triggerFieldValues, isShow } = useDependencies(() => schema?.dependencies, props.formModel)
      defRules = cloneDeep(unref(dynamicRules))
      newSchema = schema
      required = unref(sIsRequired)
      trigger = unref(triggerFieldValues)
      isIf = unref(isShow)
    }
    const { dependencies, rulesMessageJoinLabel, component, label } = newSchema
    if (isFunction(dependencies?.rules)) {
      return defRules
    }

    const { rulesMessageJoinLabel: globRulesMessageJoinLabel } = props.formProps.commonConfig ?? {}
    const isJoinLabel = Reflect.has(newSchema, 'rulesMessageJoinLabel') ? rulesMessageJoinLabel : globRulesMessageJoinLabel
    let message = createPlaceholderMessage(component)
    if (isJoinLabel) message = `${message}${uni.$u.config.isCH ? label || ' ' : ''}`
    if (required) {
      const requiredRules = [{ required, message, trigger: trigger || 'change' }]
      if (!defRules || !defRules.length) {
        defRules = [...requiredRules]
      } else {
        const requiredIndex: number = defRules.findIndex((rule) => Reflect.has(rule, 'required'))
        if (requiredIndex === -1) {
          defRules = defRules.concat([...requiredRules])
        }
      }
    }

    const requiredRuleIndex = defRules.findIndex((rule) => Reflect.has(rule, 'required') && !Reflect.has(rule, 'validator'))
    if (requiredRuleIndex !== -1) {
      const rule = defRules[requiredRuleIndex]
      if (!isIf) {
        rule.required = false
      }

      if (trigger) {
        rule.trigger = trigger
      }
    }
    return defRules
  }

  /**
   * 获取组件的属性。
   * @returns 组件的属性。
   */
  function getCompProps() {
    const { schema, formProps, setFormModel, formModel } = props
    const { autoSetPlaceHolder: globAutoSetPlaceHolder } = formProps.commonConfig || {}

    const { component, field, changeEvent = 'update:modelValue', label, autoSetPlaceHolder } = schema
    const modelValue = formModel[field]
    const eventKey = `on${upperFirst(changeEvent)}`

    const propsData: SuUni.Recordable = {
      ...unref(getComponentProps),
      disabled: unref(isDisabled),
      readonly: unref(isReadonly)
    }

    const on = {
      [eventKey]: (...args: SuUni.Nullable<SuUni.Recordable>[]) => {
        const value = args[0]
        if (propsData[eventKey] && isFunction(propsData[eventKey])) {
          propsData[eventKey](...args)
        }
        setFormModel(field, value, schema)
      }
    }

    const isCreatePlaceholder = !propsData.disabled && (globAutoSetPlaceHolder || autoSetPlaceHolder)

    if (isCreatePlaceholder && component) {
      propsData.placeholder =
        unref(getComponentProps)?.placeholder || isCreatePlaceholder
          ? `${createPlaceholderMessage(component)}${label}`
          : createPlaceholderMessage(component)
    }

    const bindValue = {
      [schema.modelPropName || 'modelValue']: modelValue
    }

    const compAttr = {
      ...propsData,
      ...on,
      ...bindValue
    }

    return compAttr
  }

  return {
    handleItemRules,
    isIfShow,
    isDisabled,
    isReadonly,
    isShow: globIsShow,
    isRequired,
    getFormComponentProps,
    getCompProps
  }
}
