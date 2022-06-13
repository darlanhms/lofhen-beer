import { Role, User } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { UserDTO } from '@lofhen/types';

interface UserProps extends Omit<User, 'id' | 'password' | 'createdAt'> {
  password?: string;
  createdAt?: Date;
  hashedPassword?: boolean;
}

export default class UserModel implements User {
  public readonly id: string;

  name: string;

  username: string;

  password: string;

  hashedPassword: boolean;

  role: Role;

  createdAt: Date;

  constructor(props: UserProps, id?: string) {
    Object.assign(this, props);

    this.id = id || uuid();

    if (!id) {
      this.createdAt = new Date();
    }
  }

  static toModel(user: User): UserModel {
    return new UserModel(
      {
        name: user.name,
        role: user.role,
        username: user.username,
        createdAt: user.createdAt,
        password: user.password,
        hashedPassword: true,
      },
      user.id,
    );
  }

  async toPersistence(): Promise<User> {
    await this.hashPassword();

    return {
      id: this.id,
      username: this.username,
      name: this.name,
      password: this.password,
      role: this.role,
      createdAt: this.createdAt,
    };
  }

  toDTO(): UserDTO {
    return {
      id: this.id,
      name: this.name,
      username: this.username,
      role: this.role,
      createdAt: this.createdAt,
    };
  }

  update(props?: Partial<UserProps>): void {
    if (!props) {
      return;
    }

    if (props.name) {
      this.name = props.name;
    }

    if (props.username) {
      this.username = props.username;
    }

    if (props.password) {
      this.password = props.password;
      this.hashedPassword = false;
    }
  }

  async hashPassword(): Promise<void> {
    if (!this.password || this.hashedPassword) {
      return;
    }

    this.password = await bcrypt.hash(this.password, 6);
  }

  async comparePassword(plainText: string): Promise<boolean> {
    const matches = await bcrypt.compare(plainText, this.password);

    return matches;
  }
}
