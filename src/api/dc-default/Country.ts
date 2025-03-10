// @ts-ignore
/* eslint-disable */
import http from '@/util/http'

/** 国家模糊查询接口 GET /Country/Page */
export async function CountryGetPageGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: DataCenterAPI.CountryGetPageGETParams,
  options?: { [key: string]: any }
) {
  return http.request<DataCenterAPI.GetCountryOutputUnifyPageResultDto>({
    url: `/dataCenterApi/Country/Page`,
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}
