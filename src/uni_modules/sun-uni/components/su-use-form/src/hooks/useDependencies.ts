import { computed, ref, unref, watch } from 'vue'
import { injectRenderFormProps } from '../form-render/context'
import type { MaybeComponentProps, SuUseFormContext, SuUseFormItemDependencies } from '../types/form'
import { isArray, isBoolean, isFunction, isObject } from 'lodash-es'
import type { SuUni } from '../../../../types/uni'
import type { SuValidator } from '../../../../libs/util/validator/type'

/**
 * 用于处理表单字段的依赖关系的自定义Hook。
 *
 * @param getDependencies - 一个函数，返回表单字段的依赖关系。
 * @param formModel - 表单模型对象。
 * @param api - 可选的表单上下文对象。
 * @returns 一个包含表单字段状态和属性的对象。
 */
export function useDependencies(getDependencies: () => SuUseFormItemDependencies | undefined, formModel: SuUni.Recordable, api?: SuUseFormContext) {
  // 如果没有传入api，则从上下文中获取
  let formApi = api
  if (!api) {
    const formRenderProps = injectRenderFormProps()
    formApi = formRenderProps.form!
  }

  // 定义响应式变量
  const isShow = ref(true)
  const isIfShow = ref(true)
  const isDisabled = ref(false)
  const isRequired = ref(false)
  const isReadonly = ref(false)
  const dynamicComponentProps = ref<MaybeComponentProps>({})
  const dynamicRules = ref<SuValidator.RuleItem[]>([])

  /**
   * 计算依赖字段的值。
   * @returns 依赖字段的值。
   */
  const triggerFieldValues = computed(() => {
    // 该字段可能会被多个字段触发
    const triggerFields = getDependencies()?.triggerField ?? 'change'
    return triggerFields
  })

  /**
   * 重置条件状态。
   */
  const resetConditionState = () => {
    isDisabled.value = false
    isIfShow.value = true
    isShow.value = true
    isRequired.value = false
    dynamicRules.value = []
    dynamicComponentProps.value = {}
  }

  /**
   * 监听依赖关系的变化。
   * @param dependencies - 表单字段的依赖关系。
   */
  watch(
    getDependencies,
    async (dependencies) => {
      if (!dependencies) return
      resetConditionState()
      const { componentProps, disabled, ifShow, show, required, rules, trigger, readonly } = dependencies

      // 1. 先判断ifShow，如果if为false，则不渲染dom，后续判断也不再执行
      if (isFunction(ifShow)) {
        isIfShow.value = !!(await ifShow(formModel, formApi))
        if (!isIfShow.value) return
      } else if (isBoolean(ifShow)) {
        isIfShow.value = ifShow
        if (!isIfShow.value) return
      }
      // 2. 判断show，如果show为false，则隐藏
      if (isFunction(show)) {
        isShow.value = !!(await show(formModel, formApi))
        if (!isShow.value) return
      } else if (isBoolean(show)) {
        isShow.value = show
        if (!isShow.value) return
      }

      // 3. 判断是否只读
      if (isFunction(readonly)) {
        isShow.value = !!(await readonly(formModel, formApi))
      } else if (isBoolean(show)) {
        isShow.value = show
      }

      if (isFunction(componentProps)) {
        dynamicComponentProps.value = await componentProps(formModel, formApi)
      }

      if (isFunction(rules)) {
        let newRules = await rules(formModel, formApi)
        if (isObject(newRules)) {
          newRules = [newRules as SuValidator.RuleItem]
        }
        dynamicRules.value = newRules
      } else if (isArray(rules)) {
        dynamicRules.value = rules
        const requiredRule = unref(dynamicRules).find((rule) => Reflect.has(rule, 'required'))

        if (requiredRule) {
          isRequired.value = !!requiredRule.required
        }
      } else if (isObject(rules)) {
        isRequired.value = !!(rules as SuValidator.RuleItem).required
        dynamicRules.value = [rules as SuValidator.RuleItem]
      }

      if (isFunction(disabled)) {
        isDisabled.value = !!(await disabled(formModel, formApi))
      } else if (isBoolean(disabled)) {
        isDisabled.value = disabled
      }

      if (isFunction(required)) {
        isRequired.value = !!(await required(formModel, formApi))
      } else if (isBoolean(required)) {
        isRequired.value = required
      }

      // TODO: 任意触发都会执行，待完成
      if (isFunction(trigger)) {
        await trigger(formModel, formApi)
      }
    },
    { deep: true, immediate: true }
  )

  return {
    isDisabled,
    isIfShow,
    isShow,
    isRequired,
    dynamicRules,
    isReadonly,
    dynamicComponentProps,
    triggerFieldValues
  }
}
