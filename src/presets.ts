import { type FlatESLintConfig } from 'eslint-define-config'

import {
  comments,
  ignores,
  imports,
  javascript,
  jsonc,
  markdown,
  prettier,
  security,
  sonarjs,
  sortPackageJson,
  sortTsconfig,
  typescript,
  unicorn,
  unocss,
  vue,
  yml,
} from './configs'

export const presetJavaScript = [
  ...ignores,
  ...javascript,
  ...comments,
  ...imports,
  ...unicorn,
  ...security,
  ...sonarjs,
]

export const presetLangsExtensions = [
  ...markdown,
  ...yml,
  ...jsonc,
  ...sortPackageJson,
  ...sortTsconfig,
]

export const basic = [
  ...presetJavaScript,
  ...typescript,
  ...presetLangsExtensions,
]
export { basic as presetBasic }

export const all = [...basic, ...vue, ...unocss, ...prettier]

export function frabbit(
  config: FlatESLintConfig | FlatESLintConfig[] = [],
  {
    vue: enableVue = true,
    prettier: enablePrettier = true,
    markdown: enableMarkdown = true,
    unocss: enableUnocss = false,
  }: Partial<{
    vue: boolean
    prettier: boolean
    markdown: boolean
    unocss: boolean
  }> = {}
): FlatESLintConfig[] {
  const configs = []
  configs.push(...basic)
  if (enableVue) {
    configs.push(...vue)
  }
  if (enableMarkdown) {
    configs.push(...markdown)
  }
  if (enableUnocss) {
    configs.push(...unocss)
  }
  if (enablePrettier) {
    configs.push(...prettier)
  }
  if (Object.keys(config).length > 0) {
    configs.push(...(Array.isArray(config) ? config : [config]))
  }
  return configs
}
