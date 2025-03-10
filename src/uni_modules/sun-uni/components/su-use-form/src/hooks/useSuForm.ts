import { defineComponent, h, isReactive, onBeforeUnmount, watch } from 'vue'
import type { ExtendedSuUseFormApi, SuUseFormComponentType, SuUseFormProps } from '../types/form'
import { SuUseFormApi } from '../form-api'
import { useStore } from '../../../../libs/shared/store'
import SuUseForm from '../../su-use-form.vue'

export function useSuForm<T extends SuUseFormComponentType = SuUseFormComponentType>(options: SuUseFormProps<T>) {
  // #ifdef MP-WEIXIN
  console.error('在小程序使用useSuForm, 可能会导致组件渲染不出来, 请使用useSuWeexForm')
  // #endif

  const IS_REACTIVE = isReactive(options)
  const api = new SuUseFormApi(options)
  const extendedApi: ExtendedSuUseFormApi = api as never
  extendedApi.useStore = (selector) => {
    return useStore(api.store, selector)
  }

  const Form = defineComponent(
    (props: SuUseFormProps, { attrs, slots }) => {
      onBeforeUnmount(() => {
        api.unmount()
      })
      api.setState({ ...props, ...attrs })
      return () => h(SuUseForm, { ...props, ...attrs, formApi: extendedApi }, slots)
    },
    {
      inheritAttrs: false,
      name: 'SuUseForm'
    }
  )
  // Add reactivity support
  if (IS_REACTIVE) {
    watch(
      () => options.schemas,
      () => {
        api.setState({ schemas: options.schemas })
      },
      { immediate: true }
    )
  }
  return [Form, extendedApi] as const
}

export function useSuWeexForm<T extends SuUseFormComponentType = SuUseFormComponentType>(options: SuUseFormProps<T>) {
  const IS_REACTIVE = isReactive(options)
  const api = new SuUseFormApi(options)
  const extendedApi: ExtendedSuUseFormApi = api as never
  extendedApi.useStore = (selector) => {
    return useStore(api.store, selector)
  }

  // Add reactivity support
  if (IS_REACTIVE) {
    watch(
      () => options.schemas,
      () => {
        api.setState({ schemas: options.schemas })
      },
      { immediate: true }
    )
  }
  return extendedApi
}
