import { UserDTO } from '@lofhen/types';
import * as jwt from 'jsonwebtoken';
import ITokenProvider from '../ITokenProvider';

export default class JwtProvider implements ITokenProvider {
  encode(user: UserDTO): string {
    return jwt.sign(user, process.env.JWT_SECRET as string, {
      expiresIn: '7d',
    });
  }

  verify(token: string): UserDTO | null {
    try {
      return jwt.verify(token, process.env.JWT_SECRET as string) as UserDTO;
    } catch (error) {
      return null;
    }
  }

  decode<T>(token: string): T | null {
    try {
      return jwt.decode(token) as T;
    } catch (error) {
      return null;
    }
  }
}
