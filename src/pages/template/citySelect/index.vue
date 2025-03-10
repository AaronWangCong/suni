<template>
  <view class="su-demo">
    <view class="su-demo-wrap">
      <view class="su-demo-title">演示效果</view>
      <view class="su-demo-area">
        <city-select v-model="value" @city-change="cityChange"></city-select>
        <view class="su-demo-result-line">{{ input ? input : 'Picker值' }}</view>
      </view>
    </view>
    <view class="su-config-wrap">
      <view class="su-config-title su-border-bottom">参数配置</view>
      <view class="su-config-item">
        <view class="su-item-title">状态</view>
        <up-button @click="value = true">打开Picker</up-button>
      </view>
    </view>
  </view>
</template>

<script>
import citySelect from './su-city-select.vue'
export default {
  components: {
    citySelect
  },
  data() {
    return {
      height: 30,
      bgColor: this.$u.color.bgColor,
      marginTop: 30,
      marginBottom: 30,
      value: false,
      input: ''
    }
  },
  methods: {
    cityChange(e) {
      this.input = e.province.label + '-' + e.city.label + '-' + e.area.label
    }
  }
}
</script>

<style scoped>
.btn-wrap {
  margin: 100rpx 30rpx;
}
</style>
