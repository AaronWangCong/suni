import { computed } from 'vue'
import type { SuUseFormRenderProps } from '../types/form'
import { createContext } from '../../../../libs/shared/createContext'

export const [injectRenderFormProps, provideFormRenderProps] = createContext<SuUseFormRenderProps>('SuFormRenderProps')

export const useFormContext = () => {
  const formRenderProps = injectRenderFormProps()

  const isVertical = computed(() => formRenderProps.layout === 'vertical')

  const componentMap = computed(() => formRenderProps.componentMap)
  // const componentBindEventMap = computed(
  //   () => formRenderProps.componentBindEventMap,
  // );
  return {
    // componentBindEventMap,
    componentMap,
    isVertical
  }
}
