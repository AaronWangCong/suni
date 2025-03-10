<script lang="ts" setup>
import { computed, reactive, ref, unref, watch, watchEffect, type Ref } from 'vue'
import type { SuUseFormCommonConfig, SuUseFormRenderProps, SuUseFormSchema } from '../types/form'
import SuForm from '../../../su-form/su-form.vue'
import FormItem from './FormItem.vue'
import type { SuUni } from '../../../../types/uni'
import { isFunction, set } from 'lodash-es'

import SuRow from '../../../su-row/su-row.vue'
import SuCol from '../../../su-col/su-col.vue'
import { provideFormRenderProps } from './context'
import { useExpandable } from '../hooks/useExpandable'
import type { SuFormEventProvide, SuFormProps } from '../../../su-form/props'
import type { SuUseFormApi } from '../form-api'

interface Props extends SuUseFormRenderProps {
  api: SuUseFormApi
}

const props = withDefaults(defineProps<Props & { globalCommonConfig?: SuUseFormCommonConfig }>(), {
  collapsedRows: 1,
  commonConfig: () => ({}),
  globalCommonConfig: () => ({}),
  showCollapseButton: false
})

const emit = defineEmits(['value-change'])

provideFormRenderProps(props)

/** 表单实例 */
const formRef = ref<SuFormEventProvide | null>(null)

/** FormSchema */
const schemasRef = ref<SuUni.Nullable<SuUseFormSchema[]>>(null)
/** form-model */
const formModel = reactive<SuUni.Recordable>(props.api.form.values)

const { showExpandButton, collapseFormItemIndex } = useExpandable(props, formModel)

const formComponentProps = computed((): SuFormProps => {
  return {
    model: formModel,
    labelPosition: props.layout === 'horizontal' ? 'left' : 'top',
    labelWidth: props.commonConfig.labelWidth
  }
})

const getSchemas = computed(() => {
  let schs = unref(schemasRef) || props.schemas || []
  schs = schs.reduce((prev: SuUseFormSchema[], schema) => {
    if (schema) {
      const { defaultValue } = schema
      if (isFunction(defaultValue)) {
        schema.defaultValue = defaultValue({ model: formModel })
      }

      prev.push(schema as SuUseFormSchema)
    }
    return prev
  }, [])
  return schs
})

const getColProps = computed(() => {
  return (schema: SuUseFormSchema) => {
    return {
      ...(schema.colProps
        ? {
            span: 12,
            ...schema.colProps
          }
        : { span: 12 })
    }
  }
})

// const getIfShow = computed(() => {
//   return (schema: SuUseFormSchema) => {
//     const { isIfShow } = useDependencies(() => schema.dependencies, formModel)
//     return isIfShow.value
//   }
// })

// const getShow = computed(() => {
//   return (schema: SuUseFormSchema) => {
//     const { isShow } = useDependencies(() => schema.dependencies, formModel)
//     return isShow.value
//   }
// })

function setFormModel(key: string, value: any) {
  set(formModel, key, value)
  emit('value-change', formModel)
}

function ifCol(schema: SuUseFormSchema, index: number) {
  if (showExpandButton.value) {
    if (props.collapsed) {
      return collapseFormItemIndex.value > index
    }
    return true
  }
  return true
}

watch(
  () => props.form?.values,
  (val) => {
    console.log(val, 'props.form?.values')
    if (val) Object.keys(val).forEach((key) => setFormModel(key, val[key]))
  },
  { deep: true }
)

watchEffect(() => {
  props.api && props.api.setFormEvent(formRef as Ref<SuFormEventProvide>)
})
</script>

<template>
  <view>
    <SuForm ref="formRef" v-bind="formComponentProps" :custom-class="formClass">
      <SuRow
        v-bind="rowProps"
        :gutter="10"
        :customStyle="{
          flexWrap: 'wrap',
          alignItems: 'flex-start'
        }"
      >
        <template v-for="(schema, index) in getSchemas" :key="schema.field">
          <!-- v-if="getIfShow(schema)" v-show="getShow(schema)" -->
          <SuCol v-bind="getColProps(schema)" v-if="ifCol(schema, index)">
            <FormItem :schema="schema" :formProps="props" :formModel="formModel" :setFormModel="setFormModel"></FormItem>
          </SuCol>
        </template>
      </SuRow>
    </SuForm>
    <slot v-if="showExpandButton" name="collapse" />
    <slot name="action" />
  </view>
</template>
