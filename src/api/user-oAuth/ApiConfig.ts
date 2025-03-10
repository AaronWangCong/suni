// @ts-ignore
/* eslint-disable */
import http from '@/util/http'

/** 此处后端没有提供注释 GET /env */
export async function ApiConfigGetEnvGET(options?: { [key: string]: any }) {
  return http.request<any>({
    url: `/userApi/env`,
    method: 'GET',
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /string/${param0} */
export async function ApiConfigGetStringGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: UserApi.ApiConfigGetStringGETParams,
  options?: { [key: string]: any }
) {
  const { key: param0, ...queryParams } = params
  return http.request<any>({
    url: `/userApi/string/${param0}`,
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  })
}

/** 此处后端没有提供注释 GET /version */
export async function ApiConfigGetVersionGET(options?: { [key: string]: any }) {
  return http.request<any>({
    url: `/userApi/version`,
    method: 'GET',
    ...(options || {}),
  })
}
