export default {
  apiList: {
    immediate: true,
    labelField: '',
    valueField: '',
    currentPageField: 'pageIndex',
    pageSizeField: 'pageSize',
    totalField: 'data.pagination.total',
    dataField: 'data.list',
    showSearch: true,
    showPager: false,
    searchField: '',
    pagerConfig: {
      currentPage: 1,
      pageSize: 50,
      total: 0
    },
    loading: false
  }
}
