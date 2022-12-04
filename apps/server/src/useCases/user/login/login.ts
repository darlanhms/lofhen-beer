import { inject, injectable } from 'tsyringe';
import BadRequestError from '@core/errors/badRequestError';
import UseCase from '@core/UseCase';
import UserEntity from '@entities/user';
import UserMapper from '@mappers/userMapper';
import ITokenProvider from '@providers/TokenProvider/ITokenProvider';
import IUserRepository from '@repositories/IUserRepository';
import { LoginRequest } from './loginSchema';

export interface LoginResponse {
  user: UserEntity;
  jwt: string;
}

@injectable()
export default class Login implements UseCase<LoginRequest, LoginResponse> {
  constructor(
    @inject('UserRepository')
    private userRepo: IUserRepository,
    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,
  ) {}

  async execute(request: LoginRequest): Promise<LoginResponse> {
    const user = await this.userRepo.findByUsername(request.username);

    if (!user) {
      throw new BadRequestError('Credenciais inválidas.');
    }

    const passwordMatches = await user.comparePassword(request.password);

    if (!passwordMatches) {
      throw new BadRequestError('Credenciais inválidas.');
    }

    const jwt = this.tokenProvider.encode(UserMapper.toDTO(user));

    return {
      user,
      jwt,
    };
  }
}
