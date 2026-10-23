import type { Linter } from 'eslint'

import { GLOB_JSON, GLOB_JSON5, GLOB_JSONC } from '../globs'
import { parserJsonc, pluginJsonc } from '../plugins'
import type { Config } from '../types'

export const jsonc = (): Config[] => [
  {
    files: [GLOB_JSON, GLOB_JSON5, GLOB_JSONC],
    languageOptions: {
      parser: parserJsonc,
    },
    name: 'frabbit/json',
    plugins: {
      jsonc: pluginJsonc as any,
    },
    rules: {
      ...(Object.assign(
        {},
        ...pluginJsonc.configs['recommended-with-jsonc'].map(
          (config) => config.rules,
        ),
      ) as Linter.RulesRecord),
      'jsonc/quote-props': 'off',
      'jsonc/quotes': 'off',
    },
  },
]
