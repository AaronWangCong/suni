import { provide, ref } from "vue"
import type { SuDrawerProps } from "./props"
import { cloneDeep } from "lodash-es"
import defProps from '../../libs/config/props'

export const drawerDefaultOptionKey = '__DRAWER_OPTION__'

export function useDrawer(selector: string = '') {
  const drawerOption = ref<SuDrawerProps>(cloneDeep(defProps.drawer))
  const drawerOptionKey = selector ? drawerDefaultOptionKey + selector : drawerDefaultOptionKey

  provide(drawerOptionKey, drawerOption)

  /** 打开drawer */
  function openDrawer(bool: boolean) {
    drawerOption.value.modelValue = bool
  }

  /** 关闭drawer */
  function closeDrawer() {
    // 重置为全局的配置
    // Object.assign(drawerOption.value, cloneDeep(defProps.drawer))
    openDrawer(false)
  }

  /** 设置props */
  function setDrawerProps(opt: SuDrawerProps) {
    drawerOption.value = opt
  }

  return {
    openDrawer,
    closeDrawer,
    setDrawerProps,
  }
}