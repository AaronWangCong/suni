/**
 * 生成设计相关的前缀类名和变量
 * @param scope - 设计的范围，通常是组件的名称
 * @param prefix - 前缀字符串，默认为 'su'
 * @returns 一个包含前缀类名和前缀变量的对象
 */
export function useDesign(scope: string, prefix?: string) {
  const values = {
    prefixCls: prefix || 'su'
  }

  return {
    prefixCls: `${values.prefixCls}-${scope}`,
    prefixVar: values.prefixCls
  }
}
