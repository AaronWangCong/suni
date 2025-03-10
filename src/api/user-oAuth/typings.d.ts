declare namespace UserApi {
  type ApiConfigGetStringGETParams = {
    key: string
  }

  type BasicResponseDto = {
    /** 是否成功 */
    success?: boolean
    /** 异常消息 */
    errorMessage?: string
    /** 返回的具体业务数据 */
    data?: any
  }

  type FsData = {
    /** 用户在应用内的唯一标识 */
    open_id?: string
    user_id?: string
    access_token?: string
    /** 30天有效期 */
    refresh_token?: string
  }

  type GenerateTemporaryLinkCodeInput = {
    /** 分享人用户id */
    userId?: number
    /** 页面路由 */
    routePath?: string
    /** 有效期开始时间 */
    startDate?: string
    /** 有效期结束时间 */
    endDate?: string
  }

  type GetJsTicketAndSignatureOutput = {
    needFsBrowserLogin?: boolean
    /** 最新的飞书refresh_token */
    refresh_token?: string
    openId?: string
    signature?: string
    timestamp?: string
    nonceStr?: string
    url?: string
  }

  type LoginInput = {
    /** 账号/手机号 */
    account: string
    /** 密码 */
    password: string
    /** 扩展信息 */
    extra?: Record<string, any>
  }

  type LoginOutput = {
    /** 生成的token */
    token?: string
    /** 用户信息 */
    userInfo?: any
    fsData?: FsData
    /** 是否初始密码 */
    isInitPwd?: boolean
  }

  type OAuthBrowserFsSigninPOSTParams = {
    authorizationCode?: string
  }

  type OAuthCheckTokenIsInvalidPOSTParams = {
    token?: string
  }

  type OAuthGetCustomPOSTParams = {
    token?: string
  }

  type OAuthGetJsTicketAndSignatureGETParams = {
    url?: string
  }

  type OAuthGetRefreshTokenWithHbPOSTParams = {
    token?: string
  }

  type OAuthGetSysTokenPOSTParams = {
    token?: string
  }

  type OAuthGetUserByTokenPOSTParams = {
    token?: string
  }

  type RemoteServiceErrorInfo = {
    code?: string
    message?: string
    details?: string
    data?: Record<string, any>
    validationErrors?: RemoteServiceValidationErrorInfo[]
  }

  type RemoteServiceErrorResponse = {
    error?: RemoteServiceErrorInfo
  }

  type RemoteServiceValidationErrorInfo = {
    message?: string
    members?: string[]
  }

  type SendSmsInput = {
    /** 账号id */
    id?: number
    /** 手机号码 */
    phoneNumber?: string
    /** 邮箱 */
    email?: string
    channel?: VerificationCodeChannelEnum
    sendValidationMessageType?: SendValidationMessageType
  }

  type SendSmsValidationInput = {
    /** 账号id */
    id?: number
    /** 手机号码 */
    phoneNumber?: string
    /** 邮箱 */
    email?: string
    channel?: VerificationCodeChannelEnum
    sendValidationMessageType?: SendValidationMessageType
    /** 图片验证码Guid,作为发送短信的唯一id */
    guid?: string
    /** 用户Id */
    userId?: number
  }

  /** 发送手机验证码类型(0.无 1.修改手机号 2.忘记密码 3.子系统手机号登录 4.系统手机号登录)<br/>&nbsp;&nbsp;&nbsp;&nbsp;无:0; <br/>&nbsp;&nbsp;&nbsp;&nbsp;修改手机号:1; <br/>&nbsp;&nbsp;&nbsp;&nbsp;忘记密码:2; <br/>&nbsp;&nbsp;&nbsp;&nbsp;子系统手机号登录:3; <br/>&nbsp;&nbsp;&nbsp;&nbsp;系统手机号登录:4; <br/>&nbsp;&nbsp;&nbsp;&nbsp;子系统忘记密码:5; <br/>&nbsp;&nbsp;&nbsp;&nbsp;外部用户注册:6; <br/>&nbsp;&nbsp;&nbsp;&nbsp;修改是否业务员:7; <br/>&nbsp;&nbsp;&nbsp;&nbsp;个人中心修改密码:8; <br/>&nbsp;&nbsp;&nbsp;&nbsp;访客用户:9;  */
  type SendValidationMessageType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

  type TemporaryGuestLoginInput = {
    /** 手机号 */
    telPhone: string
    /** 通过该手机号发送的短信验证码 */
    messageCode: string
    sendValidationMessageType?: SendValidationMessageType
    /** 临时码 */
    temporaryGuestCode?: string
  }

  type UnifyResultDto = {
    code?: string
    msg?: string
    data?: any
  }

  type UserInfoOutput = {
    /** id */
    id?: number
    /** 账号 */
    account?: string
    /** 姓名 */
    name?: string
    /** 英文名 */
    enName?: string
    /** 手机号 */
    telPhone?: string
    /** 员工Id */
    employeeId?: number
    /** 公司Id */
    companyId?: number
    /** 用户飞书头像URL */
    feiShuURL?: string
  }

  /** 验证码渠道枚举<br/>&nbsp;&nbsp;&nbsp;&nbsp;手机号:1; <br/>&nbsp;&nbsp;&nbsp;&nbsp;邮箱:2;  */
  type VerificationCodeChannelEnum = 1 | 2

  type WMSTempLoginInput = {
    /** 账号/手机号 */
    account: string
    /** 密码 */
    password: string
    /** 扩展信息 */
    extra?: Record<string, any>
    /** 过期分钟 */
    expiredTime?: number
  }
}
