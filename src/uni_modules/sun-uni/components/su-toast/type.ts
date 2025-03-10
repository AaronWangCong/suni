export type SuToastOptions = {
  zIndex?: number
  loading?: boolean
  text?: string
  icon?: boolean | string
  type?: 'primary' | 'success' | 'error' | 'warning' | 'black' | 'loading' | ''
  loadingMode?: string
  show?: boolean
  overlay?: boolean
  position?: 'center' | 'top' | 'bottom'
  params?: {}
  duration?: number
  isTab?: boolean
  url?: string
  callback?: null
  back?: boolean
  message?: string
  complete?: null | Function
}
