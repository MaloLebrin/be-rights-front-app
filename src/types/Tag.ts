export enum TagVariantsEnum {
  'PRIMARY' = 'primary',
  'WARNING' = 'warning',
  'DANGER' = 'danger',
  'SUCCESS' = 'success',
  'PROMOTION' = 'promotion',
}
export const TagVariantsArray = Object.values(TagVariantsEnum).map(variant => variant)

// Mapped Type to enforce class creation when adding a variant
// This will make TypeScript throw errors if a variant is added to the enum but the corresponding classes are not added to the map.
export type TagVariantsMap = {
  [key in TagVariantsEnum]: string
}

export const TagsVariantsMap: TagVariantsMap = {
  primary: 'bg-blue text-white hover:bg-blue-dark hover:dark:bg-blue-light',
  warning: 'bg-orange text-white hover:bg-orange-dark',
  danger: 'bg-red text-white hover:bg-red-dark',
  success: 'bg-green text-white hover:bg-green-dark',
  promotion: 'bg-violet text-white hover:bg-violet-dar',
}
