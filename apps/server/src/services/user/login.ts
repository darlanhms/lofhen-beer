import prisma from 'client';
import * as jwt from 'jsonwebtoken';
import BadRequestError from 'errors/badRequestError';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  user: User;
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

  const passwordMatches = await bcrypt.compare(password, userInDb.password);

  if (!passwordMatches) {
    throw new BadRequestError('Credenciais inválidas');
  }

  const userJwt = jwt.sign({ ...userInDb, password: undefined }, process.env.JWT_SECRET as string, {
    expiresIn: '7d',
  });

  return {
    user: userInDb,
    jwt: userJwt,
  };
}
