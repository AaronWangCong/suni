declare namespace DataCenterAPI {
  type CountryGetPageGETParams = {
    /** id集合 */
    Id?: number[]
    /** 区域id */
    AreaId?: number
    /** 传-1,查*号 */
    Type?: number
    /** 关键字 */
    KeyWord?: string
    /** 选中项的Id */
    SelectedId?: number
    /** 当前页 */
    PageIndex?: number
    /** 每页条数 */
    PageSize?: number
  }

  type CurrencyGetPageGETParams = {
    /** id集合 */
    Id?: number[]
    /** 关键字 */
    KeyWord?: string
    /** 选中项的Id */
    SelectedId?: number
    /** 当前页 */
    PageIndex?: number
    /** 每页条数 */
    PageSize?: number
  }

  type GetCountryOutput = {
    id?: number
    /** 区域id */
    areaId?: number
    /** 区域中文名 */
    areaCnName?: string
    /** 区域英文名 */
    areaEnName?: string
    /** 区域代码 */
    areaCode?: string
    /** 币种id */
    currencyId?: number
    /** 币种代码 */
    currencyCode?: string
    /** 币种中文名 */
    currencyCnName?: string
    /** 币种英文名 */
    currencyEnName?: string
    /** 中文名 */
    cnName?: string
    /** 英文名 */
    enName?: string
    /** 二字代码 */
    digit2Code?: string
    /** 三字代码 */
    digit3Code?: string
    /** 是否不可使用 */
    isUnusable?: boolean
    /** 企业代码类型 */
    enterpriseCodeType?: string
    /** 区号 */
    countryCode?: number
    /** 时差 */
    jetLag?: number
    /** 城市名 */
    countryName?: string
    /** 创建人id */
    createUserId?: number
    /** 创建人 */
    createUser?: string
    /** 创建时间 */
    createTime?: string
    /** 修改人id */
    updateUserId?: number
    /** 修改人 */
    updateUser?: string
    /** 修改时间 */
    updateTime?: string
  }

  type GetCountryOutputUnifyPageResultDto = {
    pagination?: PageInfoOutput
    list?: GetCountryOutput[]
  }

  type GetCurrencyOutput = {
    id?: number
    /** 中文名 */
    cnName?: string
    /** 英文名 */
    enName?: string
    /** 代码 */
    code?: string
    /** 显示代码 */
    displayCode?: string
    /** 符号 */
    sign?: string
    /** 本地化 */
    localized?: string
    /** 排序 */
    sort?: number
    /** 备注 */
    remark?: string
    /** 创建人 */
    createUser?: string
    /** 创建时间 */
    createTime?: string
    /** 修改人 */
    updateUser?: string
    /** 修改时间 */
    updateTime?: string
  }

  type GetCurrencyOutputUnifyPageResultDto = {
    pagination?: PageInfoOutput
    list?: GetCurrencyOutput[]
  }

  type PageInfoOutput = {
    pageIndex?: number
    pageSize?: number
    total?: number
  }
}
