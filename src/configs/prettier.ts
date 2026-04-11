import configPrettier from 'eslint-config-prettier'

import type { Config } from '../types'

export const prettier = (): Config[] => [
  {
    ...configPrettier,
    name: 'frabbit/prettier',
  },
]
