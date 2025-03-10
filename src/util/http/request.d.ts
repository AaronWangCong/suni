import type { HttpRequestAbstract, HttpRequestConfig, HttpResponse, HttpTask } from '@/uni_modules/sun-uni/libs/luch-request/index.d'

export type HttpRequestParameters<T extends (...args: any) => any = any> =
  Parameters<T>[0]

export type ArrayItemType<T> = T extends (infer k)[] ? k : never

export type UniHttpRequestConfig<T> = HttpRequestConfig<T> & {
  requestType?: string;
  instanceConfig?: HttpRequestConfig;
}

export type ApiResponse<T> = T extends HttpResponseData<T> ? T['data'] : T

export interface UniHttpResponse<T> extends HttpResponse<T> {
  code: T['code'];
  message: T['message'] & T['msg'];
  data: ApiResponse<T>;
  [key: string]: any;
}

export interface HttpRequest extends HttpRequestAbstract {
  request: <T = any, R = UniHttpResponse<T>, D = HttpTask>(
    config: UniHttpRequestConfig<D>,
  ) => Promise<R>;
}

export interface HttpResponseData<T = unknown> {
  code?: number;
  message?: string;
  msg?: string;
  data?: T;
}

export type HttpResponseReturnType<U> =
  ReturnType<U> extends Promise<infer T>
    ? T extends HttpResponse<infer K>
      ? K
      : never
    : never

export type HttpDataReturnType<U> =
  ReturnType<U> extends Promise<infer T>
    ? T extends UniHttpResponse<infer K>
      ? K extends HttpResponseData<infer J>
        ? J
        : never
      : never
    : never
