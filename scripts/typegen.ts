import { writeFile } from 'node:fs/promises'
import { styleText } from 'node:util'

import { flatConfigsToRulesDTS } from 'eslint-typegen/core'
import { builtinRules } from 'eslint/use-at-your-own-risk'

import { presetAll } from '../src'

const configs = [
  ...(await presetAll()),
  {
    plugins: { '': { rules: Object.fromEntries(builtinRules) } },
  },
]

let dts = await flatConfigsToRulesDTS(configs, {
  includeAugmentation: false,
  exportTypeName: 'Rules',
  filterPlugin(name) {
    return name !== 'sxzz'
  },
})

// Some rule schemas reuse identical interface definitions.
const interfaces = new Set<string>()
dts = dts.replaceAll(/interface [^\n]+ \{\n[^}]*\}/g, (declaration) => {
  if (interfaces.has(declaration)) return ''
  interfaces.add(declaration)
  return declaration
})

const configNames = configs.map((i) => i.name).filter(Boolean) as string[]
dts += `
// Names of all the configs
export type ConfigNames = ${configNames.map((i) => `'${i}'`).join(' | ')}
`

await writeFile('src/typegen.ts', dts.replaceAll(/[ \t]+$/gm, ''))

console.log(styleText('green', 'Type definitions generated!'))
