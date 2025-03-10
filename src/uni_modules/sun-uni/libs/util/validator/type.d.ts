import { Recordable } from './../../../types/uni.d';
import type { RuleItem as RuleItemI, ValidateResult as Result } from './interface';

/**
 * SuValidator
 */
namespace SuValidator {
  /**
   * 用于表示表单验证的触发方式，可选值为 'change' 和 'blur' 
   */
  export type TriggerType = 'change' | 'blur';

  /**
   * 继承自 RuleItemI，并添加一个 trigger 属性，用于指定验证规则的触发方式
   */
  export type RuleItem = RuleItemI & {
    trigger?: TriggerType | TriggerType[];
  };

  /**
   * 用于表示单个或多个验证规则
   */
  export type Rule = RuleItem | RuleItem[];

  /**
   * 用于表示一组验证规则，其中每个规则都与一个表单字段相关联
   */
  export type Rules = Record<string, Rule>;
  
  export type Callback = (error?: string | Error | SuUni.Recordable) => void
  export type ValidateResult = Result

}
