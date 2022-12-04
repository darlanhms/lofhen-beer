import { UpdateUserRequest } from '@lofhen/contracts';
import { filledArray } from '@lofhen/utils';
import { validate } from 'class-validator';
import { inject, injectable } from 'tsyringe';
import ValidationError from '@core/errors/validationError';
import UseCase from '@core/UseCase';
import IUserRepository from '@repositories/IUserRepository';

@injectable()
export default class UpdateUser implements UseCase<UpdateUserRequest, void> {
  constructor(
    @inject('UserRepository')
    private userRepo: IUserRepository,
  ) {}

  async execute(request: UpdateUserRequest): Promise<void> {
    const user = await this.userRepo.findById(request.id);

    if (!user) {
      return;
    }

    user.update({
      name: request.name,
      username: request.username,
      password: request.password,
    });

    const errors = await validate(user);

    if (filledArray(errors)) {
      throw new ValidationError(errors);
    }

    await this.userRepo.save(user);
  }
}
