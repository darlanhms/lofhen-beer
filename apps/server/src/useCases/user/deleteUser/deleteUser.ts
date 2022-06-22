import { inject, injectable } from 'tsyringe';
import UseCase from '@core/UseCase';
import IUserRepository from '@repositories/IUserRepository';

@injectable()
export default class DeleteUser implements UseCase<string, void> {
  constructor(
    @inject('UserRepository')
    private userRepo: IUserRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.userRepo.delete(id);
  }
}
