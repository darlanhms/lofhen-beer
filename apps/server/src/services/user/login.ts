import prisma from 'client';
import * as jwt from 'jsonwebtoken';
import BadRequestError from 'errors/badRequestError';
import UserModel from 'models/user';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  user: UserModel;
  jwt: string;
}

export default async function login({ username, password }: LoginRequest): Promise<LoginResponse> {
  const userInDb = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (!userInDb) {
    throw new BadRequestError('Credenciais inválidas');
  }

  const user = UserModel.toModel(userInDb);

  const passwordMatches = await user.comparePassword(password);

  if (!passwordMatches) {
    throw new BadRequestError('Credenciais inválidas');
  }

  const userJwt = jwt.sign(user.toDTO(), process.env.JWT_SECRET as string, {
    expiresIn: '7d',
  });

  return {
    user,
    jwt: userJwt,
  };
}
