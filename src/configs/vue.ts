import { GLOB_VUE } from '../globs'
import { parserVue, pluginVue, tseslint } from '../plugins'

import type { Config } from '../types'
import { typescriptCore } from './typescript'
import type { ESLint } from 'eslint'

export interface VueOptions {
  /** Vue version. @default 3 */
  version?: 2 | 3
}

export const reactivityTransform = (): Config[] => [
  {
    languageOptions: {
      globals: {
        $: 'readonly',
        $$: 'readonly',
        $computed: 'readonly',
        $customRef: 'readonly',
        $ref: 'readonly',
        $shallowRef: 'readonly',
        $toRef: 'readonly',
      },
    },
    name: 'frabbit/vue/reactivity-transform',
    plugins: {
      vue: pluginVue,
    },
    rules: {
      'vue/no-setup-props-reactivity-loss': 'off',
    },
  },
]

const vueTs: Config[] = typescriptCore
  .filter((config) => config.name !== 'typescript-eslint/base')
  .map((config) => {
    return {
      ...config,
      files: [GLOB_VUE],
      name: `frabbit/vue/${config.name?.replace('frabbit/', '') || 'anonymous'}`,
    }
  })

export const vue = (options: VueOptions = {}): Config[] => {
  const { version = 3 } = options

  const configKey = version === 2 ? 'flat/vue2-recommended' : 'flat/recommended'
  // eslint-disable-next-line security/detect-object-injection
  const recommendedRules = pluginVue.configs[configKey]
    .map((c) => c.rules)
    .reduce((acc, c) => ({ ...acc, ...c }), {}) as any

  return [
    ...vueTs,
    {
      files: [GLOB_VUE],
      languageOptions: {
        parser: parserVue,
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          extraFileExtensions: ['.vue'],
          parser: tseslint.parser,
          sourceType: 'module',
        },
      },
      name: 'frabbit/vue',
      plugins: {
        '@typescript-eslint': tseslint.plugin as ESLint.Plugin,
        vue: pluginVue,
      },
      processor: pluginVue.processors['.vue'],
      rules: {
        ...recommendedRules,

        'vue/block-order': [
          'error',
          { order: ['script', 'template', 'style'] },
        ],
        'vue/custom-event-name-casing': ['error', 'camelCase'],
        'vue/eqeqeq': ['error', 'smart'],
        'vue/html-self-closing': [
          'error',
          {
            html: {
              component: 'always',
              normal: 'always',
              void: 'any',
            },
            math: 'always',
            svg: 'always',
          },
        ],
        'vue/max-attributes-per-line': 'off',

        'vue/multi-word-component-names': 'off',
        'vue/no-constant-condition': 'warn',
        'vue/no-empty-pattern': 'error',
        'vue/no-loss-of-precision': 'error',
        'vue/no-ref-as-operand': 'off',
        'vue/no-unused-refs': 'error',
        'vue/no-useless-v-bind': 'error',

        'vue/no-v-html': 'off',
        'vue/object-shorthand': [
          'error',
          'always',
          {
            avoidQuotes: true,
            ignoreConstructors: false,
          },
        ],
        'vue/one-component-per-file': 'off',
        'vue/padding-line-between-blocks': ['error', 'always'],
        'vue/prefer-template': 'error',
        'vue/require-default-prop': 'off',
        'vue/require-prop-types': 'off',
        'vue/return-in-computed-property': [
          'error',
          { treatUndefinedAsUnspecified: false },
        ],
      },
    },
    ...(version === 3 ? reactivityTransform() : []),
  ]
}
