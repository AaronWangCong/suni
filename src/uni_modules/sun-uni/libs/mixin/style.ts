import { defineMixin } from '../vue'
import { addStyle, deepMerge, addUnit, trim } from '../function/index'
import type { CSSProperties } from 'vue'

export const style = defineMixin({
  props: {
    // flex排列方式
    flexDirection: {
      type: String,
      default: ''
    },
    // flex-direction的简写
    fd: {
      type: String,
      default: ''
    },
    // 展示类型
    display: {
      type: String,
      default: ''
    },
    // display简写
    d: {
      type: String,
      default: ''
    },
    // 主轴排列方式
    justifyContent: {
      type: String,
      default: ''
    },
    // justifyContent的简写
    jc: {
      type: String,
      default: ''
    },
    // 纵轴排列方式
    alignItems: {
      type: String,
      default: ''
    },
    // align-items的简写
    ai: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    },
    // color简写
    c: {
      type: String,
      default: ''
    },
    // 字体大小
    fontSize: {
      type: [String, Number],
      default: 0
    },
    // font-size简写
    fs: {
      type: [String, Number],
      default: ''
    },
    margin: {
      type: [String, Number],
      default: 0
    },
    // margin简写
    m: {
      type: [String, Number],
      default: 0
    },
    // margin-top
    marginTop: {
      type: [String, Number],
      default: 0
    },
    // margin-top简写
    mt: {
      type: [String, Number],
      default: 0
    },
    // margin-right
    marginRight: {
      type: [String, Number],
      default: 0
    },
    // margin-right简写
    mr: {
      type: [String, Number],
      default: 0
    },
    // margin-bottom
    marginBottom: {
      type: [String, Number],
      default: 0
    },
    // margin-bottom简写
    mb: {
      type: [String, Number],
      default: 0
    },
    // margin-left
    marginLeft: {
      type: [String, Number],
      default: 0
    },
    // margin-left简写
    ml: {
      type: [String, Number],
      default: 0
    },
    // padding-left
    paddingLeft: {
      type: [String, Number],
      default: 0
    },
    // padding-left简写
    pl: {
      type: [String, Number],
      default: 0
    },
    // padding-top
    paddingTop: {
      type: [String, Number],
      default: 0
    },
    // padding-top简写
    pt: {
      type: [String, Number],
      default: 0
    },
    // padding-right
    paddingRight: {
      type: [String, Number],
      default: 0
    },
    // padding-right简写
    pr: {
      type: [String, Number],
      default: 0
    },
    // padding-bottom
    paddingBottom: {
      type: [String, Number],
      default: 0
    },
    // padding-bottom简写
    pb: {
      type: [String, Number],
      default: 0
    },
    // border-radius
    borderRadius: {
      type: [String, Number],
      default: 0
    },
    // border-radius简写
    radius: {
      type: [String, Number],
      default: 0
    },
    // transform
    transform: {
      type: String,
      default: ''
    },
    // 定位
    position: {
      type: String,
      default: ''
    },
    // position简写
    pos: {
      type: String,
      default: ''
    },
    // 宽度
    width: {
      type: [String, Number],
      default: null
    },
    // width简写
    w: {
      type: [String, Number],
      default: null
    },
    // 高度
    height: {
      type: [String, Number],
      default: null
    },
    // height简写
    h: {
      type: [String, Number],
      default: null
    },
    top: {
      type: [String, Number],
      default: 0
    },
    right: {
      type: [String, Number],
      default: 0
    },
    bottom: {
      type: [String, Number],
      default: 0
    },
    left: {
      type: [String, Number],
      default: 0
    }
  },
  computed: {
    viewStyle() {
      const style = {}
      try {
        // 定义一个辅助函数来处理属性设置
        function setStyleProperty(style: { [x: string]: string | CSSProperties }, key: string, value: any, fallback: any) {
          if (value !== undefined) {
            style[key] = addStyle(value)
          } else if (fallback !== undefined) {
            style[key] = addStyle(fallback)
          }
        }

        // 设置各个样式属性
        setStyleProperty(style, 'width', this.width, this.w)
        setStyleProperty(style, 'height', this.height, this.h)
        setStyleProperty(style, 'margin', this.margin, this.m)
        setStyleProperty(style, 'marginTop', this.marginTop, this.mt)
        setStyleProperty(style, 'marginRight', this.marginRight, this.mr)
        setStyleProperty(style, 'marginBottom', this.marginBottom, this.mb)
        setStyleProperty(style, 'marginLeft', this.marginLeft, this.ml)
        setStyleProperty(style, 'padding', this.padding, this.p)
        setStyleProperty(style, 'paddingTop', this.paddingTop, this.pt)
        setStyleProperty(style, 'paddingRight', this.paddingRight, this.pr)
        setStyleProperty(style, 'paddingBottom', this.paddingBottom, this.pb)
        setStyleProperty(style, 'paddingLeft', this.paddingLeft, this.pl)
        setStyleProperty(style, 'color', this.color, this.c)
        setStyleProperty(style, 'fontSize', this.fontSize, this.fs)
        setStyleProperty(style, 'borderRadius', this.borderRadius, this.radius)
        setStyleProperty(style, 'position', this.position, this.pos)
        setStyleProperty(style, 'flexDirection', this.flexDirection, this.fd)
        setStyleProperty(style, 'justifyContent', this.justifyContent, this.jc)
        setStyleProperty(style, 'alignItems', this.alignItems, this.ai)

        // 合并自定义样式
        return deepMerge(style, addStyle(this.customStyle) as CSSProperties)
      } catch (error) {
        console.error('Error in viewStyle:', error)
        return style // 返回已设置的部分样式
      }
    }
  },
  methods: {
    // 获取margin或者padding的单位，比如padding: 0 20转为padding: 0 20px
    getUnit(unit = '') {
      // 取出两端空格，分隔成数组，再对数组的每个元素添加单位，最后再合并成字符串
      return trim(unit)
        .split(' ')
        .map((item) => addUnit(item))
        .join(' ')
    }
  }
})
