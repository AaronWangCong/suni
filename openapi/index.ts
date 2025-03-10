import type { GenerateServiceProps } from '@wc/openapi'
import process from 'node:process'
import { openAPIs } from '@wc/openapi'
import apiModules from './module'

type Recordable<T = any> = Record<string, T>
interface ModuleType {
  prefix: string;
  namespace?: string;
  url: string;
  list: {
    [key: string]: {
      json: string;
      routes: string[];
      // 生成文件的路径
      serversPath?: string;
    };
  };
  hook?: { [key: string]: Recordable };
  apifox?: boolean;
}

const envs = ['dev', 'test', 'uat']
const env = process.argv[2]
const apis: GenerateServiceProps[] = []
if (!env || !envs.includes(env)) {
  console.error('请传入环境参数如：pnpm openapi dev | test | uat')
} else {
  apiModules.forEach((module: ModuleType) => {
    for (const item in module.list) {
      if (item) {
        const swagger = module.list[item].json
        const url = module.url.replace(/\$(\d+)/g, () => {
          return env
        })
        let schemaPath = `${url}/${module.prefix}${swagger}`
        if (module.apifox) {
          schemaPath = module.list[item].json
        }
        const openapi: GenerateServiceProps = {
          schemaPath,
          serversPath: module.list[item].serversPath || `src/api/`,
          projectName: item,
          templateName: 'uniapptemplate',
          requestLibPath: 'import http from \'@/util/http\'',
          isTS: true,
          apiPrefix: module.prefix,
          routes: module.list[item].routes || [],
        }
        if (module?.namespace) openapi.namespace = module.namespace
        if (module?.hook) openapi.hook = module.hook
        apis.push(openapi)
      }
    }
  })

  openAPIs(apis)
}
