function getFirstNonNullOrUndefined<T>(...values: (null | T | undefined)[]): T | undefined {
  for (const value of values) {
    if (value !== undefined && value !== null) {
      return value
    }
  }
  return undefined
}

export { getFirstNonNullOrUndefined }
