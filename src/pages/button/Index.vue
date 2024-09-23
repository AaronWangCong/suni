<template>
  <page-wraper>
    <view>
      <demo-block title="基本用法">
        <su-button open-type="getUserInfo" @getuserinfo="handleGetuserinfo">主要按钮</su-button>
        <su-button type="success">成功按钮</su-button>
        <su-button type="info">信息按钮</su-button>
        <su-button type="warning">警告按钮</su-button>
        <su-button type="error">危险按钮</su-button>
      </demo-block>
      <demo-block title="禁用按钮">
        <su-button disabled>主要按钮</su-button>
        <su-button type="success" disabled>成功按钮</su-button>
        <su-button type="info" disabled>信息按钮</su-button>
        <su-button type="warning" disabled>警告按钮</su-button>
        <su-button type="error" disabled>危险按钮</su-button>
      </demo-block>
      <demo-block title="幽灵按钮">
        <su-button plain>主要按钮</su-button>
        <su-button type="success" plain>成功按钮</su-button>
        <su-button type="info" plain>信息按钮</su-button>
        <su-button type="warning" plain>警告按钮</su-button>
        <su-button type="error" plain>危险按钮</su-button>
      </demo-block>
      <demo-block title="细边框幽灵按钮">
        <su-button plain hairline>主要按钮</su-button>
        <su-button type="success" plain hairline>成功按钮</su-button>
        <su-button type="info" plain hairline>信息按钮</su-button>
        <su-button type="warning" plain hairline>警告按钮</su-button>
        <su-button type="error" plain hairline>危险按钮</su-button>
      </demo-block>
      <demo-block title="幽灵按钮禁用状态">
        <su-button plain disabled>主要按钮</su-button>
        <su-button type="success" plain disabled>成功按钮</su-button>
        <su-button type="info" plain disabled>信息按钮</su-button>
        <su-button type="warning" plain disabled>警告按钮</su-button>
        <su-button type="error" plain disabled>危险按钮</su-button>
      </demo-block>
      <demo-block title="按钮大小">
        <su-button size="small">小型按钮</su-button>
        <su-button size="medium">普通按钮</su-button>
        <su-button size="large">大型按钮</su-button>
      </demo-block>
      <demo-block title="加载中">
        <su-button loading>加载中</su-button>
        <su-button type="success" loading>加载中</su-button>
        <su-button type="warning" loading>加载中</su-button>
        <su-button type="error" loading>加载中</su-button>
        <su-button type="info" loading>加载中</su-button>
        <su-button type="info" plain loading>加载中</su-button>
      </demo-block>
      <demo-block title="文字按钮">
        <su-button type="text">按钮</su-button>
        <su-button type="text" disabled>按钮</su-button>
      </demo-block>
      <demo-block title="图标按钮">
        <su-button type="icon" icon="delete-thin"></su-button>
        <su-button type="icon" icon="delete-thin" disabled></su-button>
      </demo-block>
      <demo-block title="带图标的基本按钮">
        <su-button icon="download">下载</su-button>
        <su-button icon="setting">设置</su-button>
        <su-button classPrefix="fish" icon="kehuishouwu">可回收</su-button>
        <su-button icon="download" size="small">下载</su-button>
        <su-button icon="setting" size="small">设置</su-button>
        <su-button icon="download" size="large">下载</su-button>
        <su-button icon="setting" size="large">设置</su-button>
      </demo-block>
      <demo-block title="块状按钮，宽度100%">
        <su-button block size="large">主要按钮</su-button>
        <su-button type="success" block size="large">成功按钮</su-button>
        <su-button type="info" block size="large">信息按钮</su-button>
        <su-button type="warning" block size="large">警告按钮</su-button>
        <su-button type="error" block size="large">危险按钮</su-button>
      </demo-block>
      <demo-block title="常用按钮：块状+圆角">
        <su-button block size="large" disabled>主要按钮</su-button>
        <su-button block size="large">主要按钮</su-button>
        <su-button block size="large" loading>主要按钮</su-button>
        <su-button type="info" block size="large" disabled>信息按钮</su-button>
        <su-button type="info" block size="large">信息按钮</su-button>
      </demo-block>
      <demo-block title="常用按钮：圆角或圆角+幽灵">
        <view>
          <su-button disabled>主操作</su-button>
          <su-button size="small" disabled>主操作</su-button>
        </view>
        <view>
          <su-button>主操作</su-button>
          <su-button size="small">主操作</su-button>
        </view>
        <view>
          <su-button type="info" disabled>次操作</su-button>
          <su-button type="info" size="small" disabled>次操作</su-button>
        </view>
        <view>
          <su-button type="info">次操作</su-button>
          <su-button type="info" size="small">次操作</su-button>
        </view>
        <view>
          <su-button plain disabled>幽灵按钮</su-button>
          <su-button size="small" plain disabled>幽灵按钮</su-button>
        </view>
        <view>
          <su-button plain>幽灵按钮</su-button>
          <su-button size="small" plain>幽灵按钮</su-button>
        </view>
        <view>
          <su-button type="info" plain disabled>次操作</su-button>
          <su-button type="info" size="small" plain disabled>次操作</su-button>
        </view>
        <view>
          <su-button type="info" plain>次操作</su-button>
          <su-button type="info" size="small" plain>次操作</su-button>
        </view>
      </demo-block>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
function handleGetuserinfo(event: any) {
  // TODO
  console.log(event)
}
</script>
<style lang="scss" scoped>
:deep(button) {
  margin: 0 10px 10px 0;
}
.button-block {
  margin-right: 0;
}
</style>
