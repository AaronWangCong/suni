### [useDebounceFn](https://github.com/AaronWangCong/suni/blob/main/src/uni_modules/sun-uni/hooks/core/useDebounceFn.ts)

根据vue/use useDebounceFn 改版而来

### 参数说明

- `fn` 要防抖的函数
- `ms` 防抖延迟时间（毫秒）
- `options` 防抖选项

### 使用方法

```ts
const fn = useDebounceFn(() => {
  console.log('fn')
}, 200)
```
