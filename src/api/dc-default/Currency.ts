// @ts-ignore
/* eslint-disable */
import http from '@/util/http'

/** 币种模糊查询接口 GET /Currency/Page */
export async function CurrencyGetPageGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: DataCenterAPI.CurrencyGetPageGETParams,
  options?: { [key: string]: any }
) {
  return http.request<DataCenterAPI.GetCurrencyOutputUnifyPageResultDto>({
    url: `/dataCenterApi/Currency/Page`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}
