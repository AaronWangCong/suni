class InterceptorManager {
  handlers: any[]

  constructor() {
    this.handlers = []
  }

  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use<V, E>(fulfilled: (config: V) => Promise<V>, rejected: (config: E) => Promise<E> | E): number {
    this.handlers.push({
      fulfilled,
      rejected
    })
    return this.handlers.length - 1
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   */
  eject(id: number): void {
    if (this.handlers[id]) {
      this.handlers[id] = null
    }
  }

  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   */
  forEach<T>(fn: (h: T) => void): void {
    this.handlers.forEach((h: T) => {
      if (h !== null) {
        fn(h)
      }
    })
  }
}

export default InterceptorManager
