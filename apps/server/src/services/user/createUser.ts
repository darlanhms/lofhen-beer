import { Role } from '@prisma/client';
import prisma from 'client';
import UserModel from 'models/user';

interface CreateUserProps {
  name: string;
  username: string;
  password: string;
  role: Role;
}

export default async function createUser(user: CreateUserProps): Promise<UserModel> {
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
