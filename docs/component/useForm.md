## useForm 表单 <to-api/>

<demo-model url="/pages/components/use-form/use-form"></demo-model>

高性能组件，配置配置项生成form表单

::: danger 注意
暂不支持动态插槽
:::

### 平台差异说明

| App(vue) | App(nvue) | H5  | 微信小程序 |
| :------: | :-------: | :-: | :--------: |
|    √     |     √     |  √  |     √      |

### 基本使用

- `model` 关联内部的model
- `showCollapseButton` 是否显示展开收起, `collapsedRows` 控制显示的是多少行
- `showDefaultActions` 是否显示操作按钮, `submitButtonOptions` 提交按钮的参数, `resetButtonOptions` 重置按钮的参数, `actionButtonsReverse` 操作按钮是否反转（提交按钮前置）
- `handleSubmit` 表单提交回调
- `handleReset` 表单重置回调
- `handleValuesChange` 表单值变化回调
- `submitValidate` 提交触发校验 默认false

```html
<script setup lang="ts">
  import { type SuUseFormSchema } from '@/uni_modules/sun-uni/components/su-use-form'

  const formRef = ref()
  const schemas: SuUseFormSchema[] = [
    {
      field: 'input1',
      component: 'SuInput',
      // 对应组件的参数
      componentProps: {
        placeholder: '请输入'
      },
      dependencies: {
        rules: {
          required: true,
          message: '请输入'
        }
      },
      // 界面显示的label
      label: '字段字段字段'
    },
    {
      field: 'input2',
      component: 'SuInput',
      // 对应组件的参数
      componentProps: {
        placeholder: '请输入'
      },
      dependencies: {
        required: true
      },
      // 界面显示的label
      label: '字段2',
      colProps: {
        span: 6
      }
    },
    {
      field: 'input3',
      component: 'SuInput',
      // 对应组件的参数
      componentProps: {
        placeholder: '请输入'
      },
      dependencies: {
        required: true
      },
      // 界面显示的label
      label: '字段3',
      colProps: {
        span: 6
      }
    },
    {
      field: 'input4',
      component: 'SuInput',
      // 对应组件的参数
      componentProps: {
        placeholder: '请输入'
      },
      dependencies: {
        required: true
      },
      // 界面显示的label
      label: '字段4'
    }
  ]

  function handleSubmit(values: SuUni.Recordable) {
    // const [_, formApi] = injectFormProps()
    console.log(values, 'values')
    console.log(formRef, 'formRef')
    // formApi.validate()
    unref(formRef).validate()
  }

  function handleReset() {
    console.log('handleReset---handleReset')
  }
</script>
<template>
  <view style="padding: 0 12px">
    <su-use-form
      ref="formRef"
      :schemas="schemas"
      :commonConfig="{
        autoSetPlaceHolder: true
      }"
      showDefaultActions
      showCollapseButton
      :collapsedRows="2"
      @submit="handleSubmit"
      @reset="handleReset"
    ></su-use-form>
  </view>
</template>
```

## hooks高级用法

::: details 查看基础用法示例
::: code-group

```html [vue]
<template>
  <view style="padding: 0 12px">
    <su-use-form
      ref="formRef"
      :schemas="schemas"
      :commonConfig="{
        autoSetPlaceHolder: true
      }"
      showDefaultActions
      showCollapseButton
      :collapsedRows="2"
      @submit="handleSubmit"
      @reset="handleReset"
    ></su-use-form>
    <!-- #ifdef H5 -->
    <su-divider text="BaseForm"></su-divider>
    <BaseForm />
    <!-- #endif -->
    <!-- #ifdef MP-WEIXIN -->
    <su-divider text="BaseWeexForm"></su-divider>
    <su-use-form :formApi="baseWeexFormApi" />
    <!-- #endif -->
  </view>
</template>
```

```typescript [typescript]
<script setup lang="ts">
  import { useSuForm, useSuWeexForm, type SuUseFormSchema } from '@/uni_modules/sun-uni/components/su-use-form'
  import type { SuUni } from '@/uni_modules/sun-uni/types/uni'
  import { ref, unref } from 'vue'

  const formRef = ref()

  const schemas: SuUseFormSchema[] = [
    {
      field: 'input1',
      component: 'SuInput',
      // 对应组件的参数
      componentProps: {
        placeholder: '请输入'
      },
      dependencies: {
        rules: {
          required: true,
          message: '请输入'
        }
      },
      // 界面显示的label
      label: '字段字段字段'
    },
    {
      field: 'input2',
      component: 'SuInput',
      // 对应组件的参数
      componentProps: {
        placeholder: '请输入'
      },
      dependencies: {
        required: true
      },
      // 界面显示的label
      label: '字段2',
      colProps: {
        span: 6
      }
    },
    {
      field: 'input3',
      component: 'SuInput',
      // 对应组件的参数
      componentProps: {
        placeholder: '请输入'
      },
      dependencies: {
        required: true
      },
      // 界面显示的label
      label: '字段3',
      colProps: {
        span: 6
      }
    },
    {
      field: 'input4',
      component: 'SuInput',
      // 对应组件的参数
      componentProps: {
        placeholder: '请输入'
      },
      dependencies: {
        required: true
      },
      // 界面显示的label
      label: '字段4'
    }
  ]

  const [BaseForm, baseFormApi] = useSuForm({
    schemas,
    commonConfig: {
      autoSetPlaceHolder: true
    },
    showDefaultActions: true,
    showCollapseButton: true,
    collapsedRows: 2,
    handleSubmit: () => {
      baseFormApi.validate()
    }
  })

  const baseWeexFormApi = useSuWeexForm({
    schemas,
    commonConfig: {
      autoSetPlaceHolder: true
    },
    showDefaultActions: true,
    showCollapseButton: true,
    collapsedRows: 2,
    handleSubmit: () => {
      baseWeexFormApi.validate()
    }
  })

  function handleSubmit(values: SuUni.Recordable) {
    // const [_, formApi] = injectFormProps()
    console.log(values, 'values')
    console.log(formRef, 'formRef')
    // formApi.validate()
    unref(formRef).validate()
  }

  function handleReset() {
    console.log('handleReset---handleReset')
  }
</script>

```

:::

### useSuForm与useSuWeexForm的区别

由于小程序无法使用动态组件，因此有两个hooks函数，内部都是使用的`SuUseFormApi`工具类

- `useSuForm`使用于`APP`和`H5`，`hooks`返回组件，不需要引入`su-use-form`组件
- `useSuWeexForm`使用于小程序, 需要引入`su-use-form`组件, `hooks` 返回的是`formApi`

## API

### Form Props

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
| ---- | ---- | ---- | ------ | ------ |
| model | 绑定的数据 | SuUni.Recordable | - | - |
| actionButtonsReverse | 操作按钮是否反转（提交按钮前置） | boolean | false | true |
| actionWrapperClass | 表单操作区域class | string | - | - |
| fieldMappingTime | 表单时间字段映射 | `SuUseFormFieldMappingTime` | - | - |
| handleReset | 表单重置回调 | `SuUseFormHandleResetFn` | - | - |
| handleSubmit | 表单提交回调 | `SuUseFormHandleSubmitFn` | - | - |
| handleValuesChange | 表单值变化回调 | `(values: Record<string, any>) => void` | - | - |
| resetButtonOptions | 重置按钮参数 | `SuUseFormActionButtonOptions` | `{content: uni.$u.config.i18n('重置'),show: true}` | - |
| submitButtonOptions | 提交按钮参数 | `SuUseFormActionButtonOptions` | `{content: uni.$u.config.i18n('提交'),show: true, type: 'primary'}` | - |
| showDefaultActions | 是否显示默认操作按钮 | boolean | false | true |
| submitValidate | 提交触发校验 | boolean | false | true |
| messageType | 消息提示的errorType | 'message' \| 'toast' | 'message' | 'toast' |
| collapsed | 是否展开，在showCollapseButton=true下生效 | boolean | - | - |
| collapsedRows | 折叠时保持行数 | number | 1 | - |
| collapseTriggerResize | 是否触发resize事件 | boolean | false | true |
| commonConfig | 单项通用后备配置，当子项目没配置时使用这里的配置，子项目配置优先级高于此配置 | `SuUseFormCommonConfig` | - | - |
| form | form 示例 useForm返回值 | `SuUseFormContext<SuUni.Recordable>` | - | - |
| layout | 表单项布局 | `SuUseFormLayout` | - | - |
| schemas | 表单定义项 | `SuUseFormSchema[]` | - | - |
| showCollapseButton | 是否显示展开/折叠 | boolean | false | true |
| rowProps | su-row参数 | `Partial<SuRowProps>` | - | - |
| warpperClass | 最外层warpper class | string | - | - |
| formClass | `su-form` class | string | - | - |

### CommonConfig Props

类型为`SuUseFormCommonConfig`

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
| ---- | ---- | ---- | ------ | ------ |
| colon | 在Label后显示一个冒号 | boolean | false | true |
| componentProps | 所有表单项的props | SuComponentProps | - | - |
| formItemProps | 所有表单项的控件Props | `SuFormItemProps` | - | - |
| formItemClass | 所有表单项的class | string | - | - |
| hideLabel | 隐藏所有表单项label | boolean | false | true |
| hideRequiredMark | 是否隐藏必填标记 | boolean | false | true |
| labelClass | 所有表单项的label样式class | string | - | - |
| labelWidth | 所有表单项的label宽度 | number | - | - |
| modelPropName | 所有表单项的model属性名 | string | 'modelValue' | - |
| rulesMessageJoinLabel | rules message是否拼接label | boolean | true | false |
| autoSetPlaceHolder | 设置placeHolder | boolean | false | true |

### Schemas Props

类型为`SuUseFormSchema`， `SuUseFormCommonConfig`类型也可以使用

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
| ---- | ---- | ---- | ------ | ------ |
| component | 组件 | `SuUseFormComponentType` | - | - |
| componentProps | 组件参数 | `SuComponentProps` | - | - |
| defaultValue | 默认值 | any | - | - |
| label | 表单项名称 | string | - | - |
| field | 字段名 | string | - | - |
| textField | 显示文本字段,回显使用，默认值为field值加Text | string | - | - |
| dependencies | 依赖 | `SuUseFormItemDependencies` | - | - |
| colProps | 列属性 | `Partial<SuColProps>` | - | - |
| changeEvent | 组件change的名称 | string | `update:modelValue` | - |
| popupProps | 弹窗组件参数 | `SuUseFormComponentPopupProps` | - | - |

### SuUseFormContext

| 方法 | 说明 | 类型 |
| ---- | ---- | ---- |
| submitForm | 提交事件 | - |
| resetForm | 重置事件 | - |
| setFieldValue | 设置表单项的值 | - |
| setFieldsValue | 设置表单字段的值 | - |
| resetFields | 重置表单字段 | - |
| getFieldsValue | 获取表单字段的值 | - |
| clearValidate | 清除指定字段的验证 | - |
| updateSchema | 更新表单模式 | - |
| resetSchema | 重置表单模式 | - |
| removeSchemaByField | 根据字段名移除表单模式 | - |
| appendSchemaByField | 根据字段名追加表单模式 | - |
| validateField | 验证指定字段 | - |
| validate | 验证整个表单 | - |
| getFormSchema | 获取表单模式 | - |

### SuUseFormApi 方法

| 方法 | 说明 | 类型 |
| ---- | ---- | ---- |
| form | useForm 返回的函数 | SuUseFormContext |
| state | `su-use-form Props` | `SuUseFormProps` |
| formEvent | `form表单函数` | `SuFormEventProvide` |
| removeSchemaByFields | 根据字段名移除表单项 | - |
| resetForm | 重置表单 | - |
| setFieldValue | 设置单个表单值 | - |
| setFieldsValue | 设置多个表单值 | - |
| submitForm | 提交方法 | - |
| updateSchema | 更新Schema | - |
| validate | 表单校验 | - |
| validateField | 根据字段表单校验 | - |
| appendSchemaByField | 添加表单项 | - |

### Emits

| 名称 | 说明 |
| :--- | :--- |
| submit | 提交事件 |
| reset | 重置事件 |
| update:model | model改变事件 |
| collapse-change | 展开收起事件 |

<style scoped>
h3[id=props] + table thead tr th:nth-child(2){
	width: 40%;
}

h3[id=events] + p + table thead tr th:nth-child(3){
	width: 45%;
}

h3[id=methods] + p + table thead tr th:nth-child(2){
	width: 50%;
}
</style>
