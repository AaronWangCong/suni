
export default [{
  unocss: true,
  rules: {
    'no-unused-expressions': 'off',
    'style/arrow-parens': ['warn', 'always'],
    'antfu/if-newline': 'off',
    'style/brace-style': 'off',
    'prefer-promise-reject-errors': 'off',
    'vue/v-on-event-hyphenation': ['off'],
    '@typescript-eslint/comma-dangle': 'off',
    'style/comma-dangle': 'off',
    'style/member-delimiter-style': 'off',
    'style/operator-linebreak': 'off',
    'no-console': 'off',
    'no-void': 'off',
    'vue/singleline-html-element-content-newline': ['off'],
    '@typescript-eslint/consistent-type-definitions': 'off',
    'eslint-comments/no-unlimited-disable': ['off'],
    'ts/ban-ts-comment': ['off'],
  },
  ignores: [
    "babel.config.js",
    "src/uni_modules/mp-html/*",
    "unpackage",
    "node_modules",
    "coverage",
    "static/common/*",
    "*.nvue"
  ]
}]