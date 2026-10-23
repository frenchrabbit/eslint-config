import { GLOB_YAML } from '../globs'
import { parserYml, pluginYml } from '../plugins'
import type { Rules } from '../typegen'
import type { Config } from '../types'

export const yml = (): Config[] => [
  {
    name: 'frabbit/yaml/setup',
    plugins: {
      yml: pluginYml as any,
    },
  },
  {
    files: [GLOB_YAML],
    languageOptions: {
      parser: parserYml,
    },
    name: 'frabbit/yaml/rules',
    rules: {
      ...(Object.assign(
        {},
        ...pluginYml.configs.standard.map((config) => config.rules),
      ) as Rules),
      ...(Object.assign(
        {},
        ...pluginYml.configs.prettier.map((config) => config.rules),
      ) as Rules),
      'yml/no-empty-mapping-value': 'off',
    },
  },
]
