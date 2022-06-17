import { Role, User } from '@prisma/client';
import prisma from 'client';
import BadRequestError from 'errors/badRequestError';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { excludeFields } from 'database/excludeFields';

export interface CreateUserRequest {
  name: string;
  username: string;
  password: string;
  role: Role;
}

export default async function createUser(user: CreateUserRequest): Promise<Omit<User, 'password'>> {
  const alreadyRegisteredUser = await prisma.user.findFirst({
    where: {
      username: user.username,
    },
  });

  if (alreadyRegisteredUser) {
    throw new BadRequestError('Nome de usuário já cadastrado');
  }

  user.password = await bcrypt.hash(user.password, 6);

  const newUser = await prisma.user.create({
    data: {
      ...user,
      id: uuid(),
      createdAt: new Date(),
    },
    select: {
      ...excludeFields('user', ['password']),
    },
  });

  return newUser;
}
