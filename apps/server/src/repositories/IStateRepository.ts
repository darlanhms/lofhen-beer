import StateEntity from '@entities/state';

export default interface IStateRepository {
  findAll(): Promise<Array<StateEntity>>;
}
