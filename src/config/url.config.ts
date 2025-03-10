type NetConfig = Record<string, string>

type EnvType = 'dev' | 'test' | 'uat' | 'prod'

function getProxy(env: string, type = ''): Record<string, string> {
  const domain =
    env === 'prod' ? 'gotofreight.com' : `${env}.shijizhongyun.com`
  const domainVis =
    env === 'prod' ? '.gotofreight.com' : `-${env}.shijizhongyun.com`
  const baseUrl = [
    {
      url: `https://centerapi${type}.${domain}`,
      prefix: [
        'userApi',
        'payApi',
        'dataCenterApi',
        'interfaceApi',
        'reportApi',
        'customerApi',
        'flowApi',
        'contractApi',
        'financeApi',
        'open-apis',
      ],
    },
    {
      url: `https://apigateway${type}.${domain}`,
      prefix: ['sdmspanel', 'sdms'],
    },
    {
      url: `https://camelapi${type}.${domain}`,
      prefix: ['Store'],
    },
    {
      url: `https://registerapi${domainVis}`,
      prefix: ['visitApi'],
    },
  ]
  return baseUrl.reduce(
    (accumulator, { prefix, url }) => {
      prefix.forEach((key) => {
        accumulator[key] = url
      })
      return accumulator
    },
    {} as Record<string, string>,
  )
}

const config: { [key in EnvType]: NetConfig } = {
  dev: {
    ...getProxy('dev'),
  },
  test: {
    ...getProxy('test'),
  },
  uat: {
    ...getProxy('uat'),
  },
  prod: {
    ...getProxy('prod'),
  },
}

export { config }
