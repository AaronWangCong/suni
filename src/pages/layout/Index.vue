<template>
  <page-wraper>
    <demo-block title="基础用法">
      <su-row>
        <su-col :span="24"><view class="bg-dark1">span: 24</view></su-col>
      </su-row>
      <su-row>
        <su-col :span="12"><view class="bg-dark">span: 12</view></su-col>
        <su-col :span="12"><view class="bg-light">span: 12</view></su-col>
      </su-row>
      <su-row>
        <su-col :span="8"><view class="bg-dark">span: 8</view></su-col>
        <su-col :span="8"><view class="bg-light">span: 8</view></su-col>
        <su-col :span="8"><view class="bg-dark">span: 8</view></su-col>
      </su-row>
      <su-row>
        <su-col :span="6"><view class="bg-dark">span: 6</view></su-col>
        <su-col :span="6"><view class="bg-light">span: 6</view></su-col>
        <su-col :span="6"><view class="bg-dark">span: 6</view></su-col>
        <su-col :span="6"><view class="bg-light">span: 6</view></su-col>
      </su-row>
    </demo-block>
    <demo-block title="分栏偏移">
      <su-row>
        <su-col :span="4"><view class="bg-dark">span: 4</view></su-col>
        <su-col :span="8" :offset="4"><view class="bg-light">span: 8 offset: 4</view></su-col>
      </su-row>
      <su-row>
        <su-col :span="8" :offset="4"><view class="bg-dark">span: 8 offset: 4</view></su-col>
        <su-col :span="8" :offset="4"><view class="bg-light">span: 8 offset: 4</view></su-col>
      </su-row>
    </demo-block>
    <demo-block title="分栏间隔">
      <su-row :gutter="20">
        <su-col :span="8"><view class="bg-dark">span: 8</view></su-col>
        <su-col :span="8"><view class="bg-light">span: 8</view></su-col>
        <su-col :span="8"><view class="bg-dark">span: 8</view></su-col>
      </su-row>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.bg-dark1,
.bg-dark,
.bg-light {
  border-radius: 4px;
  min-height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 12px;
  margin-bottom: 10px;
  color: rgba(0, 0, 0, 0.45);
}
.bg-dark1 {
  background: #99a9bf;
  color: #fff;
}
.bg-dark {
  background: #d3dce6;
}
.bg-light {
  background: #e5e9f2;
}
</style>
