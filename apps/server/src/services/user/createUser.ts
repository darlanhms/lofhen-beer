import { Role } from '@prisma/client';
import prisma from 'client';
import BadRequestError from 'errors/badRequestError';
import UserModel from 'models/user';

export interface CreateUserRequest {
  name: string;
  username: string;
  password: string;
  role: Role;
}

export default async function createUser(user: CreateUserRequest): Promise<UserModel> {
  const alreadyRegisteredUser = await prisma.user.findUnique({
    where: {
      username: user.username,
    },
  });

  if (alreadyRegisteredUser) {
    throw new BadRequestError('Nome de usuário já cadastrado');
  }

  const newUser = new UserModel({
    name: user.name,
    username: user.username,
    role: user.role,
    password: user.password,
  });

  await prisma.user.create({
    data: await newUser.toPersistence(),
  });

  return newUser;
}
