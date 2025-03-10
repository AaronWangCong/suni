import type { SuUni } from '@/uni_modules/sun-uni/types/uni';
import type { ExecuteRule } from '../interface';
import { format, isEmptyValue } from '../util';

const required: ExecuteRule = (rule, value, source, errors, options: SuUni.Recordable, type) => {
  if (
    rule.required &&
    (!source.hasOwnProperty(rule.field!) ||
      isEmptyValue(value, type || rule.type))
  ) {
    errors.push(format(options.messages.required, rule.fullField));
  }
};

export default required;
