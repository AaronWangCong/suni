import { onBeforeUnmount, computed, getCurrentInstance, onMounted } from 'vue'
import { deepMerge, $parent, sleep } from '../function/index'
import test from '../function/test'
import route from '../util/route'
// import { onLoad, onReachBottom } from '@dcloudio/uni-app'
import { makeStringProp } from '../vue'
import { onReachBottom } from '@dcloudio/uni-app'

// #ifdef APP-NVUE
const dom = uni.requireNativePlugin('dom')
// #endif

const props = {
  customStyle: {
    type: [Object, String],
    default: () => ({})
  },
  customClass: makeStringProp(''),
  url: makeStringProp(''),
  linkType: makeStringProp('navigateTo')
}

// const { proxy } = getCurrentInstance() as any
// const parent = ref<SuUni.Recordable>({})

const $u = computed(() => {
  // #ifndef APP-NVUE
  return deepMerge(uni.$u, {
    props: undefined,
    http: undefined,
    mixin: undefined,
    getRect: $uGetRect
  })
  // #endif
  // #ifdef APP-NVUE
  return deepMerge(uni.$u, {
    getRect: $uGetRect
  })
  // #endif
})

const bem = computed(() => {
  const { proxy } = getCurrentInstance() as any
  return function (name: any, fixed: any[], change: any[]) {
    const prefix = `su-${name}--`
    const classes: Record<string, any> = {}
    if (fixed) {
      fixed.forEach((item) => {
        classes[prefix + proxy[item]] = true
      })
    }
    if (change) {
      change.forEach((item) => {
        proxy[item] ? (classes[prefix + item] = proxy[item]) : delete classes[prefix + item]
      })
    }
    return (
      Object.keys(classes)
        // #ifdef MP-ALIPAY || MP-TOUTIAO || MP-LARK
        .join(' ')
      // #endif
    )
  }
})

const openPage = (urlKey = 'url') => {
  const { proxy } = getCurrentInstance() as any
  const url = proxy[urlKey]
  if (url) {
    route({ type: props.linkType, url })
  }
}

const navTo = (url = '', linkType = 'navigateTo') => {
  route({ type: props.linkType || linkType, url })
}

const $uGetRect = (selector: string, all?: boolean) => {
  const instance = getCurrentInstance() as any
  console.log(instance, 'getCurrentInstance()')

  return new Promise((resolve) => {
    // #ifndef APP-NVUE
    const query = uni.createSelectorQuery().in(instance.proxy && instance.proxy)
    query[all ? 'selectAll' : 'select'](selector)
      .boundingClientRect((rect) => {
        if (all && Array.isArray(rect) && rect.length) {
          resolve(rect)
        }
        if (!all && rect) {
          resolve(rect)
        }
      })
      .exec()
    // #endif

    // #ifdef APP-NVUE
    sleep(30).then(() => {
      const selectorNvue = selector.substring(1) // 去掉开头的#或者.
      const selectorRef = instance.proxy.$refs(selectorNvue)
      if (!selectorRef) {
        resolve({
          width: 0,
          height: 0,
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        })
      }
      dom.getComponentRect(selectorRef, (res: any) => {
        resolve(res.size)
      })
    })
    // #endif
  })
}

const getParentData = (parentName = '') => {
  const { proxy } = getCurrentInstance() as any
  if (!proxy.parent) proxy.parent = {}
  proxy.parent = $parent.call(proxy, parentName)
  if (proxy.parent.children) {
    if (proxy.parent.children.indexOf(proxy) === -1) {
      proxy.parent.children.push(proxy)
    }
  }
  if (proxy.parent && proxy.parentData) {
    Object.keys(proxy.parentData).forEach((key) => {
      proxy.parentData[key] = proxy.parent[key]
    })
  }
}

const preventEvent = (e: any) => {
  e && typeof e.stopPropagation === 'function' && e.stopPropagation()
}

function init() {
  const { proxy } = getCurrentInstance() as any
  onMounted(() => {
    uni.$u.getRect = $uGetRect
  })
  onBeforeUnmount(() => {
    if (proxy.parent && test.array(proxy.parent.children)) {
      const childrenList = proxy.parent.children
      childrenList.forEach((child: any, index: any) => {
        if (child === proxy) {
          childrenList.splice(index, 1)
        }
      })
    }
  })
  onReachBottom(() => {
    uni.$emit('uOnReachBottom')
  })
}

const noop = (e: any) => {
  preventEvent(e)
}

export { props, $u, bem, openPage, navTo, $uGetRect, getParentData, preventEvent, noop, init }
