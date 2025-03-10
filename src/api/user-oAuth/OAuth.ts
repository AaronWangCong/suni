// @ts-ignore
/* eslint-disable */
import http from '@/util/http'

/** 飞书浏览器扫码登录 POST /OAuth/BrowserFsSignin */
export async function OAuthBrowserFsSigninPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: UserApi.OAuthBrowserFsSigninPOSTParams,
  options?: { [key: string]: any }
) {
  return http.request<UserApi.LoginOutput>({
    url: `/userApi/OAuth/BrowserFsSignin`,
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 中转中心校验token是否过期 POST /OAuth/CheckTokenIsInvalid */
export async function OAuthCheckTokenIsInvalidPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: UserApi.OAuthCheckTokenIsInvalidPOSTParams,
  options?: { [key: string]: any }
) {
  return http.request<boolean>({
    url: `/userApi/OAuth/CheckTokenIsInvalid`,
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 临时登陆 POST /OAuth/CreateTempToken */
export async function OAuthCreateTempTokenPOST(
  body: UserApi.WMSTempLoginInput,
  options?: { [key: string]: any }
) {
  return http.request<UserApi.UnifyResultDto>({
    url: `/userApi/OAuth/CreateTempToken`,
    method: 'POST',
    header: {
      'Content-Type': 'application/json-patch+json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 飞书应用登录 POST /OAuth/FeiShuLogin */
export async function OAuthFeiShuLoginPOST(
  body: {
    /** 飞书用户Id */
    fsUserId: string
    /** 请求时间 */
    RequestTime: string
    /** 签名 */
    Sign: string
  },
  options?: { [key: string]: any }
) {
  const formData = new FormData()

  Object.keys(body).forEach(ele => {
    const item = (body as any)[ele]

    if (item !== undefined && item !== null) {
      formData.append(
        ele,
        typeof item === 'object' && !(item instanceof File) ? JSON.stringify(item) : item
      )
    }
  })

  return http.request<UserApi.LoginOutput>({
    url: `/userApi/OAuth/FeiShuLogin`,
    method: 'POST',
    data: formData,
    ...(options || {}),
  })
}

/** 飞书应用登录2.0 POST /OAuth/FeiShuLogin20 */
export async function OAuthFeiShuLogin20POST(
  body: {
    /** 应用Code */
    AppCode?: string
  },
  options?: { [key: string]: any }
) {
  const formData = new FormData()

  Object.keys(body).forEach(ele => {
    const item = (body as any)[ele]

    if (item !== undefined && item !== null) {
      formData.append(
        ele,
        typeof item === 'object' && !(item instanceof File) ? JSON.stringify(item) : item
      )
    }
  })

  return http.request<UserApi.LoginOutput>({
    url: `/userApi/OAuth/FeiShuLogin20`,
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /OAuth/GenerateTemporaryLinkCode */
export async function OAuthGenerateTemporaryLinkCodePOST(
  body: UserApi.GenerateTemporaryLinkCodeInput,
  options?: { [key: string]: any }
) {
  return http.request<string>({
    url: `/userApi/OAuth/GenerateTemporaryLinkCode`,
    method: 'POST',
    header: {
      'Content-Type': 'application/json-patch+json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 前端获取token POST /OAuth/GetCustomToken */
export async function OAuthGetCustomPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: UserApi.OAuthGetCustomPOSTParams,
  body: Record<string, any>,
  options?: { [key: string]: any }
) {
  return http.request<UserApi.LoginOutput>({
    url: `/userApi/OAuth/GetCustomToken`,
    method: 'POST',
    header: {
      'Content-Type': 'application/json-patch+json',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /OAuth/GetJsTicketAndSignature */
export async function OAuthGetJsTicketAndSignatureGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: UserApi.OAuthGetJsTicketAndSignatureGETParams,
  options?: { [key: string]: any }
) {
  return http.request<UserApi.GetJsTicketAndSignatureOutput>({
    url: `/userApi/OAuth/GetJsTicketAndSignature`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 汇佰获取刷新token POST /OAuth/GetRefreshToken */
export async function OAuthGetRefreshTokenWithHbPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: UserApi.OAuthGetRefreshTokenWithHbPOSTParams,
  options?: { [key: string]: any }
) {
  return http.request<string>({
    url: `/userApi/OAuth/GetRefreshToken`,
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 前端获取token POST /OAuth/GetSysToken */
export async function OAuthGetSysTokenPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: UserApi.OAuthGetSysTokenPOSTParams,
  options?: { [key: string]: any }
) {
  return http.request<UserApi.LoginOutput>({
    url: `/userApi/OAuth/GetSysToken`,
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /OAuth/GetTokenWithOaInvoke */
export async function OAuthGetTokenWithOaInvokePOST(options?: { [key: string]: any }) {
  return http.request<string>({
    url: `/userApi/OAuth/GetTokenWithOaInvoke`,
    method: 'POST',
    ...(options || {}),
  })
}

/** 根据token获取用户 POST /OAuth/GetUserByToken */
export async function OAuthGetUserByTokenPOST(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: UserApi.OAuthGetUserByTokenPOSTParams,
  options?: { [key: string]: any }
) {
  return http.request<UserApi.UserInfoOutput>({
    url: `/userApi/OAuth/GetUserByToken`,
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** 访客用户发送短信 POST /OAuth/GuestSendMessage */
export async function OAuthGuestSendMessagePOST(
  body: UserApi.SendSmsValidationInput,
  options?: { [key: string]: any }
) {
  return http.request<UserApi.BasicResponseDto>({
    url: `/userApi/OAuth/GuestSendMessage`,
    method: 'POST',
    header: {
      'Content-Type': 'application/json-patch+json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 用户登录 POST /OAuth/Login */
export async function OAuthLoginPOST(
  body: {
    /** 账号/手机号 */
    Account: string
    /** 密码 */
    Password: string
    /** 扩展信息 */
    Extra?: Record<string, any>
  },
  options?: { [key: string]: any }
) {
  const formData = new FormData()

  Object.keys(body).forEach(ele => {
    const item = (body as any)[ele]

    if (item !== undefined && item !== null) {
      formData.append(
        ele,
        typeof item === 'object' && !(item instanceof File) ? JSON.stringify(item) : item
      )
    }
  })

  return http.request<UserApi.LoginOutput>({
    url: `/userApi/OAuth/Login`,
    method: 'POST',
    data: formData,
    ...(options || {}),
  })
}

/** 登录2.0版本 POST /OAuth/Login2.0 */
export async function OAuthLogin20POST(body: UserApi.LoginInput, options?: { [key: string]: any }) {
  return http.request<UserApi.LoginOutput>({
    url: `/userApi/OAuth/Login2.0`,
    method: 'POST',
    header: {
      'Content-Type': 'application/json-patch+json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 用户登录 POST /OAuth/OfflineAndLogin */
export async function OAuthOfflineAndLoginPOST(
  body: {
    /** 账号/手机号 */
    Account: string
    /** 密码 */
    Password: string
    /** 扩展信息 */
    Extra?: Record<string, any>
  },
  options?: { [key: string]: any }
) {
  const formData = new FormData()

  Object.keys(body).forEach(ele => {
    const item = (body as any)[ele]

    if (item !== undefined && item !== null) {
      formData.append(
        ele,
        typeof item === 'object' && !(item instanceof File) ? JSON.stringify(item) : item
      )
    }
  })

  return http.request<UserApi.LoginOutput>({
    url: `/userApi/OAuth/OfflineAndLogin`,
    method: 'POST',
    data: formData,
    ...(options || {}),
  })
}

/** 登录2.0版本(强制下线) POST /OAuth/OfflineAndLogin2.0 */
export async function OAuthOfflineAndLoginPOST_2(
  body: UserApi.LoginInput,
  options?: { [key: string]: any }
) {
  return http.request<UserApi.LoginOutput>({
    url: `/userApi/OAuth/OfflineAndLogin2.0`,
    method: 'POST',
    header: {
      'Content-Type': 'application/json-patch+json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 内部用户退出登录 POST /OAuth/SiginOut */
export async function OAuthSiginOutPOST(options?: { [key: string]: any }) {
  return http.request<boolean>({
    url: `/userApi/OAuth/SiginOut`,
    method: 'POST',
    ...(options || {}),
  })
}

/** 内部手机号登录 POST /OAuth/TelLogin */
export async function OAuthTelLoginPOST(
  body: {
    /** 手机号 */
    TelPhone: string
    /** 通过该手机号发送的短信验证码 */
    MessageCode: string
    SendValidationMessageType?: UserApi.SendValidationMessageType
  },
  options?: { [key: string]: any }
) {
  const formData = new FormData()

  Object.keys(body).forEach(ele => {
    const item = (body as any)[ele]

    if (item !== undefined && item !== null) {
      formData.append(
        ele,
        typeof item === 'object' && !(item instanceof File) ? JSON.stringify(item) : item
      )
    }
  })

  return http.request<UserApi.LoginOutput>({
    url: `/userApi/OAuth/TelLogin`,
    method: 'POST',
    data: formData,
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 POST /OAuth/TemporaryGuestLogin */
export async function OAuthTemporaryGuestLoginPOST(
  body: UserApi.TemporaryGuestLoginInput,
  options?: { [key: string]: any }
) {
  return http.request<UserApi.UnifyResultDto>({
    url: `/userApi/OAuth/TemporaryGuestLogin`,
    method: 'POST',
    header: {
      'Content-Type': 'application/json-patch+json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 内部用户登录发送短信 POST /OAuth/UserLoginSendMessage */
export async function OAuthUserLoginSendMessagePOST(
  body: UserApi.SendSmsValidationInput,
  options?: { [key: string]: any }
) {
  return http.request<UserApi.BasicResponseDto>({
    url: `/userApi/OAuth/UserLoginSendMessage`,
    method: 'POST',
    header: {
      'Content-Type': 'application/json-patch+json',
    },
    data: body,
    ...(options || {}),
  })
}

/** 内部用户登录发送短信，无需图片验证码步骤 POST /OAuth/UserLoginSendMessageNotImg */
export async function OAuthUserLoginSendMessageNotImgPOST(
  body: UserApi.SendSmsInput,
  options?: { [key: string]: any }
) {
  return http.request<UserApi.BasicResponseDto>({
    url: `/userApi/OAuth/UserLoginSendMessageNotImg`,
    method: 'POST',
    header: {
      'Content-Type': 'application/json-patch+json',
    },
    data: body,
    ...(options || {}),
  })
}
