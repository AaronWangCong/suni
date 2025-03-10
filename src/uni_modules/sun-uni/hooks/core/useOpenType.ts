import type { SuUni } from "../../types/uni"


type SuOpenTypeEmit = {
  (e: 'getuserinfo', data: SuUni.Recordable): void
  (e: 'contact', data: SuUni.Recordable): void
  (e: 'getphonenumber', data: SuUni.Recordable): void
  (e: 'error', data: SuUni.Recordable): void
  (e: 'launchapp', data: SuUni.Recordable): void
  (e: 'opensetting', data: SuUni.Recordable): void
}


/**
 * 用于处理微信小程序开放能力事件的混入
 * @param emit - 一个函数，用于触发自定义事件
 * @returns 一个对象，包含处理各种事件的方法和属性
 */
export function useOpenType(emit: SuOpenTypeEmit) {
  /**
   * 处理用户信息获取事件
   * @param event - 包含用户信息的事件对象
   */
  function onGetUserInfo(event: { detail: SuUni.Recordable }) {
    emit('getuserinfo', event.detail)
  }

  /**
   * 处理客服消息事件
   * @param event - 包含客服消息的事件对象
   */
  function onContact(event: { detail: SuUni.Recordable }) {
    emit('contact', event.detail)
  }

  /**
   * 处理获取手机号码事件
   * @param event - 包含手机号码信息的事件对象
   */
  function onGetPhoneNumber(event: { detail: SuUni.Recordable }) {
    emit('getphonenumber', event.detail)
  }

  /**
   * 处理错误事件
   * @param event - 包含错误信息的事件对象
   */
  function onError(event: UniHelper.BaseEvent) {
    emit('error', event.detail)
  }

  /**
   * 处理打开应用事件
   * @param event - 包含应用信息的事件对象
   */
  function onLaunchApp(event: UniHelper.BaseEvent) {
    emit('launchapp', event.detail)
  }

  /**
   * 处理打开设置事件
   * @param event - 包含设置信息的事件对象
   */
  function onOpenSetting(event: { detail: SuUni.Recordable }) {
    emit('opensetting', event.detail)
  }

  return {
    onGetUserInfo,
    onContact,
    onGetPhoneNumber,
    onError,
    onLaunchApp,
    onOpenSetting
  }
}

export const openProps = {
  openType: String
}

export const openEmit = ['getuserinfo', 'contact', 'getphonenumber', 'error', 'launchapp', 'opensetting']
