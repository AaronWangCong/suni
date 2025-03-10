<template>
  <view>
    <up-navbar :fixed="false" :is-back="true" title="　" :border-bottom="false">
      <view class="su-flex su-row-right" style="width: 100%">
        <view class="camera su-flex su-row-center">
          <up-icon name="camera-fill" color="#000000" size="48"></up-icon>
        </view>
      </view>
    </up-navbar>
    <view class="su-flex su-flex-y-center su-flex-around user-box su-p-l-30 su-p-r-20 su-p-b-30">
      <view class="su-m-r-10">
        <up-avatar :src="pic" size="140"></up-avatar>
      </view>
      <view class="su-flex-1">
        <view class="su-font-18 su-p-b-20">uview plus</view>
        <view class="su-font-14 su-tips-color">微信号:test</view>
      </view>
      <view class="su-m-l-10 su-p-10">
        <up-icon name="scan" color="#969799" size="28"></up-icon>
      </view>
      <view class="su-m-l-10 su-p-10">
        <up-icon name="arrow-right" color="#969799" size="28"></up-icon>
      </view>
    </view>

    <view class="su-m-t-20">
      <up-cell-group>
        <up-cell icon="rmb-circle" title="支付"></up-cell>
      </up-cell-group>
    </view>

    <view class="su-m-t-20">
      <up-cell-group>
        <up-cell icon="star" title="收藏"></up-cell>
        <up-cell icon="photo" title="相册"></up-cell>
        <up-cell icon="coupon" title="卡券"></up-cell>
        <up-cell icon="heart" title="关注"></up-cell>
      </up-cell-group>
    </view>

    <view class="su-m-t-20">
      <up-cell-group>
        <up-cell icon="setting" title="设置"></up-cell>
      </up-cell-group>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      pic: 'https://uviewui.com/common/logo.png',
      show: true
    }
  },
  onLoad() {},
  methods: {}
}
</script>

<style lang="scss">
page {
  background-color: #ededed;
}

.camera {
  width: 54px;
  height: 44px;

  &:active {
    background-color: #ededed;
  }
}
.user-box {
  background-color: #fff;
}
.su-cell-group {
  background-color: #fff;
}
</style>
