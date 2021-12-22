import type { Awaitable } from '@antfu/utils'

export interface ImportInfo {
	name?: string
	importName?: string
	path: string
}

export type SideEffectsInfo = (ImportInfo | string)[] | ImportInfo | string | undefined

export interface ComponentInfo extends ImportInfo {
	sideEffects?: SideEffectsInfo
}

export type ComponentResolveResult = Awaitable<string | ComponentInfo | null | undefined | void>

export type ComponentResolverFunction = (name: string) => ComponentResolveResult

export type ComponentResolverObject = {
	type: 'component' | 'directive'
	resolve: ComponentResolverFunction
}

export type ComponentResolver = ComponentResolverObject