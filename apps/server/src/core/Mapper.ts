import Entity from './Entity';

export default abstract class Mapper<
  E extends Entity<any>,
  P extends Record<any, any>,
  D extends Record<any, any>,
> {
  abstract toEntity(persisted: P): E;

  abstract toPersistence(entity: E): P | Promise<P>;

  abstract toDTO(entity: E): D;

  toEntities(persistencies: Array<P>): Array<E> {
    return persistencies.map(this.toEntity);
  }

  toPersistencies(entities: Array<E>): Array<Promise<P>> {
    return entities.map(async e => this.toPersistence(e));
  }

  toDTOs(entities: Array<E>): Array<D> {
    return entities.map(this.toDTO);
  }

  toEntityOrNull(persisted: P | null | undefined): E | null {
    return persisted ? this.toEntity(persisted) : null;
  }

  toEntityOrUndefined(persisted: P | null | undefined): E | undefined {
    return persisted ? this.toEntity(persisted) : undefined;
  }

  toDTOOrNull(entity: E | null | undefined): D | null {
    return entity ? this.toDTO(entity) : null;
  }
}
