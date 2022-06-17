import { UserDTO } from '@lofhen/types';
import { User } from '@prisma/client';
import Mapper from '@core/Mapper';
import UserEntity from '@entities/user';

class UserMapperBase extends Mapper<UserEntity, User, UserDTO> {
  toEntity(persisted: User): UserEntity {
    return new UserEntity(
      {
        name: persisted.name,
        username: persisted.username,
        password: persisted.password,
        hashedPassword: true,
        role: persisted.role,
        createdAt: persisted.createdAt,
      },
      persisted.id,
    );
  }

  async toPersistence(entity: UserEntity): Promise<User> {
    if (!entity.hashedPassword) {
      await entity.hashPassword();
    }

    return {
      id: entity.id,
      name: entity.name,
      username: entity.username,
      password: entity.password,
      role: entity.role,
      deleted: false,
      createdAt: entity.createdAt,
    };
  }

  toDTO(entity: UserEntity): UserDTO {
    return {
      id: entity.id,
      name: entity.name,
      username: entity.username,
      role: entity.role,
      createdAt: entity.createdAt,
    };
  }
}

const UserMapper = new UserMapperBase();

export default UserMapper;
