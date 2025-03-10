import dayjs from 'dayjs/esm/index'

type Props = {
  date: string | Date
  month: any[]
  customList: any[]
  lunar: Boolean
  getLunar: (val: Props['date']) => any
}

/**
 * 设置日历一个月的数据
 * 该函数会根据传入的日期生成一个月的日历数据，包括上个月的末尾几天、本月的所有日期和下个月的开头几天。
 * 生成的数据会被分割成每周一组，并添加到 month 数组中。
 */
function setMonth({
  date,
  month,
  customList,
  lunar,
  getLunar,
}: Props) {
  // 月初是周几，获取当前日期的月初是星期几，0 表示周日，1-6 表示周一到周六
  const day = dayjs(date).date(1).day()
  // 计算日历中本月第一天的起始位置，周日对应 6，周一到周六对应 0-5
  const start = day == 0 ? 6 : day - 1

  // 本月天数，获取当前日期所在月份的总天数
  const days = dayjs(date).endOf('month').format('D')

  // 上个月天数，获取当前日期所在月份的上一个月的总天数
  const prevDays = dayjs(date).endOf('month').subtract(1, 'month').format('D')

  // 日期数据，用于存储生成的所有日期数据
  const arr: any[] = []
  // 清空表格，清空之前存储的月份数据
  month = []

  // 添加上月数据，生成上个月末尾几天的数据并添加到 arr 数组中
  arr.push(
    ...new Array(start).fill(1).map((_, i) => {
      // 计算上个月的日期
      const day = Number(prevDays) - start + i + 1

      return {
        // 日期值
        value: day,
        // 标记为禁用状态
        disabled: true,
        // 格式化日期
        date: dayjs(date).subtract(1, 'month').date(day).format('YYYY-MM-DD')
      }
    })
  )

  // 添加本月数据，生成本月的所有日期数据并添加到 arr 数组中
  arr.push(
    ...new Array(Number(days) - 0).fill(1).map((_, i) => {
      // 计算本月的日期
      const day = i + 1

      return {
        // 日期值
        value: day,
        // 格式化日期
        date: dayjs(date).date(day).format('YYYY-MM-DD')
      }
    })
  )

  // 添加下个月，生成下个月开头几天的数据并添加到 arr 数组中
  arr.push(
    ...new Array(42 - Number(days) - start).fill(1).map((_, i) => {
      // 计算下个月的日期
      const day = i + 1

      return {
        // 日期值
        value: day,
        // 标记为禁用状态
        disabled: true,
        // 格式化日期
        date: dayjs(date).add(1, 'month').date(day).format('YYYY-MM-DD')
      }
    })
  )

  // 分割数组，将 arr 数组中的数据按每周 7 天进行分割，并添加到 month 数组中
  for (let n = 0; n < arr.length; n += 7) {
    month.push(
      arr.slice(n, n + 7).map((e, i) => {
        // 为每个日期添加索引
        e.index = i + n

        // 自定义信息，查找自定义列表中与当前日期匹配的信息
        const custom = customList.find((c) => c.date == e.date)

        // 农历，如果启用了农历显示，则获取当前日期的农历信息
        if (lunar) {
          const { IDayCn, IMonthCn } = getLunar(e.date)
          // 如果是初一，则显示农历月份，否则显示农历日期
          e.lunar = IDayCn == '初一' ? IMonthCn : IDayCn
        }

        return {
          // 合并日期数据和自定义信息
          ...e,
          ...custom
        }
      })
    )
  }
}

