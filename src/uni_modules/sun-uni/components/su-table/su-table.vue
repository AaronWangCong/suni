<template>
  <view class="su-table"></view>
</template>

<script>
import { props } from './props'
import { mpMixin } from '../../libs/mixin/mpMixin'
import { mixin } from '../../libs/mixin/mixin'
/**
 * Table 表格
 * @description 表格组件一般用于展示大量结构化数据的场景 本组件标签类似HTML的table表格，由table、tr、th、td四个组件组成
 * @tutorial https://suni.pages.dev/sun-uni/component/table.html
 * @example <su-table><su-tr><su-th>学校</su-th </su-tr> <su-tr><su-td>浙江大学</su-td> </su-tr> <su-tr><su-td>清华大学</su-td> </su-tr></su-table>
 */
export default {
  name: 'su-table',
  mixins: [mpMixin, mixin, props],
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';
</style>
