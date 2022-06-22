import { UserDTO } from '@lofhen/types';

export default interface ITokenProvider {
  encode(user: UserDTO): string;
  verify(token: string): UserDTO | null;
  decode<T>(token: string): T | null;
}
