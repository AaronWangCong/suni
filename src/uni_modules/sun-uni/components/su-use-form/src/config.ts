import type { Component } from 'vue'
import type { SuUseFormComponentType } from './types/form'

import SuInput from '../../su-input/su-input.vue'
import SuSelect from '../../su-select/su-select.vue'
import SuApiList from '../../su-api-list/su-api-list.vue'
import SuFormCheckbox from '../../su-form-checkbox/su-form-checkbox.vue'
import SuFormRadio from '../../su-form-radio/su-form-radio.vue'

export const COMPONENT_MAP: Record<SuUseFormComponentType, Component> = {
  SuFormInput: SuInput,
  SuFormSelect: SuSelect,
  SuApiList,
  SuFormCheckbox: SuFormCheckbox,
  SuFormRadio: SuFormRadio
}

export const baseEmits = ['submit', 'reset', 'update:model', 'collapse-change']