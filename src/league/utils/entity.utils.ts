export function getUpdatedFields<Entity, Dto>(
  entity: Entity,
  dto: Dto,
): Entity {
  for (let key in dto) {
    if (dto[key] !== null && dto[key] !== '') {
      entity[key] = dto[key];
    }
  }

  return entity;
}
