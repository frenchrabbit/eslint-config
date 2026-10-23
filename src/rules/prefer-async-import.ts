import type { Rule } from 'eslint'

const VUE_BUILTINS = new Set([
  'component',
  'transition',
  'transition-group',
  'keep-alive',
  'slot',
  'teleport',
  'suspense',
  'template',
])

const HTML_ELEMENTS = new Set([
  'a',
  'abbr',
  'address',
  'area',
  'article',
  'aside',
  'audio',
  'b',
  'base',
  'bdi',
  'bdo',
  'blockquote',
  'body',
  'br',
  'button',
  'canvas',
  'caption',
  'cite',
  'code',
  'col',
  'colgroup',
  'data',
  'datalist',
  'dd',
  'del',
  'details',
  'dfn',
  'dialog',
  'div',
  'dl',
  'dt',
  'em',
  'embed',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'head',
  'header',
  'hgroup',
  'hr',
  'html',
  'i',
  'iframe',
  'img',
  'input',
  'ins',
  'kbd',
  'label',
  'legend',
  'li',
  'link',
  'main',
  'map',
  'mark',
  'menu',
  'meta',
  'meter',
  'nav',
  'noscript',
  'object',
  'ol',
  'optgroup',
  'option',
  'output',
  'p',
  'param',
  'picture',
  'pre',
  'progress',
  'q',
  'rp',
  'rt',
  'ruby',
  's',
  'samp',
  'section',
  'select',
  'small',
  'source',
  'span',
  'strong',
  'style',
  'sub',
  'summary',
  'sup',
  'table',
  'tbody',
  'td',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'time',
  'title',
  'tr',
  'track',
  'u',
  'ul',
  'var',
  'video',
  'wbr',
])

function toKebabCase(str: string): string {
  return str
    .replaceAll(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replaceAll(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()
}

function isComponentTag(name: string): boolean {
  const lower = name.toLowerCase()
  if (HTML_ELEMENTS.has(lower) || VUE_BUILTINS.has(lower)) return false
  return (
    name.includes('-') || (name.length > 0 && name[0] === name[0].toUpperCase())
  )
}

function isConditionalDirective(attr: {
  directive?: boolean
  key?: { name?: { name?: string } }
}): boolean {
  if (!attr.directive || !attr.key?.name?.name) return false
  const n = attr.key.name.name
  return n === 'if' || n === 'else-if' || n === 'else'
}

function isInsideConditionalBlock(
  node: {
    type: string
    parent?: unknown
    startTag?: { attributes?: unknown[] }
  } | null,
): boolean {
  let current: typeof node = node
  while (current && current.type === 'VElement') {
    const attrs = current.startTag?.attributes ?? []
    if (
      attrs.some((a: unknown) =>
        isConditionalDirective(
          a as Parameters<typeof isConditionalDirective>[0],
        ),
      )
    )
      return true
    current = (current as { parent?: typeof node }).parent as typeof node
  }
  return false
}

interface ImportInfo {
  node: Rule.Node
  localName: string
  kebab: string
  isAsync: boolean
}

function getImportedName(spec: {
  type: string
  imported?: { name: string }
  local?: { name: string }
}): string {
  if (spec.type === 'ImportDefaultSpecifier')
    return (spec as { local?: { name: string } }).local?.name ?? ''
  const imp = (
    spec as { imported?: { name: string }; local?: { name: string } }
  ).imported
  const local = (spec as { local?: { name: string } }).local
  return local?.name ?? imp?.name ?? ''
}

function isDefineAsyncComponentUsage(
  node: Rule.Node & {
    type?: string
    callee?: { name?: string }
    arguments?: unknown[]
  },
): boolean {
  if (node.type !== 'CallExpression') return false
  const callee = node.callee as { name?: string } | undefined
  if (callee?.name !== 'defineAsyncComponent') return false
  const arg = node.arguments?.[0]
  return !!arg && (arg as { type?: string }).type === 'ArrowFunctionExpression'
}

export const preferAsyncImport: Rule.RuleModule = {
  create(context: Rule.RuleContext) {
    const options = context.options[0] ?? {}
    const version = (options as { version?: 2 | 3 }).version ?? 3
    const sourceCode =
      context.sourceCode ??
      (
        context as unknown as {
          getSourceCode: () => {
            parserServices?: { defineTemplateBodyVisitor?: unknown }
          }
        }
      ).getSourceCode()

    const conditionalComponents = new Set<string>()
    const unconditionalComponents = new Set<string>()
    const staticImports = new Map<string, ImportInfo>()
    const asyncComponentNames = new Set<string>()

    const parserServices = sourceCode.parserServices
    const defineTemplateBodyVisitor =
      parserServices?.defineTemplateBodyVisitor as
        | ((
            templateVisitor: Record<string, (node: unknown) => void>,
            scriptVisitor?: Record<string, (node: unknown) => void>,
          ) => Record<string, (node: unknown) => void>)
        | undefined

    if (!defineTemplateBodyVisitor) {
      return {}
    }

    const templateVisitor: Record<string, (node: unknown) => void> = {
      VElement(node: unknown) {
        const el = node as {
          name: string
          startTag?: { attributes?: unknown[] }
          parent?: unknown
          type?: string
        }
        const name = el.name
        if (!isComponentTag(name)) return
        const kebab = toKebabCase(name)
        const conditional = isInsideConditionalBlock(
          el as Parameters<typeof isInsideConditionalBlock>[0],
        )
        if (conditional) conditionalComponents.add(kebab)
        else unconditionalComponents.add(kebab)
      },
    }

    const scriptVisitor: Record<string, (node: unknown) => void> = {
      ImportDeclaration(node: unknown) {
        const n = node as Rule.Node & {
          specifiers?: unknown[]
          source?: { value?: string }
        }
        const specifiers = n.specifiers ?? []
        for (const spec of specifiers) {
          const localName = getImportedName(
            spec as Parameters<typeof getImportedName>[0],
          )
          if (!localName) continue
          const kebab = toKebabCase(localName)
          staticImports.set(kebab, {
            isAsync: false,
            kebab,
            localName,
            node: n,
          })
        }
      },
      Property(node: unknown) {
        const n = node as Rule.Node & {
          key?: { name?: string }
          value?: { type?: string; callee?: { name?: string } }
          parent?: { type?: string }
        }
        const parent = n.parent as
          | {
              type?: string
              parent?: { type?: string; key?: { name?: string } }
            }
          | undefined
        if (parent?.type !== 'ObjectExpression') return
        const grandparent = parent.parent as
          { type?: string; key?: { name?: string } } | undefined
        if (
          grandparent?.type !== 'Property' ||
          grandparent.key?.name !== 'components'
        )
          return
        const keyName = (n.key as { name?: string })?.name
        if (!keyName) return
        const value = n.value as
          { type?: string; callee?: { name?: string } } | undefined
        if (!value) return
        const isAsync =
          value.type === 'ArrowFunctionExpression' ||
          (value.type === 'CallExpression' &&
            value.callee?.name === 'defineAsyncComponent')
        if (isAsync) asyncComponentNames.add(toKebabCase(keyName))
      },
      VariableDeclarator(node: unknown) {
        const n = node as Rule.Node & { id?: { name?: string }; init?: unknown }
        const id = n.id as { name?: string } | undefined
        const init = n.init
        if (!id?.name || !init) return
        if (
          !isDefineAsyncComponentUsage(
            init as Parameters<typeof isDefineAsyncComponentUsage>[0],
          )
        )
          return
        asyncComponentNames.add(toKebabCase(id.name))
      },
    }

    function isUsedOnlyConditionally(kebab: string): boolean {
      const withoutHyphens = kebab.replaceAll('-', '')
      return (
        (conditionalComponents.has(kebab) ||
          conditionalComponents.has(withoutHyphens)) &&
        !unconditionalComponents.has(kebab) &&
        !unconditionalComponents.has(withoutHyphens)
      )
    }

    const visitors = defineTemplateBodyVisitor(templateVisitor, scriptVisitor)
    const programExit = visitors['Program:exit']
    visitors['Program:exit'] = function (node: unknown) {
      programExit?.(node)
      for (const [kebab, info] of staticImports) {
        if (asyncComponentNames.has(kebab)) continue
        if (!isUsedOnlyConditionally(kebab)) continue
        const suggestion =
          version === 3
            ? `defineAsyncComponent(() => import('...'))`
            : `() => import('...') in components option`
        context.report({
          data: { name: info.localName, suggestion, version: String(version) },
          messageId: 'preferAsyncImport',
          node: info.node,
        })
      }
    }
    return visitors
  },

  meta: {
    docs: {
      description:
        'Prefer async/dynamic import for components used only inside v-if (or under a v-if parent)',
      url: 'https://github.com/frenchrabbit/eslint-config#frabbit-vueprefer-async-import',
    },
    messages: {
      preferAsyncImport:
        'Component "{{name}}" is only used inside v-if. Prefer async import for code splitting. ' +
        'Vue {{version}}: {{suggestion}}',
    },
    schema: [
      {
        additionalProperties: false,
        properties: {
          version: { enum: [2, 3], type: 'number' },
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
}
