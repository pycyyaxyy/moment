import { AxiosRequestConfig, AxiosResponse } from "axios"

export interface PERequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any

  //这里原来直接写的是responseInterceptor?: (res: AxiosResponse) => AxiosResponse
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (err: any) => any
}

export interface PERequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: PERequestInterceptors<T>
  showLoading?: boolean
}
