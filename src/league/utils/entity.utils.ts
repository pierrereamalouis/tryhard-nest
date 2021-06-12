export default function mapEntityKeys<Entity, Dto>(
  entity: Entity,
  dto: Dto,
): Entity {
  for (const [key, value] of Object.entries(dto)) {
    if (value !== null && value !== '' && entity.hasOwnProperty) {
      entity[key] = value;
    }
  }

  return entity;
}
