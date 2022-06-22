import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { IsNotEmpty, IsIn, MinLength, MaxLength } from 'class-validator';
import Entity from '@core/Entity';

interface UserProps {
  name: string;
  username: string;
  role: Role;
  password: string;
  hashedPassword?: boolean;
  createdAt?: Date;
}

type UpdatableProps = Pick<UserProps, 'name' | 'username' | 'password'>;

export default class UserEntity extends Entity<UserProps> {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name: string;

  @IsNotEmpty({ message: 'Nome de usuário é obrigatório' })
  username: string;

  @IsIn([Role.ADMIN, Role.AGENT], { message: 'Cargo deve ser ADMIN ou AGENT' })
  role: Role;

  @MinLength(4, { message: 'Senha deve ter no mínimo 4 caracteres' })
  @MaxLength(20, { message: 'Senha deve ter no máximo 20 caracteres' })
  password: string;

  hashedPassword: boolean;

  createdAt: Date;

  constructor(props: UserProps, id?: string) {
    super(props, id);

    if (!props.hashedPassword) {
      this.hashedPassword = false;
    }

    if (!props.createdAt) {
      this.createdAt = new Date();
    }
  }

  update(props: Partial<UpdatableProps>): void {
    if (props.username) {
      this.username = props.username;
    }

    if (props.password) {
      this.password = props.password;
      this.hashedPassword = false;
    }

    if (props.name) {
      this.name = props.name;
    }
  }

  async hashPassword(): Promise<void> {
    if (!this.password || this.hashedPassword) {
      return;
    }

    this.password = await bcrypt.hash(this.password, 6);
    this.hashedPassword = true;
  }

  async comparePassword(plainText: string): Promise<boolean> {
    if (!this.password) {
      return false;
    }

    const matches = await bcrypt.compare(plainText, this.password);

    return matches;
  }
}
