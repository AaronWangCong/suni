import type { CSSProperties, ExtractPropTypes } from 'vue'
import { makeBooleanProp, makeNumericProp, makeObjectProp, makeStringProp } from '../../libs/vue'
import type { SuUni } from '../../types/uni'
import defProps from '../../libs/config/props'

export const cellInputProps = {
  /** v-model 绑定的值 */
  modelValue: makeStringProp(''),
  /** label 文本 */
  label: makeStringProp<String>(() => defProps.cellInput.title),
  /** 
   * 输入框的类型，textarea，text，number
   * @default text
   */
  type: makeStringProp<SuCellInputType>(() => defProps.cellInput.type),
  /** 
   * 设置键盘右下角按钮的文字，仅在 type="text" 时生效。
   * @default 'done'
   */
  confirmType: makeStringProp<UniHelper.InputConfirmType>(() => defProps.cellInput.confirmType),
  /** 
   * label 宽度
   * @default 100
   */
  labelWidth: makeNumericProp(() => defProps.cellInput.labelWidth),
  /** label 样式 */
  labelStyle: makeObjectProp<CSSProperties>(() => defProps.cellInput.labelStyle),
  /** 输入框的自定义样式 */
  customStyle: makeObjectProp<CSSProperties>(() => defProps.cellInput.customStyle),
  /** 
   * 高度 默认整个高度为88 去除边框高度
   * @default 86
   */
  height: makeNumericProp(() => defProps.cellInput.height),
  /** 
   * 是否自动获得焦点
   * @default false
   */
  focus: makeBooleanProp(() => defProps.cellInput.focus),
  /** 
   * 是否必填
   * @default false
   */
  isRequest: makeBooleanProp(() => defProps.cellInput.isRequest),
  /** 
   * 是否禁用
   * @default false
   */
  disabled: makeBooleanProp(() => defProps.cellInput.disabled),
  /** 
   * 输入框文字的对齐方式
   * @default 'left'
   */
  inputAlign: makeStringProp<SuUni.Align>(() => defProps.cellInput.inputAlign),
  /** 
   * 验证为错误
   * @default false
   */
  isError: makeBooleanProp(() => defProps.cellInput.isError),
  /** 
   * 输入框为空时占位符
   * @default '请输入'
   */
  placeholder: makeStringProp(() => defProps.cellInput.placeholder),
  /** 
   * 指定 placeholder 的样式
   * @default 'color: #ccc;font-size: 14px'
   */
  placeholderStyle: makeStringProp(() => defProps.cellInput.placeholderStyle),
  /** 
   * 是否自动去除两端的空格
   * @default true
   */
  trim: makeBooleanProp(() => defProps.cellInput.trim),
  /** 
   * 是否可清空
   * @default true
   */
  clearable: makeBooleanProp(() => defProps.cellInput.clearable),
  /** 
   * 光标起始位置，自动聚焦时有效，需与selection-end搭配使用
   * @default -1
   */
  selectionStart: makeNumericProp(() => defProps.cellInput.selectionStart),
  /** 
   * 光标结束位置，自动聚焦时有效，需与selection-start搭配使用
   * @default -1
   */
  selectionEnd: makeNumericProp(() => defProps.cellInput.selectionEnd),
  /** 
   * 最大输入长度，设置为 -1 的时候不限制最大长度
   * @default 140
   */
  maxlength: makeNumericProp(() => defProps.cellInput.maxlength),
  /** 
   * 指定光标与键盘的距离，单位px。取 input 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离
   * @default 0
   */
  cursorSpacing: makeNumericProp(() => defProps.cellInput.cursorSpacing),
  /** 
   * 自定义右边的内容
   * @default false
   */
  isCustom: makeBooleanProp(() => defProps.cellInput.isCustom),
  /**
   * type=select时，旋转右侧的图标，标识当前处于打开还是关闭select的状态
   * open-打开，close-关闭
   * @default false
   */
  selectOpen: makeBooleanProp(() => defProps.cellInput.selectOpen)
}

export type SuCellInputProps = ExtractPropTypes<typeof cellInputProps>
export type SuCellInputType = 'textarea' | 'text' | 'number' | 'select'