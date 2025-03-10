import { provide, ref } from 'vue'
import type { SuModalProps } from './props'
import { deepMerge } from '../../libs/function/index'
import defProps from '../../libs/config/props'
import { cloneDeep } from 'lodash-es'

/**
 * useModal 用到的key
 *
 * @internal
 */
export const modalDefaultOptionKey = '__MODAL_OPTION__'

/**
 * useModal 和组件的props的用法会有冲突，因此不要同时使用，避免参数不是最新的值
 */
export function useModal(selector: string = '') {
  const modalOption = ref<SuModalProps>(cloneDeep(defProps.modal))
  const modalOptionKey = selector ? modalDefaultOptionKey + selector : modalDefaultOptionKey

  provide(modalOptionKey, modalOption)
  const show = (option: SuModalProps) => {
    modalOption.value = deepMerge(modalOption.value, option)
  }

  function openModal(bool: boolean) {
    modalOption.value.modelValue = bool
  }

  function closeModal() {
    openModal(false)
    // 重置为全局的配置
    modalOption.value = cloneDeep(defProps.modal)
  }

  function setModalProps(opt: SuModalProps) {
    modalOption.value = deepMerge(modalOption.value, opt)
  }

  return {
    show,
    openModal,
    setModalProps,
    closeModal
  }
}
