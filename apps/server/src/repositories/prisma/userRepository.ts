import prisma from '@infra/prisma/client';
import UserEntity from '@entities/user';
import UserMapper from '@mappers/userMapper';
import IUserRepository from '@repositories/IUserRepository';

export default class UserRepository implements IUserRepository {
  async save(user: UserEntity): Promise<UserEntity> {
    const userToPersist = await UserMapper.toPersistence(user);

    const persisted = await prisma.user.upsert({
      where: {
        id: userToPersist.id,
      },
      create: userToPersist,
      update: {
        name: userToPersist.name,
        username: userToPersist.username,
        password: userToPersist.password,
      },
    });

    return UserMapper.toEntity(persisted);
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    return UserMapper.toEntityOrNull(user);
  }

  async findAll(): Promise<Array<UserEntity>> {
    const users = await prisma.user.findMany();

    return UserMapper.toEntities(users);
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    return UserMapper.toEntityOrNull(user);
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
