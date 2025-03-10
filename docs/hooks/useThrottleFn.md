### [useThrottleFn](https://github.com/AaronWangCong/suni/blob/main/src/uni_modules/sun-uni/hooks/core/useThrottleFn.ts)

根据vue/use useThrottleFn 改版而来

### 参数说明

- `fn` 要节流的函数
- `ms` 节流的时间间隔，单位是毫秒，默认值是 200
- `trailing` 是否在节流时间间隔的末尾执行函数，默认值是 false
- `leading` 是否在节流时间间隔的开始执行函数，默认值是 true
- `rejectOnCancel` 如果节流被取消，是否拒绝 Promise，默认值是 false

### 使用方法

```ts
const fn = useThrottleFn(() => {
  console.log('fn')
}, 200)
```
