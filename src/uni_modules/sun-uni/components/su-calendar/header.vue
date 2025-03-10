<template>
  <view class="su-calendar-header su-border-bottom">
    <text class="su-calendar-header__title" v-if="showTitle">{{ title }}</text>
    <text class="su-calendar-header__subtitle" v-if="showSubtitle">{{ subtitle }}</text>
    <view class="su-calendar-header__weekdays">
      <text class="su-calendar-header__weekdays__weekday" v-for="(item, index) in weekText" :key="index">{{ item }}</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'su-calendar-header',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared'
  }
})

defineProps({
  /** 标题 */
  title: {
    type: String,
    default: ''
  },
  /** 副标题 */
  subtitle: {
    type: String,
    default: ''
  },
  /** 是否显示标题 */
  showTitle: {
    type: Boolean,
    default: true
  },
  /** 是否显示副标题 */
  showSubtitle: {
    type: Boolean,
    default: true
  },
  /** 星期文本 */
  weekText: {
    type: Array,
    default: () => {
      return ['一', '二', '三', '四', '五', '六', '日']
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../../libs/css/components.scss';

.su-calendar-header {
  display: flex;
  flex-direction: column;
  padding-bottom: 4px;

  &__title {
    font-size: 16px;
    color: $su-main-color;
    text-align: center;
    height: 42px;
    line-height: 42px;
    font-weight: bold;
  }

  &__subtitle {
    font-size: 14px;
    color: $su-main-color;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-weight: bold;
  }

  &__weekdays {
    @include flex;
    justify-content: space-between;

    &__weekday {
      font-size: 13px;
      color: $su-main-color;
      line-height: 30px;
      flex: 1;
      text-align: center;
    }
  }
}
</style>
