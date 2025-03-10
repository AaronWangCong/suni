/**
 * 对数字进行补零操作
 * @param num - 要补零的数字
 * @param targetLength - 补零后字符串的目标长度，默认为 2
 * @returns 补零后的字符串
 */
function padZero(num: number, targetLength: number = 2): string {
  // 将数字转换为字符串
  let str = `${num}`;
  // 当字符串长度小于目标长度时，在字符串前面补零
  while (str.length < targetLength) {
    str = `0${str}`;
  }
  return str;
}

// 定义时间单位常量
const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/**
 * 将给定的时间戳解析为包含天、小时、分钟、秒和毫秒的对象
 * @param time - 要解析的时间戳（毫秒）
 * @returns 包含解析后时间数据的对象
 */
export function parseTimeData(time: number) {
  // 计算天数
  const days = Math.floor(time / DAY);
  // 计算剩余小时数
  const hours = Math.floor((time % DAY) / HOUR);
  // 计算剩余分钟数
  const minutes = Math.floor((time % HOUR) / MINUTE);
  // 计算剩余秒数
  const seconds = Math.floor((time % MINUTE) / SECOND);
  // 计算剩余毫秒数
  const milliseconds = Math.floor(time % SECOND);

  return {
    days,
    hours,
    minutes,
    seconds,
    milliseconds
  };
}

/**
 * 根据给定的格式化字符串和时间数据对象，生成格式化后的时间字符串
 * @param format - 格式化字符串，例如 'DD HH:mm:ss.SSS'
 * @param timeData - 包含天、小时、分钟、秒和毫秒的时间数据对象
 * @returns 格式化后的时间字符串
 */
export function parseFormat(format: string, timeData: { days: number; hours: number; minutes: number; seconds: number; milliseconds: number }) {
  // 解构时间数据对象
  let { days, hours, minutes, seconds, milliseconds } = timeData;
  // 如果格式化字符串中不存在DD(天)，则将天的时间转为小时中去
  if (format.indexOf('DD') === -1) {
    hours += days * 24;
  } else {
    // 对天补0
    format = format.replace('DD', padZero(days));
  }
  // 如果格式化字符串中不存在HH(小时)，则将小时的时间转为分钟中去
  if (format.indexOf('HH') === -1) {
    minutes += hours * 60;
  } else {
    // 对小时补0
    format = format.replace('HH', padZero(hours));
  }
  // 如果格式化字符串中不存在mm(分钟)，则将分钟的时间转为秒中去
  if (format.indexOf('mm') === -1) {
    seconds += minutes * 60;
  } else {
    // 对分钟补0
    format = format.replace('mm', padZero(minutes));
  }
  // 如果格式化字符串中不存在ss(秒)，则将秒的时间转为毫秒中去
  if (format.indexOf('ss') === -1) {
    milliseconds += seconds * 1000;
  } else {
    // 对秒补0
    format = format.replace('ss', padZero(seconds));
  }
  // 对毫秒补0
  return format.replace('SSS', padZero(milliseconds, 3));
}

/**
 * 判断两个时间戳是否在同一秒内
 * @param time1 - 第一个时间戳（毫秒）
 * @param time2 - 第二个时间戳（毫秒）
 * @returns 如果两个时间戳在同一秒内返回 true，否则返回 false
 */
export function isSameSecond(time1: number, time2: number) {
  return Math.floor(time1 / 1000) === Math.floor(time2 / 1000);
}
