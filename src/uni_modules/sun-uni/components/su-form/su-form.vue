<template>
  <view class="su-form">
    <slot />
  </view>
</template>

<script lang="ts" setup>
import { FORM_KEY, formProps, type SuFormProps } from './props'
import Schema from '../../libs/util/validator'
import { toast, error } from '../../libs/function/index'
import test from '../../libs/function/test'
import { watch, ref, computed, nextTick, unref, getCurrentInstance } from 'vue'
import type { SuValidator } from '../../libs/util/validator/type'
import { baseProps } from '../../libs/vue'
import { useChildren } from '../../hooks/core/useChildren'
import { cloneDeep, get, set } from 'lodash-es'
import type { SuUni } from '../../types/uni'
import { provideFormEventProps } from '../su-use-form/src/hooks/useForm'

// 去除警告信息
Schema.warning = function () {}
/**
 * Form 表单
 * @description 此组件一般用于表单场景，可以配置Input输入框，Select弹出框，进行表单验证等。
 * @tutorial https://suni.pages.dev/sun-uni/component/form.html
 * @property {Object}						model			当前form的需要验证字段的集合
 * @property {Object | Function | Array}	rules			验证规则
 * @property {String}						errorType		错误的提示方式，见上方说明 ( 默认 message )
 * @property {Boolean}						borderBottom	是否显示表单域的下划线边框   ( 默认 true ）
 * @property {String}						labelPosition	表单域提示文字的位置，left-左侧，top-上方 ( 默认 'left' ）
 * @property {String | Number}				labelWidth		提示文字的宽度，单位px  ( 默认 45 ）
 * @property {String}						labelAlign		lable字体的对齐方式   ( 默认 ‘left' ）
 * @property {Object}						labelStyle		lable的样式，对象形式
 * @example <su-formlabelPosition="left" :model="model1" :rules="rules" ref="form1"></su-form>
 */

defineOptions({
  name: 'su-form',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
})

const props = defineProps({
  ...formProps,
  ...baseProps
})

const { internalChildren, linkChildren } = useChildren(FORM_KEY)

const formRules = ref<SuValidator.Rules>({})
const validator = ref<Schema>()
/** 原始的model快照，用于resetFields方法重置表单时使用 */
const originalModel = ref<SuFormProps['model'] | null>(null)
// const children = ref([])

const propsChange = computed(() => {
  return [props.errorType, props.borderBottom, props.labelPosition, props.labelWidth, props.labelAlign, props.labelStyle]
})

linkChildren({
  props: {
    model: props.model!,
    rules: props.rules,
    labelPosition: props.labelPosition,
    labelAlign: props.labelAlign,
    labelStyle: props.labelStyle,
    labelWidth: props.labelWidth,
    errorType: props.errorType
  },
  originalModel
})

/** 手动设置校验的规则，如果规则中有函数的话，微信小程序中会过滤掉，所以只能手动调用设置规则 */
function setRules(rules: SuValidator.Rules) {
  if (Object.keys(rules).length === 0) return
  if (process.env.NODE_ENV === 'development' && Object.keys(props.model!).length === 0) {
    error('设置rules，model必须设置！如果已经设置，请刷新页面。')
    return
  }
  formRules.value = rules
  validator.value = new Schema(rules)
}

/** 清空所有u-form-item组件的内容，本质上是调用了u-form-item组件中的resetField()方法 */
function resetFields() {
  resetModel()
}

function resetModel() {
  // // 历遍所有u-form-item，根据其prop属性，还原model的原始快照
  internalChildren.map((child) => {
    const prop = child!.props!.prop as string
    const value = get(originalModel.value!, prop)
    set(props.model!, prop, value)
  })
}

/** 清空校验结果 */
function clearValidate(fields?: string | string[]) {
  if (!fields) fields = []
  if (typeof fields === 'string') fields = [fields]
  internalChildren.map((child) => {
    // 如果u-form-item的prop在props数组中，则清除对应的校验结果信息
    if (fields[0] === undefined || fields.includes(child!.props!.prop as string)) {
      // child.message = null
      child.exposed!.clearValidate()
    }
  })
}

/** 对部分表单字段进行校验 */
function validateField(fields: string | string[], callback: SuValidator.Callback, event: SuValidator.TriggerType | null = null) {
  nextTick(() => {
    const errorsRes: SuUni.Recordable[] = []
    // 如果为字符串，转为数组
    if (!fields) fields = []
    if (typeof fields === 'string') {
      fields = [fields]
    }
    let promises = internalChildren.map((child) => {
      return new Promise((resolve) => {
        const childErrors: any[] = []
        const field = child!.props!.prop as string
        if (fields.includes(field)) {
          const propertyVal = get(props.model!, field)
          const propertyChain = field.split('.')
          const propertyName = propertyChain.join('')
          let rule: SuValidator.Rule = []
          const itemRules = unref(child.exposed!.getRules)
          if (itemRules && itemRules.length > 0) {
            rule = itemRules
          } else {
            rule = formRules.value[field]
          }
          if (!rule) {
            resolve(void 0)
            return
          }
          // rule规则可为数组形式，也可为对象形式，此处拼接成为数组
          let rules: SuValidator.RuleItem[] = []
          if (rule instanceof Object) rules = rules.concat(rule)
          if (rule instanceof Array) rules = rule
          if (!rules.length) resolve(void 0)
          for (let i = 0; i < rules.length; i++) {
            const ruleItem = rules[i]
            // 将u-form-item的触发器转为数组形式
            let trigger = []
            if (typeof ruleItem.trigger === 'string') {
              trigger = [ruleItem.trigger]
            } else {
              trigger = ruleItem.trigger || []
            }

            if (event && !trigger.includes(event)) {
              resolve(void 0)
              continue
            }

            const validator = new Schema({
              [propertyName]: ruleItem
            })
            validator.validate(
              {
                [propertyName]: propertyVal
              },
              (errors, fields) => {
                if (test.array(errors)) {
                  errors!.forEach((element: any) => {
                    element.prop = field
                  })
                  errorsRes.push(...errors!)
                  childErrors.push(...errors!)
                }
                const message = childErrors[0]?.message ? childErrors[0].message : null
                child.exposed!.setMessage(message)

                if (i == rules.length - 1) {
                  resolve(errorsRes)
                }
              }
            )
          }
        } else {
          resolve({})
        }
      })
    })

    Promise.all(promises)
      .then(() => {
        // 执行回调函数
        typeof callback === 'function' && callback(errorsRes)
      })
      .catch((error) => {
        console.error('An error occurred:', error)
      })
  })
}

/** 校验 */
function validate(): Promise<SuValidator.ValidateResult> | boolean {
  // 开发环境才提示，生产环境不会提示
  const formItemRules = internalChildren.map((item) => item!.exposed!.getRules)
  if (process.env.NODE_ENV === 'development' && Object.keys(formRules.value).length === 0 && formItemRules.length === 0) {
    error('未设置rules，请看文档说明！如果已经设置，请刷新页面。')
    return false
  }
  return new Promise((resolve, reject) => {
    // $nextTick是必须的，否则model的变更，可能会延后于validate方法
    nextTick(() => {
      // 获取所有form-item的prop，交给validateField方法进行校验
      const formItemProps = internalChildren.map((item) => item!.props!.prop as string)
      validateField(formItemProps, (errors: SuUni.Recordable) => {
        if (errors.length) {
          // 如果错误提示方式为toast，则进行提示
          if (['toast'].includes(props.errorType!)) {
            toast(errors[0].message)
          }
          reject(errors)
        } else {
          resolve(true)
        }
      })
    })
  })
}

/* 初始化 */
function init() {
  nextTick(() => {
    if (internalChildren.length)
      internalChildren.map((child) => {
        typeof child.exposed!.updateParentData == 'function' && child.exposed!.updateParentData()
      })
  })
}

watch(
  () => props.rules,
  (val) => {
    setRules(val!)
  },
  {
    immediate: true
  }
)

watch(
  () => propsChange.value,
  () => {
    init()
  },
  {
    immediate: true,
    deep: true
  }
)

watch(
  () => props.model,
  () => {
    if (!originalModel.value) originalModel.value = cloneDeep(props.model)
  },
  {
    immediate: true
  }
)

const formProvide = {
  setRules,
  validate,
  validateField,
  clearValidate,
  resetFields
}
defineExpose(formProvide)

provideFormEventProps({
  form: getCurrentInstance()!,
  ...formProvide
})
</script>
