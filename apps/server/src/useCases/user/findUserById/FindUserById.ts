import UseCase from '@core/UseCase';
import UserEntity from '@entities/user';
import IUserRepository from '@repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class FindUserById implements UseCase<string, UserEntity | null> {
  constructor(
    @inject('UserRepository')
    private userRepo: IUserRepository,
  ) {}

  execute(id: string): Promise<UserEntity | null> {
    return this.userRepo.findById(id);
  }
}
