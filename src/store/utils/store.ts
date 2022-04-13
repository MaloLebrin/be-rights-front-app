export function parseEntity<T>(entity: any): T {
  const ent = {
    ...entity,
    id: entity._id,
  }
  return ent
}
