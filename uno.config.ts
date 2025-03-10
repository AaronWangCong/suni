import { presetUni } from '@uni-helper/unocss-preset-uni'

import { defineConfig, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  shortcuts: [
    ['flex-x', 'flex items-center justify-center'],
    ['flex-b', 'flex items-center justify-between'],
    ['page-bg', 'bg-[--fe-bg]'],
  ],
  presets: [
    presetUni({
      attributify: {
        prefix: 'su-',
        prefixedOnly: true,
        ignoreAttributes: ['size'],
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
