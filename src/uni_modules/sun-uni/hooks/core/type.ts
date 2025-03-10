import type { ComputedRef, Ref, ShallowRef, WritableComputedRef } from 'vue'

/**
 * Void function
 */
export type Fn = () => void

/**
 * Any function
 */
export type AnyFn = (...args: any[]) => any

export type Awaited<T> = T extends null | undefined
  ? T // special case for `null | undefined` when not in `--strictNullChecks` mode
  : T extends object & { then: (onfulfilled: infer F, ...args: infer _) => any } // `await` only unwraps object types with a callable `then`. Non-object types are not unwrapped
    ? F extends (value: infer V, ...args: infer _) => any // if the argument to `then` is callable, extracts the first argument
      ? Awaited<V> // recursively unwrap the value
      : never // the argument to `then` was not callable
    : T // non-object or non-thenable

export type Promisify<T> = Promise<Awaited<T>>
export type ArgumentsType<T> = T extends (...args: infer U) => any ? U : never
export type PromisifyFn<T extends AnyFn> = (...args: ArgumentsType<T>) => Promisify<ReturnType<T>>

export type FunctionArgs<Args extends any[] = any[], Return = void> = (...args: Args) => Return
export type MaybeRefOrGetter<T = any> = T | Ref<T> | ShallowRef<T> | WritableComputedRef<T> | ComputedRef<T> | (() => T)

export interface FunctionWrapperOptions<Args extends any[] = any[], This = any> {
  fn: FunctionArgs<Args, This>
  args: Args
  thisArg: This
}

export type EventFilter<Args extends any[] = any[], This = any, Invoke extends AnyFn = AnyFn> = (
  invoke: Invoke,
  options: FunctionWrapperOptions<Args, This>
) => ReturnType<Invoke> | Promisify<ReturnType<Invoke>>

export interface DebounceFilterOptions {
  /**
   * 在调用之前允许延迟的最长时间。以毫秒为单位。
   * 以毫秒为单位。
   */
  maxWait?: MaybeRefOrGetter<number>

  /**
   * Whether to reject the last call if it's been cancel.
   *
   * @default false
   */
  rejectOnCancel?: boolean
}
