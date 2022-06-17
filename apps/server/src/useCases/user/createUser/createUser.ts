import UseCase from '@core/UseCase';
import UserEntity from '@entities/user';
import { Role } from '@prisma/client';
import IUserRepository from '@repositories/IUserRepository';
import { validate } from 'class-validator';
import { inject, injectable } from 'tsyringe';
import { filledArray } from '@lofhen/utils';
import ValidationError from '@core/errors/validationError';
import BadRequestError from '@core/errors/badRequestError';

export interface CreateUserRequest {
  name: string;
  username: string;
  password: string;
  role: Role;
}

@injectable()
export default class CreateUser implements UseCase<CreateUserRequest, UserEntity> {
  constructor(
    @inject('UserRepository')
    private userRepo: IUserRepository,
  ) {}

  async execute(request: CreateUserRequest): Promise<UserEntity> {
    const alreadyRegisteredUser = await this.userRepo.findByUsername(request.username);

    if (alreadyRegisteredUser) {
      throw new BadRequestError('Nome de usuário já cadastrado.');
    }

    const user = new UserEntity({
      name: request.name,
      username: request.username,
      role: request.role,
      password: request.password,
    });

    const errors = await validate(user);

    if (filledArray(errors)) {
      throw new ValidationError(errors);
    }

    const newUser = await this.userRepo.save(user);

    return newUser;
  }
}
