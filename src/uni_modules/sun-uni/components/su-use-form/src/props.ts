import type { ExtractPropTypes, PropType } from 'vue'
import type { SuUseFormProps, SuUseFormSchema } from './types/form'
import type { SuUni } from '../../../types/uni'

export const formItemProps = {
  /**
   * 表单项的配置对象
   */
  schema: {
    type: Object as PropType<SuUseFormSchema>,
    default: () => ({})
  },
  /**
   * 表单的属性对象
   */
  formProps: {
    type: Object as PropType<SuUseFormProps>,
    default: () => ({})
  },
  /**
   * 表单的数据模型对象
   */
  formModel: {
    type: Object as PropType<SuUni.Recordable>,
    default: () => ({})
  },
  /**
   * 设置表单数据模型的函数
   */
  setFormModel: {
    type: Function as PropType<(key: string, value: any, schema?: SuUseFormSchema) => void>,
    default: null
  }
}

/** SuUseFormItem props 类型 */ 
export type SuUseFormItemProps = ExtractPropTypes<typeof formItemProps>
