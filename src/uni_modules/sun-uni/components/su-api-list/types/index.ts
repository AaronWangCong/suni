/**
 * 定义一个类型 SuApiListPageConfigProps，用于描述分页配置信息。
 * 该类型包含以下属性：
 * - currentPage：当前页码，可选，默认为 1。
 * - pageSize：每页显示的记录数，可选，默认为 10。
 * - total：总记录数，可选，默认为 0。
 */
export type SuApiListPageConfigProps = {
  // 当前页码，可选，默认为 1
  currentPage?: number
  // 每页显示的记录数，可选，默认为 10
  pageSize?: number
  // 总记录数，可选，默认为 0
  total?: number
}
