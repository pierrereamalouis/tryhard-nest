export default function mapDtoToEntity<Entity, Dto>(
  entity: Entity,
  dto: Dto,
): Entity {
  for (const [key, value] of Object.entries(dto)) {
    if (value !== null && value !== '') {
      entity[key] = value;
    }
  }

  return entity;
}
