import UserEntity from '@entities/user';

export default interface IUserRepository {
  save(user: UserEntity): Promise<UserEntity>;
  findById(id: string): Promise<UserEntity | null>;
  findByUsername(username: string): Promise<UserEntity | null>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Array<UserEntity>>;
}
