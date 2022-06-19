import { inject, injectable } from 'tsyringe';
import UseCase from '@core/UseCase';
import UserEntity from '@entities/user';
import IUserRepository from '@repositories/IUserRepository';

@injectable()
export default class FindAllUsers implements UseCase<undefined, Array<UserEntity>> {
  constructor(
    @inject('UserRepository')
    private userRepo: IUserRepository,
  ) {}

  execute(): Promise<UserEntity[]> {
    return this.userRepo.findAll();
  }
}
